// ==============================|| OVERRIDES - BUTTON ||============================== //

export default function Fab(theme) {
  const disabledStyle = {
    '&.Mui-disabled': {
      backgroundColor: theme.palette.grey[200]
    }
  };

  return {
    MuiFab: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          margin: 5,
          fontWeight: 400,
          borderRadius: 30
        },
        containedSizeLarge: {
          padding: '12px 30px'
        },
        primary: {
          position: 'relative',
          border: 'none',
          background: 'linear-gradient(180deg, #8EDDFF 0%, #8772D8 100%)',
          boxShadow: '0px 9px 15px -6px #4c40c97a, 0px 3px 0px 0px #ffffff4a inset',
          textShadow: '1px 1px #8991e3',
          transition: 'box-shadow 0.5s',
          '&:hover': {
            border: 'none',
            boxShadow: '0px 8px 15px -4px #4c40c9b5, 0px 3px 0px 0px #ffffff87 inset'
          },
          '&:focus': {
            border: 'none',
            boxShadow: '0px 2px 10px -2px #7996c9, 0px 3px 3px 0px #4273af45 inset'
          }
        },
        secondary: {
          position: 'relative',
          border: 'none',
          background: 'linear-gradient(180deg, #87a8b7 0%, #474f54 100%)',
          boxShadow: '0px 9px 12px -10px rgba(0, 0, 0, 0.15), 0px 4px 0px 0px rgba(255, 255, 255, 0.20) inset',

          // '&.MuiFab-contained::before': {
          //   borderRadius: 30,
          //   content: "''",
          //   top: '-1px',
          //   left: '-1px',
          //   bottom: '-1px',
          //   right: '-1px',
          //   position: 'absolute',
          //   zIndex: '-1'
          // },
          '&:hover': {
            border: 'none',
            boxShadow: '0px 9px 12px -10px rgba(0, 0, 0, 0.15), 0px 4px 0px 0px rgba(255, 255, 255, 0.20) inset'
          },
          '&:focus': {
            border: 'none',
            boxShadow: '0px 9px 12px -10px rgba(0, 0, 0, 0.15), 0px 4px 0px 0px rgba(255, 255, 255, 0.20) inset'
          }
        },
        info: {
          color: '#2C302E',
          //border: 'none',
          background: 'linear-gradient(180deg, #CEEBFF, #A1D4F8)',
          boxShadow: '0px 10px 15px -6px #3683bb4d, 0px 4px 0px 0px #ffffff33 inset',
          position: 'relative',
          textShadow: '1px 1px #9ccced',
          '&:hover': {
            border: 'none',
            boxShadow: '0px 10px 13px -2px #3683bb4d, 0px 4px 0px 0px #ffffff5c inset'
          },
          '&:focus': {
            border: 'none',
            boxShadow: '0px 2px 10px -2px #7996c9, 0px 3px 3px 0px #4273af45 inset'
          }
        }
      }
    }
  };
}
