'use server';
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PageHeader from '@(home)/_components/PageHeader';
import Contact from '@(home)/_components/Contact';

export async function generateMetadata() {
  return {
    title: 'Terms of Service',
  };
}

export default async function TermsofService() {
  return (
    <>
      <Box className="bg-white">
        <PageHeader title="Terms of Service" />
        <Container maxWidth="xl">
          <Grid
            container
            pb={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}
            pl={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}
            pr={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}
            justifyContent="center"
          >
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
              <Stack
                p={{ xs: 5, sm: 5, md: 5, lg: 10, xl: 10 }}
                pb={15}
                pl={{ xs: 5, sm: 15, md: 15, lg: 15, xl: 15 }}
                pr={{ xs: 5, sm: 15, md: 15, lg: 15, xl: 15 }}
                className="text-card"
              >
                <Box textAlign="justify">
                  <Typography variant="h3" pt={2} pb={2}>
                    Terms of Service
                  </Typography>
                  <p>Last updated: [2023-10-26]</p>
                  <ul>
                    <li>
                      <a href="#1">1.</a> Introduction
                    </li>
                    <li>
                      <a href="#2">2.</a> Scope of Work
                    </li>
                    <li>
                      <a href="#3">3.</a> Payment Terms
                    </li>
                    <li>
                      <a href="#4">4.</a> Responsibilities
                    </li>
                    <li>
                      <a href="#5">5.</a> Timeline
                    </li>
                    <li>
                      <a href="#6">6.</a> Acceptance Criteria
                    </li>
                    <li>
                      <a href="#7">7.</a> Maintenance and Support
                    </li>
                    <li>
                      <a href="#8">8.</a> Copyright and Licensing
                    </li>
                    <li>
                      <a href="#9">9.</a> Confidentiality
                    </li>
                    <li>
                      <a href="#10">10.</a> Acceptance Criteria Checklist
                    </li>
                  </ul>
                  <Typography variant="h5" pt={2} pb={2} id="1">
                    1. Introduction
                  </Typography>
                  <p>
                    This Agreement outlines the terms and conditions of the relationship between [OnWave Design] (&#34;we&#34;,
                    &#34;us&#34;, &#34;our&#34;) and the client (&#34;you&#34;, &#34;your&#34;) for the provision of web development
                    services.
                  </p>
                  <Typography variant="h5" pt={2} pb={2} id="2">
                    2. Scope of Work
                  </Typography>
                  <p>
                    The scope of work includes the design, development, testing, and launch of a website (the &#34;Website&#34;) based on
                    the specifications agreed upon by both parties.
                  </p>
                  <Typography variant="h5" pt={2} pb={2} id="3">
                    3. Payment Terms
                  </Typography>
                  <p>Payment for the web development services will be made according to the following schedule:</p>
                  <ul>
                    <li>50% deposit upon signing of this Agreement</li>
                    <li>25% payment upon completion of the design phase</li>
                    <li>25% payment upon completion of the development phase</li>
                    <li>Final 10% payment upon launch of the Website</li>
                  </ul>
                  <p>
                    All payments are non-refundable. Any additional services or revisions requested after the final payment will be billed
                    separately.
                  </p>
                  <Typography variant="h5" pt={2} pb={2} id="4">
                    4. Responsibilities
                  </Typography>
                  <Typography variant="subtitle2" pt={1} pb={1}>
                    4.1. Client Responsibilities
                  </Typography>
                  <ul>
                    <li>Providing all necessary content, images, and information required for the Website</li>
                    <li>Ensuring that the content and graphics provided do not infringe on any copyright or trademark laws</li>
                  </ul>
                  <Typography variant="subtitle2" pt={1} pb={1}>
                    4.2. Developer Responsibilities
                  </Typography>
                  <ul>
                    <li>Creating a functional and visually appealing Website based on the agreed-upon specifications</li>
                    <li>Optimizing the Website for search engines and meeting current web standards</li>
                  </ul>
                  <Typography variant="h5" pt={2} pb={2} id="5">
                    5. Timeline
                  </Typography>
                  <p>The timeline for the project will be determined based on the complexity of the project and the resources available.</p>
                  <Typography variant="h5" pt={2} pb={2} id="6">
                    6. Acceptance Criteria
                  </Typography>
                  <p>
                    The client will have seven days to review and test the Website upon its completion. During this time, the client may
                    request any necessary revisions or bug fixes.
                  </p>
                  <Typography variant="h5" pt={2} pb={2} id="7">
                    7. Maintenance and Support
                  </Typography>
                  <p>
                    We offer optional maintenance and support packages to ensure the continued functionality and security of the Website.
                  </p>
                  <Typography variant="h5" pt={2} pb={2} id="8">
                    8. Copyright and Licensing
                  </Typography>
                  <p>Once the final payment has been received, the client owns the rights to the Website and its contents.</p>
                  <Typography variant="h5" pt={2} pb={2} id="9">
                    9. Confidentiality
                  </Typography>
                  <p>Both parties agree to keep confidential all proprietary information shared during the course of the project.</p>
                  <Typography variant="h4" pt={2} pb={3} id="10">
                    Acceptance Criteria Checklist:
                  </Typography>
                  The following checklist outlines the acceptance criteria for the completed Website:
                  <ul>
                    <li>
                      <strong>Functionality:</strong> All functions and features specified in the scope of work are fully operational.
                    </li>
                    <li>
                      <strong>Design:</strong> The design is consistent with the approved mockups and meets the requirements specified in
                      the scope of work.
                    </li>
                    <li>
                      <strong>Content:</strong> All content, including text and images, is accurate, complete, and consistent with the
                      approved content strategy.
                    </li>
                    <li>
                      <strong>Search Engine Optimization (SEO):</strong> The Website is optimized for search engines, including meta tags,
                      titles, and descriptions.
                    </li>
                    <li>
                      <strong>Browser Compatibility:</strong> The Website is compatible with all major browsers, including Chrome, Firefox,
                      Safari, and Edge.
                    </li>
                    <li>
                      <strong>Mobile Responsiveness:</strong> The Website is mobile-friendly and responsive across different devices and
                      screen sizes.
                    </li>
                    <li>
                      <strong>Speed and Performance:</strong> The Website loads quickly and performs well under heavy traffic and usage.
                    </li>
                    <li>
                      <strong>Security:</strong> The Website is secure, with valid SSL certificates and up-to-date software.
                    </li>
                    <li>
                      <strong>Testing:</strong> The Website has been thoroughly tested for bugs and errors, and all issues have been
                      resolved.
                    </li>
                  </ul>
                </Box>
                <Box pt={5} mt={5} borderTop={'1px solid #00000069'}></Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Contact />
    </>
  );
}
