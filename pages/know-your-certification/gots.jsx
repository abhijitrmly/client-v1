import React from 'react';
import 'twin.macro';
import Head from 'next/head';
import Link from 'next/link';

const GotsLandingPage = () => (
  <div>
    <Head>
      <title>KYC -- GOTS</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <div tw="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div tw="relative py-3 sm:max-w-5xl sm:mx-auto">
          <div tw="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
          <div tw="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div tw="max-w-3xl mx-auto">
              <div>
                <p tw="text-3xl">GLOBAL ORGANIC TEXTILE STANDARD</p>
              </div>
              <div>
                <p tw="text-xl pt-6 underline">Executive summary</p>
              </div>
              <div tw="divide-y divide-gray-200">
                <div tw="py-6 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <p>
                    The Global Organic Textile Standard (GOTS) was developed by leading
                    standard setters
                    to define world-wide recognised requirements for organic textiles.
                    From the harvesting of the raw materials, environmentally and socially
                    responsible manufacturing to labelling, textiles certified to
                    GOTS provide a credible assurance to the consumer.
                  </p>
                  <p>
                    An ideal certification to go for if:
                  </p>
                  <ul tw="list-disc space-y-2">
                    <li tw="flex items-start">
                      <span tw="h-6 flex items-center sm:h-7">
                        <svg tw="flex-shrink-0 h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <p tw="ml-2">
                        Your customers demand high standards of environmentally friendly practices
                      </p>
                    </li>
                    <li tw="flex items-start">
                      <span tw="h-6 flex items-center sm:h-7">
                        <svg tw="flex-shrink-0 h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <p tw="ml-2">
                        Your products are marketed in countries where
                        strict regulations exist on product consituents
                      </p>
                    </li>
                    <li tw="flex items-start">
                      <span tw="h-6 flex items-center sm:h-7">
                        <svg tw="flex-shrink-0 h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <p tw="ml-2">Your products could be used for medical applications or by children/senior citizens</p>
                    </li>
                  </ul>
                  <br />
                  <p>
                    Not ideal for applications where:
                  </p>
                  <ul tw="list-disc space-y-2">
                    <li tw="flex items-start">
                      <span tw="h-5 flex items-center sm:h-7">
                        <svg tw="h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </span>
                      <p tw="ml-2">
                        Cottom farming process is strictly needed to be eco-friendly and ethical
                      </p>
                    </li>
                    <li tw="flex items-start">
                      <span tw="h-5 flex items-center sm:h-7">
                        <svg tw="h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </span>
                      <p tw="ml-2">
                        Customers are accepting of responsible use of chemical in farming
                      </p>
                    </li>
                    <li tw="flex items-start">
                      <span tw="h-5 flex items-center sm:h-7">
                        <svg tw="h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </span>
                      <p tw="ml-2">
                        Cost is a factor for the product as the market is saturated
                      </p>
                    </li>
                  </ul>
                  <br />
                  <p>
                    GOTS represents the minimum
                    requirements for products to be considered honestly
                    and authentically sustainable.
                    GOTS has been successfully used at industrial scales.
                  </p>
                </div>
                <div tw="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                  <p>Want to dig deeper into GOTS?</p>
                  <p>
                    <a href="https://www.global-standard.org/" tw="text-blue-600 hover:text-blue-700" target="blank"> Read the docs &rarr; </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div tw="max-w-5xl mx-auto space-x-6 py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 tw="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span tw="block">Ready to dive in?</span>
            <span tw="block text-blue-900">{'Create your organization\'s sustainability standard'}</span>
          </h2>
          <div tw="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div tw="inline-flex rounded-md shadow">
              <Link href="/customer/new" passHref>
                <a target="_blank" tw="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-900 hover:bg-blue-700">
                  Get started
                </a>
              </Link>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div tw="max-w-4xl flex flex-col sm:mx-auto justify-center bg-white shadow overflow-hidden sm:rounded-lg">
          <div tw="px-4 py-5 sm:px-6">
            <h3 tw="text-lg leading-6 font-medium text-gray-900">
              Standard Information
            </h3>
            <p tw="mt-1 max-w-2xl text-sm text-gray-500">
              Organization details and scope.
            </p>
          </div>
          <div tw="border-t border-gray-200">
            <dl>
              <div tw="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt tw="text-sm font-medium text-gray-500">
                  Full name
                </dt>
                <dd tw="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Global Organic Textile Standard (GOTS)
                </dd>
              </div>
              <div tw="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt tw="text-sm font-medium text-gray-500">
                  Applicable on
                </dt>
                <dd tw="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Cotton fabrics
                </dd>
              </div>
              <div tw="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt tw="text-sm font-medium text-gray-500">
                  Established since
                </dt>
                <dd tw="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  2002
                </dd>
              </div>
              <div tw="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt tw="text-sm font-medium text-gray-500">
                  Scope of standards
                </dt>
                <dd tw="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  The standard covers the processing, manufacturing, packaging, labelling, trading
                  and distribution of all textiles made from at least 70% certified organic fibres.
                </dd>
              </div>
              <div tw="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt tw="text-sm font-medium text-gray-500">
                  What is not covered
                </dt>
                <dd tw="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Certification of organic cotton production is outsourced to national agencies.
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <br />
        <br />
        <div tw="max-w-4xl flex flex-col sm:mx-auto justify-center bg-white shadow overflow-hidden sm:rounded-lg">
          <div tw="px-4 py-5 sm:px-6">
            <h3 tw="text-lg leading-6 font-medium text-gray-900">
              Standard Checkpoints & Criteria
            </h3>
            <p tw="mt-1 max-w-2xl text-sm text-gray-500">
              Prohibited inputs.
            </p>
          </div>
          <div tw="border-t border-gray-200">
            <dl>
              <div tw="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt tw="text-sm font-medium text-gray-500">
                  XYZ
                </dt>
                <dd tw="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {'< 50 ppm'}
                </dd>
              </div>
              <div tw="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt tw="text-sm font-medium text-gray-500">
                  MNO
                </dt>
                <dd tw="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Absent
                </dd>
              </div>
              <div tw="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt tw="text-sm font-medium text-gray-500">
                  Scope of standards
                </dt>
                <dd tw="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  The standard covers the processing, manufacturing, packaging, labelling, trading
                  and distribution of all textiles made from at least 70% certified organic fibres.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default GotsLandingPage;
