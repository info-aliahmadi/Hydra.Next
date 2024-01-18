'use client';
import 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { useState } from 'react';
import BusinessCenter from '@mui/icons-material/BusinessCenter';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import DesktopMacOutlined from '@mui/icons-material/DesktopMacOutlined';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

export default function ServiceTab() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="bg-white">
      <Box
        className="bg-wave"
        sx={{
          backgroundImage: `url(/images/wave-about-3.svg)`
        }}
        height={{ xs: 250, sm: 280, md: 300, lg: 330, xl: 350 }}
      ></Box>
      <Container maxWidth="xl">
        <Grid
          container
          alignItems="center"
          alignContent="center"
          justifyContent="center"
          pt={{ xs: 3, sm: 5, md: 6, lg: 0, xl: 0 }}
          pb={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}
        >
          <Grid
            item
            alignItems="center"
            alignContent="center"
            justifyContent="center"
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            pl={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}
            pr={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}
          >
            <Stack alignItems="center" textAlign={'center'} pt={{ xs: 0, sm: 6, md: 10, lg: 15, xl: 15 }} pb={{ xs: 0, sm: 6, md: 10, lg: 15, xl: 15 }}>
              <Typography variant="h5" pt={2}>
                From Concept to Code
              </Typography>
              <Typography variant="h1" pt={2} lineHeight={1.6}>
                Crafting Experiences<strong className="gradient-text"> Beyond the Screen </strong> <br /> Your Website, Our Art
              </Typography>
              <Typography variant="body2" pt={4}>
                More than a website, it&apos;s a digital art form. We specialize in crafting experiences that extend beyond the screen,
                leaving a lasting impact. Your website becomes a canvas for our artistic expression, ensuring a memorable user journey.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} xl={12} lg={12} md={12} sm={12}>
            <Box>
              <Tabs value={value} onChange={handleChange} aria-label="Vertical tabs example" sx={{ ml:'25px'}}
  variant="scrollable"
  scrollButtons="auto">
                <Tab label="Portfolio" icon={<BusinessCenter />} iconPosition="start" {...a11yProps(0)} />
                <Tab label="E-Commerce" icon={<ShoppingBag />} iconPosition="start" {...a11yProps(1)} />
                <Tab label="Web Application" icon={<DesktopMacOutlined />} iconPosition="start" {...a11yProps(2)} />
              </Tabs>
              <Box pt={5} pl={{ xs: 0, sm: 2, md: 5, lg: 5, xl: 5 }} pb={4} className="text-card">
                <TabPanel component="div" value={value} index={0}>
                  <Typography variant="h3">What Is Portfolio Website?</Typography>
                  <Box pt={4}>
                    <p>
                      A portfolio website is a website that showcases a collection of projects, works, or achievements of an individual or
                      organization. It is typically used to display a range of examples that demonstrate skills, abilities, and
                      accomplishments in a particular field or industry. Portfolio websites are commonly used by artists, designers,
                      writers, photographers, developers, and other creative professionals to showcase their work and attract potential
                      clients or employers.
                    </p>
                    <p>
                      They can also be used by organizations to showcase their products, services, or initiatives. The main purpose of a
                      portfolio website is to provide a platform for individuals or organizations to present their work in a professional
                      and organized manner, making it easier for potential clients or employers to assess their capabilities and hire them
                      for jobs or projects.
                    </p>
                    <p>Portfolio websites often include the following features:</p>
                    <ul>
                      <li>
                        <strong className="gradient-text2">Project galleries:</strong> A section where projects are displayed in a visually
                        appealing way, with images, videos, or other media.
                      </li>

                      <li>
                        <strong className="gradient-text2">Case studies:</strong> Detailed information about specific projects, including
                        objectives, strategies, and results.
                      </li>
                      <li>
                        <strong className="gradient-text2">About page:</strong> Information about the individual or organization, including
                        background, experience, and skills.
                      </li>
                      <li>
                        <strong className="gradient-text2">Contact page:</strong> A form or contact information for getting in touch with
                        the individual or organization.
                      </li>
                      <li>
                        <strong className="gradient-text2">Resume or CV:</strong> A downloadable version of the individual&apos;s resume or
                        curriculum vitae.
                      </li>
                      <li>
                        <strong className="gradient-text2">Blog or news section:</strong> A section for sharing news, updates, and insights
                        related to the individual&apos;s or organization&apos;s field of work.
                      </li>
                      <li>
                        <strong className="gradient-text2">Social media links:</strong> Links to social media profiles, such as LinkedIn,
                        Twitter, or Instagram.
                      </li>
                      <li>
                        <strong className="gradient-text2">Testimonials:</strong> Quotes or reviews from previous clients or colleagues,
                        highlighting the individual&apos;s or organization&apos;s strengths and capabilities.
                      </li>
                    </ul>
                    Overall, a portfolio website serves as a powerful marketing tool, helping individuals and organizations to establish
                    credibility, showcase their expertise, and attract new opportunities.
                  </Box>
                </TabPanel>
                <TabPanel component="div" value={value} index={1} suppressHydrationWarning>
                  <Typography variant="h3">What Is E-Commerce Website?</Typography>
                  <Box pt={4}>
                    <p>
                      An ecommerce website, short for electronic commerce website, is a platform that allows businesses to sell products or
                      services to customers over the internet. It serves as an online storefront where potential buyers can browse, select,
                      and purchase items without the need for physical contact or a brick-and-mortar location.
                    </p>
                    <p>Ecommerce websites typically include features such as:</p>
                    <ul>
                      <li>
                        <strong className="gradient-text2">Homepage:</strong> The main page that provides an overview of the store,
                        featuring popular products, promotions, and a call to action.
                      </li>

                      <li>
                        <strong className="gradient-text2">Product Categories:</strong> A page that lists all the product categories, making
                        it easy for customers to find what they&apos;re looking for.
                      </li>
                      <li>
                        <strong className="gradient-text2">Product Detail:</strong> Pages for individual products that include images,
                        descriptions, pricing, and sometimes reviews and related products.
                      </li>
                      <li>
                        <strong className="gradient-text2">Shopping Cart:</strong> A page where customers can view and manage items
                        they&apos;ve added to their cart.
                      </li>
                      <li>
                        <strong className="gradient-text2">Checkout:</strong> A step-by-step process for customers to enter their shipping
                        information, payment details, and any other necessary information to complete their purchase.
                      </li>
                      <li>
                        <strong className="gradient-text2">My Account:</strong> A page where customers can view their order history, update
                        account details, and manage their preferences.
                      </li>
                      <li>
                        <strong className="gradient-text2">Payment Gateway:</strong> The secure page where customers enter their payment
                        information to finalize their order.
                      </li>
                      <li>
                        <strong className="gradient-text2">Order Tracking:</strong> A page where customers can track the status of their
                        order.
                      </li>
                      <li>
                        <strong className="gradient-text2">Customer Service:</strong> A page with contact information and FAQs to assist
                        customers with inquiries or issues.
                      </li>
                      <li>
                        <strong className="gradient-text2">Contact Us:</strong> A page with contact details for customers to reach out to
                        the business.
                      </li>
                      <li>
                        <strong className="gradient-text2">About Us:</strong> A page that provides information about the company, its
                        mission, and team.
                      </li>
                      <li>
                        <strong className="gradient-text2">Blog or News:</strong> A section where the business can share updates, industry
                        news, and articles of interest to customers.
                      </li>
                    </ul>
                    Each feature is designed to enhance the shopping experience and encourage customer loyalty. Ecommerce websites can be
                    built from scratch by a company or individual, or they can use pre-built platforms.
                  </Box>
                </TabPanel>
                <TabPanel component="div" value={value} index={2}>
                  <Typography variant="h3"> What Is Custom Web Application?</Typography>
                  <Box pt={4}>
                    <p>
                      A web application is a type of software that is accessed through a web browser and runs on a remote server. It is
                      designed to help users perform specific tasks or to provide access to specific information over the internet. Web
                      applications can be as simple as a contact form on a website or as complex as a full-fledged online store, social
                      media platform, or content management system.
                    </p>
                    <p>
                      When a customer wants a custom web application, they are typically looking for a solution that is tailored to their
                      specific needs, rather than using a pre-built software application that may not fit their requirements exactly.
                      Here&apos;s what a customer might expect from a custom web application:
                    </p>
                    <ul>
                      <li>
                        <strong className="gradient-text2"> Tailored Functionality:</strong> The application should be designed to meet the
                        unique requirements of the customer&apos;s business or personal needs. This could include custom features,
                        workflows, and integrations with other systems.
                      </li>
                      <li>
                        <strong className="gradient-text2">User-Friendly Interface:</strong> A well-designed interface ensures that users
                        can interact with the application intuitively, which is crucial for user adoption and satisfaction.
                      </li>
                      <li>
                        <strong className="gradient-text2"> Security:</strong> With sensitive data often being handled by web applications,
                        security is a top priority. Customers expect robust security measures to protect their data from unauthorized access
                        or breaches.
                      </li>
                      <li>
                        <strong className="gradient-text2"> Performance:</strong> The application should perform well, with fast load times
                        and the ability to handle high traffic volumes without slowing down or crashing.
                      </li>
                      <li>
                        <strong className="gradient-text2">Scalability:</strong> As the customer&apos;s business grows, the web application
                        should be able to scale to accommodate more users, data, and transactions.
                      </li>
                      <li>
                        <strong className="gradient-text2"> Custom Branding:</strong> The application should reflect the customer&apos;s
                        brand, with the ability to customize the look and feel to match their corporate identity.
                      </li>
                      <li>
                        <strong className="gradient-text2"> Integration:</strong> The ability to integrate with existing systems, such as
                        CRM platforms, payment gateways, or inventory management systems, can streamline operations and improve efficiency.
                      </li>
                      <li>
                        <strong className="gradient-text2"> Maintenance and Support:</strong> Customers expect ongoing maintenance and
                        support to ensure the application remains secure, up-to-date, and functioning optimally.
                      </li>
                      <li>
                        <strong className="gradient-text2"> Responsive Design:</strong> In today&apos;s mobile-first world, the web
                        application should be designed to work seamlessly across a variety of devices and screen sizes.
                      </li>
                      <li>
                        <strong className="gradient-text2"> Analytics and Reporting:</strong> The ability to track usage metrics and
                        generate reports can help customers understand how the application is being used and make data-driven decisions.
                      </li>
                      <li>
                        <strong className="gradient-text2"> Compliance:</strong> For businesses operating in regulated industries, the web
                        application should adhere to relevant compliance standards, such as HIPAA for healthcare or PCI DSS for payments.
                      </li>
                      <li>
                        <strong className="gradient-text2"> Accessibility:</strong> A custom web application should be accessible to all
                        users, including those with disabilities, by following accessibility guidelines.
                      </li>
                    </ul>
                    <p>
                      Custom web applications are typically developed by a team of professionals, including developers, designers, project
                      managers, and quality assurance testers. The development process often involves several stages, including requirements
                      gathering, design, development, testing, deployment, and maintenance.
                    </p>
                    <p>
                      By investing in a custom web application, customers can gain a competitive edge by having a tool that is specifically
                      designed to meet their needs, improve operational efficiency, and enhance the user experience.
                    </p>
                  </Box>
                </TabPanel>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
