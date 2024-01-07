import { MaterialReactTable } from 'material-react-table';
import { useEffect, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment-jalaali';
import { DateTimeViewer, DateViewer } from '/utils/DateViewer';
import find from 'lodash/find';

const dateFilter = ({ header, rangeFilterIndex }) => {
  let filterFn = header.column.getFilterFn().name;
  let doubleActive = filterFn == 'between' || filterFn == 'betweenInclusive';
  const setFilterValue = (old, value, rangeFilterIndex) => {
    if (doubleActive) {
      old[rangeFilterIndex] = value ? moment(value).format('YYYY/MM/DD') : '';
      return old;
    }
    return value ? moment(value).format('YYYY/MM/DD') : '';
  };

  return (
    <DatePicker
      key={rangeFilterIndex}
      onChange={(value) => header.column.setFilterValue((old) => setFilterValue(old, value, rangeFilterIndex))}
      clearable
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
}) {
  const [t, i18n] = useTranslation();
  const [tableLocale, setTableLocale] = useState(null);
  let currentLanguage = i18n.language;
  let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  //data and fetching state
  const [data, setData] = useState(dataSet ? dataSet : []);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);

  //table state
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  let numbersFields = columns.filter((x) => x.type === 'number');
  let stringFields = columns.filter((x) => x.type === 'string');
  let booleanFields = columns.filter((x) => x.type === 'boolean');
  let dateFields = columns.filter((x) => x.type === 'date');
  let dateTimeFields = columns.filter((x) => x.type === 'dateTime');

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
    if (enableGlobalFilterModes == false) {
      return;
    }
    numbersFields.forEach((element) => {
      element.columnFilterModeOptions = numberFilterMode;
    });
    stringFields.forEach((element) => {
      element.columnFilterModeOptions = stringFilterMode;
    });
    booleanFields.forEach((element) => {
      element.filterVariant = 'checkbox';
    });
    dateFields.forEach((element) => {
      element.columnFilterModeOptions = dateFilterMode;
      element.Filter = dateFilter;
    });
    dateTimeFields.forEach((element) => {
      element.columnFilterModeOptions = dateFilterMode;
      element.Filter = dateFilter;
    });
  }
  function setCells() {
    booleanFields.forEach((element) => {
      if (!element.Cell) {
        // eslint-disable-next-line react/display-name
        element.Cell = ({ renderedCellValue }) =>
          renderedCellValue != null && (
            <Checkbox checked={renderedCellValue ? true : false} title={renderedCellValue ? 'Yes' : 'No'} color="default" disabled />
          );
      }
    });
    dateFields.forEach((element) => {
      if (!element.Cell) {
        // eslint-disable-next-line react/display-name
        element.Cell = ({ renderedCellValue }) =>
          renderedCellValue != null && <span>{DateViewer(currentLanguage, renderedCellValue)}</span>;
      }
    });
    dateTimeFields.forEach((element) => {
      if (!element.Cell) {
        // eslint-disable-next-line react/display-name
        element.Cell = ({ renderedCellValue }) =>
          renderedCellValue != null && <span>{DateTimeViewer(currentLanguage, renderedCellValue)}</span>;
      }
    });
  }
  function GetDefaultFilterFunc() {
    if (enableColumnFilters == false) {
      return '';
    }
    let numbersDefaultFilters = numbersFields.map((x) => x.accessorKey);
    let defaulFilters = {};
    for (let i = 0; i < numbersDefaultFilters.length; i++) {
      let fieldName = numbersDefaultFilters[i];
      defaulFilters[fieldName] = 'equals';
    }
    let stringFieldsNames = stringFields.map((x) => x.accessorKey);
    for (let i = 0; i < stringFieldsNames.length; i++) {
      let fieldName = stringFieldsNames[i];
      defaulFilters[fieldName] = 'contains';
    }
    let booleanFieldsNames = booleanFields.map((x) => x.accessorKey);
    for (let i = 0; i < booleanFieldsNames.length; i++) {
      let fieldName = booleanFieldsNames[i];
      defaulFilters[fieldName] = 'equals';
    }

    let dateFieldsNames = dateFields.map((x) => x.accessorKey);
    for (let i = 0; i < dateFieldsNames.length; i++) {
      let fieldName = dateFieldsNames[i];
      defaulFilters[fieldName] = 'equals';
    }

    let dateTimeFieldsNames = dateTimeFields.map((x) => x.accessorKey);
    for (let i = 0; i < dateTimeFieldsNames.length; i++) {
      let fieldName = dateTimeFieldsNames[i];
      defaulFilters[fieldName] = 'equals';
    }
    return defaulFilters;
  }

  function setOperationFields(columnFilterF, columnFilters) {
    let keys = Object.keys(columnFilterF);
    for (let i = 0; i < keys.length; i++) {
      let fieldName = keys[i];
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

      let searchParams = {};
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
    <>
      <MaterialReactTable
        columns={columns}
        data={dataApi ? data?.items ?? data ?? [] : data} //data is undefined on first render
        initialState={{ showColumnFilters: false, density: defaultDensity ? defaultDensity : 'comfortable' }}
        enableTopToolbar={(enableTopToolbar && true) ?? true}
        enableColumnActions={(enableColumnActions && true) ?? true}
        enableColumnFilters={(enableColumnFilters && true) ?? true}
        enablePagination={(enablePagination && true) ?? true}
        enableSorting={(enableSorting && true) ?? true}
        enableColumnOrdering={(enableColumnOrdering && true) ?? true}
        enableBottomToolbar={(enableBottomToolbar && true) ?? true}
        enablePinning={(enablePinning && true) ?? true}
        enableDensityToggle={(enableDensityToggle && true) ?? true}
        enableColumnResizing={(enableColumnResizing && true) ?? true}
        enableFullScreenToggle={(enableFullScreenToggle && true) ?? true}
        enableGlobalFilterModes={(enableGlobalFilterModes && true) ?? true}
        enableColumnFilterModes={(enableColumnFilterModes && true) ?? true}
        enableExpanding={(enableExpanding && true) ?? false}
        enableExpandAll={(enableExpandAll && true) ?? false}
        manualFiltering={(manualFiltering && true) ?? true}
        showSkeletons
        manualPagination={(manualPagination && true) ?? true}
        manualSorting={(manualSorting && true) ?? true}
        muiToolbarAlertBannerProps={
          isError
            ? {
                color: 'error',
                children: 'Error loading data'
              }
            : undefined
        }
        positionToolbarAlertBanner="center"
        getSubRows={getSubRows && getSubRows}
        autoResetPageIndex={(autoResetPageIndex && true) ?? false}
        onColumnFiltersChange={setColumnFilters}
        onColumnFilterFnsChange={setColumnFilterFns}
        onGlobalFilterChange={setGlobalFilter}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        enableRowActions={enableRowActions ? true : false}
        renderRowActions={renderRowActions && renderRowActions}
        displayColumnDefOptions={displayColumnDefOptions && displayColumnDefOptions}
        renderTopToolbarCustomActions={
          renderTopToolbarCustomActions
            ? renderTopToolbarCustomActions
            : () => (
                <IconButton onClick={() => handleRefresh()}>
                  <RefreshIcon />
                </IconButton>
              )
        }
        renderRowActionMenuItems={renderRowActionMenuItems && renderRowActionMenuItems}
        renderDetailPanel={renderDetailPanel && renderDetailPanel}
        muiTableBodyRowDragHandleProps={muiTableBodyRowDragHandleProps && muiTableBodyRowDragHandleProps}
        enableRowOrdering={(enableRowOrdering && true) ?? false}
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
        localization={tableLocale}
      />
    </>
  );
}

export default memo(MaterialTable);
