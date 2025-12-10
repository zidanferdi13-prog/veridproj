import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UserPage from './pages/UserPage';
import DevicePage from './pages/DevicePage';
import PermissionPage from './pages/PermissionPage';
import VisitorPage from './pages/VisitorPage';
import AttendanceSysPage from './pages/AttendanceSysPage';
import AttendancePage from './pages/AttendancePage';
import LogPage from './pages/LogPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
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
