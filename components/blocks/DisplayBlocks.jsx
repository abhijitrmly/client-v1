/* eslint-disable react/require-default-props */
import React from 'react';
import { string } from 'prop-types';
import 'twin.macro';
import Link from 'next/link';

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
  <label htmlFor={id} tw="font-normal text-sm text-gray-700">
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

export const SupplierPageHeader = ({ certificationButtonCallback }) => (
  <div tw="flex items-center justify-end">
    <div tw="mt-5 flex space-x-4 mr-4">
      <button
        onClick={certificationButtonCallback}
        type="button"
        tw="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg tw="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
        Add certification
      </button>
      <button type="submit" tw="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <svg tw="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Submit information
      </button>
    </div>
  </div>
);

export const CustomerViewPageHeader = () => (
  <div tw="flex items-center justify-end">
    <div tw="mt-5 flex space-x-4 mr-4">
      <button type="submit" tw="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <svg tw="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Submit information
      </button>
    </div>
  </div>
);

export const DashboardCTACard = ({
  message, subText, buttonLabel, ctaLinkHref,
}) => (
  <div tw="shadow-lg rounded-2xl m-16 text-center w-9/12 mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
    <h2 tw="text-2xl font-bold text-black dark:text-white sm:text-4xl">
      <span tw="block text-indigo-500">
        {message}
      </span>
    </h2>
    <div tw="lg:mt-0 lg:flex-shrink-0">
      <div tw="mt-12 inline-flex rounded-md shadow">
        <button type="button" tw="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
          <Link href={ctaLinkHref}>
            {buttonLabel}
          </Link>
        </button>
      </div>
    </div>
  </div>
);

export const SuccessAlert = ({ alertMessage }) => (
  <div tw="p-2 px-6 mx-96 items-center justify-center bg-indigo-600 text-indigo-100 lg:rounded-full flex lg:inline-flex justify-center" role="alert">
    <span tw="font-normal mr-2 text-left flex-auto">{alertMessage}</span>
  </div>
);
