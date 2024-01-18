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
import MessagesPrivateInboxDataGrid from '@dashboard/(crm)/_components/Message/MessagesPrivateInboxDataGrid';
import MessagesPublicInboxDataGrid from '@dashboard/(crm)/_components/Message/MessagesPublicInboxDataGrid';
import Link from 'next/link';

// ===============================|| COLOR BOX ||=============================== //

function MessagesInbox() {
  const [t] = useTranslation();
  let router = useRouter();
  const [value, setValue] = useState('1');

  const buttonName = 'buttons.message.messageInbox.';

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const MessageHeader = () => {
    return (
      <Grid container item direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Button
            component={Link}
            color="primary"
            variant="contained"
            href='/dashboard/message/send/0'
            startIcon={<Send />}
          >
            {t(buttonName + 'send')}
          </Button>
          <Button
            component={Link}
            color="warning"
            variant="contained"
            href='/dashboard/message/draft'
            startIcon={<Drafts />}
            sx={{ m: '0 15px' }}
          >
            {t('pages.cards.messagesDraft')}
          </Button>
        </Grid>
        <Grid item>
          <Chip
            href="/dashboard/message/inbox/trash"
            clickable
            component={Link}
            target="_blank"
            icon={<RestoreFromTrash />}
            label={t('pages.messagesTrash')}
            variant="outlined"
            size="medium"
            color="error"
            sx={{ borderRadius: '16px' }}
          />
        </Grid>
      </Grid>
    );
  };
  return (
    <>
      <Grid container justifyContent="center" direction="row" alignItems="flex-start">
        <Grid container spacing={3} item xs={12} sm={12} md={12} lg={12} direction="column">
          <Grid item>
            <Typography variant="h5">{t('pages.messagesInbox')}</Typography>
          </Grid>
          <Grid item>
            <MainCard title={<MessageHeader />}>
              <TableCard>
                <Box sx={{ width: '100%', typography: 'body1' }} mt={-2}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab icon={<Inbox />} value="1" iconPosition="start" label="Private" />
                        <Tab icon={<Feed />} value="2" iconPosition="start" label="Public" />
                      </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ p: '0' }}>
                      <MessagesPrivateInboxDataGrid />
                    </TabPanel>
                    <TabPanel value="2" sx={{ p: '0' }}>
                      <MessagesPublicInboxDataGrid />
                    </TabPanel>
                  </TabContext>
                </Box>
              </TableCard>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default MessagesInbox;
