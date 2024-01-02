'use client';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// project import
import Palette from './palette';
import Typography from './typography';
import CustomShadows from './shadows';
import componentsOverride from './overrides';

// import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import '/public/css/customStyle/homePage.css';
import NextAppDirEmotionCacheProvider from './EmotionCache';
// ==============================|| DEFAULT THEME - MAIN  ||============================== //

export default async function HomePageThemeCustomization({ children }) {
  const fonts = {
    header: 'Gloock',
    body: 'Poppins'
  };

  const theme = Palette();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const themeTypography = Typography(fonts);
  const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);

  const themeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1536
        }
      },
      direction: 'ltr',
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8
        }
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography
    }),
    [theme, themeTypography, themeCustomShadows]
  );

  const themes = createTheme(themeOptions);

  themes.components = componentsOverride(themes);

  return (
    <StyledEngineProvider injectFirst>
      {/* <LocalizationProvider dateAdapter={AdapterMoment}> */}
      <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
        <ThemeProvider theme={themes}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
      {/* </LocalizationProvider> */}
    </StyledEngineProvider>
  );
}

HomePageThemeCustomization.propTypes = {
  children: PropTypes.node
};
