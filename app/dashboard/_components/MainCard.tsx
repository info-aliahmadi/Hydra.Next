import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

// project import
import Highlighter from './third-party/Highlighter';

// header style
const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

// ==============================|| CUSTOM - MAIN CARD ||============================== //

// eslint-disable-next-line react/display-name
const MainCard = forwardRef(
  function ({
  border = true, boxShadow, children, content = true, contentSX = {}, darkTitle, elevation, secondary, shadow, sx = {}, title, codeHighlight, ...others
} : { border? : boolean, boxShadow? : any, children?: any, content? : any, contentSX? : any, darkTitle?: any, elevation?: any, secondary?: any, shadow?: any, sx?: any, title?: any, codeHighlight?: any},
  ref) {
  const theme = useTheme();
  boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;

  return (
    <Card
      component="div"
      elevation={elevation || 0}
      ref={ref as React.Ref<HTMLDivElement>}
      {...others}
      sx={{
        border: border ? '1px solid' : 'none',
        borderRadius: 2,
        borderColor: theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.divider,
        boxShadow: boxShadow && (!border || theme.palette.mode === 'dark') ? shadow || theme.shadows[1] : 'inherit',
        ':hover': {
          boxShadow: boxShadow ? shadow || theme.shadows[1] : 'inherit'
        },
        '& pre': {
          m: 0,
          p: '16px !important',
          fontFamily: theme.typography.fontFamily,
          fontSize: '0.75rem'
        },
        ...sx
      }}
    >
      {/* card header and action */}
      {!darkTitle && title && (
        <CardHeader sx={headerSX} titleTypographyProps={{ variant: 'subtitle1' }} title={title} action={secondary} />
      )}
      {darkTitle && title && <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />}

      {/* card content */}
      {content && <CardContent sx={contentSX}>{children}</CardContent>}
      {!content && children}

      {/* card footer - clipboard & highlighter  */}
      {codeHighlight && (
        <>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Highlighter codeHighlight={codeHighlight}>
            {children}
          </Highlighter>
        </>
      )}
    </Card>
  );
}
);

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  elevation: PropTypes.number,
  secondary: PropTypes.node,
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  codeHighlight: PropTypes.bool,
  content: PropTypes.bool,
  children: PropTypes.node
};

export default MainCard;
