// ==============================|| DEFAULT THEME - TYPOGRAPHY  ||============================== //

const Typography = (fontFamily) => ({
  htmlFontSize: 16,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  header: {
    fontFamily: fontFamily.header,
    fontWeight: 600,
    lineHeight: 1.21
  },
  h1: {
    fontFamily: fontFamily.header,
    fontWeight: 600,
    fontSize: '3.375rem',
    lineHeight: 1.21
  },
  h2: {
    fontFamily: fontFamily.header,
    fontWeight: 600,
    fontSize: '2.875rem',
    lineHeight: 1.27
  },
  h3: {
    fontFamily: fontFamily.header,
    fontWeight: 600,
    fontSize: '2rem',
    lineHeight: 1.33
  },
  h4: {
    fontFamily: fontFamily.header,
    fontWeight: 600,
    fontSize: '1.75rem',
    lineHeight: 1.4
  },
  h5: {
    fontFamily: fontFamily.header,
    fontWeight: 600,
    fontSize: '1.4rem',
    lineHeight: 1.5
  },
  h6: {
    fontFamily: fontFamily.header,
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.57
  },
  caption: {
    fontFamily: fontFamily.header,
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.66
  },
  body1: {
    fontFamily: fontFamily.body,
    fontSize: '0.9rem',
    lineHeight: 1.7,
    textShadow: '1px 1px 0 #9bb2cb87'
  },
  body2: {
    fontFamily: fontFamily.body,
    fontSize: '1rem',
    lineHeight: 1.9,
    textShadow: '1px 1px 0 #9bb2cb87'
  },
  body3: {
    fontFamily: fontFamily.body,
    fontSize: '1rem',
    lineHeight: 1.66,
    textShadow: '1px 1px 0 #9bb2cb87'
  },
  subtitle1: {
    fontFamily: fontFamily.header,
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: 1.57
  },
  subtitle2: {
    fontFamily: fontFamily.body,
    fontSize: '1.2rem',
    fontWeight: 700,
    lineHeight: 1.66
  },
  overline: {
    lineHeight: 1.66
  },
  button: {
    fontFamily: fontFamily.body,
    textTransform: 'capitalize'
  }
});

export default Typography;
