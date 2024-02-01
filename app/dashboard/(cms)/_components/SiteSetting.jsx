'use client';
import { useEffect, useState } from 'react';

// material-ui
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, TextareaAutosize } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from '@dashboard/_components/@extended/AnimateButton';
import Save from '@mui/icons-material/Save';

// assets
import { useTranslation } from 'react-i18next';
import Notify from '@dashboard/_components/@extended/Notify';
import SiteSettingsService from '../_service/SiteSettingsService';
import { useSession } from 'next-auth/react';
// ============================|| FIREBASE - REGISTER ||============================ //

const SiteSetting = () => {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;
  let siteSettingsService = new SiteSettingsService(jwt);

  const [fieldsName, validation, buttonName] = ['fields.siteSetting.', 'validation.siteSetting', 'buttons.'];
  const [settings, setSettings] = useState();
  const [notify, setNotify] = useState({ open: false });

  const loadSettings = () => {
    siteSettingsService.getSettings().then((result) => {
      setSettings(result);
    });
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleAddOrUpdateSettings = (setting, setSubmitting) => {
    siteSettingsService
      .addOrUpdateSettings(setting)
      .then(() => {
        setNotify({ open: true });
      })
      .catch((error) => {
        setNotify({ open: true, type: 'error', description: error.message });
      })
      .finally((x) => {
        setSubmitting(false);
      });
  };

  return (
    <>
      <Notify notify={notify} setNotify={setNotify}></Notify>
      <Formik
        initialValues={{
          siteTitle: settings?.siteTitle,
          siteDescription: settings?.siteDescription,
          siteKeywords: settings?.siteKeywords,
          headerHtml: settings?.headerHtml,
          footerHtml: settings?.footerHtml,
          numberOfPostsPerList: settings?.numberOfPostsPerList
        }}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          siteTitle: Yup.string()
            .max(255)
            .required(t(validation + 'requiredSiteTitle'))
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            handleAddOrUpdateSettings(values, setSubmitting);
            setStatus({ success: true });
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
          }
        }}
      >
        {({ errors, handleBlur, handleChange, setFieldValue, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container item spacing={3} justifyContent="flex-start">
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="siteTitle">{t(fieldsName + 'siteTitle')}</InputLabel>
                  <OutlinedInput
                    id="siteTitle"
                    type="name"
                    value={values?.siteTitle || ''}
                    name="siteTitle"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={t(fieldsName + 'siteTitle')}
                    fullWidth
                    error={Boolean(touched.siteTitle && errors.siteTitle)}
                  />
                  {touched.siteTitle && errors.siteTitle && (
                    <FormHelperText error id="helper-text-siteTitle">
                      {errors.siteTitle}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="siteDescription">{t(fieldsName + 'siteDescription')}</InputLabel>
                  <TextareaAutosize
                    style={{
                      backgroundColor: 'inherit',
                      color: 'inherit',
                      fontFamily: 'inherit',
                      fontSize: 'inherit',
                      borderRadius: '3px'
                    }}
                    fullWidth
                    error={Boolean(touched.siteDescription && errors.siteDescription)}
                    id="siteDescription"
                    type="text"
                    value={values?.siteDescription || ''}
                    name="siteDescription"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={t(fieldsName + 'siteDescription')}
                    multiline={true}
                    minRows={3}
                    inputProps={{}}
                  />
                  {touched.siteDescription && errors.siteDescription && (
                    <FormHelperText error id="helper-text-siteDescription">
                      {errors.siteDescription}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="siteKeywords">{t(fieldsName + 'siteKeywords')}</InputLabel>
                  <TextareaAutosize
                    style={{
                      backgroundColor: 'inherit',
                      color: 'inherit',
                      fontFamily: 'inherit',
                      fontSize: 'inherit',
                      borderRadius: '3px'
                    }}
                    fullWidth
                    error={Boolean(touched.siteKeywords && errors.siteKeywords)}
                    id="siteKeywords"
                    type="text"
                    value={values?.siteKeywords || ''}
                    name="siteKeywords"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={t(fieldsName + 'siteKeywords')}
                    multiline={true}
                    minRows={4}
                    inputProps={{}}
                  />
                  {touched.siteKeywords && errors.siteDescription && (
                    <FormHelperText error id="helper-text-siteKeywords">
                      {errors.siteKeywords}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="headerHtml">{t(fieldsName + 'headerHtml')}</InputLabel>
                  <TextareaAutosize
                    style={{
                      backgroundColor: 'inherit',
                      color: 'inherit',
                      fontFamily: 'inherit',
                      fontSize: 'inherit',
                      borderRadius: '3px'
                    }}
                    fullWidth
                    error={Boolean(touched.headerHtml && errors.headerHtml)}
                    id="headerHtml"
                    type="text"
                    value={values?.headerHtml || ''}
                    name="headerHtml"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={t(fieldsName + 'headerHtml')}
                    multiline={true}
                    minRows={5}
                    inputProps={{}}
                  />
                  {touched.headerHtml && errors.headerHtml && (
                    <FormHelperText error id="helper-text-headerHtml">
                      {errors.headerHtml}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="footerHtml">{t(fieldsName + 'footerHtml')}</InputLabel>
                  <TextareaAutosize
                    fullWidth
                    style={{
                      backgroundColor: 'inherit',
                      color: 'inherit',
                      fontFamily: 'inherit',
                      fontSize: 'inherit',
                      borderRadius: '3px'
                    }}
                    id="footerHtml"
                    defaultValue={values?.footerHtml || ''}
                    name="footerHtml"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={t(fieldsName + 'footerHtml')}
                    multiple={true}
                    minRows={5}
                  />

                  {touched.footerHtml && errors.footerHtml && (
                    <FormHelperText error id="helper-text-footerHtml">
                      {errors.footerHtml}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="numberOfPostsPerList">{t(fieldsName + 'numberOfPostsPerList')}</InputLabel>
                  <OutlinedInput
                    id="numberOfPostsPerList"
                    type="number"
                    value={values?.numberOfPostsPerList || ''}
                    name="numberOfPostsPerList"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={t(fieldsName + 'numberOfPostsPerList')}
                    fullWidth
                    error={Boolean(touched.numberOfPostsPerList && errors.numberOfPostsPerList)}
                  />
                  {touched.numberOfPostsPerList && errors.numberOfPostsPerList && (
                    <FormHelperText error id="helper-text-siteTitle">
                      {errors.numberOfPostsPerList}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid container item spacing={3} direction="row" justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Stack direction="row" spacing={2}>
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<Save />}
                      >
                        {t(buttonName + 'save')}
                      </Button>
                    </AnimateButton>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SiteSetting;
