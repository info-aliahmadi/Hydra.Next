'use client';

// assets
import { useTranslation } from 'react-i18next';
import { useSession } from 'next-auth/react';
import OrderService from '../../_service/OrderService';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/system';

import MainCard from '@dashboard/_components/MainCard';
import PaymentStatus from './PaymentStatus';

export default function PaymentDetail({ orderId, open, setOpen, refetch }) {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;
  const orderService = new OrderService(jwt);
  const [payment, setPayment] = useState();

  const [fieldsName] = ['fields.order.', 'validation.order.', 'buttons.'];

  const loadPayment = () => {
    orderService.getOrderPaymentById(orderId).then((result) => {
      setPayment(result);
    });
  };

  useEffect(() => {
    if (orderId > 0) {
      loadPayment();
    } else {
      setPayment({});
    }
  }, [orderId, open]);

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

  const onClose = () => {
    setOpen(false);
    setPayment({});
  };

  return (
    <>
      <Dialog open={open} fullWidth={'xs'}>
        <DialogTitle>
          {t('dialog.payment.title')}
          <CloseDialog />
        </DialogTitle>
        <Grid container justifyContent="center" direction="row" alignItems="flex-start">
          <Grid container spacing={3} item xs={12} sm={12} md={12} lg={12} xl={12} direction="column">
            <Grid item>
              <MainCard>
                <Grid container spacing={3} direction="column">
                  <Grid container item spacing={3}>
                    <Grid item xs={12} md={4} lg={4} xl={4}>
                      <Stack spacing={1}>
                        <TextField
                          id="transactionTrackingCode"
                          label={t(fieldsName + 'transactionTrackingCode')}
                          defaultValue={payment?.transactionTrackingCode}
                          InputProps={{
                            readOnly: true
                          }}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} md={4} lg={4} xl={4}>
                      <Stack spacing={1}>
                        <TextField
                          id="paymentTrackingCode"
                          label={t(fieldsName + 'paymentTrackingCode')}
                          defaultValue={payment?.paymentTrackingCode}
                          InputProps={{
                            readOnly: true
                          }}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} md={4} lg={4} xl={4}>
                      <Stack spacing={1}>
                        <TextField
                          id="paymentDateUtcToString"
                          label={t(fieldsName + 'paymentDateUtcToString')}
                          defaultValue={payment?.paymentDateUtcToString}
                          InputProps={{
                            readOnly: true
                          }}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} md={4} lg={4} xl={4}>
                      <Stack spacing={1}>
                        <TextField
                          id="cardName"
                          label={t(fieldsName + 'cardName')}
                          defaultValue={payment?.cardName}
                          InputProps={{
                            readOnly: true
                          }}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} md={4} lg={4} xl={4}>
                      <Stack spacing={1}>
                        <TextField
                          id="cardNumber"
                          label={t(fieldsName + 'cardNumber')}
                          defaultValue={payment?.cardNumber}
                          InputProps={{
                            readOnly: true
                          }}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} md={4} lg={4} xl={4}>
                      <Stack spacing={1}>
                        <TextField
                          id="paymentTypeTitle"
                          label={t(fieldsName + 'paymentTypeTitle')}
                          defaultValue={payment?.paymentTypeTitle}
                          InputProps={{
                            readOnly: true
                          }}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} md={12} lg={12} xl={12}>
                      <Stack spacing={1}>
                        <PaymentStatus status={payment?.statusTitle} id={payment?.status} />
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
