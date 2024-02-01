'use client'
import { useEffect, useState } from 'react';

import ViewEmailInbox from '@dashboard/(crm)/_components/Email/Inbox/ViewEmailInbox';
import EmailInboxService from '@dashboard/(crm)/_service/EmailInboxService';
import { useSession } from 'next-auth/react';

export default function ViewInboxEmail({params}) {
  const id = params.id;

  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  let emailInboxService = new EmailInboxService(jwt);
  const [emailInbox, setEmailInbox] = useState();

  const loadEmailInbox = () => {
    emailInboxService.getEmailInboxById(id).then((result) => {
      setEmailInbox(result);
      emailInboxService.readEmailInbox(id);
    });
  };
  useEffect(() => {
    if (id > 0) loadEmailInbox();
  }, [id]);

  return <ViewEmailInbox emailInbox={emailInbox} />;
}
