'use client';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import SquareIcon from '@mui/icons-material/Square';
import Email from '@mui/icons-material/Email';
import Place from '@mui/icons-material/Place';
import 'react';
import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import HomeService from '@(home)/_service/HomeService';
import Notify from './Notify';
import setServerErrors from '/utils/setServerErrors';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function Contact() {
  let messageService = new HomeService();
  const [message, setMessage] = useState();
  const [notify, setNotify] = useState({ open: false });

  const handleSubmit = async (message, resetForm, setErrors, setSubmitting) => {
    messageService
      .sendContactMessage(message)
      .then(() => {
        resetForm();
        setSubmitting(true);
        setNotify({ open: true, description: 'Your Message Sent Successfully' });
      })
      .catch((error) => {
        setServerErrors(error, setErrors);
        setNotify({ open: true, type: 'error', description: 'Your message could not be sent, please send your message via email' });
      })
      .finally((x) => {
        setSubmitting(false);
      });
  };
  return (
    <Box className="bg-blue">
      <Box
        className="bg-wave"
        sx={{
          backgroundImage: `url(/images/wave-contact.svg)`
        }}
        height={{ xs: 200, sm: 250, md: 300, lg: 360, xl: 400 }}
      ></Box>
      <Container maxWidth="xl">
        <Grid
          container
          pt={{ xs: 3, sm: 5, md: 8, lg: 10, xl: 15 }}
          pb={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}
          pl={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}
          pr={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}
        >
          <Grid container item xs={12} sm={12} md={5} lg={5} xl={5}>
            <Grid item>
              <Typography variant="h5" pt={2}>
                Contact
              </Typography>
              <Typography variant="h1" pt={2}>
                Get in Touch
              </Typography>
              <Typography variant="body2" pt={2}>
                Have a question or need assistance? Contact us!
              </Typography>
              <Typography variant="body2" pt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ marginRight: '5px' }} /> info@onwavedesign.com
              </Typography>
              <Typography variant="body2" pt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Place sx={{ marginRight: '5px' }} /> We are international developers
              </Typography>
              <Typography variant="body2" pt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <WhatsAppIcon sx={{ marginRight: '5px' }} /> +971 58 241 7650
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7} spacing={3} pt={{ xs: 10, sm: 10, md: 0, lg: 0, xl: 0 }}>
            <Notify notify={notify} setNotify={setNotify} sx={{ mt: '55px' }}></Notify>

            <Formik
              initialValues={{
                name: message?.name,
                email: message?.email,
                subject: 'Contact',
                messageType: 2,
                content: message?.content,
                acceptTerms: message?.acceptTerms
              }}
              enableReinitialize={true}
              validationSchema={Yup.object().shape({
                name: Yup.string().max(250).required('Name Is Required'),
                email: Yup.string().email().required('Email Is Required'),
                content: Yup.string().min(5).max(5000).required('Message Is Required')
              })}
              onSubmit={(values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                try {
                  setSubmitting(true);
                  handleSubmit(values, resetForm, setErrors, setSubmitting);
                } catch (err) {
                  console.error(err);
                  setStatus({ success: false });
                  setErrors({ submit: err.message });
                }
              }}
            >
              {({ errors, handleBlur, handleChange, setFieldValue, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <OutlinedInput
                          id="name"
                          name="name"
                          type="text"
                          value={values?.name || ''}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder={'name'}
                          fullWidth
                          error={Boolean(touched.name && errors.name)}
                        />
                        {touched.name && errors.name && (
                          <FormHelperText error id="helper-text-subject">
                            {errors.name}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput
                          id="email"
                          name="email"
                          type="text"
                          value={values?.email || ''}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Email"
                          fullWidth
                          error={Boolean(touched.email && errors.email)}
                        />
                        {touched.email && errors.email && (
                          <FormHelperText error id="helper-text-subject">
                            {errors.email}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="content">Message</InputLabel>
                        <TextareaAutosize
                          className={'MuiTextareaAutosize-root ' + (Boolean(touched.content && errors.content) == true ? 'Mui-error' : '')}
                          fullWidth
                          id="content"
                          name="content"
                          type="text"
                          value={values?.content || ''}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Message"
                          multiline={true}
                          minRows={8}
                          inputProps={{}}
                          error={Boolean(touched.content && errors.content)}
                        />
                        {touched.content && errors.content && (
                          <FormHelperText error id="helper-text-content">
                            {errors.content}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              id="acceptTerms"
                              color="primary"
                              required
                              size="medium"
                              onChange={handleChange}
                              checked={values?.acceptTerms || true}
                              icon={<SquareIcon />}
                              defaultChecked
                            />
                          }
                          label={
                            <>
                              <span>I accept </span>
                              <Link href="/termsofservice" color={'warning'} target="_blank">
                                the Terms
                              </Link>
                            </>
                          }
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={4} sm={4} md={3} lg={2} xl={2}>
                      <Stack spacing={1}>
                        <Button variant="contained" color="primary" size="large" type="submit" disabled={isSubmitting}>
                          Submit
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
