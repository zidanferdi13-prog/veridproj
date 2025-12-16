import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from '@context';
import { ProtectedRoute } from '@components';
import {
  LoginPage,
  DashboardPage,
  UserPage,
  DevicePage,
  PermissionPage,
  VisitorPage,
  AttendanceSysPage,
  AttendancePage,
  LogPage,
  SettingsPage,
} from '@pages';

// Dev helper: logs route changes to console to aid debugging navigation issues
const RouterLogger = () => {
  const location = useLocation();
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('[RouterLogger] pathname=', location.pathname, 'state=', location.state);
  }, [location.pathname, location.state]);
  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <RouterLogger />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/user" 
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/device" 
            element={
              <ProtectedRoute>
                <DevicePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/permission" 
            element={
              <ProtectedRoute>
                <PermissionPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/visitor" 
            element={
              <ProtectedRoute>
                <VisitorPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/attendance-sys" 
            element={
              <ProtectedRoute>
                <AttendanceSysPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/attendance" 
            element={
              <ProtectedRoute>
                <AttendancePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/attendance/statistics"
            element={
              <ProtectedRoute>
                <AttendancePage initialTab="statistics" />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/log" 
            element={
              <ProtectedRoute>
                <LogPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/setting" 
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
