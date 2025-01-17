// material-ui
import AnimateButton from '@dashboard/_components/@extended/AnimateButton';
import MainCard from '@dashboard/_components/MainCard';
import { Button, CardMedia, Link, Stack, Typography } from '@mui/material';

// project import

// ==============================|| DRAWER CONTENT - NAVIGATION CARD ||============================== //

const NavCard = () => (
  <MainCard sx={{ bgcolor: 'grey.50', m: 3 }}>
    <Stack alignItems="center" spacing={2.5}>
      <CardMedia component="img" image="/images/users/avatar-group.png" sx={{ width: 112 }} />
      <Stack alignItems="center">
        <Typography variant="h5">Mantis Pro</Typography>
        <Typography variant="h6" color="secondary">
          Checkout pro features
        </Typography>
      </Stack>
      <AnimateButton>
        <Button component={Link} target="_blank" href="https://mantisdashboard.io" variant="contained" color="success" size="small">
          Pro
        </Button>
      </AnimateButton>
    </Stack>
  </MainCard>
);

export default NavCard;
