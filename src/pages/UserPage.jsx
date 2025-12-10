import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Upload, UserPlus, FileSpreadsheet, Download, Trash2, RotateCcw, Eye, CreditCard } from 'lucide-react';

const userData = [
  {
    id: 1,
    name: 'Andhika',
    phone: '-',
    email: '-',
    group: 'Veridface Company',
    createTime: '2025-12-02',
    hasCredential: true,
  },
  {
    id: 2,
    name: 'Naz',
    phone: '-',
    email: 'naz@gmail.com',
    group: 'Veridface Company',
    createTime: '2025-09-15',
    hasCredential: true,
  },
  {
    id: 3,
    name: 'Iswa',
    phone: '-',
    email: 'vin@gmail.com',
    group: 'Veridface Company',
    createTime: '2025-09-15',
    hasCredential: true,
  },
  {
    id: 4,
    name: 'Kiayi Khalis',
    phone: '-',
    email: 'khalis@gmail.com',
    group: 'Veridface Company',
    createTime: '2025-09-15',
    hasCredential: true,
  },
];

const UserPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('Veridface Company');
  const [filters, setFilters] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(userData.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 ${isCollapsed ? 'ml-20' : 'ml-64'} flex flex-col overflow-hidden transition-all duration-300`}>
        <Header />
        
        <main className="flex-1 overflow-y-auto p-8">
          {/* Company Selector */}
          <div className="mb-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200 inline-block">
              <div className="flex items-center gap-3">
                <span className="text-blue-600 font-semibold">All personnel</span>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Veridface Company</option>
                  </select>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <span className="text-gray-600">...</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
            <div className="grid grid-cols-3 gap-4 mb-4">
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Please enter"
                  value={filters.email}
                  onChange={(e) => handleFilterChange('email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2">
                <span>🔍</span>
                Search
              </button>
              <button className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2">
                <RotateCcw size={16} />
                Reset
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-6 flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium border border-green-200">
              Add new personnel
            </button>
            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium border border-blue-200">
              Import information
            </button>
            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium border border-blue-200">
              Export data
            </button>
            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium border border-blue-200">
              Adjust groups
            </button>
            <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium border border-red-200">
              Delete
            </button>
            <button className="px-4 py-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors font-medium border border-yellow-200">
              Reset password
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
                        onChange={handleSelectAll}
                        checked={selectedUsers.length === userData.length}
                        className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                      />
                    </th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Name</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Phone</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Email</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Group</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Create time</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Credential</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleSelectUser(user.id)}
                          className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-4 px-6 text-gray-700">{user.name}</td>
                      <td className="py-4 px-6 text-gray-500">{user.phone}</td>
                      <td className="py-4 px-6 text-gray-700">{user.email}</td>
                      <td className="py-4 px-6 text-gray-700">{user.group}</td>
                      <td className="py-4 px-6 text-gray-700">{user.createTime}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                            <Eye size={18} className="text-blue-500" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                            <CreditCard size={18} className="text-gray-400" />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1">
                          <button className="text-cyan-500 hover:text-cyan-600 font-medium text-sm text-left">
                            Edit
                          </button>
                          <button className="text-cyan-500 hover:text-cyan-600 font-medium text-sm text-left">
                            Credential management
                          </button>
                          <button className="text-cyan-500 hover:text-cyan-600 font-medium text-sm text-left">
                            Permission query
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserPage;
