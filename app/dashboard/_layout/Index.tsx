'use client';
import { useEffect, useState, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';

// project import
import navigation from '@dashboard/_lib/menu-items';

// types
import { openDrawer } from '@root/store/reducers/menu';
import Header from './Header';
import MainDrawer from './Drawer';
import Breadcrumbs from '@dashboard/_components/@extended/Breadcrumbs';

// ==============================|| MAIN LAYOUT ||============================== //


export default function DashboardLayout({ children }: { children: any }) {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const dispatch = useDispatch();

  const { drawerOpen } = useSelector((state : any) => state.menu);

  // drawer toggler
  const [open, setOpen] = useState(drawerOpen);
  const [minimize, setMinimize] = useState(false);

  const handleDrawerToggle = () => {
    setMinimize(open === true);
    setOpen(!open);
    dispatch(openDrawer({ drawerOpen: !open }));
  };
  const handleDrawerOpen = () => {
    setOpen(true);
    dispatch(openDrawer({ drawerOpen: true }));
  };
  const handleDrawerClose = () => {
    setOpen(false);
    dispatch(openDrawer({ drawerOpen: false }));
  };

  // set media wise responsive drawer
  useEffect(() => {
    setOpen(!matchDownLG);
    dispatch(openDrawer({ drawerOpen: !matchDownLG }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownLG]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen]);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <MainDrawer
        open={open}
        handleDrawerToggle={handleDrawerToggle}
        handleDrawerOpen={minimize ? handleDrawerOpen : null}
        handleDrawerClose={minimize ? handleDrawerClose : null}
      />
      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        <Breadcrumbs navigation={navigation} title />
        {children}
      </Box>
    </Box>
  );
}
