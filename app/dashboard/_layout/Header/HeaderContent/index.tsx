'use client'
// material-ui
import { Box, IconButton, Tooltip, useMediaQuery, useTheme } from '@mui/material';

// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import axios from 'axios';
import CONFIG from '@root/config';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

  const [t] = useTranslation();
  const { data: session, update } = useSession();
  const theme = useTheme();

  const handleThemeMode = async (mode: 'light' | 'dark') => {
    if (session) {
      session.user.defaultTheme = mode;
      await update({ ...session, user: session.user });
    }
    axios.get(CONFIG.API_BASEPATH + '/Auth/SetDefaultTheme', { params: { defaultTheme: mode } }).catch((error) => {
    });
  };
  return (
    <>
      {!matchesXs && <Search />}
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

      {theme.palette.mode == 'light' ? (
        <Tooltip title={t('tooltips.switch-to-darkmode')}>
          <IconButton
            disableRipple
            aria-label="open drawer"
            onClick={() => handleThemeMode('dark')}
            edge="start"
            color="secondary"
            sx={{ color: 'text.primary' }}
          >
            <Brightness4Icon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={t('tooltips.switch-to-lightmode')}>
          <IconButton
            disableRipple
            aria-label="open drawer"
            onClick={() => handleThemeMode('light')}
            edge="start"
            color="secondary"
            sx={{ color: 'text.primary' }}
          >
            <Brightness7Icon />
          </IconButton>
        </Tooltip>
      )}
      {/* <Localization /> */}
      <Notification />
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
