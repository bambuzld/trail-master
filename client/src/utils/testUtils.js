import { render } from '@testing-library/react';
import MainProvider from 'containers/mainContext';
import RouterManager from 'utils/RouterManager';
import React from 'react';

const AllTheProviders = ({ children }) => {
  return <MainProvider>{children} </MainProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
