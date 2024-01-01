import PropTypes from 'prop-types';

// material-ui
import { ButtonBase, Link } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// project import
import Logo from './Logo';
import CONFIG from '/config.js';
import { activeItem } from 'store/reducers/menu';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => {
  const { defaultId } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  return (
    <ButtonBase
      disableRipple
      component={Link}
      onClick={() => dispatch(activeItem({ openItem: [defaultId] }))}
      to={!to ? CONFIG.DEFAULT_PATH : to}
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
