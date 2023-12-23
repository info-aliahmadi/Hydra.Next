// ==============================|| OVERRIDES - CHECKBOX ||============================== //

export default function Radio(theme) {
  return {
    MuiRadio: {
      styleOverrides: {
        root: {
          '.MuiSvgIcon-root': {
            // fontSize: 28,
            color: '#e6f1fe',
            // background: '#94c4f1',
            borderRadius: '30px'
          }
        }
      }
    }
  };
}
