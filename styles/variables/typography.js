/**
 * Define base typography design system
 */

const fonts = {
  roboto: 'Roboto, sans-serif',
};

export default {
  // Font Families
  fonts: {
    body: fonts.roboto,
    headings: fonts.roboto,
  },

  // Font Sizes
  sizes: {
    headings: {
      xlarge: '40px',
      large: '32px',
      medium: '24px',
      small: '20px',
    },
    body: {
      regular: '16px',
      small: '14px',
    },
  },

  // Font Weights
  weights: {},

  // Line Heights
  line_heights: {
    headings: {
      xlarge: '1.25',
    },
  },

  // Letter Spacings
  letter_spacings: {},
};
