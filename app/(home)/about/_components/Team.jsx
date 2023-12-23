import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Person({ name, jobTitle, description, picture, linkedInAddress, xAddress }) {
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
        <Link href={xAddress} target="_blank" style={{ color: '#000' }}>
          <svg width="28" height="26" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.8427 0.742676H17.6028L11.5727 7.52008L18.6666 16.7427H13.1122L8.76173 11.1493L3.78386 16.7427H1.02207L7.4718 9.49348L0.666626 0.742676H6.36208L10.2945 5.8553L14.8427 0.742676ZM13.8739 15.1181H15.4034L5.53104 2.28196H3.88983L13.8739 15.1181Z" />
          </svg>
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
              <Person
                name="Yasin Farahi"
                jobTitle="UI/UX Designer"
                description="with 10 years experience"
                picture="/images/mr.jpg"
                linkedInAddress="https://www.linkedin.com/in/info-aliahmadi/"
                xAddress="https://www.linkedin.com/in/info-aliahmadi/"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} textAlign={'center'}>
              <Person
                name="Ali Ahmadi"
                jobTitle="Full-Stack Developer"
                description="with more than 15 years experience"
                picture="/images/al.jpg"
                linkedInAddress="https://www.linkedin.com/in/info-aliahmadi/"
                xAddress="https://www.linkedin.com/in/info-aliahmadi/"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} textAlign={'center'}>
              <Person
                name="Andrew Hiom"
                jobTitle="UI/UX Designer"
                description="with 10 years experience"
                picture="/images/ja.png"
                linkedInAddress="https://www.linkedin.com/in/info-aliahmadi/"
                xAddress="https://www.linkedin.com/in/info-aliahmadi/"
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
