'use client';
// material-ui
import { Grid, Typography } from '@mui/material';
import ManufacturerDataGrid from '../../_components/Manufacturer/ManufacturerDataGrid';

// project import
import { useTranslation } from 'react-i18next';
// ===============================|| COLOR BOX ||=============================== //
function ManufacturerList() {
  const [t] = useTranslation();
  return (
    <>
      <Grid container justifyContent="center" direction="row" alignItems="flex-start">
        <Grid container spacing={3} item xs={12} sm={12} md={12} lg={12} xl={12} direction="column">
          <Grid item>
            <Typography variant="h5">{t('pages.manufacturers')}</Typography>
          </Grid>
          <Grid item>
            <ManufacturerDataGrid />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ManufacturerList;
