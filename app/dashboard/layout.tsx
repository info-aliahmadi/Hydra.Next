'use client';
// types
import { Provider as ReduxProvider } from 'react-redux';
import DashboardThemeCustomization from '/themes/DashboardTheme';
import DashboardLayout from './_layout/Index';
import { store } from '/store';
import { Suspense } from 'react';
import Loader from './_components/Loader';
import { SessionProvider } from 'next-auth/react'
import AuthorizationProvider from './(auth)/_service/Authorization/AuthorizationProvider';

// ==============================|| MAIN LAYOUT ||============================== //

export default function DashboardThemeLayout({ children }: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        {/* <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> */}
        <link rel="icon" href="/favicon.svg" />


        <title>Dashboard</title>
        <meta name="title" content="Hydra React Dashboard" />
      </head>
      <body>
        <SessionProvider>
          <ReduxProvider store={store}>
            <Suspense fallback={<Loader />}>
              <Suspense fallback={<Loader />}>
                <AuthorizationProvider>
                  <Suspense fallback={<Loader />}>
                    <DashboardThemeCustomization>
                      <DashboardLayout>{children}</DashboardLayout>
                    </DashboardThemeCustomization>
                  </Suspense>
                </AuthorizationProvider>
              </Suspense>
            </Suspense>
          </ReduxProvider>
        </SessionProvider>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap&family=Gloock:wght@400;500;600;700"
          rel="stylesheet"
        />
        <link href="/css/customStyle/dashboard.css" rel="stylesheet" />
        <link href="/css/editor-style.css" rel="stylesheet" />
      </body>
    </html>
  );
}