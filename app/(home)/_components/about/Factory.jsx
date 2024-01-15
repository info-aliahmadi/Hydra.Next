import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import 'react';

export default function Factory() {
  return (
    <Box className="bg-blue">
      <Box
        className="bg-wave"
        sx={{
          backgroundImage: `url(/images/wave-about-2.svg)`
        }}
        height={{ xs: 250, sm: 280, md: 300, lg: 340, xl: 350 }}
      ></Box>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
            display={{ xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' }}>
            <spline-viewer
              loading-anim-type="spinner-big-dark"
              url="https://prod.spline.design/KgA3aaU0zTZTmCeu/scene.splinecode"
            ></spline-viewer>
          </Grid>
          <Grid
            item
            xs={12}
            display={{ xs: 'block', sm: 'none', md: 'none', lg: 'none', xl: 'none' }}
          >
            <img alt="" src="/images/factory.png" width="100%" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
