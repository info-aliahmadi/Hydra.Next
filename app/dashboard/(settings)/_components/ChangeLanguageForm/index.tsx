'use client'
import { useState } from 'react';

// material-ui
import { InputLabel, MenuItem, Select, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// assets
import { useTranslation } from 'react-i18next';
import languageList from '@root/Localization/languageList';
import LocalizationService from '@root/Localization/LocalizationService';
import Notify from '@dashboard/_components/@extended/Notify';
import { useSession } from 'next-auth/react';

// ============================|| FIREBASE - REGISTER ||============================ //

const ChangeLanguageForm = () => {
  const [t, i18n] = useTranslation();
  const { data: session, update } = useSession();

  const accessToken = session?.accessToken;

  let currentLanguage = languageList.find((l) => l.key === i18n.language);

  const [notify, setNotify] = useState({ open: false });

  const changeLanguage = (lng: Language) => {
    let locService = new LocalizationService(accessToken);
    locService.setCurrentLanguage(i18n, lng);
    if (session) {
      session.user.defaultLanguage = lng.key;
      update({ ...session, user: session.user });
    }
  };

  return (
    <>
      <Notify notify={notify} setNotify={setNotify}></Notify>
      <Formik
        enableReinitialize={true}
        initialValues={{}}
        validationSchema={Yup.object().shape({})}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setSubmitting(true);
            setStatus({ success: true });
          } catch (err: any) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container direction="row" justifyContent="center">
              <Grid size={{ xs: 12, sm: 12, md: 8, lg: 6, xl: 6 }}>
                <Grid container spacing={2} direction="column" justifyContent="center">
                  <Grid size={{ xs: 12 }}>
                    <Stack>
                      <InputLabel id="language-select-label">Default Language</InputLabel>
                      <Select
                        labelId="language-select-label"
                        id="demo-simple-select"
                        value={currentLanguage?.key}
                        label="Default Language"
                        onChange={handleChange}
                      >
                        {languageList.map((language) => (
                          <MenuItem key={'page' + language.key} value={language.key} onClick={() => changeLanguage(language)}>
                            <img src={language.icon} alt={language.name} style={{ width: '20px', margin: '0px 5px' }} /> {language.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ChangeLanguageForm;
