// assets

import { Badge, Security, People } from '@mui/icons-material';
// icons
const icons = {
  Badge,
  Security,
  People
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: 'Authentication',
  type: 'group',
  permission: 'AUTH.GET_PERMISSION_LIST',
  children: [
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/usersList',
      icon: icons.People,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    },
    {
      id: 'roles',
      title: 'Roles',
      type: 'item',
      url: '/roleList',
      icon: icons.Badge,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    },
    {
      id: 'permissions',
      title: 'Permissions',
      type: 'item',
      url: '/PermissionList',
      icon: icons.Security,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    }
  ]
};

export default pages;
