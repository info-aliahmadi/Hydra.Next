import { useEffect, useState } from 'react';

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import { strengthColor, strengthIndicator } from '/utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import Notify from '@dashboard/_components/@extended/Notify';
import setServerErrors from '/utils/setServerErrors';
import { Save } from '@mui/icons-material';
import AnimateButton from '@dashboard/_components/@extended/AnimateButton';
import AccountService from '@dashboard/(auth)/_service/AccountService';
import { useSession } from 'next-auth/react';

// ============================|| FIREBASE - REGISTER ||============================ //

const ChangePasswordForm = () => {
  const [t] = useTranslation();
  const [level, setLevel] = useState();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;


  const [showPassword, setShowPassword] = useState(false);
  const [notify, setNotify] = useState({ open: false });

  let accountService = new AccountService(jwt);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <>
      <Notify notify={notify} setNotify={setNotify}></Notify>
      <Formik
        enableReinitialize={true}
        initialValues={{
          oldPassword: '',
          newPassword: ''
        }}
        validationSchema={Yup.object().shape({
          oldPassword: Yup.string().max(255).required(t('validation.required-old-password')),
          newPassword: Yup.string().max(255).required(t('validation.required-new-password'))
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            accountService
              .changePassword(values)
              .then(() => {
                setNotify({ open: true });
              })
              .catch((error) => {
                setServerErrors(error, setErrors);
                setNotify({
                  open: true,
                  type: 'error',
                  description: error
                });
              })
              .finally((x) => {
                setSubmitting(false);
              });
            setStatus({ success: true });
            setSubmitting(true);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container direction="row" justifyContent="center">
              <Grid item xs={12} sm={8} md={8} lg={6}>
                <Grid container spacing={2} direction="column" justifyContent="center">
                  <Grid item xs={12}>
                    <Stack>
                      <InputLabel htmlFor="old-password">{t('fields.old-password')}</InputLabel>
                      <OutlinedInput
                        fullWidth
                        error={Boolean(touched.oldPassword && errors.oldPassword)}
                        id="old-password"
                        type="password"
                        value={values?.oldPassword || ''}
                        name="oldPassword"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{}}
                      />
                      {touched.oldPassword && errors.oldPassword && (
                        <FormHelperText error id="helper-text-old-password">
                          {errors.oldPassword}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack>
                      <InputLabel htmlFor="new-password">{t('fields.new-password')}</InputLabel>
                      <OutlinedInput
                        fullWidth
                        error={Boolean(touched.newPassword && errors.newPassword)}
                        id="new-password"
                        type={showPassword ? 'text' : 'password'}
                        value={values?.newPassword || ''}
                        name="newPassword"
                        onBlur={handleBlur}
                        onChange={(e) => {
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
                      {touched.newPassword && errors.newPassword && (
                        <FormHelperText error id="helper-text-password-signup">
                          {errors.newPassword}
                        </FormHelperText>
                      )}
                    </Stack>
                    <FormControl sx={{ mt: 2 }}>
                      <Grid container spacing={0} alignItems="center">
                        <Grid item>
                          <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1" fontSize="0.75rem">
                            {level?.label}
                          </Typography>
                        </Grid>
                      </Grid>
                    </FormControl>
                  </Grid>

                  {errors.submit && (
                    <Grid item xs={12}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<Save />}
                >
                  {t('buttons.change-password')}
                </Button>
              </AnimateButton>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ChangePasswordForm;
