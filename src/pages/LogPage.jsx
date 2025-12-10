import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { RotateCcw } from 'lucide-react';

const logData = [
  {
    id: 1,
    name: '-',
    userType: '-',
    phoneEmail: '-',
    passTime: '2025-10-18 ...',
    device: 'Veridface',
    sn: 'J257280001',
    accessType: 'Face',
    credential: 'stranger',
    result: 'Fail',
    capture: '/api/placeholder/50/50'
  },
  {
    id: 2,
    name: 'David Beckh...',
    userType: 'organization',
    phoneEmail: 'yazid@veridf...',
    passTime: '2025-10-18 ...',
    device: 'Veridface',
    sn: 'J257280001',
    accessType: 'Face',
    credential: '9mjmdtwk4q...',
    result: 'Success',
    capture: '/api/placeholder/50/50'
  },
  {
    id: 3,
    name: 'David Beckh...',
    userType: 'organization',
    phoneEmail: 'yazid@veridf...',
    passTime: '2025-10-18 ...',
    device: 'Veridface',
    sn: 'J257280001',
    accessType: 'Face',
    credential: '9mjmdtwk4q...',
    result: 'Success',
    capture: '/api/placeholder/50/50'
  },
];

const LogPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('access');
  const [filters, setFilters] = useState({
    userType: '',
    deviceName: '',
    accessType: '',
    name: '',
    result: '',
    startDate: '',
    endDate: '',
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFilters({
      userType: '',
      deviceName: '',
      accessType: '',
      name: '',
      result: '',
      startDate: '',
      endDate: '',
    });
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
              onClick={() => setActiveTab('access')}
              className={`px-6 py-2.5 rounded-t-lg font-medium transition-colors ${
                activeTab === 'access'
                  ? 'bg-white text-blue-500 border-b-2 border-blue-500'
                  : 'bg-transparent text-gray-600 hover:bg-white'
              }`}
            >
              Access records
            </button>
            <button
              onClick={() => setActiveTab('authorization')}
              className={`px-6 py-2.5 rounded-t-lg font-medium transition-colors ${
                activeTab === 'authorization'
                  ? 'bg-white text-blue-500 border-b-2 border-blue-500'
                  : 'bg-transparent text-gray-600 hover:bg-white'
              }`}
            >
              Authorization records
            </button>
            <button
              onClick={() => setActiveTab('operation')}
              className={`px-6 py-2.5 rounded-t-lg font-medium transition-colors ${
                activeTab === 'operation'
                  ? 'bg-white text-blue-500 border-b-2 border-blue-500'
                  : 'bg-transparent text-gray-600 hover:bg-white'
              }`}
            >
              Operation log
            </button>
            <button
              onClick={() => setActiveTab('alarm')}
              className={`px-6 py-2.5 rounded-t-lg font-medium transition-colors ${
                activeTab === 'alarm'
                  ? 'bg-white text-blue-500 border-b-2 border-blue-500'
                  : 'bg-transparent text-gray-600 hover:bg-white'
              }`}
            >
              Alarm records
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User type
                </label>
                <select
                  value={filters.userType}
                  onChange={(e) => handleFilterChange('userType', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Please select</option>
                  <option value="organization">Organization</option>
                  <option value="visitor">Visitor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device Name
                </label>
                <input
                  type="text"
                  placeholder="Please enter"
                  value={filters.deviceName}
                  onChange={(e) => handleFilterChange('deviceName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access Type
                </label>
                <select
                  value={filters.accessType}
                  onChange={(e) => handleFilterChange('accessType', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Please select</option>
                  <option value="face">Face</option>
                  <option value="card">Card</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Please enter"
                  value={filters.name}
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Result
                </label>
                <select
                  value={filters.result}
                  onChange={(e) => handleFilterChange('result', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Please select</option>
                  <option value="success">Success</option>
                  <option value="fail">Fail</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pass time
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="startDate"
                    value={filters.startDate}
                    onChange={(e) => handleFilterChange('startDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-500">To</span>
                  <input
                    type="text"
                    placeholder="endDate"
                    value={filters.endDate}
                    onChange={(e) => handleFilterChange('endDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2">
                <span>🔍</span>
                Search
              </button>
              <button 
                onClick={handleReset}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-6 flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors font-medium border border-orange-200">
              📥 Export
            </button>
            <button className="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors font-medium border border-orange-200">
              📥 Export records
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Name</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">User type</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Phone/Email</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Pass time</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Device</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">SN</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Access Type</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Credential</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Result</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Capture</th>
                  </tr>
                </thead>
                <tbody>
                  {logData.map((log) => (
                    <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-gray-700">{log.name}</td>
                      <td className="py-4 px-6 text-gray-700">{log.userType}</td>
                      <td className="py-4 px-6 text-gray-700">{log.phoneEmail}</td>
                      <td className="py-4 px-6 text-gray-700">{log.passTime}</td>
                      <td className="py-4 px-6 text-gray-700">{log.device}</td>
                      <td className="py-4 px-6 text-gray-700">{log.sn}</td>
                      <td className="py-4 px-6 text-gray-700">{log.accessType}</td>
                      <td className="py-4 px-6 text-gray-700">{log.credential}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          log.result === 'Success'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {log.result}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <img 
                          src={log.capture} 
                          alt="Capture" 
                          className="w-12 h-12 rounded object-cover"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Total <span className="font-semibold">3</span>
              </div>
              <div className="flex items-center gap-4">
                <select className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>20/page</option>
                  <option>50/page</option>
                  <option>100/page</option>
                </select>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                    &lt;
                  </button>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded-lg">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50" disabled>
                    &gt;
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Go to</span>
                  <input
                    type="number"
                    defaultValue={1}
                    className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LogPage;
