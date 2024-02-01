'use client'
import { useEffect, useState } from 'react';

// material-ui
import {
  Avatar,
  Button,
  Chip,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import { ArrowBack, Save, EventNote } from '@mui/icons-material';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

import AnimateButton from '@dashboard/_components/@extended/AnimateButton';

// assets
import { useTranslation } from 'react-i18next';
import Notify from '@dashboard/_components/@extended/Notify';
import CONFIG from '/config';
import MainCard from '@dashboard/_components/MainCard';
import setServerErrors from '/utils/setServerErrors';

import moment from 'moment';
import PagesService from '@dashboard/(cms)/_service/PagesService';
import { useRouter } from 'next/navigation';
import SelectTag from '@dashboard/(cms)/_components/Tag/SelectTag';
import Editor from '@dashboard/_components/Editor/Editor';
import { useSession } from 'next-auth/react';

export default function AddOrEditPage({ params }) {
  const [t, i18n] = useTranslation();
  const operation = params.operation;
  const id = params.id;

  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  let pageService = new PagesService(jwt);
  const [fieldsName, validation, buttonName] = ['fields.page.', 'validation.page.', 'buttons.page.'];
  const [page, setPage] = useState();
  const [notify, setNotify] = useState({ open: false });
  const router = useRouter();

  const loadPage = () => {
    pageService.getPageById(id).then((result) => {
      setPage(result);
    });
  };
  useEffect(() => {
    if (operation == 'edit' && id > 0) loadPage();
  }, [operation, id]);

  const handleSubmit = async (page, resetForm, setErrors, setSubmitting) => {
    if (operation == 'add') {
      pageService
        .addPage(page)
        .then(() => {
          resetForm();
          setNotify({ open: true });
        })
        .catch((error) => {
          setServerErrors(error, setErrors);
          setNotify({ open: true, type: 'error', description: error });
        })
        .finally((x) => {
          setSubmitting(false);
        });
    } else {
      pageService
        .updatePage(page)
        .then((result) => {
          setPage(result);
          setNotify({ open: true });
        })
        .catch((error) => {
          setServerErrors(error, setErrors);
          setNotify({ open: true, type: 'error', description: error });
        })
        .finally((x) => {
          setSubmitting(false);
        });
    }
  };

  return (
    <>
      <Notify notify={notify} setNotify={setNotify}></Notify>

      <Formik
        initialValues={{
          id: page?.id,
          pageTitle: page?.pageTitle,
          subject: page?.subject,
          body: page?.body,
          registerDate: page?.registerDate,
          writer: page?.writer,
          editor: page?.editor,
          editDate: page?.editDate,
          tags: page?.tags
        }}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          pageTitle: Yup.string()
            .max(250)
            .required(t(validation + 'requiredPageTitle')),
          subject: Yup.string()
            .max(250)
            .required(t(validation + 'requiredSubject')),
          body: Yup.string().required(t(validation + 'requiredBody'))
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
            <Grid container justifyContent="center" direction="row" alignItems="flex-start">
              <Grid container item spacing={3} xs={12} sm={12} md={12} lg={12} xl={7} direction="column">
                <Grid item>
                  <Typography variant="h5">{t('pages.cards.page-' + operation)}</Typography>
                </Grid>
                <Grid item>
                  <MainCard>
                    <Grid container item spacing={3} direction="row" justifyContent="flex-start" alignItems="flex-start">
                      <Grid container item spacing={3} xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="pageTitle">{t(fieldsName + 'pageTitle')}</InputLabel>
                            <OutlinedInput
                              id="pageTitle"
                              type="pageTitle"
                              value={values?.pageTitle || ''}
                              name="pageTitle"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder={t(fieldsName + 'pageTitle')}
                              fullWidth
                              error={Boolean(touched.pageTitle && errors.pageTitle)}
                              startAdornment={<InputAdornment position="start">{CONFIG.DOMAIN + '/page/'}</InputAdornment>}
                            />
                            {touched.pageTitle && errors.pageTitle && (
                              <FormHelperText error id="helper-text-subject">
                                {errors.pageTitle}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="subject">{t(fieldsName + 'subject')}</InputLabel>
                            <OutlinedInput
                              id="subject"
                              type="subject"
                              value={values?.subject || ''}
                              name="subject"
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
                              id={'body'}
                              name={'body'}
                              defaultValue={values?.body || ''}
                              setFieldValue={setFieldValue}
                              error={Boolean(touched.body && errors.body)}
                            />
                            {operation == 'edit' && (
                              <Grid>
                                {t(fieldsName + 'writedBy') + ' : '}
                                <Chip
                                  title={t(fieldsName + 'writer')}
                                  avatar={<Avatar src={CONFIG.AVATAR_BASEPATH + values.writer?.avatar} />}
                                  label={values.writer?.userName}
                                  variant="filled"
                                  size="small"
                                  sx={{ borderRadius: '16px' }}
                                />{' '}
                                <Chip
                                  icon={<EventNote />}
                                  title={t(fieldsName + 'registerDate')}
                                  label={new Intl.DateTimeFormat(i18n.language, {
                                    dateStyle: [CONFIG.DATE_STYLE],
                                    timeStyle: [CONFIG.TIME_STYLE],
                                    hour12: false
                                  }).format(moment(values.registerDate))}
                                  variant="filled"
                                  size="small"
                                  sx={{ borderRadius: '16px' }}
                                />{' '}
                                {values.editor?.userName && (
                                  <span>
                                    {t(fieldsName + 'editedBy') + ' : '}
                                    <Chip
                                      title={t(fieldsName + 'editor')}
                                      avatar={<Avatar src={CONFIG.AVATAR_BASEPATH + values.editor?.avatar} />}
                                      label={values.editor?.userName}
                                      variant="filled"
                                      size="small"
                                      sx={{ borderRadius: '16px' }}
                                    />{' '}
                                    <Chip
                                      icon={<EventNote />}
                                      title={t(fieldsName + 'editDate')}
                                      label={new Intl.DateTimeFormat(i18n.language, {
                                        dateStyle: [CONFIG.DATE_STYLE],
                                        timeStyle: [CONFIG.TIME_STYLE],
                                        hour12: false
                                      }).format(moment(values.editDate))}
                                      variant="filled"
                                      size="small"
                                      sx={{ borderRadius: '16px' }}
                                    />{' '}
                                  </span>
                                )}
                              </Grid>
                            )}
                            {touched.body && errors.body && (
                              <FormHelperText error id="helper-text-body">
                                {errors.body}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="tags">
                              {t(fieldsName + 'tags')}
                              <Link href="/tagsList" target="_blank">
                                (Manage Tags)
                              </Link>
                            </InputLabel>
                            <SelectTag
                              defaultValues={values?.tags || []}
                              id="tags"
                              name="tags"
                              setFieldValue={setFieldValue}
                              error={Boolean(touched.tags && errors.tags)}
                            />
                            {touched.tags && errors.tags && (
                              <FormHelperText error id="helper-tagIds">
                                {errors.tags}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                      </Grid>

                      <Grid container item spacing={3} direction="row" justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Stack direction="row" spacing={2}>
                            {' '}
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
                                {t('buttons.cancel')}
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
