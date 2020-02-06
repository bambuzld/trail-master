import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/font/Poppins/Poppins-Regular.ttf';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterManager from './utils/RouterManager';

import MainProvider from 'containers/mainContext';

import TProvider from 'assets/ThemeProvider'

const Root = () => {
  return (
    <TProvider>
      <Router>
        <MainProvider>
          <RouterManager />
        </MainProvider>
      </Router>
    </TProvider>
  );
};
ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
