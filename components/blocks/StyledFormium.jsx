import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'formik';
import 'twin.macro';

// eslint-disable-next-line import/prefer-default-export
export const AuthStyledFormField = ({ placeholder = '', name }) => (
  <Field
    placeholder={placeholder}
    name={name}
    tw="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
  />
);

AuthStyledFormField.propTypes = {
  // eslint-disable-next-line react/require-default-props
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export const AuthStyledForm = ({ children }) => (
  <Form
    tw="mt-8 space-y-6"
  >
    {children}
  </Form>
);
