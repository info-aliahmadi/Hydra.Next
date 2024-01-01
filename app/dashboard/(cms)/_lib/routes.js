
// ==============================|| ROUTE ITEMS ||============================== //

const cmsRoutes = [
  {
    path: '/dashboard/article/list',
    permission: 'AUTH.GET_PERMISSION_LIST'
  },
  {
    path: '/dashboard/page/list',
    permission: 'AUTH.GET_PERMISSION_LIST'
  },
  {
    path: '/dashboard/topic/list',
    permission: 'AUTH.GET_PERMISSION_LIST'
  },
  {
    path: '/dashboard/menu/list',
    permission: 'AUTH.GET_PERMISSION_LIST'
  },
  {
    path: '/dashboard/slideshow/list',
    permission: 'AUTH.GET_PERMISSION_LIST'
  },
  {
    path: '/dashboard/link/list',
    permission: 'AUTH.GET_PERMISSION_LIST'
  }
];
export default cmsRoutes
