/**
 * Attendance Service - API calls for attendance and chart data
 */

import apiClient from '../client';

/**
 * GET - Fetch attendance trend data for charts
 * @param {object} filters - Filter parameters (period: 'Daily', 'Weekly', 'Monthly', startDate, endDate)
 * @returns {Promise} Attendance trend data
 * 
 * Response format:
 * {
 *   attendanceData: [
 *     { time: '08:30', value: 130 },
 *     { time: '08:45', value: 150 },
 *     ...
 *   ]
 * }
 * 
 * Example usage:
 * const data = await attendanceService.getAttendanceTrend({ period: 'Daily' });
 */
export const getAttendanceTrend = async (filters = {}) => {
  const params = {
    period: filters.period || 'Daily',
    startDate: filters.startDate,
    endDate: filters.endDate,
  };
  
  return await apiClient.get('/attendance/trend', params);
};

/**
 * GET - Fetch today's recap data for pie chart
 * @param {object} filters - Filter parameters (date, period: 'Daily', 'Weekly', 'Monthly')
 * @returns {Promise} Recap data
 * 
 * Response format:
 * {
 *   recapData: [
 *     { name: 'Ontime', value: 100, color: '#3B82F6' },
 *     { name: 'Late', value: 26, color: '#60A5FA' },
 *     { name: 'Sick', value: 10, color: '#93C5FD' }
 *   ]
 * }
 * 
 * Example usage:
 * const data = await attendanceService.getTodayRecap({ period: 'Daily' });
 */
export const getTodayRecap = async (filters = {}) => {
  const params = {
    period: filters.period || 'Daily',
    date: filters.date,
  };
  
  return await apiClient.get('/attendance/recap', params);
};

/**
 * GET - Fetch attendance statistics
 * @param {object} filters - Filter parameters (startDate, endDate, group, etc.)
 * @returns {Promise} Attendance statistics
 * 
 * Example usage:
 * const stats = await attendanceService.getAttendanceStats({ startDate: '2025-12-01', endDate: '2025-12-31' });
 */
export const getAttendanceStats = async (filters = {}) => {
  return await apiClient.get('/attendance/stats', filters);
};

/**
 * GET - Fetch attendance records
 * @param {object} filters - Filter parameters (name, date, group, etc.)
 * @param {object} pagination - Pagination parameters (page, limit)
 * @returns {Promise} Attendance records
 * 
 * Example usage:
 * const records = await attendanceService.getAttendanceRecords({ date: '2025-12-09' }, { page: 1, limit: 20 });
 */
export const getAttendanceRecords = async (filters = {}, pagination = {}) => {
  const params = {
    ...filters,
    page: pagination.page || 1,
    limit: pagination.limit || 20,
  };
  
  return await apiClient.get('/attendance/records', params);
};

/**
 * POST - Export attendance data
 * @param {object} filters - Filter parameters for export
 * @returns {Promise} Blob or file download
 * 
 * Example usage:
 * const blob = await attendanceService.exportAttendance({ startDate: '2025-12-01', endDate: '2025-12-31' });
 */
export const exportAttendance = async (filters = {}) => {
  const params = { ...filters, format: 'csv' };
  const response = await fetch(apiClient.buildURL('/attendance/export', params), {
    method: 'GET',
    headers: apiClient.getHeaders(),
  });
  
  if (!response.ok) {
    throw new Error('Export failed');
  }
  
  return await response.blob();
};

const attendanceService = {
  getAttendanceTrend,
  getTodayRecap,
  getAttendanceStats,
  getAttendanceRecords,
  exportAttendance,
};

export default attendanceService;

