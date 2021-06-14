import typography from './styles/variables/typography';

export default {
  colors: {
    primaryBlue: '#0b5d93',
    secondaryBlue: '#64B8DD',
    tertiaryBlue: '#7ED2F7',
    primaryRed: '#ce2727',
    secondaryRed: '#F95858',
    primaryYellow: '#FFFD00',
    black: '#404040',
    white: '#FFFFFF',
    gray: '#919191',
    grayLightest: '#F4F4F4',
    grayLighter: '#EAEAEA',
    grayLight: '#CBCBCB',
    grayDark: '#797676',
    grayDarkest: '#363636',
  },

  // Typography
  typography,
  displayFont: 'Roboto, sans-serif',
  bodyFont: 'Roboto, sans-serif',
  calloutFont__size: '4rem',
  calloutFont__height: '1.25',
  fontSizes: {
    sm: '1.4rem',
    md: '1.6rem',
    lg: '2.0rem',
    xl: '2.2rem',
  },
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
