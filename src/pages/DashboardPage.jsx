import React from 'react';
import { MainLayout, DashboardCards, Charts, RealTimeAccessMonitoring } from '@components';

const DashboardPage = () => {
  return (
    <MainLayout>
      <DashboardCards />
      <Charts />
      <RealTimeAccessMonitoring />
    </MainLayout>
  );
};

export default DashboardPage;
