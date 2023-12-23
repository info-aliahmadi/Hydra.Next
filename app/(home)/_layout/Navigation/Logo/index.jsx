import 'react';
import Box from '@mui/material/Box';

export default function Logo({ sx }) {
  return (
    <Box sx={sx}>
      <a href="/">
        <img alt="" src="/images/OnWaveLogo.png" height="50" />
      </a>
    </Box>
  );
}
