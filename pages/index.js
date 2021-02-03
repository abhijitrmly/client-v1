import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import SignUpForm from '../components/widgets/SignUpForm';

export default function Home() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div tw="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div tw="max-w-md w-full space-y-8">
          <SignUpForm />
        </div>
      </div>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          {' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
