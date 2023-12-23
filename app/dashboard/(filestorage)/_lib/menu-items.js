// assets
import { Storage } from '@mui/icons-material';
// icons
const icons = {
  Storage
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  permission: 'AUTH.GET_PERMISSION_LIST',
  children: [
    {
      id: 'fileStorage',
      title: 'Storage',
      type: 'item',
      url: '/dashboard/filestorage',
      icon: icons.Storage,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    }
  ]
};

export default pages;
