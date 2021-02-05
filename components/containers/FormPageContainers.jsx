import React from 'react';
import 'twin.macro';

export const SectionCardWrapper = ({ children }) => (
  <div tw="container my-16 mx-auto">
    <div tw="md:grid md:grid-cols-3 md:gap-6">
      {children}
    </div>
  </div>
);

export const RightCardWrapper = ({ children }) => (
  <div tw="mt-5 md:mt-0 md:col-span-2">
    <div tw="shadow overflow-hidden sm:rounded-md">
      {children}
    </div>
  </div>
);

export const LeftCardWrapper = ({ children }) => (
  <div tw="md:col-span-1">
    {children}
  </div>
);
