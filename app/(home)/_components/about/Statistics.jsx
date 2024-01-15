import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import 'react';

export default function Statistics() {
  return (
    <Box className="bg-white">
      <Box
        className="bg-wave"
        sx={{
          backgroundImage: `url(/images/wave-about-3.svg)`
        }}
        height={{ xs: 250, sm: 280, md: 300, lg: 340, xl: 350 }}
      ></Box>
      <Container maxWidth="xl">
        <Grid container pt={{ xs: 3, sm: 5, md: 8, lg: 10, xl: 15 }} pb={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }}>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
            rowSpacing={{ xs: 5, sm: 5, md: 5, lg: 5, xl: 5 }}
            // p={{ xs: 0, sm: 0, md: 15, lg: 0, xl: 0 }}
          >
            <Grid item>
              <Typography variant="h5" pt={2}>
                Structurize
              </Typography>
              <Typography variant="h1" pt={2}>
                We <span className="gradient-text">Structure</span> Your Business
              </Typography>
              <Typography variant="body2" pt={2}>
                With a track record of successful projects, satisfied clients, and seamless launches, OnWave Design is the go-to web
                development company for cutting-edge technologies.
              </Typography>
            </Grid>
            <Grid container item columnSpacing={{ xs: 2, sm: 2, md: 5, lg: 5, xl: 5 }}>
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
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6} display="flex" justifyContent="center">
            <Box sx={{ height: '850px', maxWidth: '700px', width: '100%' }} 
            display={{ xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' }}>
              <spline-viewer
                loading-anim-type="spinner-big-dark"
                url="https://prod.spline.design/5Ck1f5C3y1xixa6I/scene.splinecode"
              ></spline-viewer>
            </Box>
            
          <Box
            display={{ xs: 'block', sm: 'none', md: 'none', lg: 'none', xl: 'none' }}
          >
            <img alt="" src="/images/statistics.png" width="100%" />
          </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
