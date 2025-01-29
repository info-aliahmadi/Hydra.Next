import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// material-ui
import { Box, List, Typography } from '@mui/material';

// project import
import NavItem from './NavItem';
import { useTranslation } from 'react-i18next';
import Authorize from '@dashboard/(auth)/_service/Authorization/Authorize';

// ==============================|| NAVIGATION - LIST GROUP ||============================== //


const NavGroup = ({ item }: { item: MenuItem }) => {
  const menu = useSelector((state: any) => state.menu);
  const { drawerOpen } = menu;
  const navCollapse = item.children?.map((menuItem) => {
    return menuItem.permission ? (
      <Authorize key={menuItem.id + '_auth'} permission={menuItem.permission} accessDeniedElement={<></>}>
        <NavGroupSwitch menuItem={menuItem} />
      </Authorize>
    ) : (
      <NavGroupSwitch key={menuItem.id + '_auth'} menuItem={menuItem} />
    );
  });
  return item.permission ? (
    <Authorize permission={item.permission} accessDeniedElement={<></>}>
      <NavList key={item.id} item={item} navCollapse={navCollapse} drawerOpen={drawerOpen} />
    </Authorize>
  ) : (
    <NavList key={item.id} item={item} navCollapse={navCollapse} drawerOpen={drawerOpen} />
  );
};


const NavGroupSwitch = ({ menuItem }: { menuItem: MenuItem }) => {
  switch (menuItem.type) {
    case 'collapse':
      return (
        <Typography variant="caption" color="error" sx={{ p: 2.5 }}>
          collapse - only available in paid version
        </Typography>
      );
    case 'item':
      return <NavItem item={menuItem} level={1} />;
    default:
      return (
        <Typography variant="h6" color="error" align="center">
          Fix - Group Collapse or Items
        </Typography>
      );
  }
};

interface NavListProps {
  item: MenuItem;
  navCollapse: React.ReactNode;
  drawerOpen: boolean;
}

const NavList = ({ item, navCollapse, drawerOpen }: NavListProps) => {

  const {t} = useTranslation();
  const nsTranslation = 'navigation.';

  return (
    <List
      subheader={
        item.id &&
        drawerOpen && (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography variant="subtitle2" color="textSecondary">
              {t(nsTranslation + item.id)}
            </Typography>
          </Box>
        )
      }
      sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {navCollapse}
    </List>
  );
};
NavGroup.propTypes = {
  item: PropTypes.object
};

export default NavGroup;
