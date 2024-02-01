import { useEffect, useState } from 'react';

// material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSession } from 'next-auth/react';

import AnimateButton from '@dashboard/_components/@extended/AnimateButton';

// assets
import { useTranslation } from 'react-i18next';
import Notify from '@dashboard/_components/@extended/Notify';
import setServerErrors from '/utils/setServerErrors';
import AddIcon from '@mui/icons-material/Add';
import SubscribeService from '@dashboard/(crm)/_service/SubscribeService';
import SelectSubscribeLabel from './SelectSubscribeLabel';

const AddOrEditSubscribe = ({ subscribeId, isNew, open, setOpen, refetch }) => {
  const [t] = useTranslation();
  const [fieldsName, validation, buttonName] = ['fields.subscribe.', 'validation.subscribe.', 'buttons.subscribe.'];
  const [subscribe, setSubscribe] = useState();
  const [notify, setNotify] = useState({ open: false });
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;
  let subscribeService = new SubscribeService(jwt);

  const loadSubscribe = () => {
    subscribeService.getSubscribeById(subscribeId).then((result) => {
      setSubscribe(result);
    });
  };

  const getSubscribeLabelForSelect = () => {
    return subscribeService.getSubscribeLabelForSelect();
  };

  useEffect(() => {
    if (isNew == false && subscribeId > 0) {
      loadSubscribe();
    } else {
      setSubscribe({});
    }
  }, [subscribeId, isNew, open]);

  const onClose = () => {
    setOpen(false);
    setSubscribe({});
  };

  const handleSubmit = (subscribe, setErrors, setSubmitting) => {
    if (isNew == true) {
      subscribeService
        .addSubscribe(subscribe)
        .then(() => {
          onClose();
          setSubscribe({});
          setNotify({ open: true });
          refetch();
        })
        .catch((error) => {
          setNotify({ open: true, type: 'error', description: error });
          setServerErrors(error, setErrors);
        })
        .finally((x) => {
          setSubmitting(false);
        });
    } else {
      subscribeService
        .updateSubscribe(subscribe)
        .then(() => {
          onClose();
          setSubscribe({});
          setNotify({ open: true });
          refetch();
        })
        .catch((error) => {
          setServerErrors(error, setErrors);
          setNotify({ open: true, type: 'error', description: error });
        })
        .finally((x) => {
          setSubmitting(false);
        });
    }
  };
  const CloseDialog = () => (
    <IconButton
      aria-label="close"
      onClick={onClose}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500]
      }}
    >
      <CloseIcon />
    </IconButton>
  );

  return (
    <>
      <Notify notify={notify} setNotify={setNotify}></Notify>
      <Dialog open={open} fullWidth={'xs'}>
        <Formik
          initialValues={{
            id: subscribe?.id,
            email: subscribe?.email,
            subscribeLabelId: subscribe?.subscribeLabelId
          }}
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            subscribeLabelId: Yup.number().required('Label is required'),
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              handleSubmit(values, setErrors, setSubmitting);
            } catch (err) {
              console.error(err);
              setStatus({ success: false });
              setErrors({ submit: err.message });
            }
          }}
        >
          {({ errors, handleBlur, handleChange, setFieldValue, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <DialogTitle>
                {t('dialog.' + (isNew == true ? 'add' : 'edit') + '.title', { item: 'Subscribe' })}
                <CloseDialog />
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3} direction="column">
                  <Grid item>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="subscribeLabelId">{t(fieldsName + 'subscribeLabelId')}</InputLabel>
                      <SelectSubscribeLabel
                        loadDataForSelect={getSubscribeLabelForSelect}
                        defaultValue={subscribe?.subscribeLabelId}
                        id="subscribeLabelId"
                        name="subscribeLabelId"
                        setFieldValue={setFieldValue}
                        error={Boolean(touched.subscribeLabelId && errors.subscribeLabelId)}
                      />
                      {touched.subscribeLabelId && errors.subscribeLabelId && (
                        <FormHelperText error id="helper-text-email">
                          {errors.subscribeLabelId}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="email">{t(fieldsName + 'email')}</InputLabel>
                      <OutlinedInput
                        id="email"
                        type="text"
                        value={values?.email || ''}
                        email="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={t(fieldsName + 'email')}
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText error id="helper-text-email">
                          {errors.email}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ p: '1.25rem' }}>
                <AnimateButton>
                  <Button onClick={onClose}>Cancel</Button>
                </AnimateButton>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                  >
                    {t(buttonName + (isNew == true ? 'add' : 'edit'))}
                  </Button>
                </AnimateButton>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default AddOrEditSubscribe;
