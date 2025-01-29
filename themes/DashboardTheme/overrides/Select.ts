// ==============================|| OVERRIDES - BUTTON ||============================== //

import { Theme } from "@mui/material";

export default function Select(theme : Theme) {
  const disabledStyle = {
    '&.Mui-disabled': {
      backgroundColor: theme.palette.grey[200]
    }
  };

  return {
    MuiSelect: {
      // defaultProps: {
      //   disableElevation: true
      // },
      styleOverrides: {
        root: {
          fontWeight: 400
        },
        outlined: {
          padding : '10px 32px 11px 10px'
        },
        select: {
          // padding : '40px'
        }
      }
    }
  };
}
