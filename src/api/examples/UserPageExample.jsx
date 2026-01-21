/**
 * UserPage API Integration Example
 * This file demonstrates how to integrate GET and POST API calls into UserPage
 * 
 * Key concepts shown:
 * 1. GET request to fetch users on component mount
 * 2. GET request with filters for search
 * 3. POST request to create a new user
 * 4. PUT request to update an existing user
 * 5. DELETE request to delete users
 * 6. POST request with FormData for file uploads (import)
 * 7. Error handling and loading states
 */

import React, { useState, useEffect } from 'react';
import { Sidebar, Header } from '@components';
import { EditUserModal, AddPersonnelModal, CredentialModal, ImportModal, ExportConfirmModal, DeleteConfirmModal } from '@components/features/user';
import { RotateCcw } from 'lucide-react';
import { userService } from '@api';

const UserPageExample = () => {
  // ========== STATE ==========
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCredentialModalOpen, setIsCredentialModalOpen] = useState(false);
  const [importFiles, setImportFiles] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    group: '',
    admin: false,
    permission: '',
    note: '',
  });
  const [credentialData, setCredentialData] = useState({
    faceImage: null,
    cardId: '',
    userPassword: '',
    qrCode: null,
  });

  // ========== API STATE ==========
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ========== GET REQUEST - Fetch users on mount and when filters change ==========
  useEffect(() => {
    fetchUsers();
  }, []); // Fetch on mount

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // GET request with filters
      const response = await userService.getUsers(filters, { page: 1, limit: 20 });
      
      // Handle different response formats
      // If response has a data property (common in paginated responses)
      if (response.data) {
        setUsers(response.data);
      } else if (Array.isArray(response)) {
        setUsers(response);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setError(err.message || 'Failed to load users');
      // Optionally show error toast/notification
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ========== GET REQUEST - Search users with filters ==========
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // GET request with query parameters
      const response = await userService.getUsers(filters, { page: 1, limit: 20 });
      
      if (response.data) {
        setUsers(response.data);
      } else if (Array.isArray(response)) {
        setUsers(response);
      }
    } catch (err) {
      console.error('Search failed:', err);
      setError(err.message);
      alert(`Search error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ========== POST REQUEST - Create new user ==========
  const handleAddConfirm = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // POST request to create user
      const newUser = await userService.createUser({
        username: formData.username,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        group: formData.group,
        admin: formData.admin,
        permission: formData.permission,
        note: formData.note,
      });
      
      console.log('User created successfully:', newUser);
      
      // Refresh the user list
      await fetchUsers();
      
      // Close modal and reset form
      setIsAddModalOpen(false);
      setFormData({
        username: '',
        phone: '',
        email: '',
        password: '123456',
        group: 'Veridface Company',
        admin: false,
        permission: '',
        note: '',
      });
      
      // Show success message
      alert('User created successfully!');
    } catch (err) {
      console.error('Failed to create user:', err);
      setError(err.message);
      alert(`Error creating user: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ========== PUT REQUEST - Update existing user ==========
  const handleConfirm = async () => {
    if (!editingUser) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // PUT request to update user
      const updatedUser = await userService.updateUser(editingUser.id, {
        username: formData.username,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        group: formData.group,
        admin: formData.admin,
        permission: formData.permission,
        note: formData.note,
      });
      
      console.log('User updated successfully:', updatedUser);
      
      // Refresh the user list
      await fetchUsers();
      
      // Close modal
      setIsEditModalOpen(false);
      setEditingUser(null);
      
      alert('User updated successfully!');
    } catch (err) {
      console.error('Failed to update user:', err);
      setError(err.message);
      alert(`Error updating user: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ========== DELETE REQUEST - Delete multiple users ==========
  const handleDeleteConfirm = async () => {
    if (selectedUsers.length === 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // DELETE request - bulk delete
      await userService.deleteUsers(selectedUsers);
      
      console.log('Users deleted successfully');
      
      // Refresh the user list
      await fetchUsers();
      
      // Clear selection
      setSelectedUsers([]);
      setIsDeleteModalOpen(false);
      
      alert(`${selectedUsers.length} user(s) deleted successfully!`);
    } catch (err) {
      console.error('Failed to delete users:', err);
      setError(err.message);
      alert(`Error deleting users: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ========== POST REQUEST with FormData - Import users from file ==========
  const handleImportConfirm = async () => {
    if (importFiles.length === 0) {
      alert('Please select files to import');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // POST request with FormData for file upload
      const result = await userService.importUsers(importFiles);
      
      console.log('Import result:', result);
      
      // Refresh the user list
      await fetchUsers();
      
      // Close modal
      setIsImportModalOpen(false);
      setImportFiles([]);
      
      alert(`Successfully imported ${result.count || 'users'}!`);
    } catch (err) {
      console.error('Failed to import users:', err);
      setError(err.message);
      alert(`Error importing users: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ========== GET REQUEST - Export users ==========
  const handleExportConfirm = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // GET request to export users
      const blob = await userService.exportUsers(filters);
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setIsExportModalOpen(false);
      alert('Export completed successfully!');
    } catch (err) {
      console.error('Failed to export users:', err);
      setError(err.message);
      alert(`Error exporting users: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ========== POST REQUEST with FormData - Update credentials ==========
  const handleCredentialConfirm = async () => {
    if (!editingUser) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // POST request with FormData for file uploads
      await userService.updateCredentials(editingUser.id, credentialData);
      
      console.log('Credentials updated successfully');
      
      // Refresh the user list
      await fetchUsers();
      
      // Close modal
      setIsCredentialModalOpen(false);
      setEditingUser(null);
      
      alert('Credentials updated successfully!');
    } catch (err) {
      console.error('Failed to update credentials:', err);
      setError(err.message);
      alert(`Error updating credentials: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ========== EVENT HANDLERS ==========
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFilters({ name: '', phone: '', email: '' });
    fetchUsers(); // Refetch with cleared filters
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(users.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.name || user.username,
      phone: user.phone,
      email: user.email,
      password: '123456', // Don't send actual password
      group: user.group,
      admin: user.admin || false,
      permission: user.permission || '',
      note: user.note || '',
    });
    setIsEditModalOpen(true);
  };

  const handleAddPersonnelClick = () => {
    setFormData({
      username: '',
      phone: '',
      email: '',
      password: '123456',
      group: 'Veridface Company',
      admin: false,
      permission: '',
      note: '',
    });
    setIsAddModalOpen(true);
  };

  // ========== RENDER ==========
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 ${isCollapsed ? 'ml-20' : 'ml-64'} flex flex-col overflow-hidden transition-all duration-300`}>
        <Header />
        
        <main className="flex-1 overflow-y-auto p-8">
          {/* Loading indicator */}
          {loading && (
            <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-lg">
              Loading...
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
              Error: {error}
            </div>
          )}

          {/* Filters */}
          <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Please enter"
                  value={filters.name}
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="Please enter"
                  value={filters.phone}
                  onChange={(e) => handleFilterChange('phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Please enter"
                  value={filters.email}
                  onChange={(e) => handleFilterChange('email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
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

          {/* Rest of your component JSX... */}
          {/* Table with users data */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="py-4 px-6">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedUsers.length === users.length && users.length > 0}
                        className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                      />
                    </th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Name</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Phone</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Email</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Group</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Create time</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 && !loading && (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  )}
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleSelectUser(user.id)}
                          className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-4 px-6 text-gray-700">{user.name || user.username}</td>
                      <td className="py-4 px-6 text-gray-500">{user.phone || '-'}</td>
                      <td className="py-4 px-6 text-gray-700">{user.email || '-'}</td>
                      <td className="py-4 px-6 text-gray-700">{user.group || '-'}</td>
                      <td className="py-4 px-6 text-gray-700">{user.createTime || user.createdAt || '-'}</td>
                      <td className="py-4 px-6">
                        <button 
                          onClick={() => handleEditClick(user)}
                          className="text-blue-500 hover:text-blue-600 font-medium text-sm"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Modals with API integration */}
        <AddPersonnelModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          formData={formData}
          onFormChange={handleFormChange}
          onConfirm={handleAddConfirm}
        />

        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingUser(null);
          }}
          formData={formData}
          onFormChange={handleFormChange}
          onConfirm={handleConfirm}
        />

        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          selectedCount={selectedUsers.length}
        />

        <ImportModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          files={importFiles}
          onFilesDrop={(e) => {
            e.preventDefault();
            setImportFiles(Array.from(e.dataTransfer.files));
          }}
          onFilesSelect={(e) => {
            setImportFiles(Array.from(e.target.files));
          }}
          onConfirm={handleImportConfirm}
        />

        <ExportConfirmModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          onConfirm={handleExportConfirm}
        />

        <CredentialModal
          isOpen={isCredentialModalOpen}
          onClose={() => {
            setIsCredentialModalOpen(false);
            setEditingUser(null);
          }}
          activeTab="face"
          setActiveTab={() => {}}
          credentialData={credentialData}
          onFileUpload={(type, file) => {
            setCredentialData(prev => ({ ...prev, [type]: file }));
          }}
          onCredentialChange={(field, value) => {
            setCredentialData(prev => ({ ...prev, [field]: value }));
          }}
          onConfirm={handleCredentialConfirm}
        />
      </div>
    </div>
  );
};

export default UserPageExample;

