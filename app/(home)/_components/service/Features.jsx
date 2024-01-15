import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import 'react';

export default function Features() {
  return (
    <Box className="bg-blue">
      <Box
        className="bg-wave"
        sx={{
          backgroundImage: `url(/images/wave-service.svg)`
        }}
        height={{ xs: 250, sm: 280, md: 300, lg: 330, xl: 350 }}
      ></Box>
      <Container maxWidth="xl">
        <Grid container>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            spacing={{ xs: 7, sm: 7, md: 5, lg: 7, xl: 7 }}
            pt={{ xs: 3, sm: 10, md: 10, lg: 10, xl: 10 }}
            pb={{ xs: 3, sm: 10, md: 10, lg: 10, xl: 10 }}
            pl={{ xs: 5, sm: 5, md: 5, lg: 0, xl: 0 }}
            pr={{ xs: 5, sm: 5, md: 5, lg: 0, xl: 0 }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={4}
              textAlign={'center'}
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              {/* <img alt="" src={Feature1Image} height="200px" /> */}
              <Box sx={{ maxWidth: '480px' }} display={{ xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' }}>
                <spline-viewer
                  loading-anim-type="spinner-small-dark"
                  url="https://prod.spline.design/0ugZuGgBeBzgkZjr/scene.splinecode"
                ></spline-viewer>
              </Box>
              <Box sx={{ maxWidth: '480px' }} display={{ xs: 'block', sm: 'none', md: 'none', lg: 'none', xl: 'none' }}>
                <img alt="" src="/images/profile.png" width="70%" />
              </Box>
              <Box sx={{ width: '100%', background: '#a1d4f8', position: 'relative', zIndex: 999 }}
                marginTop={{ xs: '0', sm: '-70px', md: '-70px', lg: '-70px', xl: '-70px' }}>
                <Typography variant="h3">Portfolio</Typography>
                <Typography variant="body1" pt={2}>
                  We Create Unique and visually appealing custom portfolio.
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={4}
              textAlign={'center'}
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <Box sx={{ maxWidth: '480px' }} display={{ xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' }}>
                <spline-viewer
                  loading-anim-type="spinner-small-dark"
                  url="https://prod.spline.design/YVcMpYg7QYp3CdP8/scene.splinecode"
                ></spline-viewer>
              </Box>
              <Box sx={{ maxWidth: '480px' }} display={{ xs: 'block', sm: 'none', md: 'none', lg: 'none', xl: 'none' }}>
                <img alt="" src="/images/shop.png" width="70%" />
              </Box>
              {/* <img alt="" src={Feature2Image} height="200px" /> */}
              <Box sx={{ width: '100%', background: '#a1d4f8', position: 'relative', zIndex: 999 }}
                marginTop={{ xs: '0', sm: '-70px', md: '-70px', lg: '-70px', xl: '-70px' }}>
                <Typography variant="h3">E-Commerce</Typography>
                <Typography variant="body1" pt={2}>
                  We build online stores that drive sales and conversions.
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={4}
              textAlign={'center'}
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <Box sx={{ maxWidth: '480px' }} display={{ xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' }}>
                <spline-viewer
                  loading-anim-type="spinner-small-dark"
                  url="https://prod.spline.design/BR18NVUSCCzfjn5m/scene.splinecode"
                ></spline-viewer>
              </Box>
              <Box sx={{ maxWidth: '480px' }} display={{ xs: 'block', sm: 'none', md: 'none', lg: 'none', xl: 'none' }}>
                <img alt="" src="/images/webapp.png" width="70%" />
              </Box>
              {/* <img alt="" src={Feature3Image} height="200px" /> */}
              <Box sx={{ width: '100%', background: '#a1d4f8', position: 'relative', zIndex: 999 }}
                marginTop={{ xs: '0', sm: '-70px', md: '-70px', lg: '-70px', xl: '-70px' }}>
                <Typography variant="h3">Web Application</Typography>
                <Typography variant="body1" pt={2}>
                  We develop powerful web applications for your business needs.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
