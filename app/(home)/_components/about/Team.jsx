import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

function Person({ name, jobTitle, description, picture, linkedInAddress, gitHubAddress }) {
  return (
    <Stack alignItems="center">
      <Avatar sx={{ width: 170, height: 170 }} src={picture} />
      <Typography variant="h5" pt={2}>
        {name}
      </Typography>
      <Typography variant="body1" pt={2} fontWeight={800}>
        {jobTitle}
      </Typography>
      <Typography variant="body1" pt={1}>
        {description}
      </Typography>
      <Stack className="team social-link" pt={2} flexDirection={'row'} alignItems="center" justifyContent="center">
        <Link href={linkedInAddress} target="_blank" p={1}>
          <LinkedInIcon fontSize="large" />
        </Link>
        <Link href={gitHubAddress} target="_blank" style={{ color: '#000' }}>
          <GitHubIcon fontSize="large" />
        </Link>
      </Stack>
    </Stack>
  );
}

export default function Team() {
  return (
    <Box className="bg-blue">
      <Box
        className="bg-wave"
        sx={{
          backgroundImage: `url(/images/wave-contact.svg)`
        }}
        height={{ xs: 300, sm: 350, md: 380, lg: 400, xl: 400 }}
      ></Box>
      <Container maxWidth="xl">
        <Grid container pl={{ xs: 5, sm: 5, md: 15, lg: 0, xl: 0 }} pr={{ xs: 5, sm: 5, md: 15, lg: 0, xl: 0 }}>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            justifyContent="center"
            pb={{ xs: 3, sm: 10, md: 15, lg: 15, xl: 15 }}
          >
            <Grid item sx={{ textAlign: 'center' }}>
              <Typography variant="h1" pt={2}>
                Our Team
              </Typography>
              <Typography variant="body2" pt={2}>
                At OnWave Design, We believe in teamwork
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} rowSpacing={{ xs: 7, sm: 7, md: 5, lg: 7, xl: 7 }}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} textAlign={'center'}>
              <Stack alignItems="center">
                <Avatar sx={{ width: 170, height: 170 }} src="/images/mr.jpg" />
                <Typography variant="h5" pt={2}>
                  Eshragh
                </Typography>
                <Typography variant="body1" pt={2} fontWeight={800}>
                  3D Digital Artist
                </Typography>
                <Typography variant="body1" pt={1}>
                  with 10 years experience
                </Typography>
                <Stack className="team social-link" pt={2} flexDirection={'row'} alignItems="center" justifyContent="center">
                  <Link href="https://www.linkedin.com/in/eshraqism/" target="_blank" p={1}>
                    <LinkedInIcon fontSize="large" />
                  </Link>
                  <Link href="https://www.instagram.com/eshraqism/" target="_blank" style={{ color: '#000' }}>
                    <InstagramIcon fontSize="large" />
                  </Link>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} textAlign={'center'}>
              <Person
                name="Ali Ahmadi"
                jobTitle="Full-Stack Developer"
                description="with more than 15 years experience"
                picture="/images/al.jpg"
                linkedInAddress="https://www.linkedin.com/in/info-aliahmadi/"
                gitHubAddress="https://github.com/info-aliahmadi"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} textAlign={'center'}>
              <Person
                name="Reza Jadid"
                jobTitle="Full-Stack Developer"
                description="with 10 years experience"
                picture="/images/rez.jpg"
                linkedInAddress="https://www.linkedin.com/in/alireza-jadidzadeh/"
                gitHubAddress="https://github.com/alireza-jadidzadeh"
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
