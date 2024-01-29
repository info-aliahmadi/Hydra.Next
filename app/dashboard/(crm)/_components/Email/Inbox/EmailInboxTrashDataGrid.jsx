// material-ui
import { Box, IconButton, Link, Tooltip } from '@mui/material';

// project import
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import { AttachFile, RestoreFromTrash } from '@mui/icons-material';
import Notify from '@dashboard/_components/@extended/Notify';
import MainCard from '@dashboard/_components/MainCard';
import TableCard from '@dashboard/_components/TableCard';
import EmailInboxService from '@dashboard/(crm)/_service/EmailInboxService';
import { useSession } from 'next-auth/react';
// ===============================|| COLOR BOX ||=============================== //

export default function EmailInboxTrashDataGrid() {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  const [refetch, setRefetch] = useState();
  const [notify, setNotify] = useState({ open: false });

  const emailInboxsService = new EmailInboxService(jwt);

  const fieldsName = 'fields.emailInbox.emailInboxInbox.';

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

  const handleRefetch = () => {
    setRefetch(Date.now());
  };
  const handleRestoreRow = (row) => {
    let emailInboxId = row.original.id;
    emailInboxsService
      .restoreEmailInbox(emailInboxId)
      .then(() => {
        setNotify({ open: true });
        handleRefetch();
      })
      .catch((error) => {
        setNotify({ open: true, type: 'error', description: error });
      });
  };
  const handleEmailInboxList = useCallback(async (filters) => {
    return await emailInboxsService.getDeletedEmailInbox(filters);
  }, []);

  const Restore = useCallback(
    ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'nowrap' }}>
        <Tooltip arrow placement="top-start" title={t('buttons.restore')}>
          <IconButton color="success" onClick={() => handleRestoreRow(row)}>
            <RestoreFromTrash />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    []
  );

  return (
    <>
      <Notify notify={notify} setNotify={setNotify}></Notify>
      <MainCard title={t('pages.cards.emailInboxsDeleted')}>
        <TableCard>
          <MaterialTable
            refetch={refetch}
            columns={columns}
            dataApi={handleEmailInboxList}
            enableRowActions={true}
            renderRowActions={Restore}
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
    </>
  );
}
