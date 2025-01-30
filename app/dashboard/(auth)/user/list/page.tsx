'use client';
import { Grid2, Typography } from '@mui/material';

// project import
import UserDataGrid from '../../_components/User/UsersDataGrid';
import { useTranslation } from 'react-i18next';
// ===============================|| COLOR BOX ||=============================== //

function UsersList() {
  const [t] = useTranslation();
  return (
    <Grid2 direction="row" sx={{ justifyContent: 'center', alignItems: "flex-start" }}>
      <Grid2 container spacing={3} direction="column" columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
        <Grid2>
          <Typography variant="h5">{t('pages.users')}</Typography>
        </Grid2>
        <Grid2>
          <UserDataGrid />
        </Grid2>
      </Grid2>
    </Grid2>
  );
}

export default UsersList;
