// ==============================|| OVERRIDES - INPUT LABEL ||============================== //

export default function Tooltip(theme) {
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
