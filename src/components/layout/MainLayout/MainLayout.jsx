import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';

const MainLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} isMobile={false} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={handleCloseSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed left-0 top-0 h-screen w-64 bg-white z-50 md:hidden transform transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar isCollapsed={false} setIsCollapsed={() => {}} isMobile={true} onClose={handleCloseSidebar} />
      </div>
      
      <div className={`flex-1 ${isCollapsed ? 'md:ml-20' : 'md:ml-64'} flex flex-col overflow-hidden transition-all duration-300`}>
        <Header onMenuClick={handleMenuClick} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
