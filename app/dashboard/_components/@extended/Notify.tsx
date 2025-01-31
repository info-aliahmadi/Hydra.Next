'use client';
import styled from '@emotion/styled';
import { Alert, Snackbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';


  interface Position {
    vertical?: 'top' | 'bottom';
    horizontal?: 'left' | 'center' | 'right';
  };



function Notify({ notify, setNotify, position, sx }: Readonly<{notify: NotifyProps, setNotify: setNotify, position?: Position, sx?: any }>) {
  const Strong = styled.strong`
    font-weight: 900;
    margin: auto 5px;
  `;
  const [open, setOpen] = useState<boolean>();
  const [t] = useTranslation();
  let description : string = notify.type == 'error' ? t('notification.error-description') : t('notification.success-description');

  if (notify.type === 'error' && notify.description) {
    if (notify.description?.response?.data?.message) {
      description = notify.description?.response?.data?.message;
    } else {
      if (notify.description?.message) {
        description = notify.description?.message;
      } else {
        description = notify.description;
      }
    }
  } else if (notify.type != 'error' && notify.description) {
    description = notify.description;
  }

  useEffect(() => {
    setOpen(notify.open);
  }, [notify.open]);

  const handleClose = (event: Event | React.SyntheticEvent<any, Event>, reason? : string) => {
    setNotify({ ...notify, open: false });
  };

  const getTitle = () => {
    if (notify.title) {
      return t(notify.title);
    }
    return notify.type == 'error' ? t('notification.error') : t('notification.success');
  };

  return (
      <Snackbar
        anchorOrigin={{
          vertical: position?.vertical ? position?.vertical : 'top',
          horizontal: position?.horizontal ? position?.horizontal : 'center'
        }}
        open={open}
        // autoHideDuration={6000}
        onClose={handleClose}
        sx={sx}
      >
        <Alert
          onClose={handleClose}
          severity={notify.type ? notify.type : 'success'}
          variant="filled"
          sx={{ width: '100%' }}
          data-i18n="[html]content.body"
        >
          <Typography variant="h5">
            <Strong>{getTitle()}</Strong>
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </Alert>
      </Snackbar>
  );
}
export default React.memo(Notify);
