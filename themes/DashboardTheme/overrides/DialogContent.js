// ==============================|| OVERRIDES - CHIP ||============================== //

export default function DialogContent(theme) {
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
