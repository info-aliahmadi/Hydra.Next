interface MaterialTableProps {
    readonly columns: MRT_ColumnDef<MRT_RowData, any>[],
    readonly dataApi?: (filters: GridDataBound) => Promise<Result<PaginatedList<MRT_RowData>>>,
    readonly dataSet?: MRT_RowData[],
    readonly refetch?: number,
    readonly addSearchParams?: GridDataBound,
    readonly enableColumnActions?: boolean,
    readonly enableTopToolbar?: boolean,
    readonly enableColumnFilters?: boolean,
    readonly enablePagination?: boolean,
    readonly enableSorting?: boolean,
    readonly enableColumnOrdering?: boolean,
    readonly enableColumnResizing?: boolean,
    readonly enableBottomToolbar?: boolean,
    readonly enableGlobalFilterModes?: boolean,
    readonly enableDensityToggle?: boolean,
    readonly enableFullScreenToggle?: boolean,
    readonly enableRowDragging?: boolean,
    readonly enableColumnDragging?: boolean,
    readonly enableColumnFilterModes?: boolean,
    readonly enableExpanding?: boolean,
    readonly enableExpandAll?: boolean,
    readonly getSubRows?: ((originalRow: MRT_RowData, index: number) => MRT_RowData[] | undefined) | undefined,
    readonly autoResetPageIndex?: boolean,
    readonly enableRowOrdering?: boolean,
    readonly manualFiltering?: boolean,
    readonly manualPagination?: boolean,
    readonly manualSorting?: boolean,
    readonly muiTableBodyRowDragHandleProps?: ((props: {
        cell: MRT_Cell<TData>;
        column: MRT_Column<TData>;
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
    }) => TableCellProps) | TableCellProps,
    readonly enablePinning?: boolean,
    readonly enableRowActions?: boolean,
    readonly renderRowActions?: ((props: {
        cell: MRT_Cell<MRT_RowData, unknown>;
        row: MRT_Row<MRT_RowData>;
        staticRowIndex?: number;
        table: MRT_TableInstance<MRT_RowData>;
    }) => ReactNode) | undefined,
    readonly displayColumnDefOptions?: any,
    readonly renderTopToolbarCustomActions?: ((props: {
        table: MRT_TableInstance<MRT_RowData>;
    }) => ReactNode) | undefined,
    readonly renderRowActionMenuItems?: ((props: {
        closeMenu: () => void;
        row: MRT_Row<MRT_RowData>;
        staticRowIndex?: number;
        table: MRT_TableInstance<MRT_RowData>;
    }) => ReactNode[] | undefined) | undefined,
    readonly renderDetailPanel?: ((props: {
        row: MRT_Row<MRT_RowData>;
        table: MRT_TableInstance<MRT_RowData>;
    }) => ReactNode) | undefined,
    readonly defaultDensity?: 'comfortable' | 'compact' | 'spacious'
}