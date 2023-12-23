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
import AddIcon from '@mui/icons-material/Add';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { useTranslation } from 'react-i18next';
import Notify from 'components/@extended/Notify';
import LinkSectionService from 'modules/cms/services/LinkSectionService';
import setServerErrors from 'utils/setServerErrors';

const AddOrEditLinkSection = ({ row, isNew, open, setOpen, refetch }) => {
  const [t] = useTranslation();
  let linkSectionService = new LinkSectionService();
  const [fieldsName, validation, buttonName] = ['fields.linkSection.', 'validation.linkSection.', 'buttons.linkSection.'];
  const [linkSection, setLinkSection] = useState();
  const [notify, setNotify] = useState({ open: false });

  const loadLinkSection = () => {
    linkSectionService.getLinkSectionById(row?.original?.id).then((result) => {
      setLinkSection(result);
    });
  };
  const onClose = () => {
    setOpen(false);
    setLinkSection({});
  };
  useEffect(() => {
    if (isNew == false && row?.original?.id > 0) {
      loadLinkSection();
    } else {
      setLinkSection({});
    }
  }, [row, isNew, open]);

  const handleSubmit = (linkSection, setErrors) => {
    if (isNew == true) {
      linkSectionService
        .addLinkSection(linkSection)
        .then(() => {
          setLinkSection({});
          onClose();
          setNotify({ open: true });
          refetch();
        })
        .catch((error) => {
          setNotify({ open: true, type: 'error', description: error });
          setServerErrors(error, setErrors);
        });
    } else {
      linkSectionService
        .updateLinkSection(linkSection)
        .then(() => {
          setLinkSection({});
          onClose();
          setNotify({ open: true });
          refetch();
        })
        .catch((error) => {
          setNotify({ open: true, type: 'error', description: error });
          setServerErrors(error, setErrors);
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
      <Dialog open={open} fullWidth={true}>
        <Formik
          initialValues={{
            id: linkSection?.id,
            title: linkSection?.title,
            key: linkSection?.key
          }}
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            key: Yup.string()
              .max(255)
              .required(t(validation + 'requiredKey')),
            title: Yup.string()
              .max(255)
              .required(t(validation + 'requiredTitle'))
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              handleSubmit(values, setErrors);
            } catch (err) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, setFieldValue, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <DialogTitle>
                {isNew == true ? t('dialog.linkSection.add') : t('dialog.edit.title', { item: values.key })}
                <CloseDialog />
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3} direction="column">
                  <Grid item>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="key">{t(fieldsName + 'key')}</InputLabel>
                      <OutlinedInput
                        id="key"
                        type="text"
                        value={values?.key || ''}
                        name="key"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={t(fieldsName + 'key')}
                        fullWidth
                        error={Boolean(touched.key && errors.key)}
                      />
                      {touched.key && errors.key && (
                        <FormHelperText error id="helper-text-key">
                          {errors.key}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="title">{t(fieldsName + 'title')}</InputLabel>
                      <OutlinedInput
                        id="title"
                        type="text"
                        value={values?.title || ''}
                        name="title"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={t(fieldsName + 'title')}
                        fullWidth
                        error={Boolean(touched.title && errors.title)}
                      />
                      {touched.title && errors.title && (
                        <FormHelperText error id="helper-text-title">
                          {errors.title}
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

export default AddOrEditLinkSection;
