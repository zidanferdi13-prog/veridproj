import React, { useEffect, useState } from "react";
import { MainLayout } from "@components";
import {
  EditUserModal,
  AddPersonnelModal,
  CredentialModal,
  ImportModal,
  ExportConfirmModal,
  DeleteConfirmModal,
} from "@components/features/user";
import { Toast } from "@components/common/Toast";
import { RotateCcw, Eye, CreditCard } from "lucide-react";
import axios from "axios";

// ==================== DATA ====================
// const userData = [
//   {
//     id: 1,
//     name: "Andhika",
//     phone: "-",
//     email: "-",
//     group: "Veridface Company",
//     createTime: "2025-12-02",
//     hasCredential: true,
//   },
//   {
//     id: 2,
//     name: "Naz",
//     phone: "-",
//     email: "naz@gmail.com",
//     group: "Veridface Company",
//     createTime: "2025-09-15",
//     hasCredential: true,
//   },
//   {
//     id: 3,
//     name: "Iswa",
//     phone: "-",
//     email: "vin@gmail.com",
//     group: "Veridface Company",
//     createTime: "2025-09-15",
//     hasCredential: true,
//   },
//   {
//     id: 4,
//     name: "Kiayi Khalis",
//     phone: "-",
//     email: "khalis@gmail.com",
//     group: "Veridface Company",
//     createTime: "2025-09-15",
//     hasCredential: true,
//   },
// ];

