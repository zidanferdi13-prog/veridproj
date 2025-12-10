import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardCards from '../components/DashboardCards';
import Charts from '../components/Charts';
import RealTimeAccessMonitoring from '../components/RealTimeAccessMonitoring';

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
