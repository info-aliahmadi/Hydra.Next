// material-ui
import { alpha, Theme } from '@mui/material/styles';

// ==============================|| DEFAULT THEME - CUSTOM SHADOWS  ||============================== //

const CustomShadows = (theme : Theme) => ({
  button: `0 2px #0000000b`,
  text: `0 -1px 0 rgb(0 0 0 / 12%)`,
  z1: `${alpha('#000', 0.14)} 0px 1px 1px, ${alpha('#000', 0.12)} 0px 2px 1px, ${alpha('#000', 0.2)} 0px 1px 3px`
  // only available in paid version
});

export default CustomShadows;
