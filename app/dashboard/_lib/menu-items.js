// project import
import authentication from '@dashboard/(auth)/_lib/menu-items';
import fileStorage from '@dashboard/(fileStorage)/_lib/menu-items';
import cms from '@dashboard/(cms)/_lib/menu-items';
import crm from '@dashboard/(crm)/_lib/menu-items';
import dashboard from './dashboard';


// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, authentication, cms, crm, fileStorage]
};

export default menuItems;
