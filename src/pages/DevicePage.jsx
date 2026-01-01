import React, { useEffect, useState } from "react";
import { Sidebar, Header } from "@components";
import {
  AddDeviceModal,
  ConfigurationModal,
  DeleteConfirmModal,
  RemoteUnlockModal,
  EditDeviceModal,
  PermissionQueryModal,
} from "@components/features/device";
import { useModal, useFilters, useSelection, useFormData } from "@hooks";
import { RotateCcw, X } from "lucide-react";
import { addDevice, deleteDevice, getDevices } from "../utils/api/device";

const DevicePage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [deviceData, setDeviceData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Use custom hooks
  const { filters, handleFilterChange, resetFilters } = useFilters({
    device: "",
    model: "",
    onOff: "",
    status: "",
    sn: "",
    startDate: "",
    endDate: "",
  });

  const {
    selectedItems: selectedDevices,
    toggleSelectAll,
    toggleItem,
    setSelectedItems,
  } = useSelection();

  const addModal = useModal();
  const configModal = useModal();
  const deleteModal = useModal();
  const remoteUnlockModal = useModal();
  const editModal = useModal();
  const permissionQueryModal = useModal();
  const [selectedDevice, setSelectedDevice] = useState(null);

  const {
    formData: deviceFormData,
    handleChange: handleDeviceFormChange,
    resetForm: resetDeviceForm,
    setForm: setDeviceForm,
  } = useFormData({
    sn: "",
    model: "",
    device: "",
    groups: "",
    note: "",
  });

  const {
    formData: editFormData,
    handleChange: handleEditFormChange,
    resetForm: resetEditForm,
    setForm: setEditForm,
  } = useFormData({
    sn: "",
    model: "",
    device: "",
    groups: "",
    note: "",
  });

  const {
    formData: configData,
    handleChange: handleConfigChange,
    resetForm: resetConfigForm,
  } = useFormData({
    ipType: "dynamic",
    ipAddress: "",
    subnetMask: "",
    gateway: "",
    dns: "",
    networkType: "ethernet",
    wifiName: "",
    wifiPassword: "",
  });

  useEffect(() => {
    fetchDevices();
  }, []);
  const fetchDevices = async () => {
    try {
      setLoading(true);
      const res = await getDevices();
      console.log("data device", res);

      setDeviceData(
        res.data.data.map((item) => ({
          id: item.id_device,
          device: item.device_name,
          sn: item.device_sn,
          model: item.device_model,
          type: "Access Control",
          groups: item.device_group || "-",
          onOff: true,
          status: "Offline",
          createTime: item.created_at || "-",
        }))
      );
    } catch (error) {
      console.error("Fetch device error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = (e) => {
    toggleSelectAll(e, deviceData);
  };

  const handleSelectDevice = (deviceId) => {
    toggleItem(deviceId);
  };

  const handleDelete = () => {
    if (selectedDevices.length === 0) {
      alert("Please select devices to delete");
      return;
    }
    deleteModal.open();
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedDevices.length === 0) {
        alert("Pilih device terlebih dahulu");
        return;
      }

      for (const id of selectedDevices) {
        await deleteDevice(id);
      }

      alert("Device berhasil dihapus");

      setSelectedItems([]);
      deleteModal.close();

      // refresh data
      fetchDevices();
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Gagal menghapus device");
    }
  };

  const handleAddDevice = () => {
    resetDeviceForm();
    addModal.open();
  };

  //hit api tambah data device disini
  const handleAddConfirm = async () => {
    try {
      if (
        !deviceFormData.sn ||
        !deviceFormData.model ||
        !deviceFormData.device
      ) {
        alert("SN, Model, dan Device wajib diisi");
        return;
      }

      const payload = {
        device_sn: deviceFormData.sn,
        device_model: deviceFormData.model,
        device_name: deviceFormData.device,
        device_group: deviceFormData.groups || null,
        device_note: deviceFormData.note || null,
        device_location: null,
      };

      console.log("datanya device", payload);

      const res = await addDevice(payload);

      alert("Device berhasil ditambahkan ✅");

      console.log("Response:", res.data);

      addModal.close();
      resetDeviceForm();
      fetchDevices();
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Gagal menambahkan device");
    }
  };

  const handleConfigurationClick = (device) => {
    resetConfigForm();
    configModal.open();
  };

  const handleConfigConfirm = () => {
    console.log("Configuration data:", configData);
    configModal.close();
  };

  const handleGenConfigCode = () => {
    console.log("Generating config code with:", configData);
    alert("Config code generated!");
  };

  const handleRemoteUnlockClick = (device) => {
    setSelectedDevice(device);
    remoteUnlockModal.open();
  };

  const handleRemoteUnlockConfirm = () => {
    console.log("Remote unlock confirmed for:", selectedDevice);
    alert(`Remote unlock successful for ${selectedDevice.device}!`);
  };

  const handleEditClick = (device) => {
    setSelectedDevice(device);
    setEditForm({
      sn: device.sn,
      model: device.model,
      device: device.device,
      groups: device.groups,
      note: device.note || "",
    });
    editModal.open();
  };

  const handleEditConfirm = () => {
    console.log("Editing device:", editFormData);
    alert(`Device ${editFormData.device} updated successfully!`);
    editModal.close();
  };

  const handlePermissionQueryClick = (device) => {
    setSelectedDevice(device);
    permissionQueryModal.open();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div
        className={`flex-1 ${
          isCollapsed ? "ml-20" : "ml-64"
        } flex flex-col overflow-hidden transition-all duration-300`}
      >
        <Header />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex gap-6">
            {/* Main Content */}
            <div className="flex-1">
              {/* Filters */}
              <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                <div className="grid grid-cols-5 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Device
                    </label>
                    <input
                      type="text"
                      placeholder="Please enter"
                      value={filters.device}
                      onChange={(e) =>
                        handleFilterChange("device", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Model
                    </label>
                    <input
                      type="text"
                      placeholder="Please enter"
                      value={filters.model}
                      onChange={(e) =>
                        handleFilterChange("model", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      On/Off
                    </label>
                    <select
                      value={filters.onOff}
                      onChange={(e) =>
                        handleFilterChange("onOff", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Please select</option>
                      <option value="on">On</option>
                      <option value="off">Off</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) =>
                        handleFilterChange("status", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Please select</option>
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SN
                    </label>
                    <input
                      type="text"
                      placeholder="Please enter"
                      value={filters.sn}
                      onChange={(e) => handleFilterChange("sn", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2">
                    <span>🔍</span>
                    Search
                  </button>
                  <button
                    onClick={resetFilters}
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
                  onClick={handleAddDevice}
                  className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium border border-green-200"
                >
                  + Add device
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium border border-red-200"
                >
                  🗑️ Delete
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
                            checked={
                              selectedDevices.length === deviceData.length &&
                              deviceData.length > 0
                            }
                            className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                          />
                        </th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                          Device
                        </th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                          SN
                        </th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                          Model
                        </th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                          Type
                        </th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                          Groups
                        </th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                          On/Off
                        </th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                          Create Time
                        </th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                          Status
                        </th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                          Operation
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {deviceData?.map((device) => (
                        <tr
                          key={device.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <input
                              type="checkbox"
                              checked={selectedDevices.includes(device.id)}
                              onChange={() => handleSelectDevice(device.id)}
                              className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                            />
                          </td>
                          <td className="py-4 px-6 text-gray-700">
                            {device.device}
                          </td>
                          <td className="py-4 px-6 text-gray-700">
                            {device.sn}
                          </td>
                          <td className="py-4 px-6 text-gray-700">
                            {device.model}
                          </td>
                          <td className="py-4 px-6 text-gray-700">
                            {device.type}
                          </td>
                          <td className="py-4 px-6 text-gray-700">
                            {device.groups}
                          </td>
                          <td className="py-4 px-6">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={device.onOff}
                                className="sr-only peer"
                                readOnly
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                          </td>
                          <td className="py-4 px-6 text-gray-700">
                            {device.createTime}
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                device.status === "Offline"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-green-100 text-green-600"
                              }`}
                            >
                              {device.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex flex-col gap-1">
                              <button
                                onClick={() => handleConfigurationClick(device)}
                                className="text-blue-500 hover:text-blue-600 font-medium text-sm text-left"
                              >
                                Configuration
                              </button>
                              <button
                                onClick={() => handleRemoteUnlockClick(device)}
                                className="text-blue-500 hover:text-blue-600 font-medium text-sm text-left"
                              >
                                Remote Unlock
                              </button>
                              <button
                                onClick={() => handleEditClick(device)}
                                className="text-blue-500 hover:text-blue-600 font-medium text-sm text-left"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  handlePermissionQueryClick(device)
                                }
                                className="text-blue-500 hover:text-blue-600 font-medium text-sm text-left"
                              >
                                Permission query
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Total <span className="font-semibold">1</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <select className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>20/page</option>
                      <option>50/page</option>
                      <option>100/page</option>
                    </select>
                    <div className="flex items-center gap-2">
                      <button
                        className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                        disabled
                      >
                        &lt;
                      </button>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded-lg">
                        1
                      </button>
                      <button
                        className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50"
                        disabled
                      >
                        &gt;
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Go to</span>
                      <input
                        type="number"
                        defaultValue={1}
                        className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Add Device Modal */}
        <AddDeviceModal
          isOpen={addModal.isOpen}
          onClose={addModal.close}
          formData={deviceFormData}
          onFormChange={handleDeviceFormChange}
          onConfirm={handleAddConfirm}
        />

        {/* Configuration Modal */}
        <ConfigurationModal
          isOpen={configModal.isOpen}
          onClose={configModal.close}
          configData={configData}
          onConfigChange={handleConfigChange}
          onConfirm={handleConfigConfirm}
          onGenConfigCode={handleGenConfigCode}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.close}
          onConfirm={handleDeleteConfirm}
          selectedCount={selectedDevices.length}
        />

        {/* Remote Unlock Modal */}
        <RemoteUnlockModal
          isOpen={remoteUnlockModal.isOpen}
          onClose={remoteUnlockModal.close}
          onConfirm={handleRemoteUnlockConfirm}
          deviceName={selectedDevice?.device}
        />

        {/* Edit Device Modal */}
        <EditDeviceModal
          isOpen={editModal.isOpen}
          onClose={editModal.close}
          onConfirm={handleEditConfirm}
          formData={editFormData}
          onFormChange={handleEditFormChange}
        />

        {/* Permission Query Modal */}
        <PermissionQueryModal
          isOpen={permissionQueryModal.isOpen}
          onClose={permissionQueryModal.close}
          deviceName={selectedDevice?.device}
        />
      </div>
    </div>
  );
};

export default DevicePage;
