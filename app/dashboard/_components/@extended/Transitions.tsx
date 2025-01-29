import { forwardRef } from 'react';

// material-ui
import { Fade, Box, Grow } from '@mui/material';
import { AnyIfEmpty } from 'react-redux';

// ==============================|| TRANSITIONS ||============================== //

// eslint-disable-next-line react/display-name
interface TransitionsProps {
  children: React.ReactNode;
  position: 'top-left' | 'top-right' | 'top' | 'bottom-left' | 'bottom-right' | 'bottom';
  type: 'grow' | 'fade' | 'collapse' | 'slide' | 'zoom';
  others : any
}

const Transitions = forwardRef(({ children, position, type, ...others }: TransitionsProps, ref) => {
  let positionSX;

  switch (position) {
    case 'top-right':
    case 'top':
    case 'bottom-left':
    case 'bottom-right':
    case 'bottom':
    case 'top-left':
    default:
      positionSX = {
        transformOrigin: '0 0 0'
      };
      break;
  }

  return (
    <Box ref={ref}>
      {type === 'grow' && (
        <Grow {...others}>
          <Box sx={positionSX}>{children}</Box>
        </Grow>
      )}
      {type === 'fade' && (
        <Fade
          {...others}
          timeout={{
            appear: 0,
            enter: 300,
            exit: 150
          }}
        >
          <Box sx={positionSX}>{children}</Box>
        </Fade>
      )}
    </Box>
  );
});


Transitions.displayName = 'Transitions';

export default Transitions;
