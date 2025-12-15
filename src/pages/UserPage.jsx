import React, { useState } from 'react';
import { Sidebar, Header } from '@components';
import { EditUserModal, AddPersonnelModal, CredentialModal, ImportModal, ExportConfirmModal, DeleteConfirmModal } from '@components/features/user';
import { RotateCcw, Eye, CreditCard } from 'lucide-react';

// ==================== DATA ====================
const userData = [
  {
    id: 1,
    name: 'Andhika',
    phone: '-',
    email: '-',
    group: 'Veridface Company',
    createTime: '2025-12-02',
    hasCredential: true,
  },
  {
    id: 2,
    name: 'Naz',
    phone: '-',
    email: 'naz@gmail.com',
    group: 'Veridface Company',
    createTime: '2025-09-15',
    hasCredential: true,
  },
  {
    id: 3,
    name: 'Iswa',
    phone: '-',
    email: 'vin@gmail.com',
    group: 'Veridface Company',
    createTime: '2025-09-15',
    hasCredential: true,
  },
  {
    id: 4,
    name: 'Kiayi Khalis',
    phone: '-',
    email: 'khalis@gmail.com',
    group: 'Veridface Company',
    createTime: '2025-09-15',
    hasCredential: true,
  },
];

// ==================== MAIN COMPONENT ====================
const UserPage = () => {
  // ========== STATE ==========
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('Veridface Company');
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
  const [activeTab, setActiveTab] = useState('face');
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

  // ========== EVENT HANDLERS ==========
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(userData.map(user => user.id));
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

  // Edit Modal Handlers
  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.name,
      phone: user.phone,
      email: user.email,
      password: '123456',
      group: user.group,
      admin: false,
      permission: '',
      note: '',
    });
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  const handleConfirm = () => {
    console.log('Saving user data:', formData);
    handleCloseModal();
  };

  // Add Personnel Modal Handlers
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

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddConfirm = () => {
    console.log('Adding new personnel:', formData);
    handleCloseAddModal();
  };

  // Import Modal Handlers
  const handleImportClick = () => {
    setImportFiles([]);
    setIsImportModalOpen(true);
  };

  const handleCloseImportModal = () => {
    setIsImportModalOpen(false);
    setImportFiles([]);
  };

  const handleFilesDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setImportFiles(files);
  };

  const handleFilesSelect = (e) => {
    const files = Array.from(e.target.files);
    setImportFiles(files);
  };

  const handleImportConfirm = () => {
    console.log('Importing files:', importFiles);
    handleCloseImportModal();
  };

  // Export Modal Handlers
  const handleExportClick = () => {
    setIsExportModalOpen(true);
  };

  const handleCloseExportModal = () => {
    setIsExportModalOpen(false);
  };

  const handleExportConfirm = () => {
    console.log('Exporting user data...');
    // Logic untuk export data ke CSV/Excel
    handleCloseExportModal();
  };

  // Delete Modal Handlers
  const handleDeleteClick = () => {
    if (selectedUsers.length === 0) {
      alert('Please select users to delete');
      return;
    }
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting users:', selectedUsers);
    // Logic untuk delete selected users
    setSelectedUsers([]);
    handleCloseDeleteModal();
  };

  // Credential Modal Handlers
  const handleCredentialClick = (user) => {
    setEditingUser(user);
    setActiveTab('face');
    setCredentialData({
      faceImage: null,
      cardId: '',
      userPassword: '',
      qrCode: null,
    });
    setIsCredentialModalOpen(true);
  };

  const handleCloseCredentialModal = () => {
    setIsCredentialModalOpen(false);
    setEditingUser(null);
    setActiveTab('face');
  };

  const handleFileUpload = (type, file) => {
    setCredentialData(prev => ({ ...prev, [type]: file }));
  };

  const handleCredentialChange = (field, value) => {
    setCredentialData(prev => ({ ...prev, [field]: value }));
  };

  const handleCredentialConfirm = () => {
    console.log('Saving credential data:', credentialData);
    handleCloseCredentialModal();
  };

  // ========== RENDER ==========

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 ${isCollapsed ? 'ml-20' : 'ml-64'} flex flex-col overflow-hidden transition-all duration-300`}>
        <Header />
        
        <main className="flex-1 overflow-y-auto p-8">
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
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2">
                <span>🔍</span>
                Search
              </button>
              <button className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2">
                <RotateCcw size={16} />
                Reset
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-6 flex flex-wrap gap-3">
            <button 
              onClick={handleAddPersonnelClick}
              className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium border border-green-200"
            >
              + Add New 
            </button>
            <button 
              onClick={handleImportClick}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium border border-blue-200"
            >
              Import Data
            </button>
            <button 
              onClick={handleExportClick}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium border border-blue-200"
            >
              Export Data
            </button>
            <button 
              onClick={handleDeleteClick}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium border border-red-200"
            >
              Delete Data
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
                        checked={selectedUsers.length === userData.length}
                        className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                      />
                    </th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Name</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Phone</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Email</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Group</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Create time</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Credential</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleSelectUser(user.id)}
                          className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-4 px-6 text-gray-700">{user.name}</td>
                      <td className="py-4 px-6 text-gray-500">{user.phone}</td>
                      <td className="py-4 px-6 text-gray-700">{user.email}</td>
                      <td className="py-4 px-6 text-gray-700">{user.group}</td>
                      <td className="py-4 px-6 text-gray-700">{user.createTime}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                            <Eye size={18} className="text-blue-500" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                            <CreditCard size={18} className="text-gray-400" />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1">
                          <button 
                            onClick={() => handleEditClick(user)}
                            className="text-blue-500 hover:text-blue-600 font-medium text-sm text-left"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleCredentialClick(user)}
                            className="text-blue-500 hover:text-blue-600 font-medium text-sm text-left"
                          >
                            Credential Management
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
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          formData={formData}
          onFormChange={handleFormChange}
          onConfirm={handleConfirm}
        />

        <AddPersonnelModal
          isOpen={isAddModalOpen}
          onClose={handleCloseAddModal}
          formData={formData}
          onFormChange={handleFormChange}
          onConfirm={handleAddConfirm}
        />

        <ImportModal
          isOpen={isImportModalOpen}
          onClose={handleCloseImportModal}
          files={importFiles}
          onFilesDrop={handleFilesDrop}
          onFilesSelect={handleFilesSelect}
          onConfirm={handleImportConfirm}
        />

        <ExportConfirmModal
          isOpen={isExportModalOpen}
          onClose={handleCloseExportModal}
          onConfirm={handleExportConfirm}
        />

        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDeleteConfirm}
          selectedCount={selectedUsers.length}
        />

        <CredentialModal
          isOpen={isCredentialModalOpen}
          onClose={handleCloseCredentialModal}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          credentialData={credentialData}
          onFileUpload={handleFileUpload}
          onCredentialChange={handleCredentialChange}
          onConfirm={handleCredentialConfirm}
        />
      </div>
    </div>
  );
};

export default UserPage;
