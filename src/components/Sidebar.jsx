import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  Users, 
  Monitor, 
  Key, 
  UserPlus, 
  ClipboardList, 
  Calendar, 
  BarChart3, 
  Settings,
  LogOut,
  Scan,
  Maximize2,
  Minimize2
} from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Menu', path: '/dashboard' },
  { icon: Users, label: 'User', path: '/user' },
  { icon: Monitor, label: 'Device', path: '/device' },
  { icon: Key, label: 'Permission', path: '/permission' },
  { icon: UserPlus, label: 'Visitor', path: '/visitor' },
  { icon: ClipboardList, label: 'AttendanceSys', path: '/attendance-sys' },
  { icon: Calendar, label: 'Attendance', path: '/attendance' },
  { icon: BarChart3, label: 'Log', path: '/log' },
  { icon: Settings, label: 'Setting', path: '/setting' },
];

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white h-screen flex flex-col border-r border-gray-200 fixed left-0 top-0 transition-all duration-300`}>
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/images/Veridface Sticker 5x5cm.jpg" 
            alt="VerifIDFace Logo" 
            className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
          />
          {!isCollapsed && <span className="text-xl font-bold text-gray-800">VerifIDFace</span>}
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isCollapsed ? <Maximize2 size={18} className="text-gray-600" /> : <Minimize2 size={18} className="text-gray-600" />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={index}
              onClick={() => handleMenuClick(item.path)}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={isCollapsed ? item.label : ''}
            >
              <item.icon size={20} />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button 
          onClick={handleLogout}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors`}
          title={isCollapsed ? 'Logout' : ''}
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
