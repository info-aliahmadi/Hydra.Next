'use client';
import React, { useEffect, useState } from 'react';

// material-ui
import {
  Box,
  Avatar,
  FormControl,
  Button,
  ButtonBase,
  Checkbox,
  FormControlLabel,
  Divider,
  FormHelperText,
  InputAdornment,
  Grid2,
  InputLabel,
  OutlinedInput,
  Stack,
  Tooltip,
  Typography,
  Select,
  MenuItem,
  ButtonGroup
} from '@mui/material';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Save from '@mui/icons-material/Save';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { strengthColor, strengthIndicator } from '@root/utils/password-strength';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

import AnimateButton from '@dashboard/_components/@extended/AnimateButton';

// assets
import { useTranslation } from 'react-i18next';
import CONFIG from '@root/config';
import MainCard from '@dashboard/_components/MainCard';
import languageList from '@root/Localization/languageList';
import DeleteUser from '../../../_components/User/DeleteUser';
import setServerErrors from '@root/utils/setServerErrors';
import Notify from '@dashboard/_components/@extended/Notify';
import UsersService from '@dashboard/(auth)/_service/UsersService';
import SelectRole from '@dashboard/(auth)/_components/Role/SelectRole';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { UserModel } from '../../../_types/User/UserModel';

