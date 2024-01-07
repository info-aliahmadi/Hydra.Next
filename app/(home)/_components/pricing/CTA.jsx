import 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function CTA() {
  return (
    <Box className="bg-blue">
      <Box
        className="bg-wave"
        sx={{
          backgroundImage: `url(/images/wave-contact.svg)`
        }}
        height={{ xs: 300, sm: 350, md: 400, lg: 450, xl: 400 }}
      ></Box>
      <Container maxWidth="xl">
        <Grid container>
          <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} pt={{ xs: 5, sm: 8, md: 8, lg: 8, xl: 8 }} justifyContent="center">
            <Grid item sx={{ textAlign: 'center' }}>
              <Typography variant="h1" pt={2}>
                <span className="gradient-text">Invest</span> in Your Future: Build a Website with Us
              </Typography>
              <Typography variant="body2" pt={4} pb={4}>
                At OnWave Design, we specialize in proving cutting-edge web design
              </Typography>
              <Box>
                <Button href="/contact" variant="contained" color="info" size="large">
                  Consult
                </Button>
                <Button href="/contact" variant="contained" color="primary" size="large">
                  Request
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
