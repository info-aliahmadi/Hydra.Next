// material-ui
import { Button, Grid, Typography } from '@mui/material';

// project import
import { useTranslation } from 'react-i18next';
import { Send } from '@mui/icons-material';

import MessagesDraftDataGrid from './MessagesDraftDataGrid';

import { useNavigate } from 'react-router-dom';
// ===============================|| COLOR BOX ||=============================== //

export default function MessagesOutbox() {
  const [t] = useTranslation();
  let navigate = useNavigate();

  const buttonName = 'buttons.message.messageInbox.';

  const MessageHeader = () => {
    return (
      <Grid container item direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          {
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                navigate('/message/new');
              }}
              startIcon={<Send />}
            >
              {t(buttonName + 'send')}
            </Button>
          }
        </Grid>
      </Grid>
    );
  };
  return (
    <>
      <Grid container justifyContent="center" direction="row" alignItems="flex-start">
        <Grid container spacing={3} item xs={12} sm={12} md={12} lg={12} direction="column">
          <Grid item>
            <Typography variant="h5">{t('pages.messagesDraft')}</Typography>
          </Grid>
          <Grid item>
            <MessagesDraftDataGrid />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
