// material-ui
import { Box, Button, FormHelperText, IconButton, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid2';

// project import
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import { Delete } from '@mui/icons-material';
import DeletePermissionRole from './DeletePermissionRole';
import Notify from '@dashboard/_components/@extended/Notify';
import PermissionRoleService from '../../_service/PermissionRoleService';
import PermissionAutoComplete from '../Permission/PermissionAutoComplete';
import { useSession } from 'next-auth/react';
import { MRT_Row, MRT_RowData } from 'material-react-table';
import { MRT_Column } from '@root/app/types/MRT_Column';
// ===============================|| COLOR BOX ||=============================== //

function PermissionRoleDataGrid({ row }: { readonly row: MRT_Row<RoleModel> }) {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.accessToken;
  let permissionRoleService = new PermissionRoleService(jwt ?? '');

  const [data, setData] = useState<MRT_RowData[]>(() => row.original.permissions);
  const [permissionId, setPermissionId] = useState<number>();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [notify, setNotify] = useState<NotifyProps>({ open: false });
  const [refetch, setRefetch] = useState<number>();
  const [permissionRow, setPermissionRow] = useState<MRT_Row<MRT_RowData>>();

  let roleId = row.original.id;

  const columns = useMemo<MRT_Column<MRT_RowData>[]>(
    () => [
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
    if (permissionId === undefined || permissionId <= 0) {
      setPermissionId(undefined);
      return;
    }
    permissionRoleService
      .addPermissionRole(permissionId, roleId)
      .then((permission) => {
        debugger
        if (permission?.data) {
          const newPermission: MRT_RowData = permission?.data as MRT_RowData;
          data.push(newPermission);
          setData([...data]);
          row.original.permissions = [...data];
          handleRefetch();
          setPermissionId(undefined);
          setNotify({ open: true, type: 'success', description: '' });
        }
      })
      .catch((error) => {
        setNotify({ open: true, type: 'error', description: error });
      });
  };
  const handleDeleteRow = (row: MRT_Row<MRT_RowData>) => {
    debugger
    setPermissionRow(row);
    setOpenDelete(true);
  };
  const handleRefetch = () => {
    setRefetch(Date.now());
  };

  const DeleteHandle = useCallback(
    ({ row }: { readonly row: MRT_Row<MRT_RowData> }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip arrow placement="top-start" title={t('buttons.permission.delete')}>
          <IconButton color="error" onClick={() => handleDeleteRow(row)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    []
  );
  return (
    <>
      <Notify notify={notify} setNotify={setNotify}></Notify>
      <Grid container spacing={3} direction="row">
        <Grid size={{ xs: 4, sm: 4, md: 3, lg: 3 }} >
          <Button color="warning" onClick={handleNewRow} variant="outlined" sx={{ marginTop: '5px' }}>
            {t('buttons.permission.add-permission-to-role')}
          </Button>
        </Grid>
        <Grid size={{ xs: 8, sm: 6, md: 6, lg: 6 }}>
          <PermissionAutoComplete value={permissionId} setValue={setPermissionId} />
          <FormHelperText error id="helper-text-name">
            {permissionId == 0 ? t('validation.permission.required-permission-name') : ''}
          </FormHelperText>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12 }} >
          <MaterialTable
            refetch={refetch}
            columns={columns}
            dataSet={data}
            enableColumnActions={false}
            enableTopToolbar={false}
            enableColumnFilters={false}
            enablePagination={false}
            enableSorting={false}
            enableBottomToolbar={false}
            enableColumnFilterModes={false}
            enableColumnOrdering={false}
            enablePinning={false}
            enableDensityToggle={false}
            enableFullScreenToggle={false}
            enableGlobalFilterModes={false}
            enableRowActions
            renderRowActions={DeleteHandle}
          />
        </Grid>
      </Grid>
      <DeletePermissionRole
        row={row}
        permissionRow={permissionRow}
        roleId={roleId}
        open={openDelete}
        setOpen={setOpenDelete}
        data={data}
        setData={setData}
        refetch={handleRefetch}
      />

    </>
  );
}

export default PermissionRoleDataGrid;
