'use client';

// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import { useTranslation } from 'react-i18next';
import ProductDataGrid from './../../_components/Product/ProductDataGrid';
// ===============================|| COLOR BOX ||=============================== //

function OrderList() {
  const [t] = useTranslation();
  return (
    <>
      <Grid container justifyContent="center" direction="row" alignItems="flex-start">
        <Grid container spacing={3} item xs={12} sm={12} md={12} lg={12} direction="column">
          <Grid item>
            <Typography variant="h5">{t('pages.product')}</Typography>
          </Grid>
          <Grid item>
            <ProductDataGrid />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default OrderList;
