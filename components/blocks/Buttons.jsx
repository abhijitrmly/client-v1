import React from 'react';
import PropTypes from 'prop-types';
import 'twin.macro';

// eslint-disable-next-line import/prefer-default-export
export const StyledFormSubmitButton = ({ buttonTitle, disabled }) => (
  <button type="submit" disabled={disabled} tw="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    <span tw="absolute left-0 inset-y-0 flex items-center pl-3">
      <svg tw="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
      </svg>
    </span>
    {buttonTitle}
  </button>
);

StyledFormSubmitButton.propTypes = {
  buttonTitle: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  disabled: PropTypes.bool,
};
