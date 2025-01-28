// ==============================|| OVERRIDES - CHIP ||============================== //

import { Theme } from "@mui/material";

export default function DialogContent(theme : Theme) {
  return {
    MuiDialog: {
      styleOverrides: {
        paper: {
          // backgroundColor: theme.palette.grey[100],
          backgroundImage: 'none !important'
          // paddingTop: '20px !important',
        }
      }
    }
  };
}
