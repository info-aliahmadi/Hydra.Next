'use client'
// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import ProfileForm from '../../_components/ProfileForm';
import { useTranslation } from 'react-i18next';
import MainCard from '@dashboard/_components/MainCard';

// ===============================|| COLOR BOX ||=============================== //

function Profile() {
  const [t] = useTranslation();
  return (
    <>
      <Grid container justifyContent="center" direction="row" alignItems="flex-start">
        <Grid container spacing={3} item xs={12} sm={12} md={10} lg={10} xl={7} direction="column">
          <Grid item>
            <Typography variant="h5">{t('pages.edit-profile')}</Typography>
          </Grid>
          <Grid item>
            <MainCard>
              <ProfileForm />
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Profile;
