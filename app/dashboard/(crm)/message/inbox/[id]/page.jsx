'use client'
import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import ViewMessage from '../../../_components/message/ViewMessage';
import MessageService from '@dashboard/(crm)/_service/MessageService';

export default function ViewInboxMessage({params}) {
  const [t, i18n] = useTranslation();
  const id = params.id;

  let messageService = new MessageService();
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
