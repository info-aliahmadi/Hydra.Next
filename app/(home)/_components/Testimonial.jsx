'use client';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import Carousel from 'react-material-ui-carousel';
import 'react';
import { useTheme } from '@mui/material';

export default function Testimonial({ showWave }) {
  const steps = [
    {
      name: 'John D',
      avatar: '/images/ja.png',
      company: 'Startup Founder',
      description: `As a startup founder, I knew I needed a strong online 
      presence to attract investors and customers. OnWave Design helped 
      me create a professional-looking website that showcases our brand
       and values perfectly. Their expertise in web development and design exceeded my expectations.`
    },
    {
      name: 'Sarah R',
      avatar: '/images/sa.png',
      company: 'Small Business Owner',
      description: `I needed a website for my business, and OnWave Design
       delivered! Not only did they design a beautiful site, but they also
        made sure it was user-friendly and easy to navigate. My customers
         love it, and I've seen a significant increase in sales since 
         launching the new site. Highly recommend!`
    },
    {
      name: 'Emily G',
      avatar: '/images/em.jpg',
      company: 'Entrepreneur',
      description: `My old website was outdated. OnWave Design revamped my site and gave
       it a modern look that reflects my brand's personality. The new
        site is visually appealing and much easier to manage and update.
         Thanks to OnWave Design, my online presence has taken a huge leap forward!`
    }
  ];
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box className="bg-blue">
      {showWave && (
        <Box
          className="bg-wave"
          sx={{
            backgroundImage: `url(/images/wave-service.svg)`
          }}
          height={{ xs: 250, sm: 280, md: 300, lg: 330, xl: 350 }}
        ></Box>
      )}
      <Box pb={{ xs: 15, sm: 8, md: 8, lg: 8, xl: 8 }}>
        <Container maxWidth="xl" sx={{ p: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }, zIndex: 90 }}>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} style={{ position: 'relative', zIndex: 90 }}>
            <Box
              className="bg-wave"
              sx={{
                position: 'relative',
                left: 0,
                top: 0,
                width: '100%',
                zIndex: 99,
                height: '100%',
                minHeight: '500px',
                backgroundImage: `url(/images/wave-testimonial.svg)`
              }}
              height={{ xs: 250, sm: 280, md: 300, lg: 330, xl: 350 }}
            >
              {/* <img
              src={WaveTestimonialImage}
              alt=""
              style={{}}
            /> */}
              <Box>
                <Carousel
                  navButtonsAlwaysVisible={true}
                  swipe={true}
                  cycleNavigation={true}
                  navButtonsProps={{
                    // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                    style: {
                      color: '#2c302e',
                      padding: '22px',
                      paddingBottom: '22px',
                      borderRadius: '30px',
                      border: '1px solid #A1D4F8',
                      background: 'linear-gradient(180deg, #CEEBFF, #A1D4F8)',
                      boxShadow: '0px 10px 15px -6px #3683bb4d, 0px 4px 0px 0px #ffffff33 inset'
                    }
                  }}
                >
                  {steps.map((step, index) => (
                    <Grid
                      key={'x-' + index}
                      item
                      container
                      justifyContent="center"
                      alignItems="center"
                      pt={{ xs: 20, sm: 20, md: 25, lg: 25, xl: 24 }}
                      pb={{ xs: 10, sm: 10, md: 12, lg: 15, xl: 20 }}
                      pl={{ xs: 0, sm: 1, md: 8, lg: 3, xl: 0 }}
                      pr={{ xs: 0, sm: 1, md: 8, lg: 3, xl: 0 }}
                      sx={{
                        position: 'relative'
                        //top: '30%'
                      }}
                    >
                      <Grid item xs={9} sm={8} md={10} lg={9} xl={8}>
                        <Box sx={{ textAlign: 'center' }} p={{ xs: 2, sm: 1, md: 2, lg: 2, xl: 5 }}>
                          <StarRateRoundedIcon fontSize={'large'} color="warning" />
                          <StarRateRoundedIcon fontSize={'large'} color="warning" />
                          <StarRateRoundedIcon fontSize={'large'} color="warning" />
                          <StarRateRoundedIcon fontSize={'large'} color="warning" />
                          <StarRateRoundedIcon fontSize={'large'} color="warning" />
                        </Box>
                        <Typography variant="h4" textAlign={'center'}>
                          {step.description}
                        </Typography>
                      </Grid>
                      <Grid item xs={11} sm={10} md={12} lg={7} xl={7} mb={{ xs: 10, sm: 10, md: 12, lg: 15, xl: 8 }}>
                        <Grid container mt={{ xs: 0, sm: 0, md: 2, lg: 2, xl: 5 }} alignItems="center" justifyContent="center">
                          <Grid item xs={3} sm={2} md={2} lg={2} xl={2} sx={{ maxWidth: '80px !important' }}>
                            <Avatar sx={{ width: 70, height: 70 }} src={step.avatar}></Avatar>
                          </Grid>
                          <Grid item xs={4} sm={4} md={4} lg={5} xl={5}>
                            <Typography variant="body1" fontWeight={600}>
                              {step.name}
                            </Typography>
                            <Typography variant="body1">{step.company}</Typography>
                          </Grid>
                          <Grid
                            item
                            xs={3}
                            sm={3}
                            md={3}
                            lg={3}
                            xl={3}
                            style={{ borderLeft: '1px solid #2c302e' }}
                            p={{ xs: 2, sm: 2, md: 3, lg: 4.5, xl: 4.5 }}
                          >
                            <img src={matchDownSM ? '/images/OnWaveArm.png' : '/images/OnWaveLogo.png'} alt="" />
                            {/* <img src={OnWaveArm} alt="Company Logo" /> */}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Carousel>
              </Box>
            </Box>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
