'use client';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import CssBaseline from '@mui/material/CssBaseline';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

// project import
import Palette from './palette';
import Typography from './typography';
import CustomShadows from './shadows';
import componentsOverride from './overrides';

import NextAppDirEmotionCacheProvider from './EmotionCache';
import '/public/css/PlaygroundEditorTheme.css'
import '/public/css/customStyle/homePage.css'
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

export default function HomePageThemeCustomization({ children }) {
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
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes}>
          <>
            {children}
            <CssBaseline />
          </>
        </ThemeProvider>
      </StyledEngineProvider>
    </NextAppDirEmotionCacheProvider>
  );
}

HomePageThemeCustomization.propTypes = {
  children: PropTypes.node
};
