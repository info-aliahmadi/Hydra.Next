import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import 'react';

export default function Story() {
  return (
    <Box className="bg-white">
      {/* <Box
        // className="bg-wave"
        // sx={{
        //   backgroundImage: `url(${WaveAboutImage})`
        // }}
        height={{ xs: 300, sm: 300, md: 350, lg: 400, xl: 460 }}
      ></Box> */}
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
            rowSpacing={{ xs: 5, sm: 5, md: 5, lg: 5, xl: 5 }}
            p={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}
            className="xyz-in"
          >
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Typography variant="h5" pt={2} xyz="fade small stagger ease-out-back">
                About Us
              </Typography>
              <Typography variant="h1" pt={2} xyz="fade small stagger ease-out-back">
                World-Class Web Development: OnWaveDesign&lsquo;s <span className="gradient-text">International</span> Team
              </Typography>

              <Grid
                container
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={10}
                justifyContent="space-evenly"
                alignItems="center"
                pt={10}
                pb={{ xs: 0, sm: 0, md: 5, lg: 5, xl: 5 }}
              >
                <Box m={1}>
                  <img alt="Visual Studio" title="Visual Studio" src="/images/tech/visualStudio.png" height={'100px'} />
                </Box>

                <Box m={1}>
                  <img alt=".Net" title=".Net" src="/images/tech/dotnet.png" height={'100px'} />
                </Box>
                <Box m={1}>
                  <img alt="ASP.Net" title="ASP.Net" src="/images/tech/aspnet.png" height={'100px'} />
                </Box>
                <Box m={1}>
                  <img alt="C#" title="C#" src="/images/tech/csharp.png" height={'100px'} />
                </Box>
                <Box m={1}>
                  <img alt="Sql Server" title="Sql Server" src="/images/tech/sqlserver.png" height={'100px'} />
                </Box>
                <Box m={1}>
                  <img alt="MongoDB" title="MongoDB" src="/images/tech/mongo.png" height={'100px'} />
                </Box>
                <Box m={1}>
                  <img alt="Elastic" title="Elastic" src="/images/tech/elastic.png" height={'100px'} />
                </Box>
                <Box m={1}>
                  <img alt="Kibana" title="Kibana" src="/images/tech/kibana.png" height={'100px'} />
                </Box>
                <Box m={1}>
                  <img alt="Redis" title="Redis" src="/images/tech/redis.png" height={'100px'} />
                </Box>
                <Box m={1}>
                  <img alt="Javascript" title="Javascript" src="/images/tech/javascript.png" height={'100px'} />
                </Box>
                <Box m={1}>
                  <img alt="Reactjs" title="Reactjs" src="/images/tech/reactjs.png" height={'100px'} />
                </Box>
                <Box m={1}>
                  <img alt="Figma" title="Figma" src="/images/tech/figma.png" height={'100px'} />
                </Box>
                <Box m={1} className="xyz-nested">
                  <img alt="Blender" title="Blender" src="/images/tech/material.png" height={'100px'} />
                </Box>
                <Box m={1} className="xyz-nested">
                  <img alt="Blender" title="Blender" src="/images/tech/blender.png" height={'100px'} />
                </Box>
                <Box m={1} className="xyz-nested">
                  <img alt="Spline" title="Spline" src="/images/tech/spline.png" height={'100px'} />
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Typography variant="body2" p={{ xs: 1, sm: 1, md: 3, lg: 10, xl: 10 }}>
                Welcome to <strong className="gradient-text">OnWaveDesign</strong> , the website of a team of international professional web
                developers. We have over <strong className="gradient-text"> 15 years of combined experience</strong> in creating beautiful,
                responsive, and user-friendly websites for various clients and purposes. We specialize in{' '}
                <strong className="gradient-text"> front-end development </strong> , using the latest technologies and frameworks such as
                <strong className="gradient-text"> HTML5, CSS3, JavaScript, React, NextJs, Bootstrap and Material Design(MUI) </strong> . We also
                have skills in <strong className="gradient-text"> back-end development </strong> , working with
                <strong className="gradient-text"> .NET, ASP.Net, SQL Server and MongoDB </strong> . We can create websites from scratch, or
                redesign and improve existing ones. We can also integrate various features and functionalities such as e-commerce, blogs,
                contact forms, social media, and more. We are passionate about web development and always eager to learn new things and
                challenge ourselves. We value quality, creativity, and customer satisfaction. We work closely with our clients to understand
                their needs and expectations, and deliver the <strong className="gradient-text"> best solutions </strong> for their
                projects. If you are looking for a team of web developers who can create a stunning and functional website for you, you have
                come to the right place. Please feel free to browse our website. You can also read the testimonials from our previous
                clients, who were happy with our work and service. If you are interested in hiring us, or have any questions or inquiries,
                please do not hesitate to
                <strong className="gradient-text"> contact us </strong> . You can use the contact form on this website, or send us an email
                at<strong className="gradient-text"> info@OnWaveDesign.com </strong> . We will get back to you as soon as possible. Thank
                you for visiting our website. We hope to hear from you soon.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
