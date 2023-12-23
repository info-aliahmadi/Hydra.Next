'use server';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Fab from '@mui/material/Fab';

import Logo from './Logo';
import RequestButtons from './RequestButtons';
import ElevationScroll from './ElevationScroll';
import ScrollTop from './ScrollTop';
import MenuItems from './MenuItems';
import HomeService from '@(home)/_service/HomeService';

export default async function Navigation({ props }) {
  var service = new HomeService();
  const menuItemsData = await service.getMenu();

  return (
    <React.Fragment>
      <CssBaseline />
      <div id="back-to-top-anchor"></div>
      <ElevationScroll {...props} style={{ zIndex: 99999999 }}>
        <AppBar style={{ zIndex: 99999999 }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ alignItems: 'flex-start' }}>
              <Logo sx={{ order: 0, flexGrow: 1, mr: 1, mt: '5px' }} />
              <MenuItems menuItemsData={menuItemsData} />
              <Box sx={{ order: 3, flexGrow: 0, display: 'flex', m: '5px 5px 15px 5px' }}>
                <RequestButtons />
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      <ScrollTop {...props}>
        <Fab size="large" aria-label="scroll back to top" variant="contained" color="info">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
