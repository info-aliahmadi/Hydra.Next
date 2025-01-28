// ==============================|| OVERRIDES - LINK ||============================== //

import { Theme } from "@mui/material";

export default function Link(theme: Theme) {
  return {
    MuiLink: {
      defaultProps: {
        underline: 'none',
        color: theme.palette.grey[600]
      }
    }
  };
}
