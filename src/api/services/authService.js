/**
 * Auth Service - API calls for authentication
 * Examples of POST requests for login/logout
 */

import apiClient from '../client';

/**
 * POST - Login user
 * @param {object} credentials - Login credentials
 * @param {string} credentials.username - Username
 * @param {string} credentials.password - Password
 * @returns {Promise} Auth token and user data
 * 
 * Example usage:
 * const response = await authService.login({
 *   username: 'admin',
 *   password: 'password123'
 * });
 * // Store token: localStorage.setItem('authToken', response.token);
 */
export const login = async (credentials) => {
  return await apiClient.post('/auth/login', credentials);
};

/**
 * POST - Logout user
 * @returns {Promise} Logout result
 * 
 * Example usage:
 * await authService.logout();
 * // Remove token: localStorage.removeItem('authToken');
 */
export const logout = async () => {
  return await apiClient.post('/auth/logout');
};

/**
 * POST - Refresh authentication token
 * @param {string} refreshToken - Refresh token
 * @returns {Promise} New auth token
 * 
 * Example usage:
 * const response = await authService.refreshToken(refreshToken);
 */
export const refreshToken = async (refreshToken) => {
  return await apiClient.post('/auth/refresh', { refreshToken });
};

/**
 * GET - Get current user information
 * @returns {Promise} Current user data
 * 
 * Example usage:
 * const user = await authService.getCurrentUser();
 */
export const getCurrentUser = async () => {
  return await apiClient.get('/auth/me');
};

const authService = {
  login,
  logout,
  refreshToken,
  getCurrentUser,
};

export default authService;

