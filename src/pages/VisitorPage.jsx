import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { RotateCcw } from 'lucide-react';

const VisitorPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('list');
  const [filters, setFilters] = useState({
    name: '',
    phone: '',
    startTime: '',
    endTime: '',
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFilters({
      name: '',
      phone: '',
      startTime: '',
      endTime: '',
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
              onClick={() => setActiveTab('list')}
              className={`px-6 py-2.5 rounded-t-lg font-medium transition-colors ${
                activeTab === 'list'
                  ? 'bg-white text-blue-500 border-b-2 border-blue-500'
                  : 'bg-transparent text-gray-600 hover:bg-white'
              }`}
            >
              Visitor List
            </button>
            <button
              onClick={() => setActiveTab('review')}
              className={`px-6 py-2.5 rounded-t-lg font-medium transition-colors ${
                activeTab === 'review'
                  ? 'bg-white text-blue-500 border-b-2 border-blue-500'
                  : 'bg-transparent text-gray-600 hover:bg-white'
              }`}
            >
              Visitor review
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
            <div className="grid grid-cols-2 gap-4 mb-4">
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
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="Please enter"
                  value={filters.phone}
                  onChange={(e) => handleFilterChange('phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="startTime"
                    value={filters.startTime}
                    onChange={(e) => handleFilterChange('startTime', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="text"
                    placeholder="endTime"
                    value={filters.endTime}
                    onChange={(e) => handleFilterChange('endTime', e.target.value)}
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
            <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium border border-green-200">
              + Invite visitor
            </button>
            <button className="px-4 py-2 bg-cyan-50 text-cyan-600 rounded-lg hover:bg-cyan-100 transition-colors font-medium border border-cyan-200">
              🔑 Visitor application code
            </button>
            <button className="px-4 py-2 bg-cyan-50 text-cyan-600 rounded-lg hover:bg-cyan-100 transition-colors font-medium border border-cyan-200">
              ✓ Visitor permissions
            </button>
            <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium border border-red-200">
              🗑️ Delete
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="py-4 px-6">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                      />
                    </th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Visitor</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Phone</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Credential</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Permissions</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Note</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-gray-400">
                      No data available
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Total <span className="font-semibold">0</span>
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

export default VisitorPage;
