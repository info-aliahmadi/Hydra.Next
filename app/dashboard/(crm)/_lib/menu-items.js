// assets
import { Message, Email, Outbox, ForwardToInbox } from '@mui/icons-material';
// icons
const icons = {
  Message,
  Email,
  Outbox,
  ForwardToInbox
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //
const pages = {
  id: 'messaging',
  title: 'Messaging',
  type: 'group',
  permission: 'AUTH.GET_PERMISSION_LIST',
  children: [
    {
      id: 'messageInbox',
      title: 'Message Inbox',
      type: 'item',
      url: '/dashboard/message/inbox',
      icon: icons.Message,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    },
    {
      id: 'messageOutbox',
      title: 'Message Outbox',
      type: 'item',
      url: '/dashboard/message/outbox',
      icon: icons.Outbox,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    },
    {
      id: 'emailInbox',
      title: 'Email Inbox',
      type: 'item',
      url: '/dashboard/email/inbox',
      icon: icons.Email,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    },
    {
      id: 'emailOutbox',
      title: 'Email Outbox',
      type: 'item',
      url: '/dashboard/email/outbox',
      icon: icons.ForwardToInbox,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    }
  ]
};

export default pages;
