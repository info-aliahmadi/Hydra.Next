import 'react';
import HomePageThemeCustomization from '/themes/HomePageTheme';
import Navigation from './_layout/Navigation';
import Footer from './_layout/Footer';
import HomeService from './_service/HomeService';
import CONFIG from '/config';

export async function generateMetadata() {
  var service = new HomeService();
  const siteSettings = await service.getSettings();
  const titleTemplate = '%s | ' + siteSettings.siteTitle;
  return {
    metadataBase: new URL(CONFIG.DOMAIN),
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
      apple: '/apple-touch-icon.png'
    },
    title: {
      template: titleTemplate,
      default: siteSettings.siteTitle
    },
    description: siteSettings.siteDescription,
    keywords: siteSettings.siteKeywords,
    category: 'web development',
    alternates: {
      canonical: '/'
    },
    openGraph: {
      title: siteSettings.siteTitle,
      description: siteSettings.siteDescription,
      url: 'https://onwavedesign.com',
      siteName: 'OnWave Design',
      images: '/images/onwave-presentation.png',
      locale: 'en_US',
      type: 'website'
    },
    twitter: {
      card: '/images/onwave-presentation.png',
      title: siteSettings.siteTitle,
      description: siteSettings.siteDescription,
      siteId: '1467726470533754880',
      creator: '@AliAhmadi',
      creatorId: '1467726470533754880',
      images: {
        url: '/images/onwave-presentation.png',
        alt: 'OnWave Design , where we create stunning websites'
      }
    },
    verification: {
      google: 'google-site-verification',
      yandex: 'yandex',
      bing: 'bing',
      yahoo: 'y_key',
      other: {
        me: ['info@onwavedesign.com', CONFIG.DOMAIN]
      }
    }
  };
}
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#aadbff'
};
export default async function HomeLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <script async src="https://cdn.jsdelivr.net/npm/hls.js@1"></script>
        <script async type="module" src="https://unpkg.com/@splinetool/viewer@0.9.518/build/spline-viewer.js"></script>
      </head>
      <body>
        <HomePageThemeCustomization>
          <Navigation sx={{ xIndex: 999999999, position: 'relative' }} />
          {children}
          <Footer />
        </HomePageThemeCustomization>

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap&family=Gloock:wght@400;500;600;700"
          rel="stylesheet"
        />
      </body>
    </html>
  );
}
