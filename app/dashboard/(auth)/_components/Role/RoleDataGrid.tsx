// material-ui
import { Box, Button, IconButton, Tooltip } from '@mui/material';

// project import
import MainCard from '@dashboard/_components/MainCard';
import TableCard from '@dashboard/_components/TableCard';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import { Delete, Edit } from '@mui/icons-material';
import AddOrEditRole from './AddOrEditRole';
import DeleteRole from './DeleteRole';

import AddIcon from '@mui/icons-material/Add';
import RoleService from '@dashboard/(auth)/_service/RoleService';
import PermissionRoleDataGrid from '../PermissionRole/PermissionRoleDataGrid';
import { useSession } from 'next-auth/react';
import { MRT_Column } from '@root/app/types/MRT_Column';
import { MRT_Row } from 'material-react-table';
// ===============================|| COLOR BOX ||=============================== //

function RoleDataGrid() {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.accessToken;

  const service = new RoleService(jwt ?? "");
  const [isNew, setIsNew] = useState(true);
  const [rowId, setRowId] = useState(0);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [row, setRow] = useState<MRT_Row<RoleModel>>();
  const [refetch, setRefetch] = useState<number>();
  const columns = useMemo<MRT_Column<RoleModel>[]>(
    () => [
      {
        accessorKey: 'name',
        header: t('fields.role.name'),
        enableClickToCopy: true,
        type: 'string'
        // filterVariant: 'text' | 'select' | 'multi-select' | 'range' | 'range-slider' | 'checkbox',
      },
      {
        accessorKey: 'normalizedName',
        header: t('fields.role.normalizedName'),
        type: 'string'
      }
    ],
    []
  );

  const handleNewRow = () => {
    setIsNew(true);
    setRowId(0);
    setOpen(true);
  };
  const handleEditRow = (row: MRT_Row<RoleModel>) => {
    let roleId = row.original.id;
    setIsNew(false);
    setRowId(roleId);
    setOpen(true);
  };
  const handleDeleteRow = (row: MRT_Row<RoleModel>) => {
    setRow(row);
    setOpenDelete(true);
  };
  const handleRefetch = () => {
    setRefetch(Date.now());
  };

  const handleRoleList = useCallback(async (searchParams : GridDataBound) => {
    return await service.getRoleList(searchParams);
  }, []);
  const AddRow = useCallback(
    () => (
      <Button color="primary" onClick={handleNewRow} variant="contained" startIcon={<AddIcon />}>
        {t('buttons.role.add')}
      </Button>
    ),
    []
  );

  const DeleteOrEdit = useCallback(
    ({ row }: { row: MRT_Row<RoleModel> }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip arrow placement="top-start" title={t('buttons.role.delete')}>
          <IconButton color="error" onClick={() => handleDeleteRow(row)}>
            <Delete />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="top-start" title={t('buttons.role.edit')}>
          <IconButton onClick={() => handleEditRow(row)}>
            <Edit />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    []
  );
  return (
    <>
      <MainCard title={<AddRow />}>
        <TableCard>
          <MaterialTable
            refetch={refetch}
            columns={columns}
            dataApi={handleRoleList}
            enableRowActions
            renderRowActions={DeleteOrEdit}
            // renderTopToolbarCustomActions={AddRow}
            renderDetailPanel={({ row }) => <PermissionRoleDataGrid row={row} />}
          />
        </TableCard>
      </MainCard>
      <AddOrEditRole isNew={isNew} roleId={rowId} open={open} setOpen={setOpen} refetch={handleRefetch} />
      <DeleteRole row={row} open={openDelete} setOpen={setOpenDelete} refetch={handleRefetch} />
    </>
  );
}

export default RoleDataGrid;
