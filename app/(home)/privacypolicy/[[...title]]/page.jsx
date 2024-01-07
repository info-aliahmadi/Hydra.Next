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
    title: 'Privacy Policy',
  };
}

export default async function PrivacyPolicy() {
  return (
    <>
      <Box className="bg-white">
        <PageHeader title="Privacy Policy" />
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
                    Privacy Policy
                  </Typography>
                  <Typography variant="h5" pt={2} pb={2}>
                    Introduce
                  </Typography>
                  We understand that privacy is important to our users, and we take their privacy very seriously. This privacy policy
                  explains what data we collect, why we collect it, and how we protect it. It also explains your rights regarding your
                  personal data and how you can exercise them.
                  <Typography variant="h5" pt={2} pb={2}>
                    Data Collection
                  </Typography>
                  We collect two types of data: personal data and non-personal data.
                  <Typography variant="h5" pt={2} pb={2}>
                    Personal Data
                  </Typography>
                  Personal data refers to any information that identifies or can be used to identify a single person. We collect the
                  following personal data:
                  <ul>
                    <li>
                      Contact Information: We collect your name, email address, phone number, and physical address so that we can
                      communicate with you and deliver our services.
                    </li>
                    <li>
                      User Account Information: We collect user account information, such as login credentials, password reset requests, and
                      security questions, to authenticate users and ensure the security of their accounts.
                    </li>
                    <li>
                      Payment Information: We collect payment information, such as credit card numbers and billing addresses, to process
                      transactions and provide our services.
                    </li>
                    <li>
                      Profile Information: We collect profile information, such as job title, company, and location, to help users connect
                      with each other and build professional relationships.
                    </li>
                  </ul>
                  <Typography variant="h5" pt={2} pb={2}>
                    Non-Personal Data
                  </Typography>
                  Non-personal data refers to information that does not identify a single person. We collect the following non-personal
                  data:
                  <ul>
                    <li>
                      Log Data: We collect log data, such as IP addresses, browser types, device types, and operating systems, to monitor
                      network traffic, detect security threats, and improve our services.
                    </li>
                    <li>
                      Usage Data: We collect usage data, such as clickstream behavior, search queries, and pages viewed, to analyze user
                      behavior, improve our services, and provide personalized experiences.
                    </li>
                    <li>
                      Aggregated Data: We collect aggregated data, such as demographics and statistical analysis, to understand user
                      behavior, improve our services, and provide personalized experiences.
                    </li>
                  </ul>
                  <Typography variant="h5" pt={2} pb={2}>
                    Data Use
                  </Typography>
                  We use personal data for the following purposes:
                  <ul>
                    <li>
                      To provide our services: We use personal data to deliver our services, such as processing transactions, providing
                      customer support, and communicating with users.
                    </li>
                    <li>
                      To improve our services: We use personal data to improve our services, such as analyzing user behavior, identifying
                      trends, and conducting research.
                    </li>
                    <li>
                      To personalize experiences: We use personal data to personalize experiences, such as recommending connections,
                      suggesting jobs, and displaying relevant advertising.
                    </li>
                    <li>
                      To comply with legal obligations: We use personal data to comply with legal obligations, such as responding to
                      subpoenas, court orders, and legal requests.
                    </li>
                  </ul>
                  We use non-personal data for the following purposes:
                  <ul>
                    <li>
                      To monitor network traffic: We use non-personal data to monitor network traffic, detect security threats, and improve
                      our services.
                    </li>
                    <li>
                      To analyze user behavior: We use non-personal data to analyze user behavior, improve our services, and provide
                      personalized experiences.
                    </li>
                    <li>
                      To provide personalized experiences: We use non-personal data to provide personalized experiences, such as
                      recommending connections, suggesting jobs, and displaying relevant advertising.
                    </li>
                  </ul>
                  <Typography variant="h5" pt={2} pb={2}>
                    Data Sharing
                  </Typography>
                  We share personal data with the following entities:
                  <ul>
                    <li>
                      Affiliates: We share personal data with our affiliates, subsidiaries, and parent companies to provide joint services,
                      improve our services, and conduct business operations.
                    </li>
                    <li>
                      Partners: We share personal data with our partners, such as service providers, vendors, and consultants, to provide
                      joint services, improve our services, and conduct business operations.
                    </li>
                    <li>
                      Legal Authorities: We share personal data with legal authorities, such as law enforcement agencies, regulatory bodies,
                      and courts, to comply with legal obligations and protect our rights.
                    </li>
                  </ul>
                  <Typography variant="h5" pt={2} pb={2}>
                    Data Protection
                  </Typography>
                  We protect personal data using the following methods:
                  <ul>
                    <li>
                      Encryption: We encrypt personal data, such as passwords and payment information, to protect it from unauthorized
                      access.
                    </li>
                    <li>
                      Access Control: We restrict access to personal data to authorized personnel who need to know that information to
                      perform their job functions.
                    </li>
                    <li>
                      Physical Security: We implement physical security measures, such as firewalls, intrusion detection systems, and backup
                      systems, to protect against unauthorized access to personal data.
                    </li>
                  </ul>
                  <Typography variant="h5" pt={2} pb={2}>
                    Data Retention
                  </Typography>
                  We retain personal data for the following periods:
                  <ul>
                    <li>
                      Personal data related to user accounts: We retain personal data related to user accounts until the account is
                      terminated or deleted.
                    </li>
                    <li>
                      Personal data related to transactions: We retain personal data related to transactions for seven years after the
                      transaction is completed.
                    </li>
                    <li>
                      Personal data related to marketing: We retain personal data related to marketing for three years after the last
                      interaction.
                    </li>
                  </ul>
                  <Typography variant="h5" pt={2} pb={2}>
                    Cookies
                  </Typography>
                  We use cookies to track user behavior, improve our services, and provide personalized experiences. Cookies are small text
                  files that are stored on your device when you visit our website. They allow us to recognize your device and tailor our
                  services to your preferences. We use cookies for various purposes, including: Authentication: We use cookies to
                  authenticate your identity when you log in to your account. This helps us to prevent unauthorized access and ensure that
                  your personal information is protected. Personalization: We use cookies to personalize your experience on our website. For
                  example, we may use cookies to remember your language preference or to show you content that is relevant to your
                  interests. Analytics: We use cookies to gather analytics data about our website visitors. This helps us to understand how
                  people use our website and identify areas where we can improve. Advertising: We use cookies to serve targeted
                  advertisements to you. When you visit our website, we may use cookies to collect information about your browsing history
                  and use it to show you ads that are more likely to interest you. You can control the use of cookies on your device by
                  adjusting your browser settings. Most browsers allow you to block or delete cookies, or to specify which websites can
                  store cookies on your device. Keep in mind that blocking or deleting cookies may affect your ability to use certain
                  features on our website.&quot;
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