// ==================== MAIN COMPONENT ====================
const UserPage = () => {
  // ========== STATE ==========
  const [selectedCompany, setSelectedCompany] = useState("Veridface Company");
  const [filters, setFilters] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCredentialModalOpen, setIsCredentialModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("face");
  const [importFiles, setImportFiles] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    group: "",
    admin: false,
    permission: "",
    note: "",
  });
  const [credentialData, setCredentialData] = useState({
    faceImage: null,
    cardId: "",
    userPassword: "",
    qrCode: null,
  });

  const [dataUser, setDataUser] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [isDeleteUser, setIsDeleteUser] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setFilteredUser(dataUser);
  }, [dataUser]);

  // const api = "http://localhost:3000/";
  const api = import.meta.env.VITE_API_URL;

  // ========== API CALLS ==========

  const getUser = async () => {
    try {
      const res = await axios.get(`${api}user/userdata`);
      console.log("resss", res.data.data);
      setDataUser(res.data.data);
    } catch (error) {
      console.log("Errorrrr ====", error);
    }
  };

  // ========== EVENT HANDLERS ==========
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    const { name, phone, email } = filters;

    const filtered = dataUser.filter((user) => {
      const matchName =
        !name || user.name?.toLowerCase().includes(name.toLowerCase());

      const matchPhone =
        !phone || user.mobile?.toLowerCase().includes(phone.toLowerCase());

      const matchEmail =
        !email || user.email?.toLowerCase().includes(email.toLowerCase());

      return matchName && matchPhone && matchEmail;
    });

    setFilteredUser(filtered);
  };

  const handleResetFilter = () => {
    setFilters({
      name: "",
      phone: "",
      email: "",
    });

    setFilteredUser(dataUser);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(dataUser.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Edit Modal Handlers
  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.name || "",
      phone: user.phone || "",
      email: user.email || "",
      password: "123456",
      group: user.group || "Veridface Company",
      admin: user.isadmin === 1 ? 1 : 0,
      permission: "",
      note: user.note || "",
    });
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  const handleConfirm = () => {
    console.log("Saving user data:", formData);
    handleCloseModal();
    // Reload
    getUser();
  };

  // Add Personnel Modal Handlers
  const handleAddPersonnelClick = () => {
    setFormData({
      username: "",
      phone: "",
      email: "",
      password: "123456",
      group: "Veridface Company",
      admin: false,
      note: "",
    });
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  //add user
  const handleAddConfirm = async () => {
    const addUserPayload = {
      username: formData.username,
      phone: formData.phone,
      email: formData.email,
      group_name: formData.group,
      isadmin: formData.admin ? 1 : 0,
      note: formData.note || "",
    };
    console.log("payload add ===", addUserPayload);

    setIsLoading(true);
    try {
      console.log("Sending add user payload:", addUserPayload);

      const res = await axios.post(
        `${api}user/userdata/adduser`,
        addUserPayload
      );

      console.log("User berhasil ditambahkan:", res.data);
      setToast({ message: "User berhasil ditambahkan!", type: "success" });

      handleCloseAddModal();
      getUser();
    } catch (error) {
      console.error("Error adding user:", error);
      setToast({
        message:
          "Gagal menambahkan user: " +
          (error.response?.data?.message || error.message),
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
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
    console.log("Importing files:", importFiles);
    handleCloseImportModal();
  };

  // Export Modal Handlers
  const handleExportClick = () => {
    setIsExportModalOpen(true);
  };

  const handleCloseExportModal = () => {
    setIsExportModalOpen(false);
  };

  const handleExportConfirm = async () => {
    try {
      const response = await axios.get(`${api}user/userdata/exportuser`, {
        responseType: "blob", 
      });

      // Buat file dari response
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      // Trigger download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users.csv");
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);

      setToast({
        message: "Export data berhasil",
        type: "success",
      });
    } catch (error) {
      console.error("Export error:", error);
      setToast({
        message:
          "Gagal export data: " +
          (error.response?.data?.message || error.message),
        type: "error",
      });
    } finally {
      handleCloseExportModal();
    }
  };

  // Delete Modal Handlers
  const handleDeleteClick = () => {
    if (selectedUsers.length === 0) {
      alert("Please select users to delete");
      return;
    }
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    console.log("selectedUsers:", selectedUsers);

    setIsDeleteUser(true);
    try {
      await Promise.all(
        selectedUsers.map((id) =>
          axios.post(`${api}user/userdata/delete`, { id })
        )
      );

      setSelectedUsers([]);
      handleCloseDeleteModal();
      getUser?.(); // refresh data
    } catch (error) {
      console.error("Error deleting users:", error);
      alert(
        "Gagal menghapus data: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setIsDeleteUser(false);
    }
  };

  // Credential Modal Handlers
  const handleCredentialClick = (user) => {
    console.log("USER:", user);

    setEditingUser(user);
    setActiveTab("face");

    setCredentialData({
      faceImage: user.photo_url ?? null,
      cardId: user.access_card_number ?? "no value",
      userPassword: "",
      qrCode: null,
    });

    setIsCredentialModalOpen(true);
  };

  const handleCloseCredentialModal = () => {
    setIsCredentialModalOpen(false);
    setEditingUser(null);
    setActiveTab("face");
  };

  const handleFileUpload = (type, file) => {
    setCredentialData((prev) => ({ ...prev, [type]: file }));
  };

  const handleCredentialChange = (field, value) => {
    setCredentialData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCredentialConfirm = async () => {
    if (!editingUser) return;

    const payload = {
      id: editingUser.id,
      idimage: null,
      idcard: credentialData.cardId || null,
      password: credentialData.userPassword || null,
      idcode: null,
    };

    try {
      await axios.post(`${api}user/userdata/addauth`, payload);

      setToast({
        message: "Credential berhasil disimpan",
        type: "success",
      });

      handleCloseCredentialModal();
      getUser(); // refresh data
    } catch (error) {
      setToast({
        message:
          "Gagal menyimpan credential: " +
          (error.response?.data?.message || error.message),
        type: "error",
      });
    }
  };

  const dateFormat = (isoDate) => {
    const date = new Date(isoDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // ========== RENDER ==========

  return (
    <>
      <MainLayout>
        {/* Filters */}
        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Please enter"
                value={filters.name}
                onChange={(e) => handleFilterChange("name", e.target.value)}
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
                onChange={(e) => handleFilterChange("phone", e.target.value)}
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
                onChange={(e) => handleFilterChange("email", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2"
            >
              <span>🔍</span>
              Search
            </button>

            <button
              onClick={handleResetFilter}
              className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
            >
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
                      checked={selectedUsers.length === dataUser.length}
                      className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                    Name
                  </th>
                  <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                    Phone
                  </th>
                  <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                    Email
                  </th>
                  <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                    Group
                  </th>
                  <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                    Create time
                  </th>
                  <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                    Credential
                  </th>
                  <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                    Operation
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUser?.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-4 px-6 text-gray-700">{user.name}</td>
                    <td className="py-4 px-6 text-gray-500">{user.mobile}</td>
                    <td className="py-4 px-6 text-gray-700">{user.email}</td>
                    <td className="py-4 px-6 text-gray-700">
                      {user.group_name}
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      {dateFormat(user.created_at)}
                    </td>
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

        {/* Modals */}
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          formData={formData}
          onFormChange={handleFormChange}
          onConfirm={handleConfirm}
          editingUser={editingUser}
          onError={(msg) => setToast({ message: msg, type: "error" })}
        />

        <AddPersonnelModal
          isOpen={isAddModalOpen}
          onClose={handleCloseAddModal}
          formData={formData}
          onFormChange={handleFormChange}
          onConfirm={handleAddConfirm}
          isLoading={isLoading}
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
          isLoading={isDeleteUser}
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
      </MainLayout>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default UserPage;
