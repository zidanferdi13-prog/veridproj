import React, { useState } from 'react';
import { Sidebar, Header, DashboardCards, Charts, RealTimeAccessMonitoring } from '@components';

const DashboardPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 ${isCollapsed ? 'ml-20' : 'ml-64'} flex flex-col overflow-hidden transition-all duration-300`}>
        <Header />
        
        <main className="flex-1 overflow-y-auto p-8">
          <DashboardCards />
          <Charts />
          <RealTimeAccessMonitoring />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
