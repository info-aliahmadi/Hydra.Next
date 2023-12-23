'use server';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import 'react';

export default async function Copyright() {
  return (
    <>
      <Grid container className="copyright" p={3} justifyContent={'space-between'}>
        <Grid item>
          <Typography variant="body1" className="text">
            © 2023 OnWaveDesign. All rights reserved.
          </Typography>
        </Grid>
        <Grid item>
          <Box className="copyright-links">
            <Typography sx={{ minWidth: 100 }} variant="body1">
              <a href="/privacypolicy"> Privacy Policy</a>
            </Typography>
            <Typography sx={{ minWidth: 100 }} variant="body1">
              <a href="/termsofservice"> Terms of Service</a>
            </Typography>
            <Typography sx={{ minWidth: 100 }} variant="body1">
              <a href="/cookiessettings"> Cookies Settings</a>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
