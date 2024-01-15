import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import 'react';

export default function Introduce() {
  return (
    <Box className="bg-white">
      {/* <Box
        className="bg-wave"
        sx={{
          backgroundImage: `url(${WaveAboutImage})`
        }}
        height={{ xs: 300, sm: 350, md: 400, lg: 400, xl: 480 }}
      ></Box> */}
      <Container maxWidth="xl">
        <Grid container alignItems="center" alignContent="center" justifyContent="center">
          <Grid item xs={10} sm={10} md={8} lg={8} xl={8}>
            <Stack alignItems="center" textAlign={'center'} pt={{ xs: 0, sm: 6, md: 10, lg: 15, xl: 15 }} pb={{ xs: 0, sm: 6, md: 10, lg: 15, xl: 15 }}>
              <Typography variant="h5" pt={2}>
                Our Vision
              </Typography>
              <Typography variant="h1" pt={2}>
                {/* Elevating Your Brand With Innovative Website Solutions */}
                Let Us Turn Your <strong className="gradient-text"> Vision </strong> Into{' '}
                <strong className="gradient-text"> Reality </strong>
              </Typography>
              <Typography variant="body2" pt={4}>
                Our team will collaborate with you to bring your vision to life through expert website design and development. With a focus
                on delivering exceptional results, we&apos;ll work tirelessly to ensure that your website exceeds your expectations and
                effectively communicates your brand and message.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
