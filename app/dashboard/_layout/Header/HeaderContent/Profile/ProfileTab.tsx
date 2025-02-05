import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AccountBox from '@mui/icons-material/AccountBox';
import Password from '@mui/icons-material/Password';
import Logout from '@mui/icons-material/Logout';
// assets
import { EditOutlined, ProfileOutlined, LogoutOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout }: { handleLogout: () => void }) => {
  const theme = useTheme();
  const [t] = useTranslation();

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const handleListItemClick = (event : any, index : number) => {
    setSelectedIndex(index);
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}  href="/dashboard/account/profile">
        <ListItemIcon>
          <AccountBox fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t('pages.edit-profile')} />
      </ListItemButton>
      {/* <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton> */}

      {/* <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
        <ListItemIcon>
          <ProfileOutlined />
        </ListItemIcon>
        <ListItemText primary="Social Profile" />
      </ListItemButton> */}
      <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)} href="/dashboard/account/change-password">
        <ListItemIcon>
          <Password fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t('pages.change-password')} />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t('navigation.logout')} />
      </ListItemButton>
    </List>
  );
};

export default ProfileTab;
