import React from 'react';
import Head from 'next/head';
import 'twin.macro';

import { useService, useAuth } from '../../store';

const NewCustomerTransaction = (props) => {
  const { user } = useAuth();

  return (
    <div>
      <Head>
        <title>New transaction</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        Hi
      </main>
    </div>
  );
};
