/* eslint-disable import/prefer-default-export */
import React from 'react';
import 'twin.macro';
import { useRouter } from 'next/router';

import { useAuth } from '../../store';

export const NavBar = () => {
  const { asPath } = useRouter();

  if (asPath === '/' || asPath.split('/').includes('know-your-certification')) {
    return <></>;
  }

  const { user } = useAuth();

  return (
    <div tw="relative bg-white shadow overflow-hidden">
      <div tw="max-w-7xl mx-auto">
        <div tw="relative z-10 bg-white lg:max-w-2xl lg:w-full lg:pb-8 xl:pb-8">
          <svg tw="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div tw="relative pt-6 px-4 sm:px-6 lg:px-8">
            <nav tw="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
              <div tw="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                <div tw="flex items-center justify-between w-full md:w-auto">
                  <a href="#">
                    <span tw="sr-only">Workflow</span>
                    <img tw="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" />
                  </a>
                  <div tw="-mr-2 flex items-center md:hidden">
                    <button type="button" tw="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" id="main-menu" aria-haspopup="true">
                      <span tw="sr-only">Open main menu</span>
                      <svg tw="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div tw="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                <a href="#" tw="font-medium text-gray-500 hover:text-gray-900">Product</a>

                <a href="#" tw="font-medium text-gray-500 hover:text-gray-900">Features</a>

                <a href="#" tw="font-medium text-gray-500 hover:text-gray-900">Marketplace</a>

                <a href="#" tw="font-medium text-gray-500 hover:text-gray-900">Company</a>

                {!user && (<a href="#" tw="font-medium text-indigo-600 hover:text-indigo-500">Log in</a>)}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
