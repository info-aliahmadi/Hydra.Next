'use client';
// material-ui
import RoleDataGrid from '@dashboard/(auth)/_components/Role/RoleDataGrid';
import { Grid, Typography } from '@mui/material';

// project import
import { useTranslation } from 'react-i18next';
// ===============================|| COLOR BOX ||=============================== //

function RoleList() {
  const [t] = useTranslation();
  return (
    <>
      <Grid container justifyContent="center" direction="row" alignItems="flex-start">
        <Grid container spacing={3} item xs={12} sm={12} md={10} lg={10} xl={7} direction="column">
          <Grid item>
            <Typography variant="h5">{t('pages.roles')}</Typography>
          </Grid>
          <Grid item>
            <RoleDataGrid />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default RoleList;
