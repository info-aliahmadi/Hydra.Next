'use client';
// types
import { Provider as ReduxProvider } from 'react-redux';
import DashboardThemeCustomization from 'themes/DashboardTheme';
import DashboardLayout from './_layout/Index';
import { store } from '/store';
import { Suspense } from 'react';
import Loader from './_components/Loader';
import { AuthenticationProvider } from './(auth)/_service/Authentication/AuthenticationProvider';
import Authenticate from './(auth)/_service/Authentication/Authenticate';
import { AuthorizationProvider } from './(auth)/_service/Authorization/AuthorizationProvider';

// ==============================|| MAIN LAYOUT ||============================== //

export default function DashboardThemeLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
        <title>Dashboard</title>
        <meta name="title" content="Hydra React Dashboard" />
      </head>
      <body>
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <ReduxProvider store={store}>
          <Suspense fallback={<Loader />}>
            <AuthenticationProvider>
              <Authenticate>
                <Suspense fallback={<Loader />}>
                  <AuthorizationProvider>
                    <Suspense fallback={<Loader />}>
                      <DashboardThemeCustomization>
                        <DashboardLayout>{children}</DashboardLayout>
                      </DashboardThemeCustomization>
                    </Suspense>
                  </AuthorizationProvider>
                </Suspense>
              </Authenticate>
            </AuthenticationProvider>
          </Suspense>
        </ReduxProvider>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap&family=Gloock:wght@400;500;600;700"
          rel="stylesheet"
        />
        <link href="/css/customStyle/dashboard.css" rel="stylesheet" />
      </body>
    </html>
  );
}
