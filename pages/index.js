import React from 'react';
import Head from 'next/head';
import 'twin.macro';

import SignUpForm from '../components/widgets/SignUpForm';

export default function Home() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div tw="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div tw="max-w-md w-full space-y-8">
          <div>
            <h2 tw="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
