/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default MyApp;

MyApp.propTypes = {
  // eslint-disable-next-line react/require-default-props
  Component: PropTypes.element,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object,
};
