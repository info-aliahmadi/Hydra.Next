import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';

import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession } from 'next-auth/react';
import OrderService from '../../_service/OrderService';
import { Divider } from '@mui/material';

// ===============================|| COLOR BOX ||=============================== //

export default function OrderItemData({ id }) {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;
  const service = new OrderService(jwt);
  const [values, setValues] = useState([]);
  const [fieldsName, buttonName] = ['fields.orderItem.', 'buttons.orderItem.'];

  const columns = useMemo(
    () => [
      {
        accessorKey: 'productName',
        header: t(fieldsName + 'productName'),
        enableClickToCopy: true,
        type: 'string'
      },
      {
        accessorKey: 'quantity',
        header: t(fieldsName + 'quantity'),
        enableClickToCopy: true,
        type: 'string'
      },
      {
        accessorKey: 'unitPrice',
        header: t(fieldsName + 'unitPrice'),
        enableClickToCopy: true,
        type: 'string'
      }
    ],
    []
  );

  useEffect(() => {
    loadOrderItems();
  }, []);

  const loadOrderItems = () => {
    if (id > 0) {
      //setLoading(true);
      service.getOrderItemList(id).then((result) => {
        setValues(result.data);
      });
    } else {
      setValues([]);
    }
  };

  return (
    <>
      {values.map((res,index) => (
        <List key={index} sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ borderRadius: 0 }}>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText xs={2} md={4} primary={res.productName} secondary={res.quantity} /> */}

            <Grid container spacing={3} direction="row">
              <Grid container item spacing={3} xd={12} sm={6} md={6} lg={12}>
                <Grid item xs={12} md={1}>
                  <Stack spacing={1}>
                    <Avatar alt="" src={'/images/rez.jpg'} sx={{ width: 80, height: 80, borderRadius: 1 }}></Avatar>
                  </Stack>
                </Grid>

                <Grid item xs={12} md={1} style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="productName">{t(fieldsName + 'productName')}</InputLabel>
                    <Stack spacing={1}>{res.productName}</Stack>
                  </Stack>
                </Grid>

                <Grid item xs={12} md={1} style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="quantity">{t(fieldsName + 'quantity')}</InputLabel>
                    <Stack spacing={1}>{res.quantity}</Stack>
                  </Stack>
                </Grid>

                <Grid item xs={12} md={1} style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="unitPrice">{t(fieldsName + 'unitPrice')}</InputLabel>
                    <Stack spacing={1}>{res.unitPrice}</Stack>
                  </Stack>
                </Grid>
                
                <Grid item xs={12} md={1} style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="unitPriceTax">{t(fieldsName + 'unitPriceTax')}</InputLabel>
                    <Stack spacing={1}>{res.unitPriceTax}</Stack>
                  </Stack>
                </Grid>

                <Grid item xs={12} md={1} style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="discountAmountTax">{t(fieldsName + 'discountAmountTax')}</InputLabel>
                    <Stack spacing={1}>{res.discountAmountTax}</Stack>
                  </Stack>
                </Grid>

                <Grid item xs={12} md={1} style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="priceTax">{t(fieldsName + 'priceTax')}</InputLabel>
                    <Stack spacing={1}>{res.priceTax}</Stack>
                  </Stack>
                </Grid>

                <Grid item xs={12} md={1} style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="totalPrice">{t(fieldsName + 'totalPrice')}</InputLabel>
                    <Stack spacing={1}>{res.totalPrice}</Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </List>
      ))}
    </>
  );
}
