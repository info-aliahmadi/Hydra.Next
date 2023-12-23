// ==============================|| OVERRIDES - CHECKBOX ||============================== //

export default function Checkbox(theme) {
  return {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          // padding: 0,
          // transition: 'box-shadow 1s,background 1s',
          // border: '3px solid #94C4F1',
          // boxShadow: '0px -1px 0px 0px #85BDE4',
          // borderRadius: '1px',
          // background: '#f8f9ffcc',
          // '&.MuiSvgIcon-root': {
          //   color: '#f8f9ffcc'
          // }
          '.MuiSvgIcon-root': {
            fontSize: 28,
            color: '#e6f1fe',
            background: '#94c4f1',
            borderRadius: '3px'
          }
        }
      }
    }
  };
}
