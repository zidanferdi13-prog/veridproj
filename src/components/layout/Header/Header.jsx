import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu } from 'lucide-react';

const Header = ({ onMenuClick }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    
    return `${days[date.getDay()]}, ${String(date.getDate()).padStart(2, '0')} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const formatTime = (date) => {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-3 md:py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
      {/* Mobile Menu Button and Time */}
      <div className="flex items-center gap-3 md:gap-0">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="text-gray-700" size={24} />
        </button>
        <div>
          <div className="text-xs md:text-sm text-gray-600">{formatDate(currentTime)}</div>
          <div className="text-2xl md:text-3xl font-bold text-blue-500">{formatTime(currentTime)}</div>
        </div>
      </div>

      {/* Search and User Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
        {/* Search Bar */}
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="search"
            className="pl-10 pr-4 py-2 w-full md:w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* User Info */}
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-xs md:text-base text-gray-700">Welcome, <span className="font-semibold">Zidan</span></span>
          <img
            src="https://ui-avatars.com/api/?name=Zidan&background=3B82F6&color=fff"
            alt="User Avatar"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full"
          />
          <button className="p-1 md:p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="text-gray-700" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
