'use client';
// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import LinkSectionDataGrid from '../../_components/Link/LinkSectionDataGrid';
import { useTranslation } from 'react-i18next';
// ===============================|| COLOR BOX ||=============================== //

function MenuList() {
  const [t] = useTranslation();
  return (
    <>
      <Grid container justifyContent="center" direction="row" alignItems="flex-start">
        <Grid container spacing={3} item xs={12} sm={12} md={12} lg={12} xl={8} direction="column">
          <Grid item>
            <Typography variant="h5">{t('pages.linkSection')}</Typography>
          </Grid>
          <Grid item>
            <LinkSectionDataGrid />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default MenuList;
