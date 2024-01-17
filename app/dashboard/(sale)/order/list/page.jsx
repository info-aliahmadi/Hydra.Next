'use client';

// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import { useTranslation } from 'react-i18next';
import OrderDataGrid from '../../_components/Order/OrderDataGrid';
// ===============================|| COLOR BOX ||=============================== //

function OrderList() {
  const [t] = useTranslation();
  return (
    <>
      <Grid container justifyContent="center" direction="row" alignItems="flex-start">
        <Grid container spacing={3} item xs={12} sm={12} md={12} lg={12} direction="column">
          <Grid item>
            <Typography variant="h5">{t('pages.orders')}</Typography>
          </Grid>
          <Grid item>
            <OrderDataGrid />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default OrderList;
