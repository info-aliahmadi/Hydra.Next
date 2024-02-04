
import { useEffect, useState } from 'react';

// material-ui
import { Button, Grid, InputLabel, Stack } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from '@dashboard/_components/@extended/AnimateButton';
import Save from '@mui/icons-material/Save';

// assets
import { useTranslation } from 'react-i18next';
import Notify from '@dashboard/_components/@extended/Notify';
import SelectUser from '@dashboard/(auth)/_components/User/SelectUser';
import MessageService from '../_service/MessageService';
import { useSession } from 'next-auth/react';
// ============================|| FIREBASE - REGISTER ||============================ //

const MessageSetting = () => {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;
  let settingsService = new MessageService(jwt);
  const [fieldsName, validation, buttonName] = ['fields.message.messageSettings.', 'validation.message.messageSettings', 'buttons.'];
  const [settings, setSettings] = useState();
  const [notify, setNotify] = useState({ open: false });

  const loadSettings = () => {
    settingsService.getSettings().then((result) => {
      setSettings(result);
    });
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleAddOrUpdateSettings = (setting, setSubmitting) => {
    settingsService
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
          recipientIdsForContactMessage: settings?.recipientIdsForContactMessage,
          recipientIdsForRequestMessage: settings?.recipientIdsForRequestMessage
        }}
        enableReinitialize={true}
        // validationSchema={Yup.object().shape({
        //   siteTitle: Yup.string()
        //     .max(255)
        //     .required(t(validation + 'requiredSiteTitle'))
        // })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setSubmitting(true);
            handleAddOrUpdateSettings(values, setSubmitting);
            setStatus({ success: true });
          } catch (err) {
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
                  <InputLabel htmlFor="recipientIdsForContactMessage">{t(fieldsName + 'recipientIdsForContactMessage')}</InputLabel>
                  <SelectUser
                    id="recipientIdsForContactMessage"
                    name="recipientIdsForContactMessage"
                    multiple={true}
                    setFieldValue={setFieldValue}
                    defaultValues={values?.recipientIdsForContactMessage || []}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="recipientIdsForRequestMessage">{t(fieldsName + 'recipientIdsForRequestMessage')}</InputLabel>
                  <SelectUser
                    id="recipientIdsForRequestMessage"
                    name="recipientIdsForRequestMessage"
                    multiple={true}
                    setFieldValue={setFieldValue}
                    defaultValues={values?.recipientIdsForRequestMessage || []}
                  />
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

export default MessageSetting;
