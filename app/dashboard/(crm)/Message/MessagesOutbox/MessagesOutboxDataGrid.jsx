// material-ui
import { Box, Chip, IconButton, Link, Tooltip } from '@mui/material';

// project import
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import MessagesService from 'modules/crm/services/MessagesService';
import { DeleteSweep, AttachFile, Person } from '@mui/icons-material';
import Notify from '@dashboard/_components/@extended/Notify';
import MessageTypeChip from '../MessageTypeChip';
import RemoveDraftMessage from '../RemoveDraftMessage';
import { useNavigate } from 'react-router-dom';
import MainCard from '@dashboard/_components/MainCard';
import TableCard from '@dashboard/_components/TableCard';
import { MessageTypes } from '../MessageType';
// ===============================|| COLOR BOX ||=============================== //

export default function MessagesOutboxDataGrid() {
  const [t] = useTranslation();
  const [refetch, setRefetch] = useState();
  const navigate = useNavigate();

  const messagesService = new MessagesService();

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
          <Link href={'/message/outbox/view/' + row.original.id} underline="none" variant={'subtitle2'} display="block">
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
                  navigate('/message/new/0/' + user?.toUserId);
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

  const handleMessageList = useCallback(async (filters) => {
    return await messagesService.getSentMessages(filters);
  }, []);

  return (
    <>
      <MainCard title={t('pages.cards.messagesOutbox')}>
        <TableCard>
          <MaterialTable
            refetch={refetch}
            columns={columns}
            dataApi={handleMessageList}
            enableRowActions={false}
            defaultDensity="compact"
          />
        </TableCard>
      </MainCard>
    </>
  );
}
