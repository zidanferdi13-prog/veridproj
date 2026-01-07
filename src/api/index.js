// API services barrel export
export { default as apiClient } from './client';
export { default as userService } from './services/userService';
export { default as deviceService } from './services/deviceService';
export { default as authService } from './services/authService';
export { default as attendanceService } from './services/attendanceService';

// Re-export individual functions for convenience
export * from './services/userService';
export * from './services/deviceService';
export * from './services/authService';
export * from './services/attendanceService';
