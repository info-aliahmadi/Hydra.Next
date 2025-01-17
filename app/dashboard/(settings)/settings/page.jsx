'use client';
// material-ui
import MainCard from '@dashboard/_components/MainCard';
import { Grid, Typography } from '@mui/material';

// project import
import { useTranslation } from 'react-i18next';

// ===============================|| COLOR BOX ||=============================== //

function Setting() {
  const [t] = useTranslation();
  return (
    <>
      <Grid container justifyContent="center" direction="row" alignItems="flex-start">
        <Grid container spacing={3} item xs={12} sm={12} md={12} lg={12} xl={7} direction="column">
          <Grid item>
            <Typography variant="h5">{t('pages.settings')}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Setting;
