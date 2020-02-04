import { theme } from '@chakra-ui/core';


export default {
  ...theme,
  breakpoints: ['30em', '48em', '62em', '80em'],
  fonts: {
    heading: '"Poppins", sans-serif',
    body: 'Poppins, sans-serif',
    mono: 'Poppins, monospace'
  },
  fontSizes: {
    ...theme.fontSizes,
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem'
  },
  fontWeights: {
    ...theme.fontWeights,
    normal: 400,
    medium: 500,
    bold: 'bold',
    bolder: 'bolder'
  },
  letterSpacings: {
    ...theme.letterSpacings,
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  shadows: {
    ...theme.shadows,
    sm: '5px 10px',
    md: '0.05rem 0.1rem 0.1rem #a7a7a7',
    lg:'15px 20px'
  },
  colors: {
    ...theme.colors,
    brandOrange: '#eb6b2a',
    orangeLight: ' #f27d42',
    darkGrey: '#575757',
    lightGrey: '#a7a7a7',
    lighterGrey: '#e8e8e8',
    black: '#000000',
    white: '#ffffff',
    greydient: 'linear-gradient(to bottom, #000000, #323332)'
  },
  space: {
    ...theme.space,
    px: "1px",
    "0": "0",
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "8": "2rem",
    "10": "2.5rem",
    "12": "3rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "32": "8rem",
    "40": "10rem",
    "48": "12rem",
    "56": "14rem",
    "64": "16rem",
  },
  sizes:{
    ...theme.sizes,
    icon: "2rem"
  },
  icons: {
    ...theme.icons,
  }
};
