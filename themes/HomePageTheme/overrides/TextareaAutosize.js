// // material-ui
// import { alpha } from '@mui/material/styles';

// // ==============================|| OVERRIDES - OUTLINED INPUT ||============================== //

// export default function TextareaAutosize(theme) {
//   return {
//     MuiTextareaAutosize: {
//       border: '6px solid #000',
//       styleOverrides: {
//         textarea: {
//           padding: '10.5px 14px 10.5px 12px'
//         },
//         '.Mui-error': {
//           borderColor: '#f19494',
//           boxShadow: '0px -1px 0px 0px #e48585',
//           '&:hover .MuiTextareaAutosize-notchedOutline': {
//             borderColor: theme.palette.error.light
//           },
//           '&.Mui-focused': {
//             boxShadow: `0 0 0 2px ${alpha(theme.palette.error.main, 0.2)}`,
//             '& .MuiTextareaAutosize-notchedOutline': {
//               border: `1px solid ${theme.palette.error.light}`
//             }
//           }
//         },
//         notchedOutline: {},
//         root: {
//           transition: 'box-shadow 1s',
//           border: '6px solid #94C4F1',
//           borderTopWidth: '5px',
//           boxShadow: '0px -1px 0px 0px #85BDE4',
//           borderRadius: '40px',

//           'MuiTextareaAutosize-notchedOutline': {
//             borderColor: theme.palette.grey[300]
//           },
//           '&:hover .MuiTextareaAutosize-notchedOutline': {
//             borderColor: theme.palette.primary.light
//           },
//           '&.Mui-focused': {
//             boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
//             '& .MuiTextareaAutosize-notchedOutline': {
//               border: `1px solid ${theme.palette.primary.light}`
//             }
//           }
//         },
//         inputSizeSmall: {
//           padding: '7.5px 8px 7.5px 12px'
//         },
//         inputMultiline: {
//           padding: 0
//         }
//       }
//     }
//   };
// }
