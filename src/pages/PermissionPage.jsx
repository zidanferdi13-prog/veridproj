import React, { useState } from 'react';
import { Sidebar, Header } from '@components';
import { AddGroupModal, DeleteConfirmModal } from '@components/features/permission';
import { RotateCcw } from 'lucide-react';

// ==================== DATA ====================
// Data untuk Personnel Permission (Izin personel)
const personnelPermissionData = [
  {
    id: 1,
    group: 'Veridface',
    personnelCount: 12,
    deviceCount: 1,
    effectivePeriod: 'Berlaku secara permanen',
  },
];

// Data untuk Permission (Izin)
const permissionGroupData = [
  {
    id: 1,
    visitorPermission: 'Grup Veridface',
    trafficDeviceCount: '-',
  },
];

// ==================== MAIN COMPONENT ====================
const PermissionPage = () => {
  // ========== STATE ==========
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('personnel'); // 'personnel' or 'permission'
  const [selectedItems, setSelectedItems] = useState([]);
  
  // Modal states
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  
  // Filters untuk Personnel Permission tab
  const [personnelFilters, setPersonnelFilters] = useState({
    group: '',
    phoneEmail: '',
    sn: '',
  });

  // Filters untuk Permission tab
  const [permissionFilters, setPermissionFilters] = useState({
    group: '',
  });

  const handlePersonnelFilterChange = (field, value) => {
    setPersonnelFilters(prev => ({ ...prev, [field]: value }));
  };

  const handlePermissionFilterChange = (field, value) => {
    setPermissionFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleAddGroup = () => {
    setGroupName('');
    setIsAddGroupModalOpen(true);
  };

  const handleAddGroupConfirm = () => {
    if (!groupName.trim()) {
      alert('Please enter a group name');
      return;
    }
    console.log('Adding new permission group:', groupName);
    // TODO: Add API call to create group
    setIsAddGroupModalOpen(false);
    setGroupName('');
  };

  const handleDelete = () => {
    if (selectedItems.length === 0) {
      alert('Please select items to delete');
      return;
    }
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting items:', selectedItems);
    // TODO: Add API call to delete selected items
    setSelectedItems([]);
    setIsDeleteModalOpen(false);
  };

  // ========== RENDER ==========
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 ${isCollapsed ? 'ml-20' : 'ml-64'} flex flex-col overflow-hidden transition-all duration-300`}>
        <Header />
        
        <main className="flex-1 overflow-y-auto p-8">
          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('personnel')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                activeTab === 'personnel'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Personnel Permission
            </button>
            <button
              onClick={() => setActiveTab('permission')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                activeTab === 'permission'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Permission
            </button>
          </div>

          {/* Personnel Permission Tab Content */}
          {activeTab === 'personnel' && (
            <>
              {/* Filters */}
              <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kelompok
                    </label>
                    <input
                      type="text"
                      placeholder="Silakan masuk"
                      value={personnelFilters.group}
                      onChange={(e) => handlePersonnelFilterChange('group', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone/Email
                    </label>
                    <input
                      type="text"
                      placeholder="Please enter"
                      value={personnelFilters.phoneEmail}
                      onChange={(e) => handlePersonnelFilterChange('phoneEmail', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SN
                    </label>
                    <input
                      type="text"
                      placeholder="Please enter"
                      value={personnelFilters.sn}
                      onChange={(e) => handlePersonnelFilterChange('sn', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
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
                <button 
                  onClick={handleAddGroup}
                  className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium border border-green-200"
                >
                  + Add Permission Group
                </button>
                <button 
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium border border-red-200"
                >
                  Delete Data
                </button>
              </div>

              {/* Personnel Permission Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="py-4 px-6">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                        />
                      </th>
                      <th className="text-left py-4 px-6 text-gray-700 font-semibold">Group</th>
                      <th className="text-left py-4 px-6 text-gray-700 font-semibold">Personnel Count</th>
                      <th className="text-left py-4 px-6 text-gray-700 font-semibold">Device Count</th>
                      <th className="text-left py-4 px-6 text-gray-700 font-semibold">Effective Period</th>
                      <th className="text-left py-4 px-6 text-gray-700 font-semibold">Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personnelPermissionData.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                            className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-4 px-6 text-gray-700">{item.group}</td>
                        <td className="py-4 px-6 text-gray-700">{item.personnelCount}</td>
                        <td className="py-4 px-6 text-gray-700">{item.deviceCount}</td>
                        <td className="py-4 px-6 text-gray-700">{item.effectivePeriod}</td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col gap-1">
                            <button className="text-blue-500 hover:text-blue-600 font-medium text-sm text-left">
                              Rename
                            </button>
                            <button className="text-blue-500 hover:text-blue-600 font-medium text-sm text-left">
                              Adjust Personnel
                            </button>
                            <button className="text-blue-500 hover:text-blue-600 font-medium text-sm text-left">
                              Adjust Device
                            </button>
                            <button className="text-blue-500 hover:text-blue-600 font-medium text-sm text-left">
                              Adjust Time
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {/* Pagination */}
                <div className="flex items-center justify-between p-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Total 0
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">20/page</span>
                      <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                        <option>20</option>
                        <option>50</option>
                        <option>100</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                        ‹
                      </button>
                      <span className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                        1
                      </span>
                      <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                        ›
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Go to</span>
                      <input 
                        type="number" 
                        defaultValue="1"
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Permission Tab Content */}
          {activeTab === 'permission' && (
            <>
              {/* Filters */}
              <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Group
                    </label>
                    <input
                      type="text"
                      placeholder="Please enter"
                      value={permissionFilters.group}
                      onChange={(e) => handlePermissionFilterChange('group', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
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
                <button 
                  onClick={handleAddGroup}
                  className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium border border-green-200"
                >
                  + Add Permission Group
                </button>
                <button 
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium border border-red-200"
                >
                  Delete Data
                </button>
              </div>

              {/* Permission Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="py-4 px-6">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                        />
                      </th>
                      <th className="text-left py-4 px-6 text-gray-700 font-semibold">Visitor Permission</th>
                      <th className="text-left py-4 px-6 text-gray-700 font-semibold">Traffic Device Count</th>
                      <th className="text-left py-4 px-6 text-gray-700 font-semibold">Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissionGroupData.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                            className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-4 px-6 text-gray-700">{item.visitorPermission}</td>
                        <td className="py-4 px-6 text-gray-700">{item.trafficDeviceCount}</td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col gap-1">
                            <button className="text-blue-500 hover:text-blue-600 font-medium text-sm text-left">
                              Rename
                            </button>
                            <button className="text-blue-500 hover:text-blue-600 font-medium text-sm text-left">
                              Adjust Device
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {/* Pagination */}
                <div className="flex items-center justify-between p-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Total 0
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">20/page</span>
                      <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                        <option>20</option>
                        <option>50</option>
                        <option>100</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                        ‹
                      </button>
                      <span className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                        1
                      </span>
                      <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                        ›
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Go to</span>
                      <input 
                        type="number" 
                        defaultValue="1"
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>

        {/* Modals */}
        <AddGroupModal
          isOpen={isAddGroupModalOpen}
          onClose={() => setIsAddGroupModalOpen(false)}
          groupName={groupName}
          onGroupNameChange={setGroupName}
          onConfirm={handleAddGroupConfirm}
        />

        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          message={`Confirm removing the selected ${selectedItems.length} permission group(s)?`}
        />
      </div>
    </div>
  );
};

export default PermissionPage;
