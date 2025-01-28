// material-ui
import { alpha } from '@mui/material/styles';

import { Theme } from "@mui/material";
// ==============================|| OVERRIDES - OUTLINED INPUT ||============================== //

export default function TextareaAutosize(theme: Theme) {
  return {
    MuiTextareaAutosize: {
      styleOverrides: {
        textarea: {
          padding: '10.5px 14px 10.5px 12px'
        },
        notchedOutline: {},
        root: {
          'MuiTextareaAutosize-notchedOutline': {
            borderColor: theme.palette.grey[300]
          },
          '&:hover .MuiTextareaAutosize-notchedOutline': {
            borderColor: theme.palette.primary.light
          },
          '&.Mui-focused': {
            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
            '& .MuiTextareaAutosize-notchedOutline': {
              border: `1px solid ${theme.palette.primary.light}`
            }
          },
          '&.Mui-error': {
            '&:hover .MuiTextareaAutosize-notchedOutline': {
              borderColor: theme.palette.error.light
            },
            '&.Mui-focused': {
              boxShadow: `0 0 0 2px ${alpha(theme.palette.error.main, 0.2)}`,
              '& .MuiTextareaAutosize-notchedOutline': {
                border: `1px solid ${theme.palette.error.light}`
              }
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
