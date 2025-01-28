import { useEffect, useState } from 'react';

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid2,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// material-ui

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import { strengthColor, strengthIndicator } from '@root/utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import Notify from '@dashboard/_components/@extended/Notify';
import setServerErrors from '@root/utils/setServerErrors';
import { Save } from '@mui/icons-material';
import AnimateButton from '@dashboard/_components/@extended/AnimateButton';
import AccountService from '@dashboard/(auth)/_service/AccountService';
import { useSession } from 'next-auth/react';

interface FormValues {
  oldPassword: string;
  newPassword: string;
  submit?: string;
}

const ChangePasswordForm = () => {
  const [t] = useTranslation() as any;
  const [level, setLevel] = useState<any>();
  const { data: session } = useSession() as { data: any };
  const jwt = session?.user?.accessToken;


  const [showPassword, setShowPassword] = useState(false);
  const [notify, setNotify] = useState<any>({  open: false, type: 'success', description: '' });

  let accountService = new AccountService(jwt);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const changePassword = (value: any) => {
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
          newPassword: '',
          submit: ''
        }}
        validationSchema={Yup.object().shape({
          oldPassword: Yup.string().max(255).required(t('validation.required-old-password') as string),
          newPassword: Yup.string().max(255).required(t('validation.required-new-password') as string)
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {


            accountService
              .changePassword(values as FormValues)
              .then(() => {
                setNotify({ open: true, type: 'success', description: '' });
              })
              .catch((error: any) => {
                setErrors(setServerErrors(error));
                setNotify({
                  open: true,
                  type: 'error',
                  description: error
                } as any);
              })
              .finally(() => setSubmitting(false));
            setStatus({ success: true });
            setSubmitting(true);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ newPassword: (err as any).message });
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid2 container direction="row" justifyContent="center">
              <Grid2 size={{ sm: 8, md: 8 ,lg : 6, xs: 6}}>
                <Grid2 container spacing={2} direction="column" justifyContent="center">
                  <Grid xs={12}>
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
                </Grid2>
              </Grid2>
            </Grid2>
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
