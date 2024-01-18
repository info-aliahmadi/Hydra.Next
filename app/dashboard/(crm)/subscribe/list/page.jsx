'use client';
import SubscribeDataGrid from '@dashboard/(crm)/_components/Subscribe/SubscribeDataGrid';
// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import { useTranslation } from 'react-i18next';
// ===============================|| COLOR BOX ||=============================== //

function SubscribeList() {
  const [t] = useTranslation();
  return (
    <>
      <Grid container justifyContent="center" direction="row" alignItems="flex-start">
        <Grid container spacing={3} item xs={12} sm={12} md={10} lg={10} xl={7} direction="column">
          <Grid item>
            <Typography variant="h5">{t('pages.subscribes')}</Typography>
          </Grid>
          <Grid item>
            <SubscribeDataGrid />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default SubscribeList;
