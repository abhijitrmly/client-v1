import React from 'react';
import 'twin.macro';

import { DashboardCTACard } from '../components/blocks/DisplayBlocks';

const Dashboard = () => (
  <div tw="grid grid-cols-2 gap-8">
    <DashboardCTACard
      message="You have 2 supplier transactions"
      buttonLabel="View your transactions"
      ctaLinkHref="/transactions"
    />
    <DashboardCTACard
      message="Want to create your own protocol?"
      buttonLabel="New transaction"
      ctaLinkHref="/customer/new"
    />
  </div>
);

export default Dashboard;
