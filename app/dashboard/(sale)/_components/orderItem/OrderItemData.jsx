// project import
import MainCard from '@dashboard/_components/MainCard';
import TableCard from '@dashboard/_components/TableCard';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import ImageIcon from '@mui/icons-material/Image';

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
      {values.map((res) => (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ borderRadius: 0 }}>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={res.productName} secondary={res.quantity} />
          </ListItem>
          <Divider />
        </List>
      ))}
    </>
  );
}
