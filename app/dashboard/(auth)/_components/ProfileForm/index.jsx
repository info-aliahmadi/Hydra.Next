'use client'
import { useEffect, useState } from 'react';

// material-ui
import {
  Alert,
  Avatar,
  Button,
  ButtonBase,
  ButtonGroup,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Tooltip
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Save from '@mui/icons-material/Save';

// assets
import { useTranslation } from 'react-i18next';
import CONFIG from '/config';
import Notify from '@dashboard/_components/@extended/Notify';
import AnimateButton from '@dashboard/_components/@extended/AnimateButton';
import AccountService from '@dashboard/(auth)/_service/AccountService';
import { useSession } from 'next-auth/react';
// ============================|| FIREBASE - REGISTER ||============================ //

const ProfileForm = () => {
  const [t] = useTranslation();
  const [avatarPreview, setAvatarPreview] = useState();
  const { data: session, update } = useSession();

  const jwt = session?.user?.accessToken;

  let accountService = new AccountService(jwt);

  const [fieldsName, validation, buttonName] = ['fields.', 'validation.', 'buttons.'];
  const [user, setUser] = useState();
  const [notify, setNotify] = useState({ open: false });

  const loadUser = () => {
    accountService.getCurrentUser().then((userData) => {
      setUser(userData);
    });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleUpdate = (user,setSubmitting) => {
    accountService
      .updateCurrentUser(user)
      .then((result) => {
        update({ ...session.user, name: user.name, email: user.email, userName: user.userName, avatar: result.avatar, accessToken: result.accessToken });
        setNotify({ open: true });
      })
      .catch((error) => {
        setNotify({ open: true, type: 'error', description: error.message });
      })
      .finally((x) => {
        setSubmitting(false);
      });
  };
  const changeAvatar = (e, setFieldValue) => {
    if (e?.target?.files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setFieldValue('avatarFile', fileReader.result);
          setAvatarPreview(fileReader.result);
        }
      };
    }
  };
  const deleteAvatar = (setFieldValue) => {
    setFieldValue('avatarFile', '');
    setFieldValue('avatar', '');
    setAvatarPreview();
  };
  return (
    <>
      <Notify notify={notify} setNotify={setNotify}></Notify>
      <Formik
        initialValues={{
          name: user?.name,
          userName: user?.userName,
          phoneNumber: user?.phoneNumber,
          email: user?.email,
          avatar: user?.avatar,
          avatarFile: user?.avatarFile
        }}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          userName: Yup.string()
            .max(255)
            .required(t(validation + 'required-username')),
          email: Yup.string()
            .email(t(validation + 'valid-email'))
            .max(255)
            .required(t(validation + 'required-email'))
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: true });
            setSubmitting(true);
            handleUpdate(values,setSubmitting);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
          } 
        }}
      >
        {({ errors, handleBlur, handleChange, setFieldValue, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3} direction="column">
              <Grid container item spacing={0} direction="row" justifyContent="flex-end" alignItems="flex-start">
                <Grid item xs={12} md={2}>
                  <Stack justifyContent="center" alignItems="center">
                    <Tooltip title={t('tooltips.edit-avatar')} placement="top">
                      <ButtonBase variant="contained" component="label">
                        <input type="file" hidden accept="image/*" name="avatarFile" onChange={(e) => changeAvatar(e, setFieldValue)} />
                        <Avatar
                          alt=""
                          src={
                            avatarPreview
                              ? avatarPreview
                              : values?.avatar
                                ? CONFIG.AVATAR_BASEPATH + values?.avatar
                                : '/images/users/anonymous.png'
                          }
                          sx={{ width: 85, height: 85 }}
                        ></Avatar>
                      </ButtonBase>
                    </Tooltip>
                    <ButtonGroup variant="outlined" color="secondary" size="small" aria-label="outlined button group">
                      {(avatarPreview || values?.avatar) && (
                        <Tooltip title={t('tooltips.delete-avatar')}>
                          <Button onClick={() => deleteAvatar(setFieldValue)}>
                            <DeleteIcon />
                          </Button>
                        </Tooltip>
                      )}
                      <Tooltip title={t('tooltips.edit-avatar')}>
                        <Button>
                          <ButtonBase variant="contained" component="label">
                            <input type="file" hidden accept="image/*" name="avatarFile" onChange={(e) => changeAvatar(e, setFieldValue)} />
                            <Edit />
                          </ButtonBase>
                        </Button>
                      </Tooltip>
                    </ButtonGroup>
                  </Stack>
                </Grid>
              </Grid>
              <Grid container item spacing={3} justifyContent="center">
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="name">{t(fieldsName + 'name')}</InputLabel>
                    <OutlinedInput
                      id="name"
                      type="name"
                      value={values?.name || ''}
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder={t(fieldsName + 'name')}
                      fullWidth
                      error={Boolean(touched.name && errors.name)}
                    />
                    {touched.name && errors.name && (
                      <FormHelperText error id="helper-text-name-signup">
                        {errors.name}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="userName">{t(fieldsName + 'userName')}</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.userName && errors.userName)}
                      id="userName"
                      type="text"
                      value={values?.userName || ''}
                      name="userName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder={t(fieldsName + 'userName')}
                      inputProps={{}}
                    />
                    {touched.userName && errors.userName && (
                      <FormHelperText error id="helper-text-lastname">
                        {errors.userName}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email">{t(fieldsName + 'email')}</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                      id="email"
                      type="email"
                      value={values?.email || ''}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder={t(fieldsName + 'email')}
                      inputProps={{}}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error id="helper-text-email">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="phoneNumber">{t(fieldsName + 'phoneNumber')}</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                      id="phoneNumber-signup"
                      type="lastname"
                      value={values?.phoneNumber || ''}
                      name="phoneNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder={t(fieldsName + 'phoneNumber')}
                      inputProps={{}}
                    />
                    {touched.phoneNumber && errors.phoneNumber && (
                      <FormHelperText error id="helper-text-phoneNumber">
                        {errors.phoneNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
              </Grid>
              <Grid container item spacing={3} justifyContent="center" alignItems="center" direction="row">
                <Grid item xs={12} sm={6} md={3}>
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
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ProfileForm;
