import React from 'react';
import { BarsSpinner } from 'react-spinners-kit';

import './PageLoader.scss';

const PageLoader = () => {
  return (
    <div className="page-loader">
      <div className="page-loader__icon">
        <BarsSpinner size={30} color="#EB6B2A" />
      </div>
    </div>
  );
};

export default PageLoader;
