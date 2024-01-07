// project import
import authRoutes from '@dashboard/(auth)/_lib/routes';
import cmsRoutes from '@dashboard/(cms)/_lib/routes';
import crmRoutes from '@dashboard/(crm)/_lib/routes';
import saleRoutes from '@dashboard/(sale)/_lib/routes';
import fileStorageRoutes from '@dashboard/(filestorage)/_lib/routes';
import settingsRoutes from '@dashboard/(settings)/_lib/routes';


// ==============================|| MENU ITEMS ||============================== //

const AllRoutes ={ routes : [...authRoutes, ...cmsRoutes, ...crmRoutes, ...saleRoutes, ...fileStorageRoutes, ...settingsRoutes]};
  
export default AllRoutes;
