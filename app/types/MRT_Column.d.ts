import { MRT_ColumnDef } from "material-react-table";

interface MRT_Column<T1, T2 = unknown> extends MRT_ColumnDef<T1, T2> {
    type: 'dateTime' | 'date' | 'string' | 'number' | 'boolean' | 'array' | 'object';
    operation?: string;
}