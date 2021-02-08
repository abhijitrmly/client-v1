import React from 'react';
import 'twin.macro';
import { useRouter } from 'next/router';

export const NavBar = () => {
  const { asPath } = useRouter();

  if (asPath === "/") {
    return <></>;
  }

  return (
  <nav tw="bg-gray-800">
    <div tw="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div tw="flex items-center justify-between h-16">
        <div tw="flex items-center">
          <div tw="ml-10 flex items-baseline space-x-4">
            <a href="#" tw="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
            <a href="#" tw="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Transactions</a>
            <a href="#" tw="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Reports</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
)};
