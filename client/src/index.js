import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/font/Poppins/Poppins-Regular.ttf';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterManager from './utils/RouterManager';

import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import customTheme from 'assets/customTheme'

import MainProvider from 'containers/mainContext';

const Root = () => {
  return (
    <Router>
      <ThemeProvider theme={customTheme}>
      <CSSReset/>
        <MainProvider>
          <RouterManager />
        </MainProvider>
      </ThemeProvider>
    </Router>
  );
};
ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
