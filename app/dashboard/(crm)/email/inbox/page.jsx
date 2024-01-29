'use client';
import { Button, Chip, Grid, Typography } from '@mui/material';

// project import
import { useTranslation } from 'react-i18next';

import { Email, RestoreFromTrash } from '@mui/icons-material';

import MainCard from '@dashboard/_components/MainCard';
import TableCard from '@dashboard/_components/TableCard';
import EmailInboxDataGrid from '@dashboard/(crm)/_components/Email/Inbox/EmailInboxDataGrid';
import Link from 'next/link';

// ===============================|| COLOR BOX ||=============================== //

function EmailInboxsInbox() {
  const [t] = useTranslation();

  const buttonName = 'buttons.email.emailInbox.';

 
  const EmailInboxHeader = () => {
    return (
      <Grid container item direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Button
            component={Link}
            color="primary"
            variant="contained"
            href='/dashboard/email/send/0'
            startIcon={<Email />}
          >
            {t(buttonName + 'send')}
          </Button>
        </Grid>
        <Grid item>
          <Chip
            href="/dashboard/email/inbox/trash"
            clickable
            component={Link}
            target="_blank"
            icon={<RestoreFromTrash />}
            label={t('pages.emailInboxsTrash')}
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
            <Typography variant="h5">{t('pages.emailInboxs')}</Typography>
          </Grid>
          <Grid item>
            <MainCard title={<EmailInboxHeader />}>
              <TableCard>
                <EmailInboxDataGrid />
              </TableCard>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default EmailInboxsInbox;
