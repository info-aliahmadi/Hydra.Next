'use client';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import 'react';
import { useState } from 'react';
import Notify from '@(home)/_components/Notify';

export default function Newsletter() {
  const [notify, setNotify] = useState({ open: false });
  const [email, setEmail] = useState();
  function newsLetterSubscribe() {
    if (email == null || email == undefined || email == '') {
      setNotify({ open: true, type: 'error', description: 'Please enter your Email' });
      return;
    }
    setEmail();
    setNotify({ open: true, description: 'Subscribe to the newsletter successfully' });
  }
  return (
    <>
      <Grid container justifyContent="flex-end">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="body2" sx={{ textAlign: 'center' }} className="text">
            Join our newsletter to stay up to date on features and releases.
          </Typography>
        </Grid>
        <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} pt={2} alignItems={'center'} justifyContent="flex-end">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Notify notify={notify} setNotify={setNotify} sx={{ mt: '55px' }}></Notify>
            <Stack spacing={1}>
              <OutlinedInput
                id="email"
                name="email"
                type="text"
                placeholder={'Email'}
                fullWidth
                value={email || ''}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ paddingRight: 0 }}
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={newsLetterSubscribe}
                      size="large"
                      sx={{ margin: 0, borderRadius: '0 30px 30px 0' }}
                    >
                      Subscribe
                    </Button>
                  </InputAdornment>
                }
              />
            </Stack>
          </Grid>
          {/* <Grid item xs={4} sm={4} md={4} lg={4} xl={4} pl={3}></Grid> */}
        </Grid>

        <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
          <Typography variant="body1" fontSize={11} className="text">
            By subscribing you agree to with our Privacy Policy
          </Typography>
          <Typography variant="body1" fontSize={11} className="text">
            and provide consent to receive updates from our company.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
