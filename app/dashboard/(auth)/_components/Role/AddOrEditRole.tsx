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
Stack
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

import AnimateButton from '@dashboard/_components/@extended/AnimateButton';

// assets
import { useTranslation } from 'react-i18next';
import Notify from '@dashboard/_components/@extended/Notify';
import setServerErrors from '@root/utils/setServerErrors';
import AddIcon from '@mui/icons-material/Add';
import RoleService from '@dashboard/(auth)/_service/RoleService';
import { useSession } from 'next-auth/react';

const AddOrEditRole = ({ roleId, isNew, open, setOpen, refetch }: { roleId: number, isNew: boolean, open: boolean, setOpen: (open: boolean) => void, refetch: () => void }) => {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.accessToken;

  let roleService = new RoleService(jwt ?? '');
  const [fieldsName, validation, buttonName] = ['fields.role.', 'validation.role.', 'buttons.role.'];
  const [role, setRole] = useState<RoleModel>();
  const [notify, setNotify] = useState<NotifyProps>({ open: false });

  const loadRole = () => {
    roleService.getRoleById(roleId).then((result) => {
      setRole(result.data);
    });
  };
  useEffect(() => {
    if (!isNew && roleId > 0) {
      loadRole();
    } else {
      setRole(undefined);
    }
  }, [roleId, isNew, open]);

  const onClose = () => {
    setOpen(false);
    setRole(undefined);
  };

  const addRole = (role: RoleModel, setErrors: any) => {
    roleService
      .addRole(role)
      .then(() => {
        onClose();
        setRole(undefined);
        setNotify({ open: true });
        refetch();
      })
      .catch((error) => {
        setNotify({ open: true, type: 'error', description: error });
        setErrors(setServerErrors(error));
      });
  };

  const updateRole = (role: RoleModel, setErrors: any) => {
    debugger
    roleService
      .updateRole(role)
      .then(() => {
        onClose();
        setRole(undefined);
        setNotify({ open: true });
        refetch();
      })
      .catch((error) => {
        setErrors(setServerErrors(error));
        setNotify({ open: true, type: 'error', description: error });
      });
  };

  const handleSubmit = (role: RoleModel, setErrors: any) => {
    if (isNew) {
      addRole(role, setErrors);
    } else {
      updateRole(role, setErrors);
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

  const initialValues: RoleModel = {
    id: role?.id ?? 0,
    name: role?.name ?? '',
    normalizedName: role?.normalizedName ?? '',
    concurrencyStamp: role?.concurrencyStamp ?? '',
    permissions: role?.permissions ?? []
  }
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
              .required(t(validation + 'required-role-name')),
            normalizedName: Yup.string().max(255, t(validation + 'maxlength-role-normalizedname'))
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              setSubmitting(true);
              handleSubmit(values, setErrors);
            } catch (err) {
              console.error(err);
              setStatus({ success: false });
            }
            finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <DialogTitle>
                {t('dialog.' + (isNew ? 'add' : 'edit') + '.title', { item: 'Role' })}
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

export default AddOrEditRole;
