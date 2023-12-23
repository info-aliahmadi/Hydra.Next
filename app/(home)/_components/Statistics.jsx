'use server';
/* eslint-disable jsx-a11y/media-has-caption */
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CONFIG from '/config';
import 'react';

export default async function Statistics() {
  return (
    <Box className="bg-blue">
      <Container maxWidth="xl">
        <Grid
          container
          pt={{ xs: 3, sm: 5, md: 8, lg: 10, xl: 15 }}
          pb={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}
          sx={{ position: 'relative' }}
        >
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={5}
            xl={5}
            rowSpacing={{ xs: 5, sm: 5, md: 5, lg: 5, xl: 5 }}
            p={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}
            sx={{ zIndex: 2 }}
          >
            <Grid container>
              <Grid item>
                <Typography variant="h5" pt={2}>
                  Structurize
                </Typography>
                <Typography variant="h1" pt={2}>
                  We <span className="gradient-text">Structure</span> Your Business
                  {/* We Structure Your Business */}
                  {/* Your Dream and Our Dream Are On the Same Line */}
                  {/* Transforming Ideas into Exceptional Web Experiences */}
                </Typography>
                <Typography variant="body2" pt={2}>
                  With a track record of successful projects, satisfied clients, and seamless launches, OnWave Design is the go-to web
                  development company for cutting-edge technologies.
                </Typography>
              </Grid>
              <Grid container item columnSpacing={{ xs: 2, sm: 2, md: 5, lg: 5, xl: 5 }} pt={{ xs: 2, sm: 2, md: 5, lg: 12, xl: 12 }}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Typography variant="h1">100%</Typography>
                  <Typography variant="h3">Satisfied Clients</Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Typography variant="h1">100%</Typography>
                  <Typography variant="h3">Project Completed</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            sm={12}
            md={12}
            lg={12}
            xl={12}
            position={{ xl: 'absolute', lg: 'absolute', md: 'relative' }}
            width={{ xl: '75%', lg: '80%', md: 'inherit', sm: 'inherit', xs: 'inherit' }}
            right={0}
            textAlign="right"
          >
            {/* <spline-viewer
              loading-anim-type="spinner-big-dark"
              url="https://prod.spline.design/KgA3aaU0zTZTmCeu/scene.splinecode"
            ></spline-viewer> */}
            {/* <img alt="" src={StatisticsImage} width="100%" /> */}
            <video width="100%" autoPlay loop muted poster={CONFIG.FRONT_PATH + '/images/factory.png'}>
              <source src={CONFIG.FRONT_PATH + '/videos/factory.mp4'} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* <video
              width="100%"
              autoPlay
              loop
              muted
              src={FactoryVideo}
              // controls
              preload="auto"
              poster={StatisticsImage}
            /> */}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} height={{ xl: '150px', lg: '150px', md: '0', sm: '0', xs: '0' }}></Grid>
        </Grid>
      </Container>
    </Box>
  );
}
