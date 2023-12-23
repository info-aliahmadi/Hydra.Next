'use server';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import 'react';

export default async function Request() {
  return (
    <Box className="bg-white">
      <Box
        className="bg-wave"
        sx={{
          backgroundImage: `url(/images/wave-request.svg)`
        }}
        height={{ xs: 200, sm: 250, md: 300, lg: 360, xl: 380 }}
      ></Box>
      <Container maxWidth="xl">
        <Grid container alignItems="center" mt={{ xs: 0, sm: 0, md: 0, lg: 5, xl: 8 }} p={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}>
          <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
            <Grid item>
              <Typography variant="h1" pt={2}>
                Request a Website That Reflects Your <span className="gradient-text"> Vision</span>
                {/* <span className="gradient-text">Stand Out</span> From the Competition With a Unique Website */}
              </Typography>
              <Typography variant="body2" pt={2}>
                Get a quote or consultation for your web development needs
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={3} xl={3} pt={{ xs: 5, sm: 5, md: 5, lg: 0, xl: 0 }}>
            <Button href="/contact" variant="contained" color="primary" size="large">
              Request
            </Button>
            <Button href="/contact" variant="contained" color="info" size="large">
              Consult
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
