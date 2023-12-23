import 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function PageHeader({ title, description }) {
  return (
    <Box className="bg-white">
      <Box
        className="bg-wave"
        sx={{
          backgroundImage: `url(/images/wave-blog.svg)`
        }}
        height={{ xs: 300, sm: 300, md: 350, lg: 450, xl: 550 }}
      >
        <Container maxWidth="xl" sx={{ position: 'relative' }}>
          <Grid container mb={{ xs: 5, sm: 5, md: 30, lg: 40, xl: 30 }}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              p={{ xs: 5, sm: 10, md: 15, lg: 0, xl: 0 }}
              pt={{ xs: 15, sm: 15, md: 15, lg: 20, xl: 20 }}
              pl={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}
              pr={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}
            >
              <Typography variant="h1" pt={2} sx={{ display: 'block' }}>
                {title}
              </Typography>
              <Typography variant="body2" pt={2}>
                {description}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
