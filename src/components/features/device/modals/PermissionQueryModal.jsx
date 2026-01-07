import React from "react";
import { Modal } from "@components/common/Modal";

const PermissionQueryModal = ({
  isOpen,
  onClose,
  permissions = [],
  loading = false,
  deviceName = "Device",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Izin akses personel - ${deviceName}`}
      maxWidth="max-w-3xl"
      maxHeight="max-h-[80vh]"
    >
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-3 px-4 text-center">Name</th>
                <th className="py-3 px-4 text-center">Phone</th>
                <th className="py-3 px-4 text-center">Email</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="py-6 text-center text-gray-500">
                    Loading permission data...
                  </td>
                </tr>
              ) : permissions.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-6 text-center text-gray-500">
                    Tidak ada data permission
                  </td>
                </tr>
              ) : (
                permissions.map((p, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4 text-center">{p.name || "-"}</td>
                    <td className="py-3 px-4 text-center">{p.phone || "-"}</td>
                    <td className="py-3 px-4 text-center">{p.email || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};

export default PermissionQueryModal;
