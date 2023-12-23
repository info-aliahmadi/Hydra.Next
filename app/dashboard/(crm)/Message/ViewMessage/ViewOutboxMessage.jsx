import { useEffect, useState } from 'react';


import MessagesService from 'modules/crm/services/MessagesService';
import { useParams } from 'react-router-dom';

import ViewMessage from './ViewMessage';

export default function ViewOutboxMessage() {
  const params = useParams();
  const id = params.id;

  let messageService = new MessagesService();
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
