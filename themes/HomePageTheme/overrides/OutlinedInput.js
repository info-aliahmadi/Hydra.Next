// material-ui
import { alpha } from '@mui/material/styles';
import { color } from '@mui/system';

// ==============================|| OVERRIDES - OUTLINED INPUT ||============================== //

export default function OutlinedInput(theme) {
  return {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          // borderRadius: '40px',
          padding: '14px 24px'
        },
        notchedOutline: {
          border: 'none',
          transition: 'box-shadow 1s,background 1s',
          borderRadius: '40px'
        },
        root: {
          transition: 'box-shadow 1s,background 1s',
          border: '6px solid #94C4F1',
          borderTopWidth: '5px',
          boxShadow: '0px -1px 0px 0px #85BDE4',
          borderRadius: '40px',

          background: 'rgba(248, 249, 255, 0.80)',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            boxShadow: '0px -1px 0px 5px #85BDE4'
          },
          '&.Mui-focused': {
            background: '#f8f9ff',
            boxShadow: '0px 0px 3px 2px #97e7ff inset',
            '& .MuiOutlinedInput-notchedOutline': {}
          },
          '&.Mui-error': {
            borderColor: '#f19494',
            boxShadow: '0px -1px 0px 0px #e48585',
            '&:hover .MuiOutlinedInput-notchedOutline': {},
            '&.Mui-focused': {
              // boxShadow: `0 0 0 2px ${alpha(theme.palette.error.main, 0.2)}`,
              '& .MuiOutlinedInput-notchedOutline': {}
            }
          }
        },
        inputSizeSmall: {
          padding: '7.5px 8px 7.5px 12px'
        },
        inputMultiline: {
          padding: 0
        }
      }
    }
  };
}
