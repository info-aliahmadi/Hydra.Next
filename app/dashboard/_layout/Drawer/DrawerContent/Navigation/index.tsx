// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menuItems from '@dashboard/_lib/menu-items';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const navGroups = Object.values(menuItems.items).map((item) => {
    if (item.type === 'group') {
      return <NavGroup key={item.id} item={item} />;
    } else {
      return (
        <Typography key={item.id} variant="h6" color="error" align="center">
          Fix - Navigation Group
        </Typography>
      );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
