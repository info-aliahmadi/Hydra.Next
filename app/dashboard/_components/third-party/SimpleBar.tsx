// material-ui
import { alpha, styled } from '@mui/material/styles';
import { Box , useTheme } from '@mui/material';

// third-party
import SimpleBar from 'simplebar-react';
import { BrowserView, MobileView } from 'react-device-detect';

const RootStyle = styled(BrowserView)({
  flexGrow: 1,
  height: '100%',
  overflowY: 'auto',
});

// scroll bar wrapper
const SimpleBarStyle = styled(SimpleBar)(({ theme }) => ({
  maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[500], 0.9)
    },
    '&.simplebar-visible:before': {
      opacity: 1
    }
  },
  '& .simplebar-track.simplebar-vertical': {
    width: 10
  },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 6
  },
  '& .simplebar-mask': {
    zIndex: 'inherit'
  },
  '& .simplebar-placeholder': {
    height: '20px !important'
  }
}));

// ==============================|| SIMPLE SCROLL BAR  ||============================== //

import { ReactNode } from 'react';

export default function SimpleBarScroll({ children, sx, ...other }: Readonly<{ children: ReactNode, sx?: object }>) {

  const theme = useTheme();
  let themeMode = theme.palette.mode;
  return (
    <>
      <RootStyle className={themeMode == 'light' ? 'scroll' : 'scroll-dark'}>
        <SimpleBarStyle clickOnTrack={false} sx={sx} {...other}>
          {children}
        </SimpleBarStyle>
      </RootStyle>
      <MobileView>
        <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
          {children}
        </Box>
      </MobileView>
    </>
  );
}