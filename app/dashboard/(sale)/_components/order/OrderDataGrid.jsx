// material-ui
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';

// project import
import MainCard from '@dashboard/_components/MainCard';
import TableCard from '@dashboard/_components/TableCard';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import { useSession } from 'next-auth/react';
import OrderService from '../../_service/OrderService';
import OrderStatus from './OrderStatus';
import OrderDetail from './OrderDetail';
import OrderUserAvatar from './OrderUserAvatar';

// ===============================|| COLOR BOX ||=============================== //

function OrderDataGrid() {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;
  const service = new OrderService(jwt);
  const [refetch, setRefetch] = useState();
  const [fieldsName, buttonName] = ['fields.order.', 'buttons.order.'];

  const columns = useMemo(
    () => [
      {
        accessorKey: 'userName',
        header: t(fieldsName + 'userName'),
        enableClickToCopy: true,
        type: 'string',
        Cell: (renderedCellValue, row) => <OrderUserAvatar />
      },
      {
        accessorKey: 'orderStatusId',
        header: t(fieldsName + 'orderStatusId'),
        enableClickToCopy: true,
        type: 'string',
        Cell: (renderedCellValue, row) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <OrderStatus status={renderedCellValue} />
          </Box>
        )
      },
      {
        accessorKey: 'paymentStatusTitle',
        header: t(fieldsName + 'paymentStatusTitle'),
        enableClickToCopy: true,
        type: 'string'
      },
      {
        accessorKey: 'createdOnUtcString',
        header: t(fieldsName + 'createdOnUtcString'),
        enableClickToCopy: true,
        type: 'string'
      }
    ],
    []
  );

  const RowActionMenuItems = useCallback(
    ({ closeMenu, row }) => [
      <MenuItem key={0} sx={{ m: 0 }}>
        <ListItemIcon>{/* <AccountCircle /> */}</ListItemIcon>
        View Detail
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>{/* <Send /> */}</ListItemIcon>
        Send Email
      </MenuItem>
    ],
    []
  );

  const handleOrderList = useCallback(async (x) => {
    return await service.getOrderList(x);
  }, []);

  return (
    <>
      <MainCard>
        <TableCard>
          <MaterialTable
            refetch={refetch}
            columns={columns}
            dataApi={handleOrderList}
            enableRowActions
            renderRowActionMenuItems={RowActionMenuItems}
            renderDetailPanel={({ row }) => <OrderDetail row={row} />}
          />
        </TableCard>
      </MainCard>
    </>
  );
}

export default OrderDataGrid;
