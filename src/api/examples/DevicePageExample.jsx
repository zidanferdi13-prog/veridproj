/**
 * DevicePage API Integration Example
 * This file demonstrates how to integrate GET and POST API calls into DevicePage
 * 
 * Key concepts shown:
 * 1. GET request to fetch devices on component mount
 * 2. GET request with filters for search
 * 3. POST request to create a new device
 * 4. PUT request to update an existing device
 * 5. DELETE request to delete devices
 * 6. POST request for device configuration
 * 7. POST request for remote unlock
 */

import React, { useState, useEffect } from 'react';
import { Sidebar, Header } from '@components';
import { AddDeviceModal, ConfigurationModal, DeleteConfirmModal, RemoteUnlockModal, EditDeviceModal, PermissionQueryModal } from '@components/features/device';
import { useModal, useFilters, useSelection, useFormData } from '@hooks';
import { RotateCcw } from 'lucide-react';
import { deviceService } from '@api';

const DevicePageExample = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('All');
  
  // Use custom hooks
  const { filters, handleFilterChange, resetFilters } = useFilters({
    device: '',
    model: '',
    onOff: '',
    status: '',
    sn: '',
    startDate: '',
    endDate: '',
  });
  
  const { selectedItems: selectedDevices, toggleSelectAll, toggleItem, setSelectedItems } = useSelection();
  
  const addModal = useModal();
  const configModal = useModal();
  const deleteModal = useModal();
  const remoteUnlockModal = useModal();
  const editModal = useModal();
  const permissionQueryModal = useModal();
  const [selectedDevice, setSelectedDevice] = useState(null);
  
  const { formData: deviceFormData, handleChange: handleDeviceFormChange, resetForm: resetDeviceForm } = useFormData({
    sn: '',
    model: '',
    device: '',
    groups: '',
    note: '',
  });

  const { formData: editFormData, handleChange: handleEditFormChange, resetForm: resetEditForm, setForm: setEditForm } = useFormData({
    sn: '',
    model: '',
    device: '',
    groups: '',
    note: '',
  });
  
  const { formData: configData, handleChange: handleConfigChange, resetForm: resetConfigForm } = useFormData({
    ipType: 'dynamic',
    ipAddress: '',
    subnetMask: '',
    gateway: '',
    dns: '',
    networkType: 'ethernet',
    wifiName: '',
    wifiPassword: '',
  });

  // ========== API STATE ==========
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissions, setPermissions] = useState([]);

  // ========== GET REQUEST - Fetch devices on mount ==========
  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // GET request to fetch devices
      const response = await deviceService.getDevices(filters, { page: 1, limit: 20 });
      
      if (response.data) {
        setDevices(response.data);
      } else if (Array.isArray(response)) {
        setDevices(response);
      } else {
        setDevices([]);
      }
    } catch (err) {
      console.error('Failed to fetch devices:', err);
      setError(err.message || 'Failed to load devices');
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ========== GET REQUEST - Search devices with filters ==========
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await deviceService.getDevices(filters, { page: 1, limit: 20 });
      
      if (response.data) {
        setDevices(response.data);
      } else if (Array.isArray(response)) {
        setDevices(response);
      }
    } catch (err) {
      console.error('Search failed:', err);
      setError(err.message);
      alert(`Search error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ========== POST REQUEST - Create new device ==========
  const handleAddConfirm = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // POST request to create device
      const newDevice = await deviceService.createDevice({
        sn: deviceFormData.sn,
        model: deviceFormData.model,
        device: deviceFormData.device,
        groups: deviceFormData.groups,
        note: deviceFormData.note,
      });
      
      console.log('Device created successfully:', newDevice);
      
      // Refresh the device list
      await fetchDevices();
      
      // Close modal and reset form
      addModal.close();
      resetDeviceForm();
      
      alert('Device created successfully!');
    } catch (err) {
      console.error('Failed to create device:', err);
      setError(err.message);
      alert(`Error creating device: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ========== PUT REQUEST - Update existing device ==========
  const handleEditConfirm = async () => {
    if (!selectedDevice) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // PUT request to update device
      const updatedDevice = await deviceService.updateDevice(selectedDevice.id, {
        sn: editFormData.sn,
        model: editFormData.model,
        device: editFormData.device,
        groups: editFormData.groups,
        note: editFormData.note,
      });
      
      console.log('Device updated successfully:', updatedDevice);
      
      // Refresh the device list
      await fetchDevices();
      
      // Close modal
      editModal.close();
      setSelectedDevice(null);
      
      alert('Device updated successfully!');
    } catch (err) {
      console.error('Failed to update device:', err);
      setError(err.message);
      alert(`Error updating device: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ========== DELETE REQUEST - Delete multiple devices ==========
  const handleDeleteConfirm = async () => {
    if (selectedDevices.length === 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // DELETE request - bulk delete
      await deviceService.deleteDevices(selectedDevices);
      
      console.log('Devices deleted successfully');
      
      // Refresh the device list
      await fetchDevices();
      
      // Clear selection
      setSelectedItems([]);
      deleteModal.close();
      
      alert(`${selectedDevices.length} device(s) deleted successfully!`);
    } catch (err) {
      console.error('Failed to delete devices:', err);
      setError(err.message);
      alert(`Error deleting devices: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ========== POST REQUEST - Configure device ==========
  const handleConfigConfirm = async () => {
    if (!selectedDevice) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // POST request to configure device
      const result = await deviceService.configureDevice(selectedDevice.id, configData);
      
      console.log('Device configured successfully:', result);
      
      // Refresh the device list
      await fetchDevices();
      
      // Close modal
      configModal.close();
      
      alert('Device configured successfully!');
    } catch (err) {
      console.error('Failed to configure device:', err);
      setError(err.message);
      alert(`Error configuring device: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ========== POST REQUEST - Generate configuration code ==========
  const handleGenConfigCode = async () => {
    if (!selectedDevice) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // POST request to generate config code
      const result = await deviceService.generateConfigCode(selectedDevice.id, configData);
      
      console.log('Config code generated:', result);
      
      // Show config code to user
      alert(`Configuration code: ${result.code || result.configCode || 'Generated successfully!'}`);
    } catch (err) {
      console.error('Failed to generate config code:', err);
      setError(err.message);
      alert(`Error generating config code: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ========== POST REQUEST - Remote unlock device ==========
  const handleRemoteUnlockConfirm = async () => {
    if (!selectedDevice) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // POST request to remote unlock
      await deviceService.remoteUnlock(selectedDevice.id);
      
      console.log('Remote unlock successful');
      
      alert(`Remote unlock successful for ${selectedDevice.device}!`);
      
      // Close modal
      remoteUnlockModal.close();
    } catch (err) {
      console.error('Failed to remote unlock:', err);
      setError(err.message);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ========== GET REQUEST - Query device permissions ==========
  const handlePermissionQueryClick = async (device) => {
    setSelectedDevice(device);
    setLoading(true);
    setError(null);
    
    try {
      // GET request to query permissions
      const response = await deviceService.queryPermissions(device.id);
      
      if (response.data) {
        setPermissions(response.data);
      } else if (Array.isArray(response)) {
        setPermissions(response);
      } else {
        setPermissions([]);
      }
      
      permissionQueryModal.open();
    } catch (err) {
      console.error('Failed to query permissions:', err);
      setError(err.message);
      alert(`Error querying permissions: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ========== PATCH REQUEST - Toggle device on/off ==========
  const handleToggleDevice = async (device, isOn) => {
    try {
      // PATCH request to toggle device
      await deviceService.toggleDevice(device.id, isOn);
      
      // Refresh the device list
      await fetchDevices();
    } catch (err) {
      console.error('Failed to toggle device:', err);
      alert(`Error: ${err.message}`);
    }
  };

  // ========== EVENT HANDLERS ==========
  const handleSelectAll = (e) => {
    toggleSelectAll(e, devices);
  };

  const handleSelectDevice = (deviceId) => {
    toggleItem(deviceId);
  };

  const handleDelete = () => {
    if (selectedDevices.length === 0) {
      alert('Please select devices to delete');
      return;
    }
    deleteModal.open();
  };

  const handleAddDevice = () => {
    resetDeviceForm();
    addModal.open();
  };

  const handleConfigurationClick = (device) => {
    setSelectedDevice(device);
    resetConfigForm();
    configModal.open();
  };

  const handleRemoteUnlockClick = (device) => {
    setSelectedDevice(device);
    remoteUnlockModal.open();
  };

  const handleEditClick = (device) => {
    setSelectedDevice(device);
    setEditForm({
      sn: device.sn,
      model: device.model,
      device: device.device,
      groups: device.groups,
      note: device.note || '',
    });
    editModal.open();
  };

  const handleReset = () => {
    resetFilters();
    fetchDevices();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 ${isCollapsed ? 'ml-20' : 'ml-64'} flex flex-col overflow-hidden transition-all duration-300`}>
        <Header />
        
        <main className="flex-1 overflow-y-auto p-8">
          {/* Loading and error indicators */}
          {loading && (
            <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-lg">
              Loading...
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
              Error: {error}
            </div>
          )}

          {/* Filters */}
          <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
            {/* Filter inputs... */}
            <div className="flex gap-3 justify-end">
              <button 
                onClick={handleSearch}
                disabled={loading}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
              >
                <span>🔍</span>
                Search
              </button>
              <button 
                onClick={handleReset}
                disabled={loading}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
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
              disabled={loading}
              className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium border border-green-200 disabled:opacity-50"
            >
              + Add device
            </button>
            <button 
              onClick={handleDelete}
              disabled={loading}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium border border-red-200 disabled:opacity-50"
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
                        checked={selectedDevices.length === devices.length && devices.length > 0}
                        className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                      />
                    </th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Device</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">SN</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Model</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Status</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">On/Off</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.length === 0 && !loading && (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-gray-500">
                        No devices found
                      </td>
                    </tr>
                  )}
                  {devices.map((device) => (
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
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={device.onOff}
                            onChange={(e) => handleToggleDevice(device, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1">
                          <button 
                            onClick={() => handleConfigurationClick(device)}
                            className="text-blue-500 hover:text-blue-600 font-medium text-sm text-left"
                          >
                            Configuration
                          </button>
                          <button 
                            onClick={() => handleRemoteUnlockClick(device)}
                            className="text-blue-500 hover:text-blue-600 font-medium text-sm text-left"
                          >
                            Remote Unlock
                          </button>
                          <button 
                            onClick={() => handleEditClick(device)}
                            className="text-blue-500 hover:text-blue-600 font-medium text-sm text-left"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handlePermissionQueryClick(device)}
                            className="text-blue-500 hover:text-blue-600 font-medium text-sm text-left"
                          >
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

        {/* Modals */}
        <AddDeviceModal
          isOpen={addModal.isOpen}
          onClose={addModal.close}
          formData={deviceFormData}
          onFormChange={handleDeviceFormChange}
          onConfirm={handleAddConfirm}
        />

        <ConfigurationModal
          isOpen={configModal.isOpen}
          onClose={configModal.close}
          configData={configData}
          onConfigChange={handleConfigChange}
          onConfirm={handleConfigConfirm}
          onGenConfigCode={handleGenConfigCode}
        />

        <DeleteConfirmModal
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.close}
          onConfirm={handleDeleteConfirm}
          selectedCount={selectedDevices.length}
        />

        <RemoteUnlockModal
          isOpen={remoteUnlockModal.isOpen}
          onClose={remoteUnlockModal.close}
          onConfirm={handleRemoteUnlockConfirm}
          deviceName={selectedDevice?.device}
        />

        <EditDeviceModal
          isOpen={editModal.isOpen}
          onClose={editModal.close}
          onConfirm={handleEditConfirm}
          formData={editFormData}
          onFormChange={handleEditFormChange}
        />

        <PermissionQueryModal
          isOpen={permissionQueryModal.isOpen}
          onClose={permissionQueryModal.close}
          deviceName={selectedDevice?.device}
          permissions={permissions}
        />
      </div>
    </div>
  );
};

export default DevicePageExample;

