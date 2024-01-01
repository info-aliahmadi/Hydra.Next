
// ==============================|| ROUTES ITEMS ||============================== //
const crmRoutes = [
  {
    path: '/dashboard/message/inbox',
    permission: 'AUTH.GET_PERMISSION_LIST'
  },
  {
    path: '/dashboard/message/outbox',
    permission: 'AUTH.GET_PERMISSION_LIST'
  },
  {
    path: '/dashboard/email/inbox',
    permission: 'AUTH.GET_PERMISSION_LIST'
  },
  {
    path: '/dashboard/email/outbox',
    permission: 'AUTH.GET_PERMISSION_LIST'
  }
]

export default crmRoutes;