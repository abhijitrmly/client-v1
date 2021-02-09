/* eslint-disable import/prefer-default-export */
import React from 'react';
import 'twin.macro';

export const TransactionsTable = ({ transactionsArray }) => (
  <div tw="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div tw="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div tw="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table tw="min-w-full divide-y divide-gray-200">
          <thead tw="bg-gray-50">
            <tr>
              <th scope="col" tw="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" tw="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" tw="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" tw="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" tw="relative px-6 py-3">
                <span tw="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody tw="bg-white divide-y divide-gray-200">
            <tr>
              <td tw="px-6 py-4 whitespace-nowrap">
                <div tw="flex items-center">
                  <div tw="flex-shrink-0 h-10 w-10">
                    <img tw="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt="" />
                  </div>
                  <div tw="ml-4">
                    <div tw="text-sm font-medium text-gray-900">
                      Jane Cooper
                    </div>
                    <div tw="text-sm text-gray-500">
                      jane.cooper@example.com
                    </div>
                  </div>
                </div>
              </td>
              <td tw="px-6 py-4 whitespace-nowrap">
                <div tw="text-sm text-gray-900">Regional Paradigm Technician</div>
                <div tw="text-sm text-gray-500">Optimization</div>
              </td>
              <td tw="px-6 py-4 whitespace-nowrap">
                <span tw="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td tw="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Admin
              </td>
              <td tw="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" tw="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
