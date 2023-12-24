'use client'
import SlideshowDataGrid from '@dashboard/(cms)/_components/Slideshow/SlideshowDataGrid';
// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import { useTranslation } from 'react-i18next';
// ===============================|| COLOR BOX ||=============================== //

function SlideshowList() {
  const [t] = useTranslation();
  return (
    <>
      <Grid container justifyContent="center" direction="row" alignItems="flex-start">
        <Grid container spacing={3} item xs={12} sm={12} md={12} lg={12} xl={8} direction="column">
          <Grid item>
            <Typography variant="h5">{t('pages.slideshow')}</Typography>
          </Grid>
          <Grid item>
            <SlideshowDataGrid />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default SlideshowList;
