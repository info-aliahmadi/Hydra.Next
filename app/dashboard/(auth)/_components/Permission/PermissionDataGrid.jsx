// material-ui
import { Box, Button, IconButton, Tooltip } from '@mui/material';

// project import
import MainCard from '@dashboard/_components/MainCard';
import TableCard from '@dashboard/_components/TableCard';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import { Delete } from '@mui/icons-material';
import { Edit } from '@mui/icons-material';
import AddOrEditPermission from './AddOrEditPermission';
import DeletePermission from './DeletePermission';

import AddIcon from '@mui/icons-material/Add';
import PermissionService from '@dashboard/(auth)/_service/PermissionService';
import { useSession } from 'next-auth/react';
// ===============================|| COLOR BOX ||=============================== //

function PermissionDataGrid() {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  const service = new PermissionService(jwt);
  const [isNew, setIsNew] = useState(true);
  const [rowId, setRowId] = useState(0);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [row, setRow] = useState({});
  const [refetch, setRefetch] = useState();
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: '#',
        type: 'number'
      },
      {
        accessorKey: 'name',
        header: 'Permission Name',
        enableClickToCopy: true,
        type: 'string'
        // filterVariant: 'text' | 'select' | 'multi-select' | 'range' | 'range-slider' | 'checkbox',
      },
      {
        accessorKey: 'normalizedName',
        header: 'Normalized Name',
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
    let permissionId = row.getValue('id');
    setIsNew(false);
    setRowId(permissionId);
    setOpen(true);
  };
  const handleDeleteRow = (row) => {
    setRow(row);
    setOpenDelete(true);
  };
  const handleRefetch = () => {
    setRefetch(Date.now());
  };

  const handlePermissionList = useCallback(async (x) => {
    return await service.getPermissionList(x);
  }, []);
  const AddRow = useCallback(
    () => (
      <Button color="primary" onClick={handleNewRow} variant="contained" startIcon={<AddIcon />}>
        {t('buttons.permission.add')}
      </Button>
    ),
    []
  );
  const DeleteOrEdit = useCallback(
    ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip arrow placement="top-start" title={t('buttons.permission.delete')}>
          <IconButton color="error" onClick={() => handleDeleteRow(row)}>
            <Delete />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="top-start" title={t('buttons.permission.edit')}>
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
            dataApi={handlePermissionList}
            enableRowActions
            renderRowActions={DeleteOrEdit}
            // renderTopToolbarCustomActions={AddRow}
          />
        </TableCard>
      </MainCard>
      <AddOrEditPermission isNew={isNew} permissionId={rowId} open={open} setOpen={setOpen} refetch={handleRefetch} />
      <DeletePermission row={row} open={openDelete} setOpen={setOpenDelete} refetch={handleRefetch} />
    </>
  );
}

export default PermissionDataGrid;
