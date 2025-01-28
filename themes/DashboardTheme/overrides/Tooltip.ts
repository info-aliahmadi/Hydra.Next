
import { Theme } from "@mui/material";

export default function Tooltip(theme : Theme) {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.palette.grey[200],
          backgroundColor: theme.palette.grey[800]
        }
      }
    }
  };
}
