// material-ui
import { Box, Chip, IconButton, Link, Tooltip } from '@mui/material';

// project import
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import DeleteSweep from '@mui/icons-material/DeleteSweep';
import AttachFile from '@mui/icons-material/AttachFile';
import  Person  from '@mui/icons-material/Person';
import Notify from '@dashboard/_components/@extended/Notify';
import MessageTypeChip from './MessageTypeChip';
import RemoveDraftMessage from './RemoveDraftMessage';
import { MessageTypes } from './MessageType';
import MainCard from '@dashboard/_components/MainCard';
import TableCard from '@dashboard/_components/TableCard';
import { useRouter } from 'next/navigation';
import MessageService from '@dashboard/(crm)/_service/MessageService';
import { useSession } from 'next-auth/react';
// ===============================|| COLOR BOX ||=============================== //

export default function MessagesDraftDataGrid() {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  const [openDelete, setOpenDelete] = useState(false);
  const [row, setRow] = useState({});
  const [refetch, setRefetch] = useState();
  const [notify, setNotify] = useState({ open: false });
  const router = useRouter();

  const messagesService = new MessageService(jwt);

  const fieldsName = 'fields.message.messageInbox.';

  const columns = useMemo(
    () => [
      {
        accessorKey: 'messageType',
        header: t(fieldsName + 'messageType.messageType'),
        enableClickToCopy: true,
        type: 'number',
        enableResizing: true,
        minSize: 60,
        maxSize: 60,
        size: 60,
        filterVariant: 'select',
        filterSelectOptions: MessageTypes.map((a) => ({ value: a.id, text: t('fields.message.messageInbox.messageType.' + a.title) })),
        Cell: ({ renderedCellValue }) => <MessageTypeChip messageTypeId={renderedCellValue} />
      },
      {
        accessorKey: 'subject',
        header: t(fieldsName + 'subject'),
        enableClickToCopy: false,
        type: 'string',
        enableResizing: true,
        Cell: ({ renderedCellValue, row }) => (
          <Link
            href={'/dashboard/message/send/' + row.original.id}
            underline="none"
            variant={row.original.isDraft ? 'subtitle2' : 'subtitle1'}
            display="block"
          >
            {renderedCellValue}
            {row.original.haveAttachment && <AttachFile fontSize="medium" sx={{ verticalAlign: 'middle' }} />}
          </Link>
        )
      },
      {
        accessorKey: 'toUsers',
        header: t(fieldsName + 'toUsers'),
        enableClickToCopy: false,
        type: 'string',
        enableResizing: true,
        maxSize: 100,
        Cell: ({ renderedCellValue, row }) =>
          renderedCellValue.length > 0 &&
          renderedCellValue.map((user) => {
            return (
              <Chip
                key={user?.toUserId}
                onClick={() => {
                  router.push('/dashboard/message/send/0/' + user?.toUserId);
                }}
                icon={<Person />}
                title={user?.toUser?.name}
                label={user?.toUser?.userName}
                variant="filled"
                size="medium"
                sx={{ borderRadius: '16px', m: '0 2px' }}
              />
            );
          })
      },

      {
        accessorKey: 'registerDate',
        header: t(fieldsName + 'registerDate'),
        type: 'dateTime',
        maxSize: 60
      }
    ],
    []
  );
  const handleRemoveRow = (row) => {
    setRow(row);
    setOpenDelete(true);
  };
  const handleRefetch = () => {
    setRefetch(Date.now());
  };

  const handleMessageList = useCallback(async (filters) => {
    return await messagesService.getDraftMessages(filters);
  }, []);

  const Remove = useCallback(
    ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'nowrap' }}>
        <Tooltip arrow placement="top-start" title={t('buttons.remove')}>
          <IconButton color="error" onClick={() => handleRemoveRow(row)}>
            <DeleteSweep />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    []
  );

  return (
    <>
      <Notify notify={notify} setNotify={setNotify}></Notify>
      <MainCard title={t('pages.cards.messagesDraft')}>
        <TableCard>
          <MaterialTable
            refetch={refetch}
            columns={columns}
            dataApi={handleMessageList}
            enableRowActions={true}
            renderRowActions={Remove}
            displayColumnDefOptions={{
              'mrt-row-actions': {
                //header: 'Change Account Settings', //change header text
                size: 40 //make actions column wider
              }
            }}
            defaultDensity="compact"
          />
        </TableCard>
      </MainCard>
      <RemoveDraftMessage row={row} open={openDelete} setOpen={setOpenDelete} refetch={handleRefetch} />
    </>
  );
}
