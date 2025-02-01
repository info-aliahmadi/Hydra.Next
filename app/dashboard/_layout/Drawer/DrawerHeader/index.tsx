// material-ui
import { Stack, Chip } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from '@dashboard/_components/Logo/Logo';
import CONFIG from '@root/config';

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }: {open: boolean}) => {

  return (
    // only available in paid version
    <DrawerHeaderStyled open={open}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Logo />
        {open && (
          <Chip
            label={CONFIG.APP_VERSION}
            size="small"
            sx={{ height: 16, '& .MuiChip-label': { fontSize: '0.625rem', py: 0.25 } }}
            component="a"
            href="https://github.com/info-aliahmadi/Hydra.React"
            target="_blank"
            clickable
          />
        )}
      </Stack>
    </DrawerHeaderStyled>
  );
};

export default DrawerHeader;
