// ==============================|| OVERRIDES - LINK ||============================== //

export default function Link(theme) {
  return {
    MuiLink: {
      defaultProps: {
        underline: 'none',
        color: theme.palette.grey[600]
      }
    }
  };
}
