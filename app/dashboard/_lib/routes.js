// project import
import authRoutes from '@dashboard/(auth)/_lib/routes';
import settingsRoutes from '@dashboard/(settings)/_lib/routes';


// ==============================|| MENU ITEMS ||============================== //

const AllRoutes ={ routes : [...authRoutes, ...settingsRoutes]};
  
export default AllRoutes;
