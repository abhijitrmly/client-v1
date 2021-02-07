/* eslint-disable react/require-default-props */
import React from 'react';
import { string } from 'prop-types';
import 'twin.macro';

export const CertificationValidLabel = ({ validationStatement }) => (
  <div tw="flex items-center">
    <span tw="h-6 flex items-center sm:h-7">
      <svg tw="flex-shrink-0 h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    </span>
    <p tw="ml-2 text-xs">{validationStatement}</p>
  </div>
);

CertificationValidLabel.propTypes = {
  validationStatement: string.isRequired,
};

export const PrimaryLabel = ({ primaryQuestion, id }) => (
  <label htmlFor={id} tw="font-medium text-base text-gray-700">
    {primaryQuestion}
  </label>
);

export const RadioLabel = ({ labelText, id }) => (
  <label htmlFor={id} tw="ml-3 font-medium text-base text-gray-700">
    {labelText}
  </label>
);

PrimaryLabel.propTypes = {
  primaryQuestion: string.isRequired,
  id: string,
};

export const SecondaryLabel = ({ secondaryQuestion, id }) => (
  <label htmlFor={id} tw="font-medium text-sm text-gray-700">
    {secondaryQuestion}
  </label>
);

SecondaryLabel.propTypes = {
  secondaryQuestion: string.isRequired,
  id: string,
};

export const PrimarySubtext = ({ primaryQuestionSubtext }) => (
  <p tw="text-base text-gray-500">{primaryQuestionSubtext}</p>
);

export const PrimaryText = ({ primaryText }) => (
  <p tw="font-medium text-base text-gray-700">{primaryText}</p>
);

export const StyledOption = ({ value, label }) => (
  <option key={value} value={value}>{label}</option>
);

export const SubmitButton = ({ buttonLabel }) => (
  <button type="submit" tw="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    {buttonLabel}
  </button>
);

SubmitButton.propTypes = {
  buttonLabel: string.isRequired,
};
