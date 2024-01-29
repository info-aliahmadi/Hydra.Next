'use client';
import { useState } from 'react';

// material-ui
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@dashboard/_components/Editor/ui/Button';
import AnimateButton from '@dashboard/_components/@extended/AnimateButton';
import Save from '@mui/icons-material/Save';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// assets
import { useTranslation } from 'react-i18next';
import { useSession } from 'next-auth/react';

import MainCard from '@dashboard/_components/MainCard';
import setServerErrors from '/utils/setServerErrors';
import Notify from '@dashboard/_components/@extended/Notify';
import OrderService from '../../_service/OrderService';
import SelectPaymentStatus from './SelectPaymentStatus';
import SelectShippingStatus from './SelectPaymentStatus';
import SelectOrderStatus from './SelectOrderStatus';
import SelectShippingMethod from './SelectShippingMethod';
import OrderItemData from '../OrderItem/OrderItemData';

export default function OrderDetail({ row, refetch }) {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;
  const orderService = new OrderService(jwt);
  const [fieldsName, validation, buttonName] = ['fields.order.', 'validation.order.', 'buttons.'];
  const [notify, setNotify] = useState({ open: false });
  //const row = props.row;

  const getOrderStatusForSelect = () => {
    return orderService.getAllOrderStatusForSelect();
  };

  const getPaymentStatusForSelect = () => {
    return orderService.getAllPaymentStatusForSelect();
  };

  const getShippingStatusForSelect = () => {
    return orderService.getAllShippingStatusForSelect();
  };

  const getShippingMethodForSelect = () => {
    return orderService.getAllShippingMethodForSelect();
  };

  const handleSubmit = (order, resetForm, setErrors) => {
    orderService
      .updateOrder(order)
      .then(() => {
        setNotify({ open: true });
        refetch();
      })
      .catch((error) => {
        setServerErrors(error, setErrors);
        setNotify({ open: true, type: 'error', description: error });
      });
  };

  return (
    <>
      <Notify notify={notify} setNotify={setNotify}></Notify>

      <Formik
        initialValues={{
          id: row.original.id,
          paymentStatusId: row.original.paymentStatusId,
          shippingMethodId: row.original.shippingMethodId,
          orderStatusId: row.original.orderStatusId,
          shippingStatusId: row.original.shippingStatusId
        }}
        enableReinitialize={true}
        validatioOrderStatusIdnSchema={Yup.object().shape({
          paymentStatusTitle: Yup.string().max(255).required(t('validation.required-userName'))
        })}
        onSubmit={(values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            handleSubmit(values, resetForm, setErrors);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, setFieldValue, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container justifyContent="center" direction="row" alignItems="flex-start">
              <Grid container spacing={3} item xs={12} sm={12} md={12} lg={12} xl={12} direction="column">
                <Grid item>
                  <MainCard>
                    <Grid container spacing={3} direction="column">
                      <Grid container item spacing={3}>
                        <Grid item xs={12} md={3} lg={3} xl={3}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="paymentStatusId">{t(fieldsName + 'paymentStatusId')}</InputLabel>
                            <SelectPaymentStatus
                              loadDataForSelect={getPaymentStatusForSelect}
                              defaultValue={row.original.paymentStatusId}
                              id="paymentStatusId"
                              name="paymentStatusId"
                              setFieldValue={setFieldValue}
                              error={Boolean(touched.paymentStatusId && errors.paymentStatusId)}
                            />
                            {touched.paymentStatusId && errors.paymentStatusId && (
                              <FormHelperText error id="helper-text-email">
                                {errors.paymentStatusId}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>

                        <Grid item xs={12} md={3} lg={3} xl={3}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="shippingStatusId">{t(fieldsName + 'shippingStatusId')}</InputLabel>
                            <SelectShippingStatus
                              loadDataForSelect={getShippingStatusForSelect}
                              defaultValue={row.original.shippingStatusId}
                              id="shippingStatusId"
                              name="shippingStatusId"
                              setFieldValue={setFieldValue}
                              error={Boolean(touched.shippingStatusId && errors.shippingStatusId)}
                            />
                            {touched.shippingStatusId && errors.shippingStatusId && (
                              <FormHelperText error id="helper-text-email">
                                {errors.shippingStatusId}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>

                        <Grid item xs={12} md={3} lg={3} xl={3}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="orderStatusId">{t(fieldsName + 'orderStatusId')}</InputLabel>
                            <SelectOrderStatus
                              loadDataForSelect={getOrderStatusForSelect}
                              defaultValue={row.original.orderStatusId}
                              id="orderStatusId"
                              name="orderStatusId"
                              setFieldValue={setFieldValue}
                              error={Boolean(touched.orderStatusId && errors.orderStatusId)}
                            />
                            {touched.orderStatusId && errors.orderStatusId && (
                              <FormHelperText error id="helper-text-email">
                                {errors.orderStatusId}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={3} lg={3} xl={3}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="shippingMethodId">{t(fieldsName + 'shippingMethodId')}</InputLabel>
                            <SelectShippingMethod
                              loadDataForSelect={getShippingMethodForSelect}
                              defaultValue={row.original.shippingMethodId}
                              id="shippingMethodId"
                              name="shippingMethodId"
                              setFieldValue={setFieldValue}
                              error={Boolean(touched.shippingMethodId && errors.shippingMethodId)}
                            />
                            {touched.shippingMethodId && errors.shippingMethodId && (
                              <FormHelperText error id="helper-text-email">
                                {errors.shippingMethodId}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                        <Grid container item spacing={3}>
                          {/* <Grid item xs={12} md={3} lg={3} xl={3}>
                            <Stack spacing={1}>
                              <TextField
                                id="paymentStatusTitle"
                                label={t(fieldsName + 'paymentStatusTitle')}
                                defaultValue={row.original.paymentStatusTitle}
                                InputProps={{
                                  readOnly: true
                                }}
                              />
                            </Stack>
                          </Grid> */}

                          <Grid item xs={12} md={3} lg={3} xl={3}>
                            <Stack spacing={1}>
                              <TextField
                                id="transactionTrackingCode"
                                label={t(fieldsName + 'transactionTrackingCode')}
                                defaultValue={row.original.transactionTrackingCode}
                                InputProps={{
                                  readOnly: true
                                }}
                              />
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={3} lg={3} xl={3}>
                            <Stack spacing={1}>
                              <TextField
                                id="paymentTrackingCode"
                                label={t(fieldsName + 'paymentTrackingCode')}
                                defaultValue={row.original.paymentTrackingCode}
                                InputProps={{
                                  readOnly: true
                                }}
                              />
                            </Stack>
                          </Grid>

                          <Grid item xs={12} md={3} lg={3} xl={3}>
                            <Stack spacing={1}>
                              <TextField
                                id="trackingNumber"
                                label={t(fieldsName + 'trackingNumber')}
                                defaultValue={row.original.trackingNumber}
                                InputProps={{
                                  readOnly: true
                                }}
                              />
                            </Stack>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container mt={1} direction="row" justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Stack direction="row" spacing={2}>
                          <AnimateButton>
                            <Button
                              disabled={isSubmitting}
                              size="large"
                              type="submit"
                              variant="contained"
                              color="warning"
                              onClick={() => {}}
                              startIcon={<Save />}
                            >
                              {t(buttonName + 'save')}
                            </Button>
                          </AnimateButton>
                        </Stack>
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>

      <OrderItemData orderId={row.original.id} currency={row.original.userCurrency} />
    </>
  );
}
