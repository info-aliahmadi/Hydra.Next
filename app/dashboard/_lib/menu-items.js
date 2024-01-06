// project import
import fileStorage from '@dashboard/(filestorage)/_lib/menu-items';
import authentication from '@dashboard/(auth)/_lib/menu-items';
import cms from '@dashboard/(cms)/_lib/menu-items';
import crm from '@dashboard/(crm)/_lib/menu-items';
import sale from '@dashboard/(sale)/_lib/menu-items';
import dashboard from './dashboard';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, authentication, cms, crm, sale, fileStorage]
};
export default menuItems;
