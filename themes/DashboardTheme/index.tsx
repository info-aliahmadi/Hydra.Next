'use client';
import { useLayoutEffect, useMemo, useState } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider, ThemeOptions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// project import
import Palette from './palette';
import Typography from './typography';
import CustomShadows from './shadows';
import componentsOverride from './overrides';
import { prefixer } from 'stylis';
import stylisRTLPlugin from 'stylis-plugin-rtl';
import CONFIG from '@root/config';

import i18n from '@root/Localization/i18n';

import IranSans from './fonts/IranSans';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalaliV3';
import '@root/public/css/customStyle/dashboard.css';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useSession } from 'next-auth/react';
import Loader from '@dashboard/_components/Loader';
import { Options } from '@emotion/cache';
// ==============================|| DEFAULT THEME - MAIN  ||============================== //
export default function DashboardThemeCustomization({ children }: { children: any }) {

  const { data: session, status } = useSession();

  let themeMode: 'light' | 'dark' | undefined = session?.user?.defaultTheme;

  if (session != undefined && themeMode == undefined) {
    themeMode = CONFIG.DASHBOARD_DEFAULT_THEME_MODE as 'light' | 'dark';
  }

  const dir = i18n.dir(session?.user?.defaultLanguage);

  const [direction, setDirection] = useState<'ltr' | 'rtl'>(dir);
  const initFonts = dir === 'rtl' ? `Iran Sans` : CONFIG.DASHBOARD_FONT_FAMILY;
  const [fonts, setFonts] = useState(initFonts);

  useLayoutEffect(() => {
    setDirection(dir)
    document.dir = dir;
    i18n.changeLanguage(session?.user?.defaultLanguage);
  }, [dir]);

  useLayoutEffect(() => {
    document.dir = direction;
    direction === 'rtl' ? setFonts(`Iran Sans`) : setFonts(CONFIG.DASHBOARD_FONT_FAMILY);
  }, [direction]);

  function changeDirection(dir: 'ltr' | 'rtl') {
    setDirection(dir);
  }

  const theme = Palette(themeMode);

  const themeTypography = Typography(fonts);
  const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);
  const themeOptions = useMemo<ThemeOptions>(
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
      direction: direction,
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8
        }
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography,
      setDirection: changeDirection,
    }),
    [theme, themeTypography, themeCustomShadows]
  );
  const themes = createTheme(themeOptions);
  themes.components = componentsOverride(themes);
  // Create rtl cache

  const cacheRtl: Options = {
    key: 'muirtl',
    stylisPlugins: [prefixer, stylisRTLPlugin]
  };
  if (status === "loading") {
    return <Loader />
  }
  return (

    <StyledEngineProvider injectFirst>
      {direction === 'rtl' && (
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
          <NextAppDirEmotionCacheProvider options={cacheRtl}>
            <ThemeProvider theme={themes}>
              <CssBaseline />
              <IranSans />
              {children}
            </ThemeProvider>
          </NextAppDirEmotionCacheProvider>
        </LocalizationProvider>
      )}
      {direction === 'ltr' && (
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
            <ThemeProvider theme={themes}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </NextAppDirEmotionCacheProvider>
        </LocalizationProvider>
      )}
    </StyledEngineProvider>
  );
}

