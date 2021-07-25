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
  weights: {
    normal: 400,
    bold: 700,
  },

  // Line Heights
  line_heights: {
    headings: {
      xlarge: '1.25',
    },
    body: {
      small: '1.8rem',
      medium: '2.4rem',
      large: '2.6rem',
    },
  },

  // Letter Spacings
  letter_spacings: {
    headings: {
      medium: '0.143678px',
    },
  },
};
