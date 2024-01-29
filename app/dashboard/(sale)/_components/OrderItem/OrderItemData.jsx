import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession } from 'next-auth/react';
import OrderService from '../../_service/OrderService';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Currency from '@dashboard/_components/Currency/Currency';
import { Divider } from '@mui/material';

// ===============================|| COLOR BOX ||=============================== //

export default function OrderItemData({ orderId, currency }) {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;
  const service = new OrderService(jwt);
  const [values, setValues] = useState([]);
  const [valueAmounts, setValueSumAmounts] = useState('');
  const [fieldsName, buttonName] = ['fields.orderItem.', 'buttons.orderItem.'];

  useEffect(() => {
    loadOrderItems();
  }, []);

  const loadOrderItems = () => {
    if (orderId > 0) {
      //setLoading(true);
      debugger

      service.getOrderItemList(orderId).then((result) => {
        setValues(result.data.item1);
        setValueSumAmounts(result.data.item2);
      });
    } else {
      setValues([]);
      setValues('');
    }
  };

  return (
    <>
      {values.length > 0 ? (
        <TableContainer sx={{ marginTop: '10px' }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Photo</TableCell>
                <TableCell align="center">{t(fieldsName + 'productName')}</TableCell>
                <TableCell align="center">{t(fieldsName + 'quantity')}</TableCell>
                <TableCell align="center">{t(fieldsName + 'unitPrice')}</TableCell>
                <TableCell align="center">{t(fieldsName + 'discountAmount')}</TableCell>
                <TableCell align="center">{t(fieldsName + 'totalPriceTax')}</TableCell>
                <TableCell align="center">{t(fieldsName + 'totalPrice')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values.map((res, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Avatar alt="" src={'/images/rez.jpg'} sx={{ width: 80, height: 80, borderRadius: 1 }}></Avatar>
                  </TableCell>
                  <TableCell align="center">{res.productName}</TableCell>
                  <TableCell align="center">{res.quantity}</TableCell>
                  <TableCell align="center">
                    <Currency value={res.unitPrice} currency={currency} />
                  </TableCell>
                  <TableCell align="center">
                    <Currency value={res.discountAmount} currency={currency} />
                  </TableCell>
                  <TableCell align="center">
                    <Currency value={res.totalPriceTax} currency={currency} />
                  </TableCell>
                  <TableCell align="center">
                    <Currency value={res.totalPrice} currency={currency} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Divider />
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Sum {t(fieldsName + 'unitPrice')}</TableCell>
                <TableCell align="center">Sum {t(fieldsName + 'discountAmount')}</TableCell>
                <TableCell align="center">Sum {t(fieldsName + 'totalPriceTax')}</TableCell>
                <TableCell align="center">Sum {t(fieldsName + 'totalPrice')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">
                  <Currency value={valueAmounts.unitPrice} currency={currency} />
                </TableCell>
                <TableCell align="center">
                  <Currency value={valueAmounts.discountAmount} currency={currency} />
                </TableCell>
                <TableCell align="center">
                  <Currency value={valueAmounts.totalPrice} currency={currency} />
                </TableCell>
                <TableCell align="center">
                  <Currency value={valueAmounts.totalPriceTax} currency={currency} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <span>There is no item.</span>
      )}
    </>
  );
}
