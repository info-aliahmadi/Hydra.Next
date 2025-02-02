import { MaterialReactTable, MRT_ColumnFiltersState, MRT_RowData, MRT_SortingState } from 'material-react-table';
import { useEffect, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment-jalaali';
import { DateTimeViewer, DateViewer } from '@root//utils/DateViewer';
import find from 'lodash/find';
import { MRT_Column } from '@root/app/types/MRT_Column';
import i18next from 'i18next';

const dateFilter = ({ header, rangeFilterIndex }: { header: any, rangeFilterIndex: any }) => {
  let filterFn = header.column.getFilterFn().name;
  let doubleActive = filterFn == 'between' || filterFn == 'betweenInclusive';
  const setFilterValue = (old: any, rangeFilterIndex: any, value?: any) => {
    if (doubleActive) {
      old[rangeFilterIndex] = value ? moment(value).format('YYYY/MM/DD') : '';
      return old;
    }
    return value ? moment(value).format('YYYY/MM/DD') : '';
  };

  return (
    <DatePicker
      key={rangeFilterIndex}
      onChange={(value) => header.column.setFilterValue((old: any) => setFilterValue(old, rangeFilterIndex, value))}
      slotProps={{
        textField: { variant: 'standard' },
        actionBar: {
          actions: ['clear', 'today']
        }
      }}
    />
  );
};


function MaterialTable({
  columns,
  dataApi,
  dataSet,
  refetch,
  addSearchParams,
  enableColumnActions = true,
  enableTopToolbar = true,
  enableColumnFilters = true,
  enablePagination = true,
  enableSorting = true,
  enableColumnOrdering = true,
  enableColumnResizing = true,
  enableBottomToolbar = true,
  enableDensityToggle = true,
  enableFullScreenToggle = true,
  enableGlobalFilterModes = true,
  enableColumnFilterModes,
  enableExpanding = false,
  enableExpandAll = false,
  getSubRows,
  autoResetPageIndex = false,
  enableRowOrdering = false,
  manualFiltering = true,
  manualPagination = true,
  manualSorting = true,
  enableRowDragging = false,
  enableColumnDragging = false,
  muiTableBodyRowDragHandleProps,
  enablePinning = false,
  enableRowActions,
  renderRowActions,
  displayColumnDefOptions,
  renderTopToolbarCustomActions,
  renderRowActionMenuItems,
  renderDetailPanel,
  defaultDensity = 'comfortable'
}: Readonly<MaterialTableProps>) {
  const [t, i18n] = useTranslation();
  const [tableLocale, setTableLocale] = useState(null);
  let currentLanguage = i18n.language;
  let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  //data and fetching state
  const [data, setData] = useState<PaginatedList<MRT_RowData>>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);

  //table state
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  let numbersFields: MRT_Column<MRT_RowData, any>[] = columns.filter((x) => x.type === 'number');
  let stringFields: MRT_Column<MRT_RowData, any>[] = columns.filter((x) => x.type === 'string');
  let booleanFields: MRT_Column<MRT_RowData, any>[] = columns.filter((x) => x.type === 'boolean');
  let dateFields: MRT_Column<MRT_RowData, any>[] = columns.filter((x) => x.type === 'date');
  let dateTimeFields: MRT_Column<MRT_RowData, any>[] = columns.filter((x) => x.type === 'dateTime');

  let numberFilterMode = [
    'equals',
    'notEquals',
    'between',
    'betweenInclusive',
    'greaterThan',
    'greaterThanOrEqualTo',
    'lessThan',
    'lessThanOrEqualTo',
    'empty',
    'notEmpty'
  ];
  let stringFilterMode = ['equals', 'notEquals', 'contains', 'notContains', 'startsWith', 'endsWith', 'empty', 'notEmpty'];

  let dateFilterMode = [
    'equals',
    'notEquals',
    'between',
    'betweenInclusive',
    'greaterThan',
    'greaterThanOrEqualTo',
    'lessThan',
    'lessThanOrEqualTo',
    'empty',
    'notEmpty'
  ];
  function setFilterMode() {
    if (!enableGlobalFilterModes) {
      return;
    }
    numbersFields.forEach((element) => {
      element.columnFilterModeOptions = numberFilterMode;
    });
    stringFields.forEach((element: any) => {
      element.columnFilterModeOptions = stringFilterMode;
    });
    booleanFields.forEach((element: any) => {
      element.filterVariant = 'checkbox';
    });
    dateFields.forEach((element: any) => {
      element.columnFilterModeOptions = dateFilterMode;
      element.Filter = dateFilter;
    });
    dateTimeFields.forEach((element: any) => {
      element.columnFilterModeOptions = dateFilterMode;
      element.Filter = dateFilter;
    });
  }
  function setCells() {
    booleanFields.forEach((element: any) => {
      if (!element.Cell) {
        // eslint-disable-next-line react/display-name
        element.Cell = ({ renderedCellValue }: { renderedCellValue: any }) =>
          renderedCellValue != null && (
            <Checkbox checked={!!renderedCellValue} title={renderedCellValue ? 'Yes' : 'No'} color="default" disabled />
          );
      }
    });
    dateFields.forEach((element: any) => {
      if (!element.Cell) {
        // eslint-disable-next-line react/display-name
        element.Cell = ({ renderedCellValue }: { renderedCellValue: any }) =>
          renderedCellValue != null && <span>{DateViewer(currentLanguage, renderedCellValue)}</span>;
      }
    });
    dateTimeFields.forEach((element: any) => {
      if (!element.Cell) {
        // eslint-disable-next-line react/display-name
        element.Cell = ({ renderedCellValue }: { renderedCellValue: any }) =>
          renderedCellValue != null && <span>{DateTimeViewer(currentLanguage, renderedCellValue)}</span>;
      }
    });
  }
  function GetDefaultFilterFunc() {
    if (!enableColumnFilters) return '';
    let numbersDefaultFilters = numbersFields.map((x: any) => x.accessorKey);
    let defaulFilters: any = {};
    for (const element of numbersDefaultFilters) {
      let fieldName = element;
      defaulFilters[fieldName] = 'equals';
    }
    let stringFieldsNames = stringFields.map((x: any) => x.accessorKey);
    for (const element of stringFieldsNames) {
      let fieldName = element;
      defaulFilters[fieldName] = 'contains';
    }
    let booleanFieldsNames = booleanFields.map((x: any) => x.accessorKey);
    for (const element of booleanFieldsNames) {
      let fieldName = element;
      defaulFilters[fieldName] = 'equals';
    }

    let dateFieldsNames = dateFields.map((x: any) => x.accessorKey);
    for (const element of dateFieldsNames) {
      let fieldName = element;
      defaulFilters[fieldName] = 'equals';
    }

    let dateTimeFieldsNames = dateTimeFields.map((x: any) => x.accessorKey);
    for (const element of dateTimeFieldsNames) {
      let fieldName = element;
      defaulFilters[fieldName] = 'equals';
    }
    return defaulFilters;
  }

  function setOperationFields(columnFilterF: any, columnFilters: any) {
    let keys = Object.keys(columnFilterF);
    for (const fieldName of keys) {
      let fieldValue = columnFilterF[fieldName];
      let element = find(columnFilters, ['id', fieldName]);
      if (element) {
        element.operation = fieldValue;
        const column = find(columns, ['accessorKey', fieldName]);
        element.type = column ? column.type : undefined;
      }
    }
  }
  const [columnFilterFns, setColumnFilterFns] = useState(GetDefaultFilterFunc());
  useEffect(() => {
    async function fetchData() {
      if (data && !data.items.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      let searchParams: GridDataBound = {};
      searchParams.pageIndex = pagination.pageIndex;
      searchParams.pageSize = pagination.pageSize;
      setOperationFields(columnFilterFns, columnFilters);

      searchParams.filters = JSON.stringify(columnFilters ?? []);
      searchParams.globalFilter = globalFilter ?? '';
      searchParams.sorting = JSON.stringify(sorting ?? []);
      if (addSearchParams) {
        searchParams = { ...searchParams, ...addSearchParams };
      }
      try {
        if (dataApi) {
          const response = await dataApi(searchParams);
          if (response.succeeded)
            if (response.data) {
              setData(response.data);
            }
        }

      } catch (error) {
        setIsError(true);
        console.error(error);
        return;
      }
      setIsError(false);
      setIsLoading(false);
      setIsRefetching(false);
    }

    if (dataApi) {
      fetchData();
    }
  }, [columnFilters, globalFilter, pagination.pageIndex, pagination.pageSize, sorting, refetch, dataSet]);

  const supportedLanguage = ['de', 'en', 'es', 'fa', 'ar', 'fr', 'it', 'nl', 'pt'];

  useEffect(() => {
    setFilterMode();
    setCells();
    if (supportedLanguage.find((x) => x == currentLanguage)) {
      let loadedLanguage;
      switch (currentLanguage) {
        case 'en':
          loadedLanguage = require('material-react-table/locales/en');
          break;
        case 'ar':
          loadedLanguage = require('material-react-table/locales/ar');
          break;
        case 'fa':
          loadedLanguage = require('material-react-table/locales/fa');
          break;
        case 'de':
          loadedLanguage = require('material-react-table/locales/de');
          break;
        case 'es':
          loadedLanguage = require('material-react-table/locales/es');
          break;
        case 'it':
          loadedLanguage = require('material-react-table/locales/it');
          break;
        case 'fr':
          loadedLanguage = require('material-react-table/locales/fr');
          break;
        case 'nl':
          loadedLanguage = require('material-react-table/locales/nl');
          break;
        case 'pt':
          loadedLanguage = require('material-react-table/locales/pt');
          break;
      }
      let parentName = 'MRT_Localization_' + currentLanguage.toUpperCase();
      setTableLocale(loadedLanguage[parentName]);
    } else {
      let path = 'locales/' + currentLanguage + '/table.json';
      fetch(path)
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          setTableLocale(data);
        });
    }
  }, [currentLanguage]);
  const handleRefresh = () => {
    setIsRefetching(true);
  };
  return (
    <div className={'material-grid-container ' + i18next.dir()}>
      <MaterialReactTable
        columns={columns}
        data={dataApi ? data?.items ?? [] : dataSet || []} //data is always an array
        initialState={{ showColumnFilters: false, density: defaultDensity }}
        enableTopToolbar={enableTopToolbar ?? true}
        enableColumnActions={enableColumnActions ?? true}
        enableColumnFilters={enableColumnFilters ?? true}
        enablePagination={enablePagination ?? true}
        enableSorting={enableSorting ?? true}
        enableColumnOrdering={enableColumnOrdering ?? true}
        enableBottomToolbar={enableBottomToolbar ?? true}
        enableRowPinning={enablePinning ?? true}
        enableColumnPinning={enablePinning ?? true}
        enableRowDragging={enableRowDragging ?? false}
        enableColumnDragging={enableColumnDragging ?? false}
        enableDensityToggle={enableDensityToggle ?? true}
        enableColumnResizing={enableColumnResizing ?? true}
        enableFullScreenToggle={enableFullScreenToggle ?? true}
        enableGlobalFilterModes={enableGlobalFilterModes ?? true}
        enableColumnFilterModes={enableColumnFilterModes ?? true}
        enableExpanding={enableExpanding ?? false}
        enableExpandAll={enableExpandAll ?? false}
        manualFiltering={manualFiltering ?? true}
        columnResizeMode='onChange'
        layoutMode='grid'
        manualPagination={manualPagination ?? true}
        manualSorting={manualSorting ?? true}
        muiToolbarAlertBannerProps={
          isError
            ? {
              color: 'error',
              children: 'Error loading data'
            }
            : undefined
        }
        positionToolbarAlertBanner="none"
        getSubRows={getSubRows}
        autoResetPageIndex={autoResetPageIndex ?? false}
        onColumnFiltersChange={setColumnFilters}
        onColumnFilterFnsChange={setColumnFilterFns}
        onGlobalFilterChange={setGlobalFilter}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        enableRowActions={!!enableRowActions}
        renderRowActions={renderRowActions}
        displayColumnDefOptions={displayColumnDefOptions}
        renderTopToolbarCustomActions={
          renderTopToolbarCustomActions || (() => (
            <IconButton onClick={() => handleRefresh()}>
              <RefreshIcon />
            </IconButton>
          ))
        }
        renderRowActionMenuItems={renderRowActionMenuItems}
        renderDetailPanel={renderDetailPanel}
        muiTableBodyCellProps={muiTableBodyRowDragHandleProps}
        enableRowOrdering={enableRowOrdering ?? false}
        rowCount={dataApi ? data?.totalItems ?? 0 : dataSet?.length ?? 0}
        state={{
          columnFilters,
          columnFilterFns,
          globalFilter,
          isLoading,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isRefetching,
          sorting
        }}
        localization={tableLocale ?? undefined}
        columnResizeDirection={i18n.dir()}
      />
    </div>

  );
}

export default memo(MaterialTable);
