'use client';
// types
import { Provider as ReduxProvider } from 'react-redux';
import DashboardThemeCustomization from '@root/themes/DashboardTheme';
import DashboardLayout from './_layout/Index';
import { store } from '@root/store';
import { Suspense } from 'react';
import Loader from './_components/Loader';
import { SessionProvider } from 'next-auth/react'
import AuthorizationProvider from './(auth)/_service/Authorization/AuthorizationProvider';
import '@root/public/css/customStyle/dashboard.css'

// ==============================|| MAIN LAYOUT ||============================== //

export default function DashboardThemeLayout({ children }: {  children: any }) { 
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.svg" />


        <title>Dashboard</title>
        {/* <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link> */}
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
                      <DashboardLayout>
                        {children}

                      </DashboardLayout>
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
      </body>
    </html>
  );
}
