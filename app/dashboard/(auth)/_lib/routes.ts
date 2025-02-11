

// ==============================|| ROUTE ITEMS ||============================== //

import { AUTH_PERMISSION_MANAGEMENT, AUTH_USER_MANAGEMENT } from "../../_lib/Permissions";

const authRoutes = [
  {
    path: '/dashboard/user/list',
    permission: AUTH_USER_MANAGEMENT
  },
  {
    path: '/dashboard/role/list',
    permission: AUTH_PERMISSION_MANAGEMENT
  },
  {
    path: '/dashboard/permission/list',
    permission: AUTH_PERMISSION_MANAGEMENT
  }
];
export default authRoutes;