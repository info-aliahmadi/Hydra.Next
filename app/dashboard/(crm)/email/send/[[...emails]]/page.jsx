'use client';

import { useEffect, useState } from 'react';
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import { ArrowBack, Save, Send } from '@mui/icons-material';
import * as Yup from 'yup';
import { Formik } from 'formik';

import AnimateButton from '@dashboard/_components/@extended/AnimateButton';

import { useTranslation } from 'react-i18next';
import Notify from '@dashboard/_components/@extended/Notify';
import MainCard from '@dashboard/_components/MainCard';
import setServerErrors from '/utils/setServerErrors';
import { useRouter } from 'next/navigation';
import EmailOutboxService from '@dashboard/(crm)/_service/EmailOutboxService';
import SelectAddress from '@dashboard/(crm)/_components/SelectAddress';
import Editor from '@dashboard/_components/Editor/Editor';
import FileUpload from '@dashboard/_components/FileUpload/FileUpload';
import { useSession } from 'next-auth/react';

export default function SendEmailInbox({ params }) {
  const [t] = useTranslation();

  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  const emails = params.emails;

  let toAdresses = emails ? decodeURIComponent(emails).split(',') : [];

  let service = new EmailOutboxService(jwt);
  const [fieldsName, validation, buttonName] = ['fields.email.emailInbox.', 'validation.email.', 'buttons.email.emailInbox.'];
  const [emailInbox, setEmailInbox] = useState();
  const [notify, setNotify] = useState({ open: false });
  const router = useRouter();


  const handleSubmit = async (emailInbox, resetForm, setErrors, setSubmitting) => {
    if (!emailInbox.isDraft) {
      service
        .sendEmailOutbox(emailInbox)
        .then(() => {
          resetForm({});
          setEmailInbox({});
          setNotify({ open: true });
        })
        .catch((error) => {
          setServerErrors(error, setErrors);
          setNotify({ open: true, type: 'error', description: error });
        })
        .finally(() => {
          setSubmitting(false);
        });

    } else {
      service
        .saveDraftEmailOutbox(emailInbox)
        .then((result) => {
          debugger
          resetForm({});
          setEmailInbox({});
          setNotify({ open: true });
        })
        .catch((error) => {
          setServerErrors(error, setErrors);
          setNotify({ open: true, type: 'error', description: error });
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  return (
    <>
      <Notify notify={notify} setNotify={setNotify}></Notify>

      <Formik
        initialValues={{
          id: emailInbox?.id,
          subject: emailInbox?.subject,
          content: emailInbox?.content,
          registerDate: emailInbox?.registerDate,
          isDraft: emailInbox?.isDraft,
          toAddress: emailInbox?.toAddress,
          attachments: emailInbox?.attachments
        }}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          subject: Yup.string()
            .max(250)
            .required(t(validation + 'requiredSubject')),
          toAddress: Yup.array().min(1, t(validation + 'requiredtoAddress')).required(t(validation + 'requiredtoAddress'))
        })}
        onSubmit={(values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            setSubmitting(true);
            handleSubmit(values, resetForm, setErrors, setSubmitting);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.emailInbox });
          }
        }}
      >
        {({ errors, handleBlur, handleChange, setFieldValue, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container justifyContent="center" direction="row" alignItems="flex-start">
              <Grid container item spacing={3} xs={12} sm={12} md={12} lg={12} xl={12} direction="column">
                <Grid item>
                  <Typography variant="h5">{t('pages.cards.sendEmail')}</Typography>
                </Grid>
                <Grid item>
                  <MainCard>
                    <Grid container item spacing={3} direction="row" justifyContent="flex-start" alignItems="flex-start">
                      <Grid container item spacing={3} xs={12} sm={12} md={12} lg={12} xl={8} display={''}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="toUserIds">{t(fieldsName + 'toAddress')}</InputLabel>
                            <SelectAddress
                              id="toAddress"
                              freeSolo
                              name="toAddress"
                              label={t(fieldsName + 'toAddress')}
                              multiple={true}
                              setFieldValue={setFieldValue}
                              defaultValues={values?.toAddress || toAdresses || ''}
                              error={Boolean(touched.toAddress && errors.toAddress)}
                            />
                            {touched.toAddress && errors.toAddress && (
                              <FormHelperText error id="helper-text-subject">
                                {errors.toAddress}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="subject">{t(fieldsName + 'subject')}</InputLabel>
                            <OutlinedInput
                              id="subject"
                              name="subject"
                              type="text"
                              value={values?.subject || ''}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder={t(fieldsName + 'subject')}
                              fullWidth
                              error={Boolean(touched.subject && errors.subject)}
                            />
                            {touched.subject && errors.subject && (
                              <FormHelperText error id="helper-text-subject">
                                {errors.subject}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Stack spacing={1}>
                            <Editor
                              id="content"
                              name="content"
                              defaultValue={values?.content || ''}
                              setFieldValue={setFieldValue}
                              error={Boolean(touched.content && errors.content)}
                            />
                            {touched.content && errors.content && (
                              <FormHelperText error id="content">
                                {errors.content}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        item
                        spacing={3}
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={4}
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      >
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="attachments">{t(fieldsName + 'attachments')}</InputLabel>
                            <FileUpload
                              id="attachments"
                              name="attachments"
                              setFieldValue={setFieldValue}
                              value={values?.attachments || ''}
                              allowMultiple={true}
                              filePosterMaxHeight={200}
                            />
                          </Stack>
                        </Grid>
                      </Grid>
                      <Grid container item spacing={3} direction="row" justifyContent="space-between" alignItems="center">
                        <Grid item>
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
                                onClick={() => setFieldValue('isDraft', false)}
                                startIcon={<Send />}
                              >
                                {t(buttonName + 'send')}
                              </Button>
                            </AnimateButton>
                            <AnimateButton>
                              <Button
                                size="large"
                                type="submit"
                                disabled={isSubmitting}
                                variant="contained"
                                color="warning"
                                onClick={() => setFieldValue('isDraft', true)}
                                startIcon={<Save />}
                              >
                                {t(buttonName + 'draft')}
                              </Button>
                            </AnimateButton>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
