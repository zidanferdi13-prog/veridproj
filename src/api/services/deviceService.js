/**
 * Device Service - API calls for device management
 * Examples of GET and POST requests
 */

import apiClient from '../client';

/**
 * GET - Fetch all devices with optional filters
 * @param {object} filters - Filter parameters (device, model, status, sn, etc.)
 * @param {object} pagination - Pagination parameters (page, limit)
 * @returns {Promise} Device data
 * 
 * Example usage:
 * const devices = await deviceService.getDevices({ 
 *   device: 'Veridface', 
 *   status: 'online',
 *   page: 1, 
 *   limit: 20 
 * });
 */
export const getDevices = async (filters = {}, pagination = {}) => {
  const params = {
    ...filters,
    page: pagination.page || 1,
    limit: pagination.limit || 20,
  };
  
  return await apiClient.get('/devices', params);
};

/**
 * GET - Fetch a single device by ID
 * @param {number|string} deviceId - Device ID
 * @returns {Promise} Device data
 * 
 * Example usage:
 * const device = await deviceService.getDeviceById(1);
 */
export const getDeviceById = async (deviceId) => {
  return await apiClient.get(`/devices/${deviceId}`);
};

/**
 * POST - Create a new device
 * @param {object} deviceData - Device data to create
 * @returns {Promise} Created device data
 * 
 * Example usage:
 * const newDevice = await deviceService.createDevice({
 *   sn: 'J257280001',
 *   model: 'VF104',
 *   device: 'Veridface Device',
 *   groups: 'Ungrouped',
 *   note: 'Main entrance device'
 * });
 */
export const createDevice = async (deviceData) => {
  return await apiClient.post('/devices', deviceData);
};

/**
 * PUT - Update an existing device
 * @param {number|string} deviceId - Device ID
 * @param {object} deviceData - Updated device data
 * @returns {Promise} Updated device data
 * 
 * Example usage:
 * const updatedDevice = await deviceService.updateDevice(1, {
 *   device: 'Updated Device Name',
 *   groups: 'Group A',
 *   note: 'Updated note'
 * });
 */
export const updateDevice = async (deviceId, deviceData) => {
  return await apiClient.put(`/devices/${deviceId}`, deviceData);
};

/**
 * DELETE - Delete a device
 * @param {number|string} deviceId - Device ID
 * @returns {Promise} Deletion result
 * 
 * Example usage:
 * await deviceService.deleteDevice(1);
 */
export const deleteDevice = async (deviceId) => {
  return await apiClient.delete(`/devices/${deviceId}`);
};

/**
 * DELETE - Delete multiple devices
 * @param {array} deviceIds - Array of device IDs
 * @returns {Promise} Deletion result
 * 
 * Example usage:
 * await deviceService.deleteDevices([1, 2, 3]);
 */
export const deleteDevices = async (deviceIds) => {
  return await apiClient.post('/devices/bulk-delete', { ids: deviceIds });
};

/**
 * POST - Configure device network settings
 * @param {number|string} deviceId - Device ID
 * @param {object} configData - Configuration data
 * @returns {Promise} Configuration result
 * 
 * Example usage:
 * await deviceService.configureDevice(1, {
 *   ipType: 'static',
 *   ipAddress: '192.168.1.100',
 *   subnetMask: '255.255.255.0',
 *   gateway: '192.168.1.1',
 *   dns: '8.8.8.8',
 *   networkType: 'ethernet',
 *   wifiName: '',
 *   wifiPassword: ''
 * });
 */
export const configureDevice = async (deviceId, configData) => {
  return await apiClient.post(`/devices/${deviceId}/configure`, configData);
};

/**
 * POST - Generate configuration code for device
 * @param {number|string} deviceId - Device ID
 * @param {object} configData - Configuration data
 * @returns {Promise} Configuration code
 * 
 * Example usage:
 * const configCode = await deviceService.generateConfigCode(1, {
 *   ipType: 'dynamic',
 *   networkType: 'wifi',
 *   wifiName: 'MyWiFi',
 *   wifiPassword: 'password123'
 * });
 */
export const generateConfigCode = async (deviceId, configData) => {
  return await apiClient.post(`/devices/${deviceId}/generate-config-code`, configData);
};

/**
 * POST - Remote unlock device
 * @param {number|string} deviceId - Device ID
 * @returns {Promise} Unlock result
 * 
 * Example usage:
 * await deviceService.remoteUnlock(1);
 */
export const remoteUnlock = async (deviceId) => {
  return await apiClient.post(`/devices/${deviceId}/remote-unlock`);
};

/**
 * GET - Query device permissions
 * @param {number|string} deviceId - Device ID
 * @returns {Promise} Permission data
 * 
 * Example usage:
 * const permissions = await deviceService.queryPermissions(1);
 */
export const queryPermissions = async (deviceId) => {
  return await apiClient.get(`/devices/${deviceId}/permissions`);
};

/**
 * PATCH - Toggle device on/off
 * @param {number|string} deviceId - Device ID
 * @param {boolean} isOn - Device on/off state
 * @returns {Promise} Updated device data
 * 
 * Example usage:
 * await deviceService.toggleDevice(1, true);
 */
export const toggleDevice = async (deviceId, isOn) => {
  return await apiClient.patch(`/devices/${deviceId}/toggle`, { onOff: isOn });
};

const deviceService = {
  getDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
  deleteDevices,
  configureDevice,
  generateConfigCode,
  remoteUnlock,
  queryPermissions,
  toggleDevice,
};

export default deviceService;

