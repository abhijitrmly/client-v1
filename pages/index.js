import React from 'react';
import Head from 'next/head';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'twin.macro';

import SignUpForm from '../components/widgets/SignUpForm';
import { useAuth } from '../store';

export default function Home() {
  const { login, user } = useAuth();

  const onSignUpFormSubmit = async (email, password) => {
    await login({ email, password });
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div tw="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          {user ? (<div>Logged in</div>) : (
            <div tw="max-w-md w-full space-y-8">
              <div>
                <h2 tw="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Sign in to your account
                </h2>
              </div>
              <SignUpForm
                onSubmit={onSignUpFormSubmit}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
