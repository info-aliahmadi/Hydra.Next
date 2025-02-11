// assets

import { Badge, Security, People } from '@mui/icons-material';
import { AUTH_PERMISSION_MANAGEMENT, AUTH_USER_MANAGEMENT } from '../../_lib/Permissions';
// icons
const icons = {
  Badge,
  Security,
  People
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const authentication: MenuItem = {
  id: 'authentication',
  title: 'Authentication',
  type: 'group',
  permission: AUTH_USER_MANAGEMENT,
  children: [
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/dashboard/user/list',
      icon: icons.People,
      breadcrumbs: false,
      permission: AUTH_USER_MANAGEMENT
    },
    {
      id: 'roles',
      title: 'Roles',
      type: 'item',
      url: '/dashboard/role/list',
      icon: icons.Badge,
      breadcrumbs: false,
      permission: AUTH_PERMISSION_MANAGEMENT
    },
    {
      id: 'permissions',
      title: 'Permissions',
      type: 'item',
      url: '/dashboard/permission/list',
      icon: icons.Security,
      breadcrumbs: false,
      permission: AUTH_PERMISSION_MANAGEMENT
    }
  ]
};

export default authentication;
