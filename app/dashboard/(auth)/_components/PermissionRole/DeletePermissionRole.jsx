import { useState } from 'react';

// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// assets
import { useTranslation } from 'react-i18next';
import Notify from '@dashboard/_components/@extended/Notify';
import PermissionRoleService from '@dashboard/(auth)/_service/PermissionRoleService';
import { useSession } from 'next-auth/react';

const DeletePermissionRole = ({ row, roleId, permissionRow, open, setOpen, data, setData, refetch }) => {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  let permissionService = new PermissionRoleService(jwt);
  const [notify, setNotify] = useState({ open: false });

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    let permissionId = permissionRow.original.id;
    permissionService
      .deletePermissionRole(permissionId, roleId)
      .then(() => {
        setNotify({ open: true });
        data.splice(permissionRow.index, 1);
        setData([...data]);
        row.original.permissions = [...data];
        refetch();
        onClose();
      })
      .catch((error) => {
        setNotify({ open: true, type: 'error', description: error.message });
      });
  };
  const CloseDialog = () => (
    <IconButton
      aria-label="close"
      onClick={onClose}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500]
      }}
    >
      <CloseIcon />
    </IconButton>
  );

  return (
    <>
      <Notify notify={notify} setNotify={setNotify}></Notify>
      <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h3"> {t('buttons.permission.delete')}</Typography>
          <CloseDialog />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="h4"> {t('dialog.delete.description')}</Typography>
          </DialogContentText>
          {/* <Typography variant="h3">{t('alert.delete.item')}</Typography> */}
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button disableElevation onClick={handleSubmit} size="large" variant="contained" color="error">
            {t('buttons.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeletePermissionRole;
