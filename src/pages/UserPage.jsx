import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Upload, UserPlus, FileSpreadsheet, Download, Trash2, RotateCcw, Eye, CreditCard, X } from 'lucide-react';

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

// ==================== MODAL COMPONENTS ====================
const EditUserModal = ({ isOpen, onClose, formData, onFormChange, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Mengedit personel</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="flex items-start gap-4">
            <label className="w-32 pt-2 text-gray-700 font-medium">
              <span className="text-red-500">*</span> Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => onFormChange('username', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-start gap-4">
            <label className="w-32 pt-2 text-gray-700 font-medium">Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => onFormChange('phone', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
          </div>

          <div className="flex items-start gap-4">
            <label className="w-32 pt-2 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Please enter"
              value={formData.email}
              onChange={(e) => onFormChange('email', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-start gap-4">
            <label className="w-32 pt-2 text-gray-700 font-medium">Password</label>
            <div className="flex-1">
              <p className="text-gray-500 text-sm">Initial password:: {formData.password}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <label className="w-32 pt-2 text-gray-700 font-medium">Group</label>
            <select
              value={formData.group}
              onChange={(e) => onFormChange('group', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Veridface Company</option>
            </select>
          </div>

          <div className="flex items-start gap-4">
            <label className="w-32 pt-2 text-gray-700 font-medium">Admin</label>
            <input
              type="checkbox"
              checked={formData.admin}
              onChange={(e) => onFormChange('admin', e.target.checked)}
              className="mt-2 w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
            />
          </div>

          <div className="flex items-start gap-4">
            <label className="w-32 pt-2 text-gray-700 font-medium">Note</label>
            <textarea
              placeholder="Please enter"
              value={formData.note}
              onChange={(e) => onFormChange('note', e.target.value)}
              rows={4}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-8 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-8 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const AddPersonnelModal = ({ isOpen, onClose, formData, onFormChange, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Menambahkan personel baru</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="flex items-start gap-4">
            <label className="w-32 pt-2 text-gray-700 font-medium">
              <span className="text-red-500">*</span> Username
            </label>
            <input
              type="text"
              placeholder="Please enter"
              value={formData.username}
              onChange={(e) => onFormChange('username', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="flex items-start gap-4">
            <label className="w-32 pt-2 text-gray-700 font-medium">Phone</label>
            <input
              type="text"
              placeholder="Please enter"
              value={formData.phone}
              onChange={(e) => onFormChange('phone', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="flex items-start gap-4">
            <label className="w-32 pt-2 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Please enter"
              value={formData.email}
              onChange={(e) => onFormChange('email', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="flex items-start gap-4">
            <label className="w-32 pt-2 text-gray-700 font-medium">Password</label>
            <div className="flex-1">
              <p className="text-gray-500 text-sm pt-2">Initial password:: {formData.password}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <label className="w-32 pt-2 text-gray-700 font-medium">Group</label>
            <select
              value={formData.group}
              onChange={(e) => onFormChange('group', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-500"
            >
              <option value="">Select</option>
              <option>Veridface Company</option>
            </select>
          </div>

          <div className="flex items-start gap-4">
            <label className="w-32 pt-2 text-gray-700 font-medium">Admin</label>
            <input
              type="checkbox"
              checked={formData.admin}
              onChange={(e) => onFormChange('admin', e.target.checked)}
              className="mt-2 w-4 h-4 text-cyan-500 rounded focus:ring-cyan-500"
            />
          </div>

          <div className="flex items-start gap-4">
            <label className="w-32 pt-2 text-gray-700 font-medium">Permission</label>
            <input
              type="text"
              placeholder="Please enter the name of the permission group"
              value={formData.permission}
              onChange={(e) => onFormChange('permission', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="flex items-start gap-4">
            <label className="w-32 pt-2 text-gray-700 font-medium">Note</label>
            <textarea
              placeholder="Please enter"
              value={formData.note}
              onChange={(e) => onFormChange('note', e.target.value)}
              rows={4}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-8 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-8 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const CredentialModal = ({ 
  isOpen, 
  onClose, 
  activeTab, 
  setActiveTab, 
  credentialData, 
  onFileUpload, 
  onCredentialChange, 
  onConfirm 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">Manajemen Kredensial</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          {['face', 'card', 'password', 'qrcode'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === tab
                  ? 'text-cyan-500 border-b-2 border-cyan-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'face' ? 'Face' : tab === 'card' ? 'Card' : tab === 'password' ? 'Password' : 'QR code'}
            </button>
          ))}
        </div>

        <div className="p-8">
          {activeTab === 'face' && (
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6 border-2 border-dashed border-gray-300">
                {credentialData.faceImage ? (
                  <img
                    src={URL.createObjectURL(credentialData.faceImage)}
                    alt="Face"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-6xl text-gray-400 mb-2">+</div>
                    <p className="text-gray-400 text-sm">Upload Face Image</p>
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => onFileUpload('faceImage', null)}
                  className="px-6 py-2 bg-white border border-red-300 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium"
                >
                  Delete
                </button>
                <label className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium cursor-pointer">
                  Download
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onFileUpload('faceImage', e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          {activeTab === 'card' && (
            <div className="flex flex-col items-center">
              <div className="w-full max-w-md mb-6">
                <label className="block text-gray-700 font-medium mb-2">Card ID / RFID Number</label>
                <input
                  type="text"
                  placeholder="Enter card ID or scan RFID"
                  value={credentialData.cardId}
                  onChange={(e) => onCredentialChange('cardId', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => onCredentialChange('cardId', '')}
                  className="px-6 py-2 bg-white border border-red-300 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium"
                >
                  Clear
                </button>
                <button className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium">
                  Scan Card
                </button>
              </div>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="flex flex-col items-center">
              <div className="w-full max-w-md mb-6">
                <label className="block text-gray-700 font-medium mb-2">User Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={credentialData.userPassword}
                  onChange={(e) => onCredentialChange('userPassword', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <p className="text-gray-500 text-sm mt-2">Minimum 6 characters</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => onCredentialChange('userPassword', '')}
                  className="px-6 py-2 bg-white border border-red-300 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium"
                >
                  Clear
                </button>
                <button className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium">
                  Generate Random
                </button>
              </div>
            </div>
          )}

          {activeTab === 'qrcode' && (
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6 border-2 border-dashed border-gray-300">
                {credentialData.qrCode ? (
                  <img
                    src={URL.createObjectURL(credentialData.qrCode)}
                    alt="QR Code"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-6xl text-gray-400 mb-2">+</div>
                    <p className="text-gray-400 text-sm">Upload QR Code</p>
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => onFileUpload('qrCode', null)}
                  className="px-6 py-2 bg-white border border-red-300 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium"
                >
                  Delete
                </button>
                <label className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium cursor-pointer">
                  Download
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onFileUpload('qrCode', e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-8 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-8 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const ImportModal = ({ isOpen, onClose, files, onFilesDrop, onFilesSelect, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Import Information</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Buttons */}
          <div className="flex gap-3 mb-6">
            <button className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">
              Template download
            </button>
          </div>

          {/* Upload Area */}
          <div 
            onDrop={onFilesDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById('import-file-input').click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 mb-6 text-center hover:border-cyan-400 transition-colors cursor-pointer"
          >
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 mb-4 text-gray-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                  <path d="M9 15l3 -3l3 3" />
                  <path d="M12 12l0 9" />
                </svg>
              </div>
              <p className="text-gray-700 mb-2">
                Drag and drop the file here or <span className="text-cyan-500">click to upload</span>
              </p>
            </div>
          </div>
          <input
            id="import-file-input"
            type="file"
            multiple
            accept=".csv,.zip"
            onChange={onFilesSelect}
            className="hidden"
          />

          {/* Files List */}
          {files.length > 0 && (
            <div className="mb-6 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-2">Selected Files:</h3>
              <ul className="space-y-2">
                {files.map((file, index) => (
                  <li key={index} className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded">
                    <span className="truncate">{file.name}</span>
                    <span className="text-gray-400 ml-2">{(file.size / 1024).toFixed(2)} KB</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-8 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={files.length === 0}
            className={`px-8 py-2 rounded-lg transition-colors font-medium ${
              files.length > 0
                ? 'bg-cyan-500 text-white hover:bg-cyan-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

const ExportConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Export Data Confirmation</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-700 text-center mb-2">
            Are you sure you want to export user data?
          </p>
          <p className="text-gray-500 text-sm text-center">
            This will download all user information to a CSV file.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-8 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-8 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

// Delete Confirmation Modal Component
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, selectedCount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Delete Confirmation</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-700 text-center mb-2">
            Are you sure you want to delete {selectedCount} selected user(s)?
          </p>
          <p className="text-gray-500 text-sm text-center">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-8 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-8 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

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
          {/* Company Selector */}
          {/* <div className="mb-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200 inline-block">
              <div className="flex items-center gap-3">
                <span className="text-blue-600 font-semibold">All personnel</span>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Veridface Company</option>
                  </select>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <span className="text-gray-600">...</span>
                  </button>
                </div>
              </div>
            </div>
          </div> */}

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
                          {/* <button className="text-blue-500 hover:text-blue-600 font-medium text-sm text-left">
                            Permission Query
                          </button> */}
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
