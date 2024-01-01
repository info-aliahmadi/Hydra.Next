// material-ui
import { Box, Button, FormHelperText, Grid, IconButton, Tooltip } from '@mui/material';

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
// ===============================|| COLOR BOX ||=============================== //

function PermissionRoleDataGrid({ row }) {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;
  let permissionRoleService = new PermissionRoleService(jwt);

  const [data, setData] = useState(() => row.original.permissions);
  const [permissionId, setPermissionId] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [notify, setNotify] = useState(false);
  const [refetch, setRefetch] = useState();
  const [permissionRow, setPermissionRow] = useState();

  let roleId = row.original.id;

  const columns = useMemo(
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
    if (!(permissionId > 0)) {
      setPermissionId(0);
      return;
    }
    permissionRoleService
      .addPermissionRole(permissionId, roleId)
      .then((permission) => {
        data.push(permission?.data);
        setData([...data]);
        row.original.permissions = [...data];
        handleRefetch();
        setPermissionId(null);
        setNotify({ open: true });
      })
      .catch((error) => {
        setNotify({ open: true, type: 'error', description: error });
      });
  };
  const handleDeleteRow = (row) => {
    setPermissionRow(row);
    setOpenDelete(true);
  };
  const handleRefetch = () => {
    setRefetch(Date.now());
  };

  const DeleteHandle = useCallback(
    ({ row }) => (
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
        <Grid item xd={4} sm={4} md={3} lg={3}>
          <Button color="warning" onClick={handleNewRow} variant="outlined" sx={{ marginTop: '5px' }}>
            {t('buttons.permission.add-permission-to-role')}
          </Button>
        </Grid>
        <Grid item xd={8} sm={6} md={6} lg={6}>
          <PermissionAutoComplete value={permissionId} setValue={setPermissionId} />
          <FormHelperText error id="helper-text-name">
            {permissionId == 0 ? t('validation.permission.required-permission-name') : ''}
          </FormHelperText>
        </Grid>
        <Grid item xd={12} sm={12} md={12}>
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
