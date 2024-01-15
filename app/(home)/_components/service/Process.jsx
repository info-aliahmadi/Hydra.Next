'use client';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import 'react';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import QuestionAnswer from '@mui/icons-material/QuestionAnswer';
import ViewTimeline from '@mui/icons-material/ViewTimeline';
import Handshake from '@mui/icons-material/Handshake';
import Preview from '@mui/icons-material/Preview';
import RocketLaunch from '@mui/icons-material/RocketLaunch';
import Feedback from '@mui/icons-material/Feedback';
import ThumbUpAlt from '@mui/icons-material/ThumbUpAlt';
import DeveloperMode from '@mui/icons-material/QuestionAnswer';
import Timeline from '@mui/lab/Timeline';

export default function Process() {
  return (
    <Box className="bg-white">
      <Container maxWidth="xl">
        <Grid container>
          <Grid
            container
            item
            justifyContent="center"
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            rowSpacing={{ xs: 5, sm: 5, md: 5, lg: 5, xl: 5 }}
            pt={{ xs: 3, sm: 10, md: 15, lg: 10, xl: 10 }}
            pb={{ xs: 3, sm: 10, md: 15, lg: 10, xl: 10 }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} justifyContent="center" textAlign="center">
              <Typography variant="h5" pt={2}>
                Process of the work
              </Typography>
              <Typography variant="h1" pt={2}>
                How We Work?
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={7} xl={7}>
              <Timeline>
                <TimelineItem>
                  <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                  ></TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot style={{ padding: '18px' }}>
                      <QuestionAnswer fontSize="large" />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '15px', px: 4 }}>
                    <Typography variant="subtitle2">Consultation and Requirements</Typography>
                    <Typography variant="body1" p={2}>
                      The client reaches out with a project idea or request and we schedule a meeting to discuss the project scope, goals,
                      and any initial ideas or requirements.
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
                    1 Week
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot style={{ padding: '18px' }}>
                      <ViewTimeline fontSize="large" />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '30px', px: 4 }}>
                    <Typography variant="subtitle2">Proposal and Estimate</Typography>
                    <Typography variant="body1" p={2}>
                      Based on the consultation, we create a project proposal that outlines the services you will provide, the timeline, and
                      the cost estimate.
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
                    3 Days
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot style={{ padding: '18px' }}>
                      <Handshake fontSize="large" />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '30px', px: 4 }}>
                    <Typography variant="subtitle2">Contract</Typography>
                    <Typography variant="body1" p={2}>
                      Once the client approves the proposal, the client and We sign a contract then The client pays a deposit, which is
                      typically a percentage of the total project cost.
                    </Typography>
                  </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
                    3 to 4 Weeks
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot style={{ padding: '18px' }}>
                      <Preview fontSize="large" />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '30px', px: 4 }}>
                    <Typography variant="subtitle2">Design</Typography>
                    <Typography variant="body1" p={2}>
                      Our team creates wireframes and mockups to establish the layout and user interface. The client provides feedback.
                      Iterative design cycles ensure the client is satisfied with the look and feel of the application.
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
                    1 to 6 Months
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot style={{ padding: '18px' }}>
                      <DeveloperMode fontSize="large" />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '30px', px: 4 }}>
                    <Typography variant="subtitle2">Development</Typography>
                    <Typography variant="body1" p={2}>
                      Once the design is approved, the development begins. Our team write the code for the application, ensuring it is built
                      to the agreed-upon specifications.
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
                    3 Days
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot style={{ padding: '18px' }}>
                      <RocketLaunch fontSize="large" />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '30px', px: 4 }}>
                    <Typography variant="subtitle2">Launch</Typography>
                    <Typography variant="body1" p={2}>
                      We offer a period of support and maintenance after the launch to address any issues that arise. This may include
                      regular updates, security patches, and performance optimizations.
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
                    2 Weeks
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot style={{ padding: '18px' }}>
                      <Feedback fontSize="large" />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '30px', px: 4 }}>
                    <Typography variant="subtitle2">Feedback</Typography>
                    <Typography variant="body1" p={2}>
                      Based on user feedback and analytics, we may suggest improvements or new features to enhance the application. The
                      client can request changes or updates, which are implemented as part of the maintenance contract or in a new project.
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot>
                      <ThumbUpAlt fontSize="large" />
                    </TimelineDot>
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '30px', px: 4 }}>
                    <Typography variant="subtitle2">Project Closure</Typography>
                    <Typography variant="body1" p={2}></Typography>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="xl">
        <Grid container alignItems="center" alignContent="center" justifyContent="center">
          <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
            <Stack alignItems="center" textAlign={'center'} pb={15} pt={5}>
              <Typography variant="h5" pt={2}>
                Criteria
              </Typography>
              <Typography variant="h1" pt={2}>
                Acceptance Criteria <span className="gradient-text">Checklist</span>
              </Typography>
              <Box pt={4} textAlign="justify">
                <Typography variant="body2" pt={4}>
                  The following checklist outlines the acceptance criteria for the{' '}
                  <strong className="gradient-text">completed Website</strong> :
                </Typography>

                <ul className="criteria-chcklist">
                  <li>
                    <Checkbox required size="medium" checked={true} />
                    <strong className="gradient-text">Functionality:</strong> All functions and features specified in the scope of work are
                    fully operational.
                  </li>
                  <li>
                    <Checkbox required size="medium" checked={true} />
                    <strong className="gradient-text">Design:</strong> The design is consistent with the approved mockups and meets the
                    requirements specified in the scope of work.
                  </li>
                  <li>
                    <Checkbox required size="medium" checked={true} />
                    <strong className="gradient-text">Content:</strong> All content, including text and images, is accurate, complete, and
                    consistent with the approved content strategy.
                  </li>
                  <li>
                    <Checkbox required size="medium" checked={true} />{' '}
                    <strong className="gradient-text">Search Engine Optimization (SEO):</strong> The Website is optimized for search
                    engines, including meta tags, titles, and descriptions.
                  </li>
                  <li>
                    <Checkbox required size="medium" checked={true} />
                    <strong className="gradient-text">Browser Compatibility:</strong> The Website is compatible with all major browsers,
                    including Chrome, Firefox, Safari, and Edge.
                  </li>
                  <li>
                    <Checkbox required size="medium" checked={true} /> <strong className="gradient-text">Mobile Responsiveness:</strong> The
                    Website is mobile-friendly and responsive across different devices and screen sizes.
                  </li>
                  <li>
                    <Checkbox required size="medium" checked={true} /> <strong className="gradient-text">Speed and Performance:</strong> The
                    Website loads quickly and performs well under heavy traffic and usage.
                  </li>
                  <li>
                    <Checkbox required size="medium" checked={true} /> <strong className="gradient-text">Security:</strong> The Website is
                    secure, with valid SSL certificates and up-to-date software.
                  </li>
                  <li>
                    <Checkbox required size="medium" checked={true} /> <strong className="gradient-text">Testing:</strong> The Website has
                    been thoroughly tested for bugs and errors, and all issues have been resolved.
                  </li>
                </ul>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
