// ==============================|| OVERRIDES - TAB ||============================== //

import { Theme } from "@mui/material";

export default function AppBar(theme : Theme) {
  return {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(0deg, rgba(122,231,255,0) 0%, rgba(122,231,255,0.5) 100%)'
        }
      }
    }
  };
}
