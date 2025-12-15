import React, { useState } from 'react';
import { Sidebar, Header } from '@components';
import { RotateCcw, X } from 'lucide-react';

const deviceData = [
  {
    id: 1,
    device: 'Veridface',
    sn: 'J257280001',
    model: 'VF104',
    type: 'Access Control',
    groups: 'Ungrouped',
    onOff: true,
    status: 'Offline',
    createTime: '2025-09-29 17:08:06',
  },
];

// Add Device Modal Component
const AddDeviceModal = ({ isOpen, onClose, formData, onFormChange, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Tambahkan perangkat</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* SN */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-right text-gray-700">
              <span className="text-red-500">*</span> SN
            </label>
            <input
              type="text"
              placeholder="Please enter"
              value={formData.sn}
              onChange={(e) => onFormChange('sn', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Model */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-right text-gray-700">
              <span className="text-red-500">*</span> Model
            </label>
            <select
              value={formData.model}
              onChange={(e) => onFormChange('model', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="VF104">VF104</option>
              <option value="VF105">VF105</option>
              <option value="VF106">VF106</option>
            </select>
          </div>

          {/* Device */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-right text-gray-700">
              <span className="text-red-500">*</span> Device
            </label>
            <input
              type="text"
              placeholder="Please enter"
              value={formData.device}
              onChange={(e) => onFormChange('device', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Groups */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-right text-gray-700">Groups</label>
            <select
              value={formData.groups}
              onChange={(e) => onFormChange('groups', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Please select</option>
              <option value="Ungrouped">Ungrouped</option>
              <option value="Group A">Group A</option>
              <option value="Group B">Group B</option>
            </select>
          </div>

          {/* Note */}
          <div className="flex items-start gap-4">
            <label className="w-32 text-right text-gray-700 pt-2">Note</label>
            <textarea
              placeholder="Please enter"
              value={formData.note}
              onChange={(e) => onFormChange('note', e.target.value)}
              rows={4}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-8 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
          >
            <X size={18} />
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-8 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium flex items-center gap-2"
          >
            <span>✓</span>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// Configuration Modal Component
const ConfigurationModal = ({ isOpen, onClose, configData, onConfigChange, onConfirm, onGenConfigCode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Konfigurasi perangkat</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* IP Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-32 text-right text-gray-700">IP</label>
              <div className="flex gap-2">
                <button
                  onClick={() => onConfigChange('ipType', 'dynamic')}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    configData.ipType === 'dynamic'
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Dynamic
                </button>
                <button
                  onClick={() => onConfigChange('ipType', 'static')}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    configData.ipType === 'static'
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Static
                </button>
              </div>
            </div>

            {/* Static IP Fields */}
            {configData.ipType === 'static' && (
              <>
                <div className="flex items-center gap-4">
                  <label className="w-32 text-right text-gray-700">IP address</label>
                  <input
                    type="text"
                    placeholder="Please enter"
                    value={configData.ipAddress}
                    onChange={(e) => onConfigChange('ipAddress', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-32 text-right text-gray-700">Subnet mask</label>
                  <input
                    type="text"
                    placeholder="Please enter"
                    value={configData.subnetMask}
                    onChange={(e) => onConfigChange('subnetMask', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-32 text-right text-gray-700">Gateway</label>
                  <input
                    type="text"
                    placeholder="Please enter"
                    value={configData.gateway}
                    onChange={(e) => onConfigChange('gateway', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-32 text-right text-gray-700">DNS</label>
                  <input
                    type="text"
                    placeholder="Please enter"
                    value={configData.dns}
                    onChange={(e) => onConfigChange('dns', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}
          </div>

          <div className="border-t border-gray-200"></div>

          {/* Network Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-32 text-right text-gray-700">Network</label>
              <div className="flex gap-2">
                <button
                  onClick={() => onConfigChange('networkType', 'ethernet')}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    configData.networkType === 'ethernet'
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Ethernet
                </button>
                <button
                  onClick={() => onConfigChange('networkType', 'wifi')}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    configData.networkType === 'wifi'
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  WiFi
                </button>
              </div>
            </div>

            {/* WiFi Fields */}
            {configData.networkType === 'wifi' && (
              <>
                <div className="flex items-center gap-4">
                  <label className="w-32 text-right text-gray-700">WIFI name</label>
                  <input
                    type="text"
                    placeholder="BIL-Guest"
                    value={configData.wifiName}
                    onChange={(e) => onConfigChange('wifiName', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-32 text-right text-gray-700">WIFI password</label>
                  <input
                    type="password"
                    placeholder="BILguest2@"
                    value={configData.wifiPassword}
                    onChange={(e) => onConfigChange('wifiPassword', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200"></div>

        <div className="flex flex-col items-center gap-4 p-6">
          <button
            onClick={onGenConfigCode}
            className="px-8 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center gap-2"
          >
            <span>⚙️</span>
            Gen Config Code
          </button>
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="px-8 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
            >
              <X size={18} />
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-8 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium flex items-center gap-2"
            >
              <span>✓</span>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Delete Confirmation Modal Component
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, selectedCount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Delete Confirmation</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-700 text-center mb-2">
            Are you sure you want to delete {selectedCount} selected device(s)?
          </p>
          <p className="text-gray-500 text-sm text-center">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-8 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-8 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

const DevicePage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [deviceFormData, setDeviceFormData] = useState({
    sn: '',
    model: '',
    device: '',
    groups: '',
    note: '',
  });
  const [configData, setConfigData] = useState({
    ipType: 'dynamic',
    ipAddress: '',
    subnetMask: '',
    gateway: '',
    dns: '',
    networkType: 'ethernet',
    wifiName: '',
    wifiPassword: '',
  });
  const [filters, setFilters] = useState({
    device: '',
    model: '',
    onOff: '',
    status: '',
    sn: '',
    startDate: '',
    endDate: '',
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFilters({
      device: '',
      model: '',
      onOff: '',
      status: '',
      sn: '',
      startDate: '',
      endDate: '',
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedDevices(deviceData.map(device => device.id));
    } else {
      setSelectedDevices([]);
    }
  };

  const handleSelectDevice = (deviceId) => {
    if (selectedDevices.includes(deviceId)) {
      setSelectedDevices(selectedDevices.filter(id => id !== deviceId));
    } else {
      setSelectedDevices([...selectedDevices, deviceId]);
    }
  };

  const handleDelete = () => {
    if (selectedDevices.length === 0) {
      alert('Please select devices to delete');
      return;
    }
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting devices:', selectedDevices);
    // Logic untuk delete devices
    setSelectedDevices([]);
    handleCloseDeleteModal();
  };

  const handleAddDevice = () => {
    setDeviceFormData({
      sn: '',
      model: '',
      device: '',
      groups: '',
      note: '',
    });
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleDeviceFormChange = (field, value) => {
    setDeviceFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddConfirm = () => {
    console.log('Adding device:', deviceFormData);
    // Logic untuk add device
    handleCloseAddModal();
  };

  const handleConfigurationClick = (device) => {
    // Reset config data atau load dari device yang dipilih
    setConfigData({
      ipType: 'dynamic',
      ipAddress: '',
      subnetMask: '',
      gateway: '',
      dns: '',
      networkType: 'ethernet',
      wifiName: '',
      wifiPassword: '',
    });
    setIsConfigModalOpen(true);
  };

  const handleCloseConfigModal = () => {
    setIsConfigModalOpen(false);
  };

  const handleConfigChange = (field, value) => {
    setConfigData(prev => ({ ...prev, [field]: value }));
  };

  const handleConfigConfirm = () => {
    console.log('Configuration data:', configData);
    // Logic untuk save configuration
    handleCloseConfigModal();
  };

  const handleGenConfigCode = () => {
    console.log('Generating config code with:', configData);
    // Logic untuk generate config code
    alert('Config code generated!');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 ${isCollapsed ? 'ml-20' : 'ml-64'} flex flex-col overflow-hidden transition-all duration-300`}>
        <Header />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex gap-6">
            {/* Main Content */}
            <div className="flex-1">
              {/* Filters */}
              <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                <div className="grid grid-cols-5 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Device
                    </label>
                    <input
                      type="text"
                      placeholder="Please enter"
                      value={filters.device}
                      onChange={(e) => handleFilterChange('device', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Model
                    </label>
                    <input
                      type="text"
                      placeholder="Please enter"
                      value={filters.model}
                      onChange={(e) => handleFilterChange('model', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      On/Off
                    </label>
                    <select
                      value={filters.onOff}
                      onChange={(e) => handleFilterChange('onOff', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Please select</option>
                      <option value="on">On</option>
                      <option value="off">Off</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Please select</option>
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SN
                    </label>
                    <input
                      type="text"
                      placeholder="Please enter"
                      value={filters.sn}
                      onChange={(e) => handleFilterChange('sn', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
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
                <button 
                  onClick={handleAddDevice}
                  className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium border border-green-200"
                >
                  + Add device
                </button>
                <button 
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium border border-red-200"
                >
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
                            onChange={handleSelectAll}
                            checked={selectedDevices.length === deviceData.length && deviceData.length > 0}
                            className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                          />
                        </th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">Device</th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">SN</th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">Model</th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">Type</th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">Groups</th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">On/Off</th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">Create Time</th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">Status</th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">Operation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deviceData.map((device) => (
                        <tr key={device.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6">
                            <input
                              type="checkbox"
                              checked={selectedDevices.includes(device.id)}
                              onChange={() => handleSelectDevice(device.id)}
                              className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                            />
                          </td>
                          <td className="py-4 px-6 text-gray-700">{device.device}</td>
                          <td className="py-4 px-6 text-gray-700">{device.sn}</td>
                          <td className="py-4 px-6 text-gray-700">{device.model}</td>
                          <td className="py-4 px-6 text-gray-700">{device.type}</td>
                          <td className="py-4 px-6 text-gray-700">{device.groups}</td>
                          <td className="py-4 px-6">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={device.onOff}
                                className="sr-only peer"
                                readOnly
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                          </td>
                          <td className="py-4 px-6 text-gray-700">{device.createTime}</td>
                          <td className="py-4 px-6">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              device.status === 'Offline'
                                ? 'bg-red-100 text-red-600'
                                : 'bg-green-100 text-green-600'
                            }`}>
                              {device.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex flex-col gap-1">
                              <button 
                                onClick={() => handleConfigurationClick(device)}
                                className="text-blue-500 hover:text-blue-600 font-medium text-sm text-left"
                              >
                                Configuration
                              </button>
                              <button className="text-blue-500 hover:text-blue-600 font-medium text-sm text-left">
                                Remote Unlock
                              </button>
                              <button className="text-blue-500 hover:text-blue-600 font-medium text-sm text-left">
                                Edit
                              </button>
                              <button className="text-blue-500 hover:text-blue-600 font-medium text-sm text-left">
                                Permission query
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Total <span className="font-semibold">1</span>
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
            </div>
          </div>
        </main>

        {/* Add Device Modal */}
        <AddDeviceModal
          isOpen={isAddModalOpen}
          onClose={handleCloseAddModal}
          formData={deviceFormData}
          onFormChange={handleDeviceFormChange}
          onConfirm={handleAddConfirm}
        />

        {/* Configuration Modal */}
        <ConfigurationModal
          isOpen={isConfigModalOpen}
          onClose={handleCloseConfigModal}
          configData={configData}
          onConfigChange={handleConfigChange}
          onConfirm={handleConfigConfirm}
          onGenConfigCode={handleGenConfigCode}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDeleteConfirm}
          selectedCount={selectedDevices.length}
        />
      </div>
    </div>
  );
};

export default DevicePage;
