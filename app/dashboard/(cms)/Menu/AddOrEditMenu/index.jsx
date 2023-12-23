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
import MenuService from 'modules/cms/services/MenuService';
import setServerErrors from 'utils/setServerErrors';
import ImageUpload from 'components/FileUpload/ImageUpload';

const AddOrEditMenu = ({ row, isNew, open, setOpen, refetch }) => {
  const [t] = useTranslation();
  let menuService = new MenuService();
  const [fieldsName, validation, buttonName] = ['fields.menu.', 'validation.menu.', 'buttons.menu.'];
  const [menu, setMenu] = useState();
  const [notify, setNotify] = useState({ open: false });

  const loadMenu = () => {
    menuService.getMenuById(row?.original?.id).then((result) => {
      setMenu(result);
    });
  };
  const onClose = () => {
    setOpen(false);
    setMenu({});
  };
  useEffect(() => {
    if (isNew == false && row?.original?.id > 0) {
      loadMenu();
    } else {
      setMenu({});
    }
  }, [row, isNew, open]);

  const handleSubmit = (menu, setErrors) => {
    if (isNew == true) {
      menuService
        .addMenu(menu)
        .then(() => {
          setMenu({});
          onClose();
          setNotify({ open: true });
          refetch();
        })
        .catch((error) => {
          setNotify({ open: true, type: 'error', description: error });
          setServerErrors(error, setErrors);
        });
    } else {
      menuService
        .updateMenu(menu)
        .then(() => {
          setMenu({});
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
            id: menu?.id,
            title: menu?.title,
            url: menu?.url,
            previewImageId: menu?.previewImageId,
            parentId: row?.original?.id > 0 && isNew == true ? row?.original?.id : menu?.parentId
          }}
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            title: Yup.string()
              .max(255)
              .required(t(validation + 'requiredMenuTitle')),
            url: Yup.string()
              .max(255)
              .required(t(validation + 'requiredMenuUrl'))
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
                {isNew == true
                  ? row
                    ? t('dialog.menu.addSub', { parentTitle: '"' + row?.original?.title + '"' })
                    : t('dialog.menu.addMain')
                  : t('dialog.edit.title', { item: values.title })}
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
                      <InputLabel htmlFor="previewImageId">{t(fieldsName + 'previewImageId')}</InputLabel>
                      <ImageUpload
                        id="previewImageId"
                        setFieldValue={setFieldValue}
                        value={values?.previewImageId || ''}
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

export default AddOrEditMenu;
