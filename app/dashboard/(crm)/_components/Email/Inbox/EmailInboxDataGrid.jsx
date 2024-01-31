// material-ui
import { Box, IconButton, Link, Tooltip } from '@mui/material';

// project import
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import { Delete, PushPin, AttachFile } from '@mui/icons-material';
import Notify from '@dashboard/_components/@extended/Notify';
import EmailInboxService from '@dashboard/(crm)/_service/EmailInboxService';
import DeleteEmailInbox from './DeleteEmailInbox';
import { useSession } from 'next-auth/react';
// ===============================|| COLOR BOX ||=============================== //

export default function EmailInboxDataGrid({ reloadCall }) {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  const [openDelete, setOpenDelete] = useState(false);
  const [row, setRow] = useState({});
  const [refetch, setRefetch] = useState();
  const [notify, setNotify] = useState({ open: false });

  const emailInboxsService = new EmailInboxService(jwt);

  const fieldsName = 'fields.email.emailInbox.';

  useEffect(() => {
    handleRefetch()
  }, [reloadCall]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'fromAddress',
        header: t(fieldsName + 'fromAddress'),
        enableClickToCopy: false,
        type: 'string',
        enableResizing: true,

        maxSize: 60,
        Cell: ({ renderedCellValue, row }) => {
          renderedCellValue?.map((email, index) => {
            <Link
              key={index}

              href={'/dashboard/email/send/' + email.email}
              underline="none"
              title={renderedCellValue.email}
              variant={row.original.isRead ? 'subtitle2' : 'subtitle1'}
              display="block"
            >
              {renderedCellValue.name}
            </Link>
          })
        }
      },
      {
        accessorKey: 'subject',
        header: t(fieldsName + 'subject'),
        enableClickToCopy: false,
        type: 'string',
        enableResizing: true,
        Cell: ({ renderedCellValue, row }) => (
          <Link
            href={'/dashboard/email/inbox/' + row.original.id}
            underline="none"
            variant={row.original.isRead ? 'subtitle2' : 'subtitle1'}
            display="block"
          >
            {renderedCellValue}
            {row.original.haveAttachment && <AttachFile fontSize="medium" sx={{ verticalAlign: 'middle' }} />}
          </Link>
        )
      },
      {
        accessorKey: 'registerDate',
        header: t(fieldsName + 'registerDate'),
        type: 'dateTime'
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

  const handlePinRow = (emailInboxId) => {
    emailInboxsService
      .pinEmailInbox(emailInboxId)
      .then(() => {
        handleRefetch();
      })
      .catch((error) => {
        setNotify({ open: true, type: 'error', description: error });
      });
  };
  const handleEmailInboxList = useCallback(async (filters) => {
    return await emailInboxsService.getAllEmailInbox(filters);
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
          <IconButton onClick={() => handlePinRow(row.original.id)} color={row.original.isPin ? 'warning' : 'secondary'}>
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
        dataApi={handleEmailInboxList}
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
      <DeleteEmailInbox row={row} open={openDelete} setOpen={setOpenDelete} refetch={handleRefetch} />
    </>
  );
}
