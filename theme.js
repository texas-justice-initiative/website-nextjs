import colors from './styles/variables/colors'
import typography from './styles/variables/typography'
import breakpoints from './styles/variables/breakpoints'
import site from './styles/variables/site'
import cloudinary from './styles/variables/integrations/cloudinary'

export default {
  // Site Meta
  site,

  // Colors
  colors,

  // Typography
  typography,

  // Breakpoints
  breakpoints,

  // Integrations
  integrations: {
    cloudinary,
  },

  // todo: Where to place these?
  mediumHeaderHeight: '90px',
  desktopHeaderHeight: '217px', // header height + 4rem padding (i.e 153px + 64px)
}
