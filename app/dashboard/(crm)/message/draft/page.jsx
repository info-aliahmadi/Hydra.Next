'use client';
import { Button, Grid, Typography } from '@mui/material';

// project import
import { useTranslation } from 'react-i18next';
import { ArrowBack, Send } from '@mui/icons-material';

import { useRouter } from 'next/navigation';
import MessagesDraftDataGrid from '@dashboard/(crm)/_components/message/MessagesDraftDataGrid';
import MainCard from '@dashboard/_components/MainCard';
import TableCard from '@dashboard/_components/TableCard';
import Link from 'next/link';
import AnimateButton from '@dashboard/_components/@extended/AnimateButton';

// ===============================|| COLOR BOX ||=============================== //

export default function MessagesOutbox() {
  const [t] = useTranslation();
  let router = useRouter();

  const buttonName = 'buttons.message.messageInbox.';

  const MessageHeader = () => {
    return (
      <Grid container item direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <AnimateButton>
            <Button
              size="large"
              onClick={() => {
                router.back();
              }}
              variant="outlined"
              color="secondary"
              startIcon={<ArrowBack />}
            >
            {t('pages.cards.messagesInbox')}
            </Button>
          </AnimateButton>
        
        </Grid>
      </Grid>
    );
  };
  return (
    <>
      <Grid container justifyContent="center" direction="row" alignItems="flex-start">
        <Grid container spacing={3} item xs={12} sm={12} md={12} lg={12} direction="column">
          <Grid item>
            <Typography variant="h5">{t('pages.messagesDraft')}</Typography>
          </Grid>
          <Grid item>
            <MainCard title={<MessageHeader />}>
              <TableCard>
                <MessagesDraftDataGrid />
              </TableCard>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
