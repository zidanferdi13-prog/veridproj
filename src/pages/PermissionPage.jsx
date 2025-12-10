import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const permissionData = [
  {
    id: 1,
    device: 'Veridface - 001',
    location: 'Gate West',
    numberPersonel: 12,
    lastActive: 'Mon 4, January 2025',
  },
  {
    id: 2,
    device: 'Veridface - 001',
    location: 'Gate West',
    numberPersonel: 12,
    lastActive: 'Mon 4, January 2025',
  },
  {
    id: 3,
    device: 'Veridface - 001',
    location: 'Gate West',
    numberPersonel: 12,
    lastActive: 'Mon 4, January 2025',
  },
  {
    id: 4,
    device: 'Veridface - 001',
    location: 'Gate West',
    numberPersonel: 12,
    lastActive: 'Mon 4, January 2025',
  },
  {
    id: 5,
    device: 'Veridface - 001',
    location: 'Gate West',
    numberPersonel: 12,
    lastActive: 'Mon 4, January 2025',
  },
];

const PermissionPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('personnel');
  const [filters, setFilters] = useState({
    device: '',
    location: '',
    phone: '',
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 ${isCollapsed ? 'ml-20' : 'ml-64'} flex flex-col overflow-hidden transition-all duration-300`}>
        <Header />
        
        <main className="flex-1 overflow-y-auto p-8">
          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('permission')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                activeTab === 'permission'
                  ? 'bg-white text-gray-700 border border-gray-300'
                  : 'bg-transparent text-gray-600 hover:bg-white'
              }`}
            >
              Permission
            </button>
            <button
              onClick={() => setActiveTab('personnel')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                activeTab === 'personnel'
                  ? 'bg-blue-500 text-white'
                  : 'bg-transparent text-gray-600 hover:bg-white'
              }`}
            >
              Personnel Permission
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device
                </label>
                <input
                  type="text"
                  placeholder="device"
                  value={filters.device}
                  onChange={(e) => handleFilterChange('device', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loc
                </label>
                <input
                  type="text"
                  placeholder="location"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="phone"
                  value={filters.phone}
                  onChange={(e) => handleFilterChange('phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 text-blue-600 font-semibold">Device</th>
                  <th className="text-left py-4 px-6 text-blue-600 font-semibold">Location</th>
                  <th className="text-left py-4 px-6 text-blue-600 font-semibold">Number Of Personel</th>
                  <th className="text-left py-4 px-6 text-blue-600 font-semibold">Last Active</th>
                  <th className="text-left py-4 px-6 text-blue-600 font-semibold">Operation</th>
                </tr>
              </thead>
              <tbody>
                {permissionData.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-700">{item.device}</td>
                    <td className="py-4 px-6 text-gray-700">{item.location}</td>
                    <td className="py-4 px-6 text-gray-700">{item.numberPersonel}</td>
                    <td className="py-4 px-6 text-gray-700">{item.lastActive}</td>
                    <td className="py-4 px-6">
                      <button className="px-6 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PermissionPage;
