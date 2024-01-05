'use client';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// project import
// import AuthLogin from './auth-forms/AuthLogin';
// import { AuthenticationProvider } from '@dashboard/(auth)/_service/Authentication/AuthenticationProvider';
import Box from '@mui/material/Box';

// ================================|| LOGIN ||================================ //

const Login = () => (
  // <AuthenticationProvider>
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
          pb={{ xs: 10, sm: 10, md: 10, lg: 5, xl: 5 }}
          pt={{ xs: 10, sm: 10, md: 10, lg: 5, xl: 5 }}
          pl={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}
          pr={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}
        >
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Grid container item xs={12} sm={12} md={5} lg={5} xl={5}>
              <Box>
                <Typography variant="h5" pt={2}>
                  welcome back
                </Typography>
                <Typography variant="h1" pt={2}>
                  Login
                </Typography>
                <Typography variant="body2" pt={2}>
                  Please log in using your information to stay connected with us
                </Typography>
                <Typography variant="body2" pt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* <EmailIcon sx={{ marginRight: '5px' }} /> info@onwavedesign.com */}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
            <Box p={1} sx={{ borderRadius: '30px', background: '#ffffff4f' }}>
              <Box p={1} sx={{ background: '#ffffff4f', borderRadius: '22px' }}>
                <Box p={{ xs: 5, sm: 5, md: 5, lg: 8, xl: 10 }} sx={{ background: '#ffffff82', borderRadius: '22px' }}>
                  {/* <AuthLogin /> */}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  // </AuthenticationProvider>
);

export default Login;
