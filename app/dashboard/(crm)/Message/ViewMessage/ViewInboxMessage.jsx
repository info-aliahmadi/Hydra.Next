import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import MessagesService from 'modules/crm/services/MessagesService';
import { useParams } from 'react-router-dom';
import ViewMessage from './ViewMessage';

export default function ViewInboxMessage() {
  const [t, i18n] = useTranslation();
  const params = useParams();
  const id = params.id;

  let messageService = new MessagesService();
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
