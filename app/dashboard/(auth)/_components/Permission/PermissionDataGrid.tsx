// material-ui
import { Box, Button, IconButton, Tooltip } from '@mui/material';

// project import
import MainCard from '@dashboard/_components/MainCard';
import TableCard from '@dashboard/_components/TableCard';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import { Delete, Edit } from '@mui/icons-material';
import AddOrEditPermission from './AddOrEditPermission';
import DeletePermission from './DeletePermission';

import AddIcon from '@mui/icons-material/Add';
import PermissionService from '@dashboard/(auth)/_service/PermissionService';
import { useSession } from 'next-auth/react';
import { MRT_Column } from '@root/app/types/MRT_Column';
import { MRT_Row } from 'material-react-table';
// ===============================|| COLOR BOX ||=============================== //

function PermissionDataGrid() {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.accessToken;
  console.log("Auth :" + jwt);

  const service = new PermissionService(jwt ?? "");
  const [isNew, setIsNew] = useState<boolean>(true);
  const [rowId, setRowId] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [row, setRow] = useState<MRT_Row<Permission>>();
  const [refetch, setRefetch] = useState<number>();
  const columns = useMemo<MRT_Column<RoleModel>[]>(
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
  const handleEditRow = (row: MRT_Row<Permission>) => {
    let permissionId = row.original.id ?? 0;
    setIsNew(false);
    setRowId(permissionId);
    setOpen(true);
  };
  const handleDeleteRow = (row: MRT_Row<Permission>) => {
    setRow(row);
    setOpenDelete(true);
  };
  const handleRefetch = () => {
    setRefetch(Date.now());
  };

  const handlePermissionList = useCallback(async (searchParams: GridDataBound) => {
    return await service.getPermissionList(searchParams);
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
    ({ row }: { row: MRT_Row<Permission> }) => (
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
          />
        </TableCard>
      </MainCard>
      <AddOrEditPermission isNew={isNew} permissionId={rowId} open={open} setOpen={setOpen} refetch={handleRefetch} />
      <DeletePermission row={row} open={openDelete} setOpen={setOpenDelete} refetch={handleRefetch} />
    </>
  );
}

export default PermissionDataGrid;
