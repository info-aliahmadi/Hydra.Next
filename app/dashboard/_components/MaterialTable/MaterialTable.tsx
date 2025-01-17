import { MaterialReactTable, MRT_ColumnFiltersState, MRT_SortingState } from 'material-react-table';
import { useEffect, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment-jalaali';
import { DateTimeViewer, DateViewer } from '@root//utils/DateViewer';
import find from 'lodash/find';

const dateFilter = ({ header, rangeFilterIndex }:{ header : any, rangeFilterIndex : any }) => {
  let filterFn = header.column.getFilterFn().name;
  let doubleActive = filterFn == 'between' || filterFn == 'betweenInclusive';
  const setFilterValue = (old : any, value : any, rangeFilterIndex : any) => {
    if (doubleActive) {
      old[rangeFilterIndex] = value ? moment(value).format('YYYY/MM/DD') : '';
      return old;
    }
    return value ? moment(value).format('YYYY/MM/DD') : '';
  };

  return (
    <DatePicker
      key={rangeFilterIndex}
      onChange={(value) => header.column.setFilterValue((old : any) => setFilterValue(old, value, rangeFilterIndex))}
      slotProps={{
        textField: { variant: 'standard' },
        actionBar: {
          actions: ['clear', 'today']
        }
      }}
    />
  );
};
interface MaterialTableProps {
  readonly columns: any,
  readonly dataApi: any,
  readonly dataSet: any,
  readonly refetch: any,
  readonly addSearchParams: any,
  readonly enableColumnActions: any,
  readonly enableTopToolbar: any,
  readonly enableColumnFilters: any,
  readonly enablePagination: any,
  readonly enableSorting: any,
  readonly enableColumnOrdering: any,
  readonly enableColumnResizing: any,
  readonly enableBottomToolbar: any,
  readonly enableDensityToggle: any,
  readonly enableFullScreenToggle: any,
  readonly enableGlobalFilterModes: any,
  readonly enableColumnFilterModes: any,
  readonly enableExpanding: any,
  readonly enableExpandAll: any,
  readonly getSubRows: any,
  readonly autoResetPageIndex: any,
  readonly enableRowOrdering: any,
  readonly manualFiltering: any,
  readonly manualPagination: any,
  readonly manualSorting: any,
  readonly muiTableBodyRowDragHandleProps: any,
  readonly enablePinning: any,
  readonly enableRowActions: any,
  readonly renderRowActions: any,
  readonly displayColumnDefOptions: any,
  readonly renderTopToolbarCustomActions: any,
  readonly renderRowActionMenuItems: any,
  readonly renderDetailPanel: any,
  readonly defaultDensity: any
}

function MaterialTable({
  columns,
  dataApi,
  dataSet,
  refetch,
  addSearchParams,
  enableColumnActions,
  enableTopToolbar,
  enableColumnFilters,
  enablePagination,
  enableSorting,
  enableColumnOrdering,
  enableColumnResizing,
  enableBottomToolbar,
  enableDensityToggle,
  enableFullScreenToggle,
  enableGlobalFilterModes,
  enableColumnFilterModes,
  enableExpanding,
  enableExpandAll,
  getSubRows,
  autoResetPageIndex,
  enableRowOrdering,
  manualFiltering,
  manualPagination,
  manualSorting,
  muiTableBodyRowDragHandleProps,
  enablePinning,
  enableRowActions,
  renderRowActions,
  displayColumnDefOptions,
  renderTopToolbarCustomActions,
  renderRowActionMenuItems,
  renderDetailPanel,
  defaultDensity
}:MaterialTableProps) {
  const [t, i18n] = useTranslation();
  const [tableLocale, setTableLocale] = useState(null);
  let currentLanguage = i18n.language;
  let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  //data and fetching state
  const [data, setData] = useState(dataSet || []);
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

  let numbersFields = columns.filter((x : any) => x.type === 'number');
  let stringFields = columns.filter((x : any) => x.type === 'string');
  let booleanFields = columns.filter((x : any) => x.type === 'boolean');
  let dateFields = columns.filter((x : any) => x.type === 'date');
  let dateTimeFields = columns.filter((x : any) => x.type === 'dateTime');

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
    numbersFields.forEach((element : any) => {
      element.columnFilterModeOptions = numberFilterMode;
    });
    stringFields.forEach((element : any) => {
      element.columnFilterModeOptions = stringFilterMode;
    });
    booleanFields.forEach((element : any) => {
      element.filterVariant = 'checkbox';
    });
    dateFields.forEach((element : any) => {
      element.columnFilterModeOptions = dateFilterMode;
      element.Filter = dateFilter;
    });
    dateTimeFields.forEach((element : any) => {
      element.columnFilterModeOptions = dateFilterMode;
      element.Filter = dateFilter;
    });
  }
  function setCells() {
    booleanFields.forEach((element : any) => {
      if (!element.Cell) {
        // eslint-disable-next-line react/display-name
        element.Cell = ({ renderedCellValue }:{ renderedCellValue: any }) =>
          renderedCellValue != null && (
            <Checkbox checked={!!renderedCellValue} title={renderedCellValue ? 'Yes' : 'No'} color="default" disabled />
          );
      }
    });
    dateFields.forEach((element : any) => {
      if (!element.Cell) {
        // eslint-disable-next-line react/display-name
        element.Cell = ({ renderedCellValue }:{ renderedCellValue: any }) =>
          renderedCellValue != null && <span>{DateViewer(currentLanguage, renderedCellValue)}</span>;
      }
    });
    dateTimeFields.forEach((element : any) => {
      if (!element.Cell) {
        // eslint-disable-next-line react/display-name
        element.Cell = ({ renderedCellValue }:{ renderedCellValue: any }) =>
          renderedCellValue != null && <span>{DateTimeViewer(currentLanguage, renderedCellValue)}</span>;
      }
    });
  }
  function GetDefaultFilterFunc() {
    if (!enableColumnFilters) return '';
    let numbersDefaultFilters = numbersFields.map((x : any) => x.accessorKey);
    let defaulFilters : any = {};
    for (const element of numbersDefaultFilters) {
      let fieldName = element;
      defaulFilters[fieldName] = 'equals';
    }
    let stringFieldsNames = stringFields.map((x : any) => x.accessorKey);
    for (const element of stringFieldsNames) {
      let fieldName = element;
      defaulFilters[fieldName] = 'contains';
    }
    let booleanFieldsNames = booleanFields.map((x : any) => x.accessorKey);
    for (const element of booleanFieldsNames) {
      let fieldName = element;
      defaulFilters[fieldName] = 'equals';
    }

    let dateFieldsNames = dateFields.map((x : any) => x.accessorKey);
    for (const element of dateFieldsNames) {
      let fieldName = element;
      defaulFilters[fieldName] = 'equals';
    }

    let dateTimeFieldsNames = dateTimeFields.map((x : any) => x.accessorKey);
    for (const element of dateTimeFieldsNames) {
      let fieldName = element;
      defaulFilters[fieldName] = 'equals';
    }
    return defaulFilters;
  }

  function setOperationFields(columnFilterF : any, columnFilters : any) {
    let keys = Object.keys(columnFilterF);
    for (const fieldName of keys) {
      let fieldValue = columnFilterF[fieldName];
      let element = find(columnFilters, ['id', fieldName]);
      if (element) {
        element.operation = fieldValue;
        element.type = find(columns, ['accessorKey', fieldName]).type;
      }
    }
  }
  const [columnFilterFns, setColumnFilterFns] = useState(GetDefaultFilterFunc());
  useEffect(() => {
    async function fetchData() {
      if (!data.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      let searchParams : any = {};
      searchParams['pageIndex'] = pagination.pageIndex;
      searchParams['pageSize'] = pagination.pageSize;
      setOperationFields(columnFilterFns, columnFilters);

      searchParams['filters'] = JSON.stringify(columnFilters ?? []);
      searchParams['globalFilter'] = globalFilter ?? '';
      searchParams['sorting'] = JSON.stringify(sorting ?? []);
      if (addSearchParams) {
        searchParams = { ...searchParams, addSearchParams };
      }
      try {
        const response = await dataApi(JSON.stringify(searchParams));
        setData(response.data);
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
    } else {
      setData(dataSet);
    }
  }, [columnFilters, globalFilter, pagination.pageIndex, pagination.pageSize, sorting, refetch]);

  const supportedLanguage = ['de', 'en', 'es', 'fa', 'fr', 'it', 'nl', 'pt'];

  useEffect(() => {
    setFilterMode();
    setCells();

    if (supportedLanguage.find((x) => x == currentLanguage)) {
      let loadedLanguage;
      switch (currentLanguage) {
        case 'en':
          loadedLanguage = require('material-react-table/locales/en');
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
  }, []);
  const handleRefresh = () => {
    setIsRefetching(true);
  };
  return (
      <MaterialReactTable
        columns={columns}
        data={dataApi ? data?.items ?? data ?? [] : data} //data is undefined on first render
        initialState={{ showColumnFilters: false, density: defaultDensity || 'comfortable' }}
        enableTopToolbar={enableTopToolbar ?? true}
        enableColumnActions={enableColumnActions ?? true}
        enableColumnFilters={enableColumnFilters ?? true}
        enablePagination={enablePagination ?? true}
        enableSorting={enableSorting ?? true}
        enableColumnOrdering={enableColumnOrdering ?? true}
        enableBottomToolbar={enableBottomToolbar ?? true}
        enablePinning={enablePinning  ?? true}
        enableDensityToggle={enableDensityToggle  ?? true}
        enableColumnResizing={enableColumnResizing  ?? true}
        enableFullScreenToggle={enableFullScreenToggle ?? true}
        enableGlobalFilterModes={enableGlobalFilterModes  ?? true}
        enableColumnFilterModes={enableColumnFilterModes ?? true}
        enableExpanding={enableExpanding ?? false}
        enableExpandAll={enableExpandAll ?? false}
        manualFiltering={manualFiltering ?? true}
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
        muiTableBodyRowDragHandleProps={muiTableBodyRowDragHandleProps}
        enableRowOrdering={enableRowOrdering ?? false}
        rowCount={dataApi ? data?.totalItems ?? 0 : data?.length ?? 0}
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
      />
  );
}

export default memo(MaterialTable);