export default function AddOrEditUser({ params }: { readonly params: Promise<{ id: number, operation: 'edit' | 'add' }> }) {
  const [t] = useTranslation();
  const { id, operation } = React.use(params);

  const { data: session } = useSession();
  const jwt = session?.accessToken;
  let userService = new UsersService(jwt ?? '');
  const [fieldsName, validation, buttonName] = ['fields.user.', 'validation.user.', 'buttons.user.'];

  const [user, setUser] = useState<UserModel>();
  const [notify, setNotify] = useState<NotifyProps>({ open: false });
  const [avatarPreview, setAvatarPreview] = useState<string | ArrayBuffer | null>('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordLevel, setPasswordLevel] = useState<{ label: string, color: string }>();
  const [openDelete, setOpenDelete] = useState(false);
  const router = useRouter();

  const loadUser = () => {
    userService.getUserById(id).then((result) => {
      setUser(result);
    });
  };
  useEffect(() => {
    if (operation == 'edit' && id > 0) loadUser();
  }, [id, operation]);

  const handleSubmit = (user: UserModel, resetForm: any, setErrors: any, setSubmitting: any) => {
    if (operation == 'add') {
      userService
        .addUser(user)
        .then(() => {
          resetForm();
          setAvatarPreview('');
          setNotify({ open: true });
        })
        .catch((error) => {
          setErrors(setServerErrors(error));
          setNotify({ open: true, type: 'error', description: error });
        })
        .finally(() => {
          setSubmitting(false);
        });
    } else {
      userService
        .updateUser(user)
        .then((result) => {
          setUser(result);
          setNotify({ open: true });
        })
        .catch((error) => {
          setErrors(setServerErrors(error));
          setNotify({ open: true, type: 'error', description: error });
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const changePassword = (value: number) => {
    const temp = strengthIndicator(value);
    setPasswordLevel(strengthColor(temp));
  };
  const changeAvatar = (e: any, setFieldValue: any) => {
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
  const deleteAvatar = (setFieldValue: any) => {
    setFieldValue('avatarFile', '');
    setFieldValue('avatar', '');
    setAvatarPreview('');
  };

  const initialValues: UserModel = {
    id: user?.id ?? 0,
    name: user?.name,
    userName: user?.userName ?? '',
    phoneNumber: user?.phoneNumber ?? '',
    email: user?.email ?? '',
    avatar: user?.avatar,
    avatarFile: user?.avatarFile,
    emailConfirmed: user?.emailConfirmed ?? false,
    phoneNumberConfirmed: user?.phoneNumberConfirmed ?? false,
    lockoutEnabled: user?.lockoutEnabled ?? false,
    lockoutEnd: user?.lockoutEnd,
    accessFailedCount: user?.accessFailedCount ?? 0,
    defaultLanguage: user?.defaultLanguage,
    password: user?.password,
    roleIds: user?.roleIds ?? [],
    roles: user?.roles ?? [],
  }
  return (
    <>
      <Notify notify={notify} setNotify={setNotify}></Notify>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          userName: Yup.string().max(255).required(t('validation.required-userName')),
          email: Yup.string().email(t('validation.valid-email')).max(255).required(t('validation.required-email')),
          roleIds: Yup.array().min(1, t('validation.role.required-role-name')).required(t('validation.role.required-role-name')),
          password:
            operation == 'add' ? Yup.string().max(255).required(t('validation.required-password')) : Yup.string().nullable().optional()
        })}
        onSubmit={(values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            setSubmitting(true);
            handleSubmit(values, resetForm, setErrors, setSubmitting);
          } catch (err: any) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
          }
        }}
      >
        {({ errors, handleBlur, handleChange, setFieldValue, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid2 container justifyContent="center" direction="row" alignItems="flex-start">
              <Grid2 container spacing={3} size={{ xs: 12, sm: 12, md: 10, lg: 10, xl: 7 }} direction="column">
                <Grid2>
                  <Typography variant="h5">{t('pages.cards.user-' + operation)}</Typography>
                </Grid2>
                <Grid2>
                  <MainCard>
                    <Grid2 container spacing={3} direction="column">
                      <Grid2 container spacing={0} direction="row" sx={{ justifyContent: "flex-end", alignItems: "flex-start" }} >
                        <Grid2 size={{ xs: 12, sm: 12, md: 2, lg: 2, xl: 2 }}>
                          <Stack justifyContent="center" alignItems="center">
                            <Tooltip title={t('tooltips.edit-avatar')} placement="top">
                              <ButtonBase component="label">
                                <input
                                  type="file"
                                  hidden
                                  accept="image/*"
                                  name="avatarFile"
                                  onChange={(e) => changeAvatar(e, setFieldValue)}
                                />
                                <Avatar
                                  alt=""
                                  src={avatarPreview ? avatarPreview.toString() : values.avatar ? CONFIG.AVATAR_BASEPATH + values.avatar : '/images/users/anonymous.png'}
                                  sx={{ width: 85, height: 85 }}
                                ></Avatar>
                              </ButtonBase>
                            </Tooltip>
                            <ButtonGroup variant="outlined" color="secondary" size="small" aria-label="outlined button group">
                              {(avatarPreview || values.avatar) && (
                                <Tooltip title={t('tooltips.delete-avatar')}>
                                  <Button onClick={() => deleteAvatar(setFieldValue)}>
                                    <DeleteIcon />
                                  </Button>
                                </Tooltip>
                              )}
                              <Tooltip title={t('tooltips.edit-avatar')}>
                                <Button>
                                  <ButtonBase component="label">
                                    <input
                                      type="file"
                                      hidden
                                      accept="image/*"
                                      name="avatarFile"
                                      onChange={(e) => changeAvatar(e, setFieldValue)}
                                    />
                                    <Edit />
                                  </ButtonBase>
                                </Button>
                              </Tooltip>
                            </ButtonGroup>
                          </Stack>
                        </Grid2>
                      </Grid2>
                      <Grid2 container spacing={3}>
                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}>
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
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="userName">{t(fieldsName + 'userName')}</InputLabel>
                            <OutlinedInput
                              fullWidth
                              error={Boolean(touched.userName && errors.userName)}
                              id="userName"
                              type="lastname"
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
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}>
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
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="phoneNumber">{t(fieldsName + 'phoneNumber')}</InputLabel>
                            <OutlinedInput
                              fullWidth
                              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                              id="phoneNumber"
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
                        </Grid2>
                        {operation == 'edit' && (
                          <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}>
                            <Stack spacing={1}>
                              <InputLabel htmlFor="emailConfirmed">{t(fieldsName + 'emailConfirmed')}</InputLabel>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="emailConfirmed"
                                    checked={values?.emailConfirmed}
                                    title={values?.emailConfirmed ? 'Yes' : 'No'}
                                    color="default"
                                  />
                                }
                                label={t(fieldsName + 'emailConfirmed')}
                              />
                            </Stack>
                          </Grid2>
                        )}
                        {operation == 'edit' && (
                          <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}>
                            <Stack spacing={1}>
                              <InputLabel htmlFor="phoneNumberConfirmed">{t(fieldsName + 'phoneNumberConfirmed')}</InputLabel>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="phoneNumberConfirmed"
                                    checked={values?.phoneNumberConfirmed ? true : false}
                                    title={values?.phoneNumberConfirmed ? 'Yes' : 'No'}
                                    color="default"
                                  />
                                }
                                label={t(fieldsName + 'phoneNumberConfirmed')}
                              />
                            </Stack>
                          </Grid2>
                        )}
                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}>
                          <Stack spacing={1}>
                            <InputLabel id="defaultLanguage">{t(fieldsName + 'defaultLanguage')}</InputLabel>
                            <Select
                              key={values.defaultLanguage}
                              labelId="defaultLanguage"
                              id="defaultLanguage"
                              value={values?.defaultLanguage || ''}
                              onBlur={handleBlur}
                              // onChange={handleChange}
                              error={Boolean(touched.defaultLanguage && errors.defaultLanguage)}
                              label="Default Language"
                              onChange={(e) => setFieldValue('defaultLanguage', e.target.value)}
                            >
                              {languageList.map((language) => (
                                <MenuItem key={'page' + language.key} value={language.key}>
                                  <img src={language.icon} alt={language.name} style={{ width: '20px', margin: '0px 5px' }} />{' '}
                                  {language.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </Stack>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                          <Divider textAlign="left">
                            {t('pages.cards.user-security')}
                            {/* <Chip label={t('pages.cards.user-security')} /> */}
                          </Divider>
                        </Grid2>
                        <Grid2 container size={{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6 }} spacing={1}>
                          <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6 }}>
                            <Stack spacing={1}>
                              <InputLabel htmlFor="newPassword">{t(fieldsName + 'password')}</InputLabel>
                              <OutlinedInput
                                autoComplete="off"
                                fullWidth
                                error={Boolean(touched.password && errors.password)}
                                id="newPassword"
                                type={showPassword ? 'text' : 'password'}
                                value={values?.password || ''}
                                name="password"
                                onBlur={handleBlur}
                                onChange={(e: any) => {
                                  handleChange(e);
                                  changePassword(e.target.value);
                                }}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                      size="large"
                                    >
                                      {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                    </IconButton>
                                  </InputAdornment>
                                }
                                placeholder="******"
                                inputProps={{}}
                              />
                              {touched.password && errors.password && (
                                <FormHelperText error id="helper-text-password">
                                  {errors.password}
                                </FormHelperText>
                              )}
                            </Stack>
                            <FormControl sx={{ mt: 2 }}>
                              <Grid2 container spacing={0} alignItems="center">
                                <Grid2>
                                  <Box sx={{ bgcolor: passwordLevel?.color, width: 85, height: 8, borderRadius: '7px' }} />
                                </Grid2>
                                <Grid2>
                                  <Typography variant="subtitle1" fontSize="0.75rem">
                                    {passwordLevel?.label}
                                  </Typography>
                                </Grid2>
                              </Grid2>
                            </FormControl>
                          </Grid2>
                          <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 12, xl: 12 }}>
                            <Stack spacing={1}>
                              <InputLabel htmlFor="roleIds">{t('pages.roles')}</InputLabel>
                              <SelectRole
                                disabled={false}
                                defaultValues={values?.roleIds || []}
                                id={'roleIds'}
                                setFieldValue={setFieldValue}
                                error={Boolean(touched.roleIds && errors.roleIds)}
                              />
                              {touched.roleIds && errors.roleIds && (
                                <FormHelperText error id="helper-roleIds">
                                  {errors.roleIds}
                                </FormHelperText>
                              )}
                            </Stack>
                          </Grid2>
                        </Grid2>
                        {operation == 'edit' && (
                          <Grid2 container size={{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6 }}>
                            <MainCard title={'User Try to Login'}>
                              <Grid2 container size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} spacing={3}>
                                <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}>
                                  <Stack spacing={1}>
                                    <InputLabel htmlFor="lockoutEnabled">{t(fieldsName + 'lockoutEnabled')}</InputLabel>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          id="lockoutEnabled"
                                          checked={values.lockoutEnabled}
                                          color="default"

                                          onChange={handleChange}
                                        />
                                      }
                                      label={t(fieldsName + 'lockoutEnabled')}
                                    />
                                  </Stack>
                                </Grid2>
                                <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}>
                                  <Stack spacing={1}>
                                    <InputLabel htmlFor="lockoutEnd">{t(fieldsName + 'lockoutEnd')}</InputLabel>
                                    <OutlinedInput id="lockoutEnd" type="text" value={values?.lockoutEnd || ''} fullWidth disabled />
                                  </Stack>
                                </Grid2>
                                <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}>
                                  <Stack spacing={1}>
                                    <InputLabel htmlFor="accessFailedCount">{t(fieldsName + 'accessFailedCount')}</InputLabel>
                                    <OutlinedInput
                                      id="accessFailedCount"
                                      type="text"
                                      value={values?.accessFailedCount || ''}
                                      fullWidth
                                      disabled
                                    />
                                  </Stack>
                                </Grid2>
                              </Grid2>
                            </MainCard>
                          </Grid2>
                        )}

                      </Grid2>
                      <Grid2 container spacing={3} direction="row" justifyContent="space-between" alignItems="center">
                        <Grid2 >
                          <Stack direction="row" spacing={2}>
                            <AnimateButton>
                              <Button
                                size="large"
                                onClick={() => {
                                  router.back();
                                }}
                                variant="outlined"
                                color="secondary"
                                startIcon={<ArrowBack />}
                              >
                                {t('buttons.back')}
                              </Button>
                            </AnimateButton>
                            <AnimateButton>
                              <Button
                                disabled={isSubmitting}
                                size="large"
                                type="submit"
                                variant="contained"
                                color="primary"
                                startIcon={<Save />}
                              >
                                {operation == 'edit' ? t(buttonName + 'save') : t(buttonName + 'add')}
                              </Button>
                            </AnimateButton>

                          </Stack>
                        </Grid2>
                        <Grid2 >
                          {operation == 'edit' && (
                            <AnimateButton>
                              <Button
                                size="large"
                                variant="contained"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={() => setOpenDelete(true)}
                              >
                                {t(buttonName + 'delete')}
                              </Button>
                            </AnimateButton>
                          )}
                        </Grid2>
                      </Grid2>
                    </Grid2>
                  </MainCard>
                </Grid2>
              </Grid2>
            </Grid2>
          </form>
        )}
      </Formik>
      {operation == 'edit' && <DeleteUser open={openDelete} setOpen={setOpenDelete} userId={id} />}
    </>
  );
}
