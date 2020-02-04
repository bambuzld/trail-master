import React from 'react';

import { ThemeProvider, CSSReset } from '@chakra-ui/core';

import customTheme from 'assets/customTheme'

const TProvider = ({ children }) => (
  <ThemeProvider theme={customTheme}>
    <CSSReset />

    {children}
  </ThemeProvider>
);

export default TProvider;
