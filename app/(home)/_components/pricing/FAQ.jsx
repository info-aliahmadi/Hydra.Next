'use server';
import 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import QuestionItem from './QuestionItem';

export default async function FAQ() {
  return (
    <Box className="bg-white">
      <Box
        className="bg-wave"
        sx={{
          backgroundImage: `url(/images/wave-about-3.svg)`
        }}
        height={{ xs: 300, sm: 300, md: 320, lg: 350, xl: 380 }}
      ></Box>
      <Container maxWidth="xl">
        <Grid container pt={{ xs: 0, sm: 5, md: 6, lg: 0, xl: 0 }}>
          <Grid container alignItems="center" alignContent="center" justifyContent="center">
            <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
              <Stack
                alignItems="center"
                textAlign={'center'}
                pt={{ xs: 0, sm: 0, md: 0, lg: 5, xl: 5 }}
                pb={{ xs: 10, sm: 10, md: 15, lg: 15, xl: 15 }}
                pl={{ xs: 0, sm: 0, md: 5, lg: 0, xl: 0 }}
                pr={{ xs: 0, sm: 0, md: 5, lg: 0, xl: 0 }}
              >
                <Typography variant="h1" pt={2}>
                  FAQs
                </Typography>
                <Typography variant="body2" pt={4}>
                  Find Answers to Your Questions About Working with Us
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} spacing={10}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box>
                <List component="nav" className="faq">
                  <QuestionItem
                    question="How do I submit a project request?"
                    answer="You can submit a project request by filling out the contact form on our website. Be sure to provide as much detail as possible about your project, including the scope of work, timeline, and any specific requirements or preferences you may have."
                  />
                  <QuestionItem
                    question="What types of projects can I request?"
                    answer="You can request a wide range of web development projects, from simple website design and development to complex applications and software solutions. We can also assist with front-end, back-end, or full-stack development projects, as well as maintenance and support services."
                  />
                  <QuestionItem
                    question="How are developers matched to my project?"
                    answer="Our team evaluates each project request and matches it with the most suitable developer based on their skills, experience, and availability. We strive to provide you with the best fit for your project needs."
                  />
                  <QuestionItem
                    question="What if I have specific developer requirements?"
                    answer="If you have specific requirements for a developer, such as a certain technology stack, please specify them in your project request."
                  />
                  <QuestionItem
                    question="How will I communicate with the developer?"
                    answer="You will have access to a secure platform where you can communicate with the developer. This platform allows for file sharing, messaging, and progress tracking."
                  />
                  <QuestionItem
                    question="What is the payment process?"
                    answer="Payment is typically made through our secure payment system. We offer flexible payment terms, including upfront payments, milestones-based payments, or retainers. The payment method will be agreed upon before work begins."
                  />
                  <QuestionItem
                    question="Can I negotiate the project price?"
                    answer="We offer competitive rates based on the market and the complexity of the project. While we strive to provide fair and transparent pricing, we are open to discussing your budget and finding a solution that works for both parties."
                  />
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box>
                <List component="nav" className="faq">
                  <QuestionItem
                    question="What if I'm not satisfied with the developer's work?"
                    answer="If you're not satisfied with the work, we encourage you to communicate your concerns with the developer and our team. We will do our best to address any issues and ensure that the project meets your expectations."
                  />
                  <QuestionItem
                    question="What if I need to make changes to the project?"
                    answer="Changes to the project are common and can be accommodated. Please discuss any changes with the developer and our team as soon as possible to avoid any delays or additional costs."
                  />
                  <QuestionItem
                    question="How will I know the status of my project?"
                    answer="You will receive regular updates on the project's progress through the platform. Milestones and deadlines will be set, and you can track the developer's work and provide feedback at each stage."
                  />
                  <QuestionItem
                    question="What if I need to cancel the project?"
                    answer="If you need to cancel the project, you should inform us as soon as possible. Our team will review the situation and provide you with the next steps, which may include a cancellation fee if the project has already commenced."
                  />
                  <QuestionItem
                    question="What support is available if I have questions or issues?"
                    answer="Our support team is available to assist you throughout the project. You can reach out to us via email or through the platform's support system, and we will do our best to help you."
                  />
                  <QuestionItem
                    question="What are the terms of the contract?"
                    answer="Before work begins, you will be asked to review and sign a contract that outlines the terms of the project, including the scope of work, payment terms, deadlines, and any other relevant details."
                  />
                  <QuestionItem
                    question="How do I provide feedback on the developer's performance?"
                    answer="You can provide feedback through the platform or directly to our support team. We value your input and use it to improve our services."
                  />
                </List>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Stack alignItems="center" textAlign={'center'} pt={5} pb={5}>
              <Typography variant="h2" pt={2}>
                Still have a question?
              </Typography>
              <Typography variant="body2" pt={4} pb={4}>
                Your Guide to Understanding Our Services
              </Typography>
              <Button href="/contact" variant="contained" color="info" size="large">
                Consult
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
