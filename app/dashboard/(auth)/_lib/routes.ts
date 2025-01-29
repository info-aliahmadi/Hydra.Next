

// ==============================|| ROUTE ITEMS ||============================== //

const authRoutes = [
  {
    path: '/dashboard/user/list',
    permission: 'AUTH.GET_PERMISSION_LIST'
  },
  {
    path: '/dashboard/role/list',
    permission: 'AUTH.GET_PERMISSION_LIST'
  },
  {
    path: '/dashboard/permission/list',
    permission: 'AUTH.GET_PERMISSION_LIST'
  }
];
export default authRoutes;