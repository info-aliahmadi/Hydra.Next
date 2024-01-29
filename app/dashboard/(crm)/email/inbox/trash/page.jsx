'use client';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';

// project import
import { useTranslation } from 'react-i18next';
import { Inbox, Feed } from '@mui/icons-material';
import { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { RestoreFromTrash, Send, Drafts } from '@mui/icons-material';

import MainCard from '@dashboard/_components/MainCard';
import TableCard from '@dashboard/_components/TableCard';
import { useRouter } from 'next/navigation';
import EmailInboxTrashDataGrid from '@dashboard/(crm)/_components/Email/Inbox/EmailInboxTrashDataGrid';
import Link from 'next/link';

// ===============================|| COLOR BOX ||=============================== //

function EmailInboxsInbox() {
  const [t] = useTranslation();
  let router = useRouter();
  const [value, setValue] = useState('1');

  const buttonName = 'buttons.emailInbox.emailInboxInbox.';

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const EmailInboxHeader = () => {
    return (
      <Grid container item direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Button
            component={Link}
            color="primary"
            variant="contained"
            href='/dashboard/emailInbox/send/0'
            startIcon={<Send />}
          >
            {t(buttonName + 'send')}
          </Button>
          <Button
            component={Link}
            color="warning"
            variant="contained"
            href='/dashboard/emailInbox/draft'
            startIcon={<Drafts />}
            sx={{ m: '0 15px' }}
          >
            {t('pages.cards.emailInboxsDraft')}
          </Button>
        </Grid>
      </Grid>
    );
  };
  return (
    <>
      <Grid container justifyContent="center" direction="row" alignItems="flex-start">
        <Grid container spacing={3} item xs={12} sm={12} md={12} lg={12} direction="column">
          <Grid item>
            <Typography variant="h5">{t('pages.emailInboxsInbox')}</Typography>
          </Grid>
          <Grid item>
            <MainCard title={<EmailInboxHeader />}>
              <TableCard>
                <EmailInboxTrashDataGrid />
              </TableCard>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default EmailInboxsInbox;
