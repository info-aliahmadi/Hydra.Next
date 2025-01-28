// ==============================|| OVERRIDES - TAB ||============================== //

import { Theme } from "@mui/material";

export default function Tab(theme : Theme) {
  return {
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 46,
          color: '#6db2f3',

        },
        labelIcon: {},
        textColorInherit: {},
        textColorPrimary: {
          minWidth: '200px',
          padding: '30px'
        },
        selected: {},
        disabled: {},
        fullWidth: {}
      }
    }
  };
}
