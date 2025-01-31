'use client'
// project import
import MainCard from '@dashboard/_components/MainCard';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ChangePasswordForm from '../../_components/ChangePasswordForm';

// ===============================|| COLOR BOX ||=============================== //

function ChangePassword() {
  const [t] = useTranslation();
  return (
    <Grid container justifyContent="center" direction="row" alignItems="flex-start">
      <Grid container spacing={3} size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} direction="column">
        <Grid>
          <Typography variant="h5">{t('pages.change-password')}</Typography>
        </Grid>
        <Grid>
          <MainCard>
            <ChangePasswordForm />
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ChangePassword;
