import React, { useState, useEffect } from 'react';
import { Search, Bell } from 'lucide-react';

const Header = () => {
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
    <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      {/* Time and Date */}
      <div>
        <div className="text-sm text-gray-600">{formatDate(currentTime)}</div>
        <div className="text-3xl font-bold text-blue-500">{formatTime(currentTime)}</div>
      </div>

      {/* Search and User Info */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="search"
            className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <span className="text-gray-700">Welcome, <span className="font-semibold">Zidan</span></span>
          <img
            src="https://ui-avatars.com/api/?name=Zidan&background=3B82F6&color=fff"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="text-gray-700" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
