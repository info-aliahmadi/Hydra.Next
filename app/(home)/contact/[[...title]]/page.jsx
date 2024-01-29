'use server';
import React from 'react';

import EmailIcon from '@mui/icons-material/Email';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ContactForm from '../../_components/conract/ContactForm';
import WhatsApp from '@mui/icons-material/WhatsApp';
import Place from '@mui/icons-material/Place';
// import WaveContactImage from 'assets/images/wave-contact-page.svg';

export async function generateMetadata({ params }) {
  return {
    title: 'Contact Us',
    description: 'We deliver the best web solutions',
    category: 'World-Class Web Development',

    openGraph: {
      title: 'Contact Us',
      description: 'World-Class Web Development'
    },
    twitter: {
      title: 'Contact Us',
      description: 'World-Class Web Development'
    }
  };
}
export default async function Page({ params }) {
  return (
    <>
      <Box className="bg-blue">
        <Box
          className="bg-wave"
          sx={{
            backgroundImage: `url(/images/wave-contact-page.svg)`
          }}
          height={{ xs: 300, sm: 300, md: 350, lg: 450, xl: 400 }}
        ></Box>
        <Container maxWidth="xl">
          <Grid
            container
            pb={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}
            pl={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}
            pr={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}
          >
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Grid container item xs={12} sm={12} md={5} lg={5} xl={5}>
                <Box>
                  <Typography variant="h5" pt={2}>
                    Contact
                  </Typography>
                  <Typography variant="h1" pt={2}>
                    Contact
                  </Typography>
                  <Typography variant="body2" pt={2}>
                    Have a question or need assistance? Contact us!
                  </Typography>
                  <Typography variant="body2" pt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <EmailIcon sx={{ marginRight: '5px' }} /> info@onwavedesign.com
                  </Typography>
                  <Typography variant="body2" pt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Place sx={{ marginRight: '5px' }} /> We are international developers
                  </Typography>
                  <Typography variant="body2" pt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <WhatsApp sx={{ marginRight: '5px' }} /> +971 58 241 7650
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <ContactForm />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
