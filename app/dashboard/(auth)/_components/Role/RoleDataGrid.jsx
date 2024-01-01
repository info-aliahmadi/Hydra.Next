// material-ui
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';

// project import
import MainCard from '@dashboard/_components/MainCard';
import TableCard from '@dashboard/_components/TableCard';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import { Delete } from '@mui/icons-material';
import { Edit } from '@mui/icons-material';
import AddOrEditRole from './AddOrEditRole';
import DeleteRole from './DeleteRole';

import AddIcon from '@mui/icons-material/Add';
import RoleService from '@dashboard/(auth)/_service/RoleService';
import PermissionRoleDataGrid from '../PermissionRole/PermissionRoleDataGrid';
import { useSession } from 'next-auth/react';
// ===============================|| COLOR BOX ||=============================== //

function RoleDataGrid() {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  const service = new RoleService(jwt);
  const [isNew, setIsNew] = useState(true);
  const [rowId, setRowId] = useState(0);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [row, setRow] = useState({});
  const [refetch, setRefetch] = useState();
  const columns = useMemo(
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
  const handleEditRow = (row) => {
    let roleId = row.original.id;
    setIsNew(false);
    setRowId(roleId);
    setOpen(true);
  };
  const handleDeleteRow = (row) => {
    setRow(row);
    setOpenDelete(true);
  };
  const handleRefetch = () => {
    setRefetch(Date.now());
  };

  const handleRoleList = useCallback(async (x) => {
    return await service.getRoleList(x);
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
    ({ row }) => (
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
