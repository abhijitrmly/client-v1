/* eslint-disable import/prefer-default-export */
import React from 'react';
import 'twin.macro';
import Link from 'next/link';

export const TransactionsTable = ({ transactionsArray = [] }) => (
  <div tw="-my-2 w-4/5 mx-auto mt-12">
    <div tw="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div tw="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table tw="min-w-full divide-y divide-gray-200">
          <thead tw="bg-gray-50">
            <tr>
              <th scope="col" tw="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Supplier
              </th>
              <th scope="col" tw="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th scope="col" tw="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Material
              </th>
              <th scope="col" tw="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statistics
              </th>
              <th scope="col" tw="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" tw="relative px-6 py-3">
                <span tw="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody tw="bg-white divide-y divide-gray-200">
            {
            transactionsArray.map(
              ({
                editLink, customerName, customerEmail, supplierName, supplierEmail, material = 'Cotton', createdAtDate, statistics, compliantPointStatistics,
              }) => (
                <tr>
                  <td tw="px-6 py-4 whitespace-nowrap">
                    <div tw="flex items-center">
                      <div tw="flex-shrink-0 h-10 w-10">
                        <img tw="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt="" />
                      </div>
                      <div tw="ml-4">
                        <div tw="text-sm font-medium text-gray-900">
                          {supplierName}
                        </div>
                        <div tw="text-sm text-gray-500">
                          {supplierEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td tw="px-6 py-4 whitespace-nowrap">
                    <div tw="flex items-center">
                      <div tw="flex-shrink-0 h-10 w-10">
                        <img tw="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt="" />
                      </div>
                      <div tw="ml-4">
                        <div tw="text-sm font-medium text-gray-900">
                          {customerName}
                        </div>
                        <div tw="text-sm text-gray-500">
                          {customerEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td tw="px-6 py-4 whitespace-nowrap">
                    <div tw="text-sm text-gray-900">{material}</div>
                  </td>
                  <td tw="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p tw="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-green-800">
                        {statistics}
                      </p>
                    </div>
                    <div>
                      <p tw="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {compliantPointStatistics}
                      </p>
                    </div>
                  </td>
                  <td tw="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {createdAtDate}
                  </td>
                  <td tw="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={editLink} passHref>
                      <a target="_blank" tw="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </a>
                    </Link>
                  </td>
                </tr>
              ),
            )
          }
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
