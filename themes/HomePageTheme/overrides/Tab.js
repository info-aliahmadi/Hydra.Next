// ==============================|| OVERRIDES - TAB ||============================== //

export default function Tab(theme) {
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
