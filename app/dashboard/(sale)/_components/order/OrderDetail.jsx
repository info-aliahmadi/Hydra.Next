import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import OrderItemData from '../orderItem/OrderItemData';

import { useTranslation } from 'react-i18next';

export default function OrderDetail(props) {
  const [t] = useTranslation();
  const [fieldsName, buttonName] = ['fields.order.', 'buttons.order.'];
  const row = props.row;
  debugger
  return (
    <>
      <Grid container spacing={3} direction="row">
        <Grid container item spacing={3} xd={12} sm={6} md={6} lg={12}>
          <Grid item xs={12} md={2}>
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
          </Grid>
          <Grid item xs={12} md={2}>
            <Stack spacing={1}>
              <TextField
                id="shippingStatusTitle"
                label={t(fieldsName + 'shippingStatusTitle')}
                defaultValue={row.original.shippingStatusTitle}
                InputProps={{
                  readOnly: true
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={2}>
            <Stack spacing={1}>
              <TextField
                id="shippingMethodTitle"
                label={t(fieldsName + 'shippingMethodTitle')}
                defaultValue={row.original.shippingMethodTitle}
                InputProps={{
                  readOnly: true
                }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={2}>
            <Stack spacing={1}>
              <TextField
                id="userCurrencyTitle"
                label={t(fieldsName + 'userCurrencyTitle')}
                defaultValue={row.original.userCurrencyTitle}
                InputProps={{
                  readOnly: true
                }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={2}>
            <Stack spacing={1}>
              <TextField
                id="orderShippingTax"
                label={t(fieldsName + 'orderShippingTax')}
                defaultValue={row.original.orderShippingTax}
                InputProps={{
                  readOnly: true
                }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={2}>
            <Stack spacing={1}>
              <TextField
                id="orderTax"
                label={t(fieldsName + 'orderTax')}
                defaultValue={row.original.orderTax}
                InputProps={{
                  readOnly: true
                }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={2}>
            <Stack spacing={1}>
              <TextField
                id="orderDiscount"
                label={t(fieldsName + 'orderDiscount')}
                defaultValue={row.original.orderDiscount}
                InputProps={{
                  readOnly: true
                }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={2}>
            <Stack spacing={1}>
              <TextField
                id="refundedAmount"
                label={t(fieldsName + 'refundedAmount')}
                defaultValue={row.original.refundedAmount}
                InputProps={{
                  readOnly: true
                }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={2}>
            <Stack spacing={1}>
              <TextField
                id="orderTotal"
                label={t(fieldsName + 'orderTotal')}
                defaultValue={row.original.orderTotal}
                InputProps={{
                  readOnly: true
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <Divider variant="fullWidth" />
              <OrderItemData id={row.original.id} />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
