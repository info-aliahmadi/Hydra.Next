import { useEffect, useState } from 'react';

// material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack
} from '@mui/material';
import Grid from '@mui/material/Grid2';
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
import setServerErrors from '@root/utils/setServerErrors';
import PermissionService from '@dashboard/(auth)/_service/PermissionService';
import { useSession } from 'next-auth/react';
import Result from '@root/app/types/Result';


const AddOrEditPermission = ({ permissionId, isNew, open, setOpen, refetch }: {
  permissionId: number,
  isNew: boolean,
  open: boolean,
  setOpen: (open: boolean) => void,
  refetch: () => void
}) => {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.accessToken;

  let permissionService = new PermissionService(jwt ?? "");
  const [fieldsName, validation, buttonName] = ['fields.permission.', 'validation.permission.', 'buttons.permission.'];
  const [permission, setPermission] = useState<Permission>();
  const [notify, setNotify] = useState<NotifyProps>({ open: false, type: 'success' });

  const loadPermission = () => {
    permissionService.getPermissionById(permissionId).then((result: Result<Permission>) => {
      setPermission(result.data);
    });
  };
  const onClose = () => {
    setOpen(false);
    setPermission({});
  };
  useEffect(() => {
    if (!isNew && permissionId > 0) {
      loadPermission();
    } else {
      setPermission({});
    }
  }, [permissionId, isNew, open]);

  interface ServerErrors {
    [key: string]: string;
  }

  const handleSubmit = (
    permission: Permission,
    setErrors: (errors: ServerErrors) => void,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    if (isNew) {
      permissionService
        .addPermission(permission)
        .then(() => {
          setPermission({});
          onClose();
          setNotify((provious) => ({ ...provious, open: true }));
          refetch();
        })
        .catch((error) => {
          setNotify({ open: true, type: 'error', description: error });
          setErrors(setServerErrors(error));
        })
        .finally(() => {
          setSubmitting(false);
        });
    } else {
      permissionService
        .updatePermission(permission)
        .then(() => {
          setPermission({});
          onClose();
          setNotify((provious) => ({ ...provious, open: true }));
          refetch();
        })
        .catch((error) => {
          setNotify({ open: true, type: 'error', description: error });
          setErrors(setServerErrors(error));
        })
        .finally(() => {
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
  const initialValues: Permission = {
    id: permission?.id,
    name: permission?.name,
    normalizedName: permission?.normalizedName

  };
  return (
    <>
      <Notify notify={notify} setNotify={setNotify}></Notify>
      <Dialog open={open} fullWidth={true}>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .max(255)
              .required(t(validation + 'required-permission-name')),
            normalizedName: Yup.string().max(255, t(validation + 'maxlength-permission-normalizedname'))
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              setSubmitting(true);
              handleSubmit(values, setErrors, setSubmitting);
            } catch (err) {
              setStatus({ success: false });
              setErrors({});
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <DialogTitle>
                {t('dialog.' + (isNew ? 'add' : 'edit') + '.title', { item: 'Permission' })}
                <CloseDialog />
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3} direction="column">
                  <Grid>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="name">{t(fieldsName + 'name')}</InputLabel>
                      <OutlinedInput
                        id="name"
                        type="text"
                        value={values?.name || ''}
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={t(fieldsName + 'name')}
                        fullWidth
                        error={Boolean(touched.name && errors.name)}
                      />
                      {touched.name && errors.name && (
                        <FormHelperText error id="helper-text-name">
                          {errors.name}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="normalizedName">{t(fieldsName + 'normalizedname')}</InputLabel>
                      <OutlinedInput
                        fullWidth
                        error={Boolean(touched.normalizedName && errors.normalizedName)}
                        id="normalizedName"
                        type="text"
                        value={values?.normalizedName || ''}
                        name="normalizedName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={t(fieldsName + 'normalizedname')}
                        inputProps={{}}
                      />
                      {touched.normalizedName && errors.normalizedName && (
                        <FormHelperText error id="helper-text-normalizedName">
                          {errors.normalizedName}
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
                    {t(buttonName + (isNew ? 'add' : 'edit'))}
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

export default AddOrEditPermission;
