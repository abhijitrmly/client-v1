/* eslint-disable import/prefer-default-export */
import React from 'react';
import 'twin.macro';
import Link from 'next/link';

const CardOutline = ({ children }) => (
  <div tw="h-screen w-full flex flex-col items-center justify-center font-sans">
    <div tw="bg-white rounded shadow p-8 m-4 max-w-xs max-h-full text-center overflow-y-scroll">
      {children}
    </div>
  </div>
);

// Success card is shown when tranaction is successfully created/patched

export const SuccessCustomerCard = ({ transactionLink }) => (
  <CardOutline>
    <div tw="mb-4 h-12 w-auto">
      <svg tw="mt-6 mx-auto h-12 w-12 text-center text-green-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
      </svg>
    </div>
    <div tw="mb-8">
      <p>Congratulations! Your transaction is created successfully.</p>
    </div>
    <div tw="flex justify-center">
      <button type="button" tw="text-white py-2 px-4 rounded bg-blue-500 hover:bg-blue-800">
        <Link href={transactionLink}>
          View Transaction
        </Link>
      </button>
    </div>
  </CardOutline>
);

export const SuccessPatchSupplierCard = ({ transactionListLink }) => (
  <CardOutline>
    <div tw="mb-4 h-12 w-auto">
      <svg tw="mt-6 mx-auto h-12 w-12 text-center text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
      </svg>
    </div>
    <div tw="mb-8">
      <p>Your information has been saved and will be conveyed to customer.</p>
    </div>
    <div tw="flex justify-center">
      <button type="button" tw="text-white py-2 px-4 rounded bg-blue-500 hover:bg-blue-800">
        <Link href="/supplier/transactions">
          View Transaction List
        </Link>
      </button>
    </div>
  </CardOutline>
);
