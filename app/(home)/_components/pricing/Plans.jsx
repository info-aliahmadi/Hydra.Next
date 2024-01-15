'use server'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import 'react';

export default async function Plans() {
  function PlanBox({ plan, price, description, commingSoon }) {
    return (
      <Box className="plan-box" p={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 5 }} textAlign="center">
        <Typography variant="h3">{plan}</Typography>
        <Typography variant="h1" lineHeight={2}>
          {price}
        </Typography>
        <Typography variant="body1" lineHeight={3}>
          {description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          href={commingSoon ? '' : '/contact'}
          className={commingSoon ? 'btn-comming-soon' : ''}
        >
          {commingSoon ? 'Comming Soon' : 'Request'} {!commingSoon && <ChevronRightIcon />}
        </Button>
      </Box>
    );
  }

  function Feature({ title, portfolio, eCommerce, wenApplication }) {
    return (
      <TableRow>
        <TableCell component="th" align="left" sx={{ width: '200px' }}>
          {title}
        </TableCell>
        <TableCell component="th" align="center">
          {portfolio && <CheckOutlinedIcon />}
        </TableCell>
        <TableCell component="th" align="center">
          {eCommerce && <CheckOutlinedIcon />}
        </TableCell>
        <TableCell component="th" align="center">
          {wenApplication && <CheckOutlinedIcon />}
        </TableCell>
      </TableRow>
    );
  }
  return (
    <Box className="bg-blue">
      <Box
        className="bg-wave"
        sx={{
          backgroundImage: `url(/images/wave-service.svg)`
        }}
        height={{ xs: 300, sm: 300, md: 320, lg: 350, xl: 380 }}
      ></Box>
      <Container maxWidth="xl">
        <Grid container>
          <Grid
            container
            item
            rowSpacing={{ xs: 7, sm: 7, md: 5, lg: 7, xl: 7 }}
            pt={{ xs: 0, sm: 0, md: 0, lg: 5, xl: 5 }}
            pb={{ xs: 3, sm: 10, md: 10, lg: 10, xl: 10 }}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <Stack
              alignItems="center"
              textAlign={'center'}
              pt={{ xs: 0, sm: 10, md: 15, lg: 15, xl: 15 }}
              pb={{ xs: 0, sm: 5, md: 5, lg: 5, xl: 5 }}
              pl={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}
              pr={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}
            >
              <Typography variant="h5" pt={2}>
                Our Mission
              </Typography>
              <Typography variant="h1" pt={2}>
                <span className="gradient-text"> Grow Your Business</span> with Custom Web Solutions
              </Typography>
              <Typography variant="body2" pt={4}>
                Revolutionize your business with OnWave Design – where tailored solutions meet digital excellence, fueling growth and
                success in the modern marketplace
              </Typography>
            </Stack>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} textAlign={'center'}>
              <TableContainer>
                <Table className="feature-table">
                  {/* <TableHead>
                    <TableRow>
                      <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                      <StyledTableCell align="right">Calories</StyledTableCell>
                      <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                    </TableRow>
                  </TableHead> */}
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" align="center"></TableCell>
                      <TableCell component="th">
                        <PlanBox plan="Portfolio" price="$2,000" description="and 100$ Monthly Support" />
                      </TableCell>
                      <TableCell component="th" align="center">
                        <PlanBox plan="E-Commerce" price="$4,000" description="and 100$ Monthly Support" commingSoon={true} />
                      </TableCell>
                      <TableCell component="th" align="center">
                        <PlanBox plan="Web Application" price="$10/ph" description="and 200$ Monthly Support" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" align="left" sx={{ width: '200px', fontWeight: 800 }}>
                        <Typography variant="body2" fontWeight={700}>
                          User Authentication
                        </Typography>
                      </TableCell>
                      <TableCell component="th" align="center"></TableCell>
                      <TableCell component="th" align="center"></TableCell>
                      <TableCell component="th" align="center"></TableCell>
                    </TableRow>
                    <Feature title="User Registration" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="User Login" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Session Management" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Password Reset" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Two-Factor Authentication (2FA)" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Full user control" portfolio={true} eCommerce={true} wenApplication={true} />

                    <TableRow>
                      <TableCell component="th" align="left" sx={{ width: '200px', fontWeight: 800 }}>
                        <Typography variant="body2" fontWeight={700}>
                          User Authorization
                        </Typography>
                      </TableCell>
                      <TableCell component="th" align="center"></TableCell>
                      <TableCell component="th" align="center"></TableCell>
                      <TableCell component="th" align="center"></TableCell>
                    </TableRow>
                    <Feature title="Define Roles and Permissions" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Store Roles and Permissions in the Database" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Implement Role-Based Access Control (RBAC)" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Permission Middleware on Endpoints" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Handle Authorization Checks" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Dynamic Permissions" portfolio={true} eCommerce={true} wenApplication={true} />

                    <TableRow>
                      <TableCell component="th" align="left" sx={{ width: '200px', fontWeight: 800 }}>
                        <Typography variant="body2" fontWeight={700}>
                          Content Management
                        </Typography>
                      </TableCell>
                      <TableCell component="th" align="center"></TableCell>
                      <TableCell component="th" align="center"></TableCell>
                      <TableCell component="th" align="center"></TableCell>
                    </TableRow>

                    <Feature title="Content Creation (WYSIWYG)" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Hierarchical Content Organization(Category)" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Schedule Content Publishing" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Media Library" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Categories and Tags" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Search Engine Optimization (SEO)" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Create and Edit Categories" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Category Hierarchy" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Create and Edit Tags" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Create and Organize Menus" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Menus Sorting" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Create and Edit Pages" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Define Tags for Pages" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Create and Manage Slideshows" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Slide Sorting" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Create and Edit Links" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Organize Links" portfolio={true} eCommerce={true} wenApplication={true} />
                    <TableRow>
                      <TableCell component="th" align="left" sx={{ width: '200px', fontWeight: 800 }}>
                        <Typography variant="body2" fontWeight={700}>
                          Messaging
                        </Typography>
                      </TableCell>
                      <TableCell component="th" align="center"></TableCell>
                      <TableCell component="th" align="center"></TableCell>
                      <TableCell component="th" align="center"></TableCell>
                    </TableRow>
                    <Feature title="Send and Receive Private Messages" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Inbox Management" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Outbox Management" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Bulk Messaging" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Message Templates" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Contact Message Management" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Request Message Management" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Send Public Message" portfolio={true} eCommerce={true} wenApplication={true} />
                    <TableRow>
                      <TableCell component="th" align="left" sx={{ width: '200px', fontWeight: 800 }}>
                        <Typography variant="body2" fontWeight={700}>
                          Email Management
                        </Typography>
                      </TableCell>
                      <TableCell component="th" align="center"></TableCell>
                      <TableCell component="th" align="center"></TableCell>
                      <TableCell component="th" align="center"></TableCell>
                    </TableRow>
                    <Feature title="Send and Receive Email" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Email Inbox" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Email Outbox" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Bulk Email" portfolio={true} eCommerce={true} wenApplication={true} />
                    <Feature title="Email Templates" portfolio={true} eCommerce={true} wenApplication={true} />
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
