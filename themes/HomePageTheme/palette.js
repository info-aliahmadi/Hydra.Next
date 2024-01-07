// material-ui
import createTheme from '@mui/material/styles/createTheme';

// third-party
import {presetPalettes} from '@ant-design/colors';

// project import
import ThemeOption from './theme';

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = () => {
  const colors = presetPalettes;

  const greyPrimary = [
    '#ffffff',
    '#fafafa',
    '#69706c',
    '#69706c',
    '#5d6360',
    '#515754',
    '#454a47',
    '#3a3d3b',
    '#2C302E',
    '#090a0a',
    '#000000'
  ];

  const greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'];
  const greyConstant = ['#fafafb', '#e6ebf1'];

  colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant];

  const paletteColor = ThemeOption(colors);

  return createTheme({
    palette: {
      mode: 'light',
      ...{
        // palette values for light mode
        common: {
          black: '#2C302E',
          white: '#EAEEFD'
        },
        ...paletteColor,
        text: {
          primary: paletteColor.grey[700],
          secondary: paletteColor.grey[500],
          disabled: paletteColor.grey[400]
        },
        action: {
          disabled: paletteColor.grey[300]
        },
        divider: paletteColor.grey[200],
        background: {
          paper: paletteColor.grey[0],
          default: paletteColor.grey.A50
        }
      }
    }
  });
};

export default Palette;
