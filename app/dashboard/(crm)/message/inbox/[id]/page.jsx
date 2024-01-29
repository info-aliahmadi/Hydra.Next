'use client'
import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import ViewMessage from '@dashboard/(crm)/_components/Message/ViewMessage';
import MessageService from '@dashboard/(crm)/_service/MessageService';
import { useSession } from 'next-auth/react';

export default function ViewInboxMessage({params}) {
  const [t, i18n] = useTranslation();
  const id = params.id;

  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  let messageService = new MessageService(jwt);
  const [message, setMessage] = useState();

  const loadMessage = () => {
    messageService.getMessageByIdForReceiver(id).then((result) => {
      setMessage(result);
    });
  };
  useEffect(() => {
    if (id > 0) loadMessage();
  }, [id]);

  return <ViewMessage fromPage={'inbox'} message={message} />;
}
