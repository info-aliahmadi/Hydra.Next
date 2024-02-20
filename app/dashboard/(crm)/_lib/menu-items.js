// assets
import { Message, Email, FollowTheSigns } from '@mui/icons-material';
// icons
const icons = {
  Message,
  Email,
  FollowTheSigns
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
      id: 'emailInbox',
      title: 'Email Inbox',
      type: 'item',
      url: '/dashboard/email/inbox',
      icon: icons.Email,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    },
    {
      id: 'subscribe',
      title: 'Subscribes',
      type: 'item',
      url: '/dashboard/subscribe/list',
      icon: icons.FollowTheSigns,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    }
  ]
};

export default pages;
