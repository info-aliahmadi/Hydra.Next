'use client'

import { useEffect, useState } from 'react';


import MessageService from '@dashboard/(crm)/_service/MessageService';
import ViewMessage from '@dashboard/(crm)/_components/message/ViewMessage';

export default function ViewOutboxMessage({params}) {
  const id = params.id;

  let messageService = new MessageService();
  const [message, setMessage] = useState();

  const loadMessage = () => {
    messageService.getMessageByIdForSender(id).then((result) => {
      setMessage(result);
    });
  };
  useEffect(() => {
    if (id > 0) loadMessage();
  }, [id]);

  return (
    <>
      <ViewMessage fromPage={'outbox'} message={message} />
    </>
  );
}
