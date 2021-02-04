/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/require-default-props */
import React from 'react';
import { elementType, object } from 'prop-types';

import StoreProvider from '../store';
import GlobalStyles from '../components/GlobalStyles';

function MyApp({ Component, pageProps }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <StoreProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;

MyApp.propTypes = {
  // eslint-disable-next-line react/require-default-props
  Component: elementType,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: object,
};
