// material-ui
import { Box, IconButton, Link, Tooltip } from '@mui/material';

// project import
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import { Delete, PushPin, AttachFile } from '@mui/icons-material';
import Notify from '@dashboard/_components/@extended/Notify';
import MessageService from '@dashboard/(crm)/_service/MessageService';
import MessageTypeChip from './MessageTypeChip';
import DeleteMessage from './DeleteMessage';
import { MessageTypes } from './MessageType';
import { useSession } from 'next-auth/react';
// ===============================|| COLOR BOX ||=============================== //

function MessagesPrivateInboxDataGrid() {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  const [openDelete, setOpenDelete] = useState(false);
  const [row, setRow] = useState({});
  const [refetch, setRefetch] = useState();
  const [notify, setNotify] = useState({ open: false });

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
            href={'/dashboard/message/inbox/' + row.original.id}
            underline="none"
            variant={row.original.toUser.isRead ? 'subtitle2' : 'subtitle1'}
            display="block"
          >
            {renderedCellValue}
            {row.original.haveAttachment && <AttachFile fontSize="medium" sx={{ verticalAlign: 'middle' }} />}
          </Link>
        )
      },
      {
        accessorKey: 'fromUser',
        header: t(fieldsName + 'fromUser'),
        enableClickToCopy: false,
        type: 'string',
        enableResizing: true,

        maxSize: 100,
        Cell: ({ renderedCellValue, row }) =>
          row.original.fromUserId > 0 ? (
            <Link
              href={'/dashboard/message/inbox/' + row.original.id}
              underline="none"
              title={renderedCellValue.email}
              variant={row.original.toUser.isRead ? 'subtitle2' : 'subtitle1'}
              display="block"
            >
              {renderedCellValue.name}
            </Link>
          ) : (
            <Link
              href={'/sendEmail/' + row.original.email}
              title={row.original.email}
              variant={row.original.toUser.isRead ? 'subtitle2' : 'subtitle1'}
              display="block"
            >
              {row.original.name ? row.original.name : row.original.email}
            </Link>
          )
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
  const handleDeleteRow = (row) => {
    setRow(row);
    setOpenDelete(true);
  };
  const handleRefetch = () => {
    setRefetch(Date.now());
  };

  const handlePinRow = (messageId) => {
    messagesService
      .pinMessage(messageId)
      .then(() => {
        handleRefetch();
      })
      .catch((error) => {
        setNotify({ open: true, type: 'error', description: error });
      });
  };
  const handleMessageList = useCallback(async (filters) => {
    return await messagesService.getInboxMessages(filters);
  }, []);

  const DeleteOrPin = useCallback(
    ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'nowrap' }}>
        <Tooltip arrow placement="top-start" title={t('buttons.delete')}>
          <IconButton color="error" onClick={() => handleDeleteRow(row)}>
            <Delete />
          </IconButton>
        </Tooltip>

        <Tooltip arrow placement="top-start" title={t('buttons.pin')}>
          <IconButton onClick={() => handlePinRow(row.original.id)} color={row.original.toUser.isPin ? 'warning' : 'secondary'}>
            <PushPin />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    []
  );

  return (
    <>
      <Notify notify={notify} setNotify={setNotify}></Notify>
      <MaterialTable
        refetch={refetch}
        columns={columns}
        dataApi={handleMessageList}
        enableRowActions={true}
        renderRowActions={DeleteOrPin}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            //header: 'Change Account Settings', //change header text
            size: 40 //make actions column wider
          }
        }}
        defaultDensity="compact"
      />
      <DeleteMessage row={row} open={openDelete} setOpen={setOpenDelete} refetch={handleRefetch} />
    </>
  );
}

export default MessagesPrivateInboxDataGrid;
