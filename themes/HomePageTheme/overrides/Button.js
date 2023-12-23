// ==============================|| OVERRIDES - BUTTON ||============================== //

export default function Button(theme) {
  const disabledStyle = {
    '&.Mui-disabled': {
      backgroundColor: theme.palette.grey[200]
    }
  };

  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          margin: 5,
          fontWeight: 400,
          borderRadius: 30
        },
        contained: {},
        outlined: {},
        containedSizeLarge: {
          padding: '12px 30px'
        },
        containedPrimary: {
          position: 'relative',
          border: 'none',
          background: 'linear-gradient(180deg, #8EDDFF 0%, #8772D8 100%)',
          boxShadow: '0px 9px 15px -6px #4c40c97a, 0px 3px 0px 0px #ffffff4a inset',
          textShadow: '1px 1px #8991e3',
          transition: 'box-shadow 0.5s',
          '&.MuiButton-containedPrimary:hover': {
            border: 'none',
            boxShadow: '0px 8px 15px -4px #4c40c9b5, 0px 3px 0px 0px #ffffff87 inset'
          },
          '&.MuiButton-containedPrimary:focus': {
            border: 'none',
            boxShadow: '0px 2px 10px -2px #7996c9, 0px 3px 3px 0px #4273af45 inset'
          }
        },
        containedSecondary: {
          position: 'relative',
          border: 'none',
          background: 'linear-gradient(180deg, #87a8b7 0%, #474f54 100%)',
          boxShadow: '0px 9px 12px -10px rgba(0, 0, 0, 0.15), 0px 4px 0px 0px rgba(255, 255, 255, 0.20) inset',

          // '&.MuiButton-contained::before': {
          //   borderRadius: 30,
          //   content: "''",
          //   top: '-1px',
          //   left: '-1px',
          //   bottom: '-1px',
          //   right: '-1px',
          //   position: 'absolute',
          //   zIndex: '-1'
          // },
          '&.MuiButton-containedSecondary:hover': {
            border: 'none',
            boxShadow: '0px 9px 12px -10px #000000c2, 0px 4px 0px 0px #ffffff6b inset'
          },
          '&.MuiButton-containedSecondary:focus': {
            border: 'none',
            boxShadow: '0px 2px 10px -2px #000000c2, 0px 3px 3px 0px #000000c2 inset'
          }
        },
        containedInfo: {
          color: '#2C302E',
          //border: 'none',
          background: 'linear-gradient(180deg, #CEEBFF, #A1D4F8)',
          boxShadow: '0px 10px 15px -6px #3683bb4d, 0px 4px 0px 0px #ffffff33 inset',
          position: 'relative',
          textShadow: '1px 1px #9ccced',
          '&.MuiButton-containedInfo:hover': {
            border: 'none',
            boxShadow: '0px 10px 13px -2px #3683bb4d, 0px 4px 0px 0px #ffffff5c inset'
          },
          '&.MuiButton-containedInfo:focus': {
            border: 'none',
            boxShadow: '0px 2px 10px -2px #7996c9, 0px 3px 3px 0px #4273af45 inset'
          }
        },
        outlinedPrimary: {
          color: '#2C302E',
          border: 'none',
          background: 'linear-gradient(180deg, #CEEBFF, #A1D4F8)',
          boxShadow: '0px 10px 12px -10px rgba(0, 0, 0, 0.10), 0px 2px 0px 0px rgba(255, 255, 255, 0.20) inset',
          position: 'relative',

          '&.MuiButton-outlined:hover': {
            border: 'none'
          }
        },
        text: {
          color: '#2C302E'
        }
      }
    }
  };
}
