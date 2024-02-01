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
import LinkService from '@dashboard/(cms)/_service/LinkService';
import ImageUpload from '@dashboard/_components/FileUpload/ImageUpload';
import { useSession } from 'next-auth/react';

const AddOrEditLink = ({ row, linkSection, data, setData, isNew, open, setOpen, refetch }) => {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  let linkService = new LinkService(jwt);
  const [fieldsName, validation, buttonName] = ['fields.link.', 'validation.link.', 'buttons.link.'];
  const [link, setLink] = useState();
  const [notify, setNotify] = useState({ open: false });

  const loadLink = () => {
    linkService.getLinkById(row?.original?.id).then((result) => {
      setLink(result);
    });
  };
  const onClose = () => {
    setOpen(false);
    setLink(undefined);
  };
  useEffect(() => {
    if (isNew == false && row?.original?.id > 0) {
      loadLink();
    } else {
      setLink({});
    }
  }, [row, isNew, open]);

  const handleSubmit = (link, setErrors, setSubmitting) => {
    setSubmitting(true);
    if (isNew == true) {
      linkService
        .addLink(link)
        .then((result) => {
          setLink({});
          data.push(result.data);
          setData([...data]);
          linkSection.original.links = [...data];
          onClose();
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
      linkService
        .updateLink(link)
        .then((result) => {
          setLink({});
          let index = data.findIndex((x) => x.id == link.id);
          data[index].title = link.title;
          data[index].url = link.url;
          data[index].description = link.description;
          data[index].imagePreviewId = link.imagePreviewId;
          data[index].imagePreview = result.imagePreview;
          setData([...data]);
          linkSection.original.links = [...data];
          onClose();
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
            id: link?.id,
            title: link?.title,
            url: link?.url,
            description: link?.description,
            imagePreviewId: link?.imagePreviewId,
            linkSectionId: linkSection.original.id
          }}
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            title: Yup.string()
              .max(255)
              .required(t(validation + 'requiredTitle')),
            url: Yup.string()
              .max(255)
              .required(t(validation + 'requiredUrl'))
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
          {({ errors, handleBlur, handleChange, setFieldValue, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <DialogTitle>
                {isNew == true ? t('dialog.link.add') : t('dialog.edit.title', { item: values.title })}
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
                  <Grid item>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="url">{t(fieldsName + 'url')}</InputLabel>
                      <OutlinedInput
                        id="url"
                        type="text"
                        value={values?.url || ''}
                        name="url"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={t(fieldsName + 'url')}
                        fullWidth
                        error={Boolean(touched.url && errors.url)}
                      />
                      {touched.url && errors.url && (
                        <FormHelperText error id="helper-text-url">
                          {errors.url}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="description">{t(fieldsName + 'description')}</InputLabel>
                      <OutlinedInput
                        id="description"
                        type="text"
                        value={values?.description || ''}
                        name="description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={t(fieldsName + 'description')}
                        fullWidth
                        multiline={true}
                        error={Boolean(touched.description && errors.description)}
                      />
                      {touched.description && errors.description && (
                        <FormHelperText error id="helper-text-title">
                          {errors.description}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="imagePreviewId">{t(fieldsName + 'imagePreviewId')}</InputLabel>
                      <ImageUpload
                        id="imagePreviewId"
                        setFieldValue={setFieldValue}
                        value={values?.imagePreviewId || ''}
                        filePosterMaxHeight={400}
                      />
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

export default AddOrEditLink;
