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
import AnimateButton from '@dashboard/_components/@extended/AnimateButton';

// assets
import { useTranslation } from 'react-i18next';
import Notify from '@dashboard/_components/@extended/Notify';
import setServerErrors from '/utils/setServerErrors';
import TagsService from '@dashboard/(cms)/_service/TagsService';
import { useSession } from 'next-auth/react';


const AddOrEditTag = ({ row, isNew, open, setOpen, refetch }) => {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  let tagService = new TagsService(jwt);
  const [fieldsName, validation, buttonName] = ['fields.tag.', 'validation.tag.', 'buttons.tag.'];
  const [tag, setTag] = useState();
  const [notify, setNotify] = useState({ open: false });

  const loadTag = () => {
    tagService.getTagById(row?.original?.id).then((result) => {
      setTag(result);
    });
  };
  const onClose = () => {
    setOpen(false);
    setTag({});
  };
  useEffect(() => {
    if (isNew == false && row?.original?.id > 0) {
      loadTag();
    } else {
      setTag({});
    }
  }, [row, isNew, open]);

  const handleSubmit = (tag, setErrors, setSubmitting) => {
    if (isNew == true) {
      tagService
        .addTag(tag)
        .then(() => {
          setTag({});
          onClose();
          setNotify({ open: true });
          refetch();
        })
        .catch((error) => {
          setNotify({ open: true, type: 'error', description: error });
          setServerErrors(error, setErrors);
        }).finally(() => {
          setSubmitting(false);
        });
    } else {
      tagService
        .updateTag(tag)
        .then(() => {
          setTag({});
          onClose();
          setNotify({ open: true });
          refetch();
        })
        .catch((error) => {
          setNotify({ open: true, type: 'error', description: error });
          setServerErrors(error, setErrors);
        }).finally(() => {
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
            id: tag?.id,
            title: tag?.title
          }}
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            title: Yup.string()
              .max(255)
              .required(t(validation + 'requiredTagTitle'))
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              setSubmitting(true);
              handleSubmit(values, setErrors, setSubmitting);
            } catch (err) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <DialogTitle>
                {isNew == true ? t('dialog.tag.add') : t('dialog.edit.title', { item: values.title })}
                <CloseDialog />
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3} direction="column">
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

export default AddOrEditTag;
