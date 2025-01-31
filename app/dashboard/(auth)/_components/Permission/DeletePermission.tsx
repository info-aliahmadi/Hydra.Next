import { useState } from 'react';

// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// assets
import { useTranslation } from 'react-i18next';
import Notify from '@dashboard/_components/@extended/Notify';
import PermissionService from '@dashboard/(auth)/_service/PermissionService';
import { useSession } from 'next-auth/react';
import { MRT_Row } from 'material-react-table';

const DeletePermission = ({ row, open, setOpen, refetch }: { row?: MRT_Row<Permission>; open: boolean; setOpen: (open: boolean) => void; refetch: () => void }) => {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.accessToken;
  let service = new PermissionService(jwt ?? "");
  const [notify, setNotify] = useState<NotifyProps>({ open: false });

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    let permissionId = row?.original.id ?? 0;
    service
      .deletePermission(permissionId)
      .then(() => {
        onClose();
        setNotify({ open: true });
        refetch();
      })
      .catch((error) => {
        setNotify({ open: true, type: 'error', description: error });
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
        <DialogTitle id="alert-dialog-title" variant='h3'>
          {t('buttons.permission.delete')}
          <CloseDialog />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="caption" fontSize={15}>
              {t('dialog.delete.description')}
            </Typography>
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

export default DeletePermission;
