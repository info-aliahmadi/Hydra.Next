import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import Language from '@mui/icons-material/Language';
import ManageAccounts from '@mui/icons-material/ManageAccounts';
import History from '@mui/icons-material/History';

// assets
import { useTranslation } from 'react-i18next';

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

const SettingTab = () => {
  const theme = useTheme();
  const [t] = useTranslation();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event : any, index : any) => {
    setSelectedIndex(index);
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)} href="/dashboard/change-language" >
        <ListItemIcon>
          <Language fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t('pages.language')} />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
        <ListItemIcon>
          <ManageAccounts fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t('pages.accountSettings')} />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)} >
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t('pages.settings')} />
      </ListItemButton>
      {/* <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
        <ListItemIcon>
          <LockOutlined />
        </ListItemIcon>
        <ListItemText primary="Privacy Center" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
        <ListItemIcon>
          <CommentOutlined />
        </ListItemIcon>
        <ListItemText primary="Feedback" />
      </ListItemButton> */}
      <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
        <ListItemIcon>
          <History />
        </ListItemIcon>
        <ListItemText primary={t('pages.history')} />
      </ListItemButton>
    </List>
  );
};

export default SettingTab;
