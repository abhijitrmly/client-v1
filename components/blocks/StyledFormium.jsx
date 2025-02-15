/* eslint-disable react/require-default-props */
import React from 'react';
import { element, string, boolean } from 'prop-types';
import { Field, Form, ErrorMessage } from 'formik';
import 'twin.macro';

import {
  StyledOption,
} from './DisplayBlocks';

export const AuthStyledFormFieldTop = ({ placeholder = '', name }) => (
  <Field
    placeholder={placeholder}
    name={name}
    tw="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
  />
);

AuthStyledFormFieldTop.propTypes = {
  placeholder: string,
  name: string.isRequired,
};

export const AuthStyledFormFieldBottom = ({ placeholder = '', name }) => (
  <Field
    placeholder={placeholder}
    name={name}
    tw="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
  />
);

AuthStyledFormFieldBottom.propTypes = {
  placeholder: string,
  name: string.isRequired,
};

export const AuthStyledForm = ({ children }) => (
  <Form
    tw="mt-8 space-y-6"
  >
    {children}
  </Form>
);

AuthStyledForm.propTypes = {
  children: element,
};

export const QuestionCheckboxField = ({ name }) => (
  <Field
    name={name}
    type="checkbox"
    tw="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
  />
);

export const QuestionCheckboxWithOnChangeField = ({ name, onChange }) => (
  <Field
    name={name}
    type="checkbox"
    tw="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
    onChange={onChange}
  />
);

QuestionCheckboxField.propTypes = {
  name: string.isRequired,
};

// @TODO this should have been generic names
export const StyledSelectField = ({ name, certificationsArray = [] }) => (
  <Field name={name} as="select" tw="mt-1 block w-3/4 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
    {certificationsArray.map(({ certificationId, certificationLabel }) => (
      <option key={certificationId} value={certificationId}>{certificationLabel}</option>
    ))}
  </Field>
);

StyledSelectField.propTypes = {
  name: string.isRequired,
};

export const StyledInputField = ({ name, placeholder = '' }) => (
  <Field
    name={name}
    placeholder={placeholder}
    // as={isTextArea ? 'textarea' : 'input'}
    tw="flex-1 appearance-none border border-gray-300 w-3/4 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
  />
);

const ErrorLabel = ({ children }) => (
  <p tw="font-normal text-xs text-red-700">
    {children}
  </p>
);

export const StyledErrorMessage = ({ name }) => (
  <ErrorMessage component={ErrorLabel} name={name} />
);

export const StyledInputTextAreaField = ({ name, placeholder = '' }) => (
  <Field
    name={name}
    placeholder={placeholder}
    as="textarea"
    tw="flex-1 appearance-none border border-gray-300 w-3/4 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
  />
);

StyledInputField.propTypes = {
  placeholder: string,
  name: string.isRequired,
  isTextArea: boolean,
};

export const StyledRadioField = ({ name, value }) => (
  <Field name={name} value={value} type="radio" tw="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
);

StyledRadioField.propTypes = {
  name: string.isRequired,
  value: string.isRequired,
};
