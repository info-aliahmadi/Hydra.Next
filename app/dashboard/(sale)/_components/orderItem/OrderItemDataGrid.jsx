// project import
import MainCard from '@dashboard/_components/MainCard';
import TableCard from '@dashboard/_components/TableCard';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import { useSession } from 'next-auth/react';
import OrderService from '../../_service/OrderService';

// ===============================|| COLOR BOX ||=============================== //

function OrderItemDataGrid({ id }) {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;
  const service = new OrderService(jwt);
  const [refetch, setRefetch] = useState();
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

  const handleOrderItemList = useCallback(async () => {
    debugger;
    return await service.getOrderItemList(id);
  }, []);

  return (
    <>
      <MainCard>
        <TableCard>
          <MaterialTable refetch={refetch} columns={columns} dataApi={handleOrderItemList} />
        </TableCard>
      </MainCard>
    </>
  );
}

export default OrderItemDataGrid;
