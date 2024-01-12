'use server';
import Button from '@mui/material/Button';
import 'react';

export default async function RequestButtons() {
  return (
    <>
      <Button
        href="/contact"
        variant="contained"
        color="info"
        size="large"
        sx={{
          display: { xs: 'none', sm: 'inline-block', md: 'inline-block', lg: 'inline-block', xl: 'inline-block' }
        }}
      >
        Consult
      </Button>
      <Button
        href="/contact"
        variant="contained"
        color="primary"
        size="large"
        sx={{
          display: { xs: 'none', sm: 'inline-block', md: 'inline-block', lg: 'inline-block', xl: 'inline-block' }
        }}
      >
        Request
      </Button>
    </>
  );
}
