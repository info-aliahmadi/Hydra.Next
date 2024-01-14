'use client';
import 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';

import Button from '@mui/material/Button';

import MenuIcon from '@mui/icons-material/Menu';

import { useState } from 'react';

export default function MenuItems({ menuItemsData }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
      <Box sx={{ order: 1, flexGrow: 0, m: '5px 5px 15px 5px', display: { xs: 'flex', md: 'none' } }}>
        <Button
          variant="contained"
          color="info"
          size="large"
          aria-label="Menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          // sx={{ }}
        >
          <MenuIcon />
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' }
          }}
          className="menu-link"
        >
          {menuItemsData?.map((item) => (
            <MenuItem key={item.id} onClick={handleCloseNavMenu}>
              <Link key={item.id} href={item.url} sx={{ m: 2, display: 'block' }}>
                {item.title}
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box
        className="navigation-menu"
        sx={{ order: 1, flexGrow: 1, display: { xs: 'none', md: 'flex', alignItems: 'center', textAlign: 'center' } }}
      >
        {menuItemsData?.map((item) => (
          <Link key={item.id} href={item.url} sx={{ m: 2, display: 'block' }}>
            {item.title}
          </Link>
        ))}
      </Box>
    </>
  );
}
