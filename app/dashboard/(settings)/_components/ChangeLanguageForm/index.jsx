'use client'
import { useState } from 'react';

// material-ui
import { Grid, InputLabel, MenuItem, Select, Stack, useTheme } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// assets
import { useTranslation } from 'react-i18next';
import languageList from '/Localization/languageList';
import LocalizationService from '/Localization/LocalizationService';
import Notify from '@dashboard/_components/@extended/Notify';
import { useSession } from 'next-auth/react';

// ============================|| FIREBASE - REGISTER ||============================ //

const ChangeLanguageForm = () => {
  const theme = useTheme();
  const [t, i18n] = useTranslation();
  const { data: session, update } = useSession();

  const accessToken = session?.user?.accessToken;

  let currentLanguage = languageList.find((l) => l.key === i18n.language);

  const [notify, setNotify] = useState({ open: false });

  const changeLanguage = (lng) => {
    let locService = new LocalizationService(accessToken);
    locService.setCurrentLanguage(i18n, theme, lng);
    update({ ...session.user, defaultLanguage: lng.key });
  };

  return (
    <>
      <Notify notify={notify} setNotify={setNotify}></Notify>
      <Formik
        enableReinitialize={true}
        initialValues={{}}
        validationSchema={Yup.object().shape({})}
        onSubmit={async (values, { errors, setErrors, setStatus, setSubmitting }) => {
          try {
            setSubmitting(true);
            setStatus({ success: true });
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container direction="row" justifyContent="center">
              <Grid item xs={12} sm={8} md={8} lg={6}>
                <Grid container spacing={2} direction="column" justifyContent="center">
                  <Grid item xs={12}>
                    <Stack>
                      <InputLabel id="language-select-label">Default Language</InputLabel>
                      <Select
                        labelId="language-select-label"
                        id="demo-simple-select"
                        value={currentLanguage.key}
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
