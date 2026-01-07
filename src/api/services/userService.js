/**
 * User Service - API calls for user management
 * Examples of GET and POST requests
 */

import apiClient from '../client';

/**
 * GET - Fetch all users with optional filters
 * @param {object} filters - Filter parameters (name, phone, email, group, etc.)
 * @param {object} pagination - Pagination parameters (page, limit)
 * @returns {Promise} User data
 * 
 * Example usage:
 * const users = await userService.getUsers({ name: 'John', page: 1, limit: 20 });
 */
export const getUsers = async (filters = {}, pagination = {}) => {
  const params = {
    ...filters,
    page: pagination.page || 1,
    limit: pagination.limit || 20,
  };
  
  return await apiClient.get('/users', params);
};

/**
 * GET - Fetch a single user by ID
 * @param {number|string} userId - User ID
 * @returns {Promise} User data
 * 
 * Example usage:
 * const user = await userService.getUserById(1);
 */
export const getUserById = async (userId) => {
  return await apiClient.get(`/users/${userId}`);
};

/**
 * POST - Create a new user
 * @param {object} userData - User data to create
 * @returns {Promise} Created user data
 * 
 * Example usage:
 * const newUser = await userService.createUser({
 *   username: 'john_doe',
 *   phone: '1234567890',
 *   email: 'john@example.com',
 *   password: 'securePassword123',
 *   group: 'Veridface Company',
 *   admin: false,
 *   permission: 'user',
 *   note: 'New employee'
 * });
 */
export const createUser = async (userData) => {
  return await apiClient.post('/users', userData);
};

/**
 * PUT - Update an existing user
 * @param {number|string} userId - User ID
 * @param {object} userData - Updated user data
 * @returns {Promise} Updated user data
 * 
 * Example usage:
 * const updatedUser = await userService.updateUser(1, {
 *   username: 'john_doe_updated',
 *   phone: '0987654321',
 *   email: 'john.updated@example.com'
 * });
 */
export const updateUser = async (userId, userData) => {
  return await apiClient.put(`/users/${userId}`, userData);
};

/**
 * DELETE - Delete a user
 * @param {number|string} userId - User ID
 * @returns {Promise} Deletion result
 * 
 * Example usage:
 * await userService.deleteUser(1);
 */
export const deleteUser = async (userId) => {
  return await apiClient.delete(`/users/${userId}`);
};

/**
 * DELETE - Delete multiple users
 * @param {array} userIds - Array of user IDs
 * @returns {Promise} Deletion result
 * 
 * Example usage:
 * await userService.deleteUsers([1, 2, 3]);
 */
export const deleteUsers = async (userIds) => {
  return await apiClient.post('/users/bulk-delete', { ids: userIds });
};

/**
 * POST - Import users from file
 * @param {File|FileList} files - File(s) to import
 * @returns {Promise} Import result
 * 
 * Example usage:
 * const formData = new FormData();
 * formData.append('file', file);
 * await userService.importUsers(formData);
 */
export const importUsers = async (files) => {
  const formData = new FormData();
  
  if (files instanceof FileList) {
    Array.from(files).forEach((file, index) => {
      formData.append(`files`, file);
    });
  } else if (files instanceof File) {
    formData.append('file', files);
  } else if (Array.isArray(files)) {
    files.forEach((file) => {
      formData.append('files', file);
    });
  }
  
  return await apiClient.postFormData('/users/import', formData);
};

/**
 * GET - Export users to CSV/Excel
 * @param {object} filters - Filter parameters for export
 * @returns {Promise} Blob or file download
 * 
 * Example usage:
 * const blob = await userService.exportUsers({ name: 'John' });
 * const url = URL.createObjectURL(blob);
 * const a = document.createElement('a');
 * a.href = url;
 * a.download = 'users.csv';
 * a.click();
 */
export const exportUsers = async (filters = {}) => {
  const params = { ...filters, format: 'csv' };
  const response = await fetch(apiClient.buildURL('/users/export', params), {
    method: 'GET',
    headers: apiClient.getHeaders(),
  });
  
  if (!response.ok) {
    throw new Error('Export failed');
  }
  
  return await response.blob();
};

/**
 * POST - Update user credentials (face image, card ID, password, QR code)
 * @param {number|string} userId - User ID
 * @param {object} credentialData - Credential data
 * @returns {Promise} Updated credential data
 * 
 * Example usage:
 * const formData = new FormData();
 * formData.append('faceImage', file);
 * formData.append('cardId', '12345');
 * formData.append('userPassword', 'newPassword');
 * await userService.updateCredentials(1, formData);
 */
export const updateCredentials = async (userId, credentialData) => {
  // If credentialData contains files, use FormData
  if (credentialData.faceImage instanceof File || credentialData.qrCode instanceof File) {
    const formData = new FormData();
    
    if (credentialData.faceImage) formData.append('faceImage', credentialData.faceImage);
    if (credentialData.qrCode) formData.append('qrCode', credentialData.qrCode);
    if (credentialData.cardId) formData.append('cardId', credentialData.cardId);
    if (credentialData.userPassword) formData.append('userPassword', credentialData.userPassword);
    
    return await apiClient.postFormData(`/users/${userId}/credentials`, formData);
  }
  
  // Otherwise, use JSON
  return await apiClient.post(`/users/${userId}/credentials`, credentialData);
};

const userService = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteUsers,
  importUsers,
  exportUsers,
  updateCredentials,
};

export default userService;

