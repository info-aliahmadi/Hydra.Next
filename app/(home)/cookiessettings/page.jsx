'use server';
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PageHeader from '@(home)/_components/PageHeader';
import Contact from '@(home)/_components/Contact';

export async function generateMetadata() {
  return {
    title: 'Cookies Settings',
  };
}
export default async function CookiesSettings() {
  return (
    <>
      <Box className="bg-white">
        
      <PageHeader title="Cookies Settings" />
        <Container maxWidth="xl">
          <Grid
            container
            pb={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}
            pl={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}
            pr={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}
            justifyContent="center"
          >
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
              <Stack
                p={{ xs: 5, sm: 5, md: 5, lg: 10, xl: 10 }}
                pb={15}
                pl={{ xs: 5, sm: 15, md: 15, lg: 15, xl: 15 }}
                pr={{ xs: 5, sm: 15, md: 15, lg: 15, xl: 15 }}
                className="text-card"
              >
                <Box textAlign="justify">
                  <Typography variant="h3" pt={2} pb={2}>
                    Cookie Settings
                  </Typography>
                  Our website uses cookies to provide you with the best possible experience. By using our site, you consent to the use of
                  cookies in accordance with this policy.
                  <Typography variant="h5" pt={2} pb={2}>
                    What are Cookies?
                  </Typography>
                  Cookies are small text files that are stored on your device by a website. They contain information about your browsing
                  history and can be used to remember your preferences or actions over time.
                  <Typography variant="h5" pt={2} pb={2}>
                    Types of Cookies Used
                  </Typography>
                  We use several types of cookies on our website, including:
                  <ul>
                    <li>
                      <strong>Session cookies: </strong> : These cookies are temporary and are deleted when you close your browser. They
                      help us track user activity and remember items in your shopping cart.
                    </li>
                    <li>
                      <strong>Persistent cookies: </strong>These cookies stay on your device until they expire or are manually deleted. They
                      can be used to remember your preferences or actions over multiple visits to our site.
                    </li>
                    <li>
                      <strong>First-party cookies: </strong>hese cookies are set by our website directly and can only be read by us. They
                      include session cookies and persistent cookies.
                    </li>
                    <li>
                      <strong>Third-party cookies: </strong>These cookies are set by third-party services that we use on our site, such as
                      Google Analytics. They can be used to collect information about how visitors interact with our site.
                    </li>
                  </ul>
                  <Typography variant="h5" pt={2} pb={2}>
                    How We Use Cookies
                  </Typography>
                  We use cookies for various purposes, including:
                  <ul>
                    <li>
                      <strong>Authentication</strong>We use cookies to authenticate users and prevent unauthorized access to protected areas
                      of our site.
                    </li>
                    <li>
                      <strong>Personalization</strong>We use cookies to personalize your experience on our site, such as displaying content
                      that is relevant to your interests.
                    </li>
                    <li>
                      <strong>Analytics</strong>We use cookies to analyze visitor behavior and improve our site&#39;s performance. This
                      includes tracking page views, bounce rates, and conversion rates.
                    </li>
                    <li>
                      <strong>Advertising</strong>We may use cookies to serve targeted advertisements to you based on your browsing history
                      or interactions with our site.
                    </li>
                  </ul>
                  <Typography variant="h5" pt={2} pb={2}>
                    Managing Your Cookie Preferences
                  </Typography>
                  You can manage your cookie preferences by adjusting your browser settings. Most browsers allow you to block or delete
                  cookies, but doing so may affect your ability to use certain features of our site. To learn more about managing cookies,
                  visit allaboutcookies.org.
                  <Typography variant="h5" pt={2} pb={2}>
                    Changes to Our Cookie Policy{' '}
                  </Typography>
                  We reserve the right to update this cookie policy at any time. Any changes will be posted here and will become effective
                  immediately upon posting. It is your responsibility to review this policy periodically for updates. By continuing to use
                  our site, you agree to the terms of this cookie policy. If you do not accept the use of cookies, please disable them in
                  your browser settings or refrain from using our site.n eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
                  dolor interdum nulla, ut commodo diam libero vitae erat.
                </Box>
                <Box pt={5} mt={5} borderTop={'1px solid #00000069'}></Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Contact />
    </>
  );
}
