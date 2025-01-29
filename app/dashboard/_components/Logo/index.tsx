import PropTypes from 'prop-types';

// material-ui
import { ButtonBase, Link } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// project import
import Logo from './Logo';
import CONFIG from '@root/config';
import { activeItem } from 'store/reducers/menu';

// ==============================|| MAIN LOGO ||============================== //

import { SxProps } from '@mui/system';

interface LogoSectionProps {
  sx?: SxProps;
  to?: string;
}

const LogoSection = ({ sx, to }: LogoSectionProps) => {
  const { defaultId } = useSelector((state: { menu: { defaultId: string } }) => state.menu);
  const dispatch = useDispatch();
  return (
    <ButtonBase
      disableRipple
      component={Link}
      onClick={() => dispatch(activeItem({ openItem: [defaultId] }))}
      href={!to ? CONFIG.DEFAULT_PATH : to}
      sx={sx}
    >
      <Logo />
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string
};

export default LogoSection;
