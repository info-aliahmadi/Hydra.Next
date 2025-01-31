'use client';
// material-ui
import RoleDataGrid from '@dashboard/(auth)/_components/Role/RoleDataGrid';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

// project import
import { useTranslation } from 'react-i18next';
// ===============================|| COLOR BOX ||=============================== //

function RoleList() {
  const [t] = useTranslation();
  return (
    <Grid container justifyContent="center" direction="row" alignItems="flex-start">
      <Grid container spacing={3} size={{ xs: 12, sm: 12, md: 10, lg: 10, xl: 7 }} direction="column">
        <Grid >
          <Typography variant="h5">{t('pages.roles')}</Typography>
        </Grid>
        <Grid>
          <RoleDataGrid />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RoleList;
