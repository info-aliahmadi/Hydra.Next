// material-ui
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/MenuItem';

// project import
import MainCard from '@dashboard/_components/MainCard';
import TableCard from '@dashboard/_components/TableCard';
import Currency from '@dashboard/_components/Currency/Currency';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import { useSession } from 'next-auth/react';
import OrderService from '../../_service/OrderService';
import OrderStatus from './OrderStatus';
import OrderDetail from './OrderDetail';
import OrderUserAvatar from './OrderUserAvatar';
import PaymentStatus from './PaymentStatus';
import PaymentDetail from './PaymentDetail';

// ===============================|| COLOR BOX ||=============================== //

function OrderDataGrid() {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;
  const service = new OrderService(jwt);
  const [refetch, setRefetch] = useState();
  const [rowId, setRowId] = useState(0);
  const [open, setOpen] = useState(false);
  const [fieldsName, buttonName] = ['fields.order.', 'buttons.order.'];

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: t(fieldsName + 'id'),
        enableClickToCopy: true,
        type: 'string',
        Cell: ({ renderedCellValue, row }) => <span># {renderedCellValue}</span>
      },
      {
        accessorKey: 'userName',
        header: t(fieldsName + 'userName'),
        enableClickToCopy: true,
        type: 'string',
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <OrderUserAvatar value={renderedCellValue} />
          </Box>
        )
      },
      {
        accessorKey: 'orderStatusId',
        header: t(fieldsName + 'orderStatusId'),
        enableClickToCopy: true,
        type: 'string',
        Cell: ({ renderedCellValue, row }) => (
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
        accessorKey: 'finalPrice',
        header: t(fieldsName + 'finalPrice'),
        enableClickToCopy: true,
        type: 'string',
        Cell: ({ renderedCellValue, row }) => <Currency value={renderedCellValue} currency={row.original.userCurrency} />
      },
      {
        accessorKey: 'paymentStatusTitle',
        header: t(fieldsName + 'paymentStatusTitle'),
        enableClickToCopy: true,
        type: 'string',
        Cell: ({ renderedCellValue, row }) => <PaymentStatus status={renderedCellValue} id={row.original.paymentStatusId} />
      },
      {
        accessorKey: 'paymentDateUtcToString',
        header: t(fieldsName + 'paymentDateUtcToString'),
        enableClickToCopy: true,
        type: 'string'
      },
      {
        accessorKey: 'paymentTrackingCode',
        header: t(fieldsName + 'paymentTrackingCode'),
        enableClickToCopy: true,
        type: 'string',
        Cell: ({ renderedCellValue, row }) => (
          <Box
            onClick={() => {
              handlePaymentDetail(row);
            }}
          >
            {renderedCellValue}
          </Box>
        )
      }
    ],
    []
  );

  const handleRefetch = () => {
    setRefetch(Date.now());
  };

  const handlePaymentDetail = (row) => {
    let orderId = row.original.id;
    setRowId(orderId);
    setOpen(true);
  };

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
            renderDetailPanel={({ row }) => <OrderDetail row={row} refetch={handleRefetch} />}
          />
        </TableCard>
      </MainCard>
      <PaymentDetail orderId={rowId} open={open} setOpen={setOpen} refetch={handleRefetch} />
    </>
  );
}

export default OrderDataGrid;
