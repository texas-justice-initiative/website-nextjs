import colors from './styles/variables/colors';
import typography from './styles/variables/typography';

export default {
  // Colors
  colors,

  // Typography
  typography,

  lineHeights: {
    sm: '1.8rem',
    md: '2.4rem',
    lg: '2.6rem',
  },
  fontWeights: {
    normal: 400,
    bold: 700,
  },
  letterSpacings: {
    medium: '0.143678px',
  },

  // Breakpoints
  small: '414px',
  medium: '768px',
  large: '1028px',

  mediumHeaderHeight: '90px',
  desktopHeaderHeight: '217px', // header height + 4rem padding (i.e 153px + 64px)

  // Cloudinary image sizes
  smallWidthPixels: 414,
  halfMediumWidthPixels: 384,
  newsItemImageWidthPixels: 250,

  // Text
  siteTitle: 'Texas Justice Initiative',
};
