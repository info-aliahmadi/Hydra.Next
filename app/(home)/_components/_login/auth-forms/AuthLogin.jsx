'use client';
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';

// material-ui
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

import SquareIcon from '@mui/icons-material/Square';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
// import FirebaseSocial from './FirebaseSocial';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import AnimateButton from '@dashboard/_components/@extended/AnimateButton';
import { AuthenticationContext, AuthenticationProvider } from '@dashboard/(auth)/_service/Authentication/AuthenticationProvider';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const [checked, setChecked] = React.useState(false);
  var authenticationContext = useContext(AuthenticationContext);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const router = useRouter();
  const redirectToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <>
        <Formik
          initialValues={{
            userName: 'admin',
            password: 'admin',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            userName: Yup.string().max(255).required('UserName is required'),
            password: Yup.string().max(255).required('Password is required')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              authenticationContext.login(values.userName, values.password, checked).then((result) => {
                if (result) {
                  setStatus({ success: false });
                  setSubmitting(false);
                  redirectToDashboard();
                } else {
                  setStatus({ success: false });
                  setSubmitting(false);
                }
              });
            } catch (err) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="userName-login">UserName</InputLabel>
                    <OutlinedInput
                      id="userName-login"
                      type="text"
                      value={values?.userName || ''}
                      name="userName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter UserName"
                      fullWidth
                      error={Boolean(touched.userName && errors.userName)}
                    />
                    {touched.userName && errors.userName && (
                      <FormHelperText error id="standard-weight-helper-text-userName-login">
                        {errors.userName}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="password-login">Password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      id="-password-login"
                      type={showPassword ? 'text' : 'password'}
                      value={values?.password || ''}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
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
                      placeholder="Enter password"
                    />
                    {touched.password && errors.password && (
                      <FormHelperText error id="standard-weight-helper-text-password-login">
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} sx={{ mt: -1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={(event) => setChecked(event.target.checked)}
                          name="checked"
                          color="primary"
                          size="small"
                          icon={<SquareIcon />}
                        />
                      }
                      label={<Typography variant="body1">Keep me sign in</Typography>}
                    />
                    <Link to="" color="text.primary">
                      Forgot Password?
                    </Link>
                  </Stack>
                </Grid>
                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <AnimateButton>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Login
                    </Button>
                  </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                  <Divider>
                    <Typography variant="caption"> Login with</Typography>
                  </Divider>
                </Grid>
                <Grid item xs={12}>
                  {/* <FirebaseSocial /> */}
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
    </>
  );
};

export default AuthLogin;
