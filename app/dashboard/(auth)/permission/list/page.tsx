'use client'
// material-ui
import PermissionDataGrid from '@dashboard/(auth)/_components/Permission/PermissionDataGrid';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
// project import
import { useTranslation } from 'react-i18next';
// ===============================|| COLOR BOX ||=============================== //

function PermissionList() {
  const [t] = useTranslation();
  return (
      <Grid container justifyContent="center" direction="row" alignItems="flex-start">
        <Grid container spacing={3} size={{ xs: 12, sm: 12, md: 10, lg: 10, xl: 7 }} direction="column">
          <Grid>
            <Typography variant="h5">{t('pages.permissions')}</Typography>
          </Grid>
          <Grid>
            <PermissionDataGrid />
          </Grid>
        </Grid>
      </Grid>
  );
}

export default PermissionList;
