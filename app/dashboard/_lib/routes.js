// project import
import authRoutes from '@dashboard/(auth)/_lib/routes';
import cmsRoutes from '@dashboard/(cms)/_lib/routes';
import crmRoutes from '@dashboard/(crm)/_lib/routes';
import fileStorageRoutes from '@dashboard/(fileStorage)/_lib/routes';
import settingsRoutes from '@dashboard/(settings)/_lib/routes';


// ==============================|| MENU ITEMS ||============================== //

const AllRoutes ={ routes : [...authRoutes, ...cmsRoutes, ...crmRoutes, ...fileStorageRoutes, ...settingsRoutes]};
  
export default AllRoutes;