import React from "react";
import { Modal, ModalFooter } from "@components/common/Modal";

const AddPersonnelModal = ({
  isOpen,
  onClose,
  formData,
  onFormChange,
  onConfirm,
  isLoading = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Person"
      maxWidth="max-w-2xl"
      maxHeight="max-h-[85vh]"
      footer={
        <ModalFooter
          onCancel={onClose}
          onConfirm={onConfirm}
          cancelText="Cancel"
          confirmText="Confirm"
          isLoading={isLoading}
        />
      }
    >
      <div className="p-6 space-y-4 overflow-y-auto">
        <div className="flex items-start gap-4">
          <label className="w-32 pt-2 text-gray-700 font-medium">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Please enter"
            value={formData.username}
            onChange={(e) => onFormChange("username", e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="flex items-start gap-4">
          <label className="w-32 pt-2 text-gray-700 font-medium">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Please enter"
            value={formData.mobile}
            onChange={(e) => onFormChange("phone", e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="flex items-start gap-4">
          <label className="w-32 pt-2 text-gray-700 font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="Please enter"
            value={formData.email}
            onChange={(e) => onFormChange("email", e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="flex items-start gap-4">
          <label className="w-32 pt-2 text-gray-700 font-medium">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="flex-1">
            <p className="text-gray-500 text-sm pt-2">
              Initial password:: {formData.password}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <label className="w-32 pt-2 text-gray-700 font-medium">
            Group <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.group || ""}
            onChange={(e) => onFormChange("group", e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-700"
          >
            <option disabled value="">-- Select Group --</option>
            <option value="Veridface Company">Veridface Company</option>
          </select>
        </div>

        <div className="flex items-start gap-4">
          <label className="w-32 pt-2 text-gray-700 font-medium">
            Admin <span className="text-red-500">*</span>
          </label>
          <input
            type="checkbox"
            checked={formData.admin}
            onChange={(e) => onFormChange("admin", e.target.checked)}
            className="mt-2 w-4 h-4 text-cyan-500 rounded focus:ring-cyan-500"
          />
        </div>


        <div className="flex items-start gap-4">
          <label className="w-32 pt-2 text-gray-700 font-medium">
            Note <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Please enter"
            value={formData.note}
            onChange={(e) => onFormChange("note", e.target.value)}
            rows={4}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddPersonnelModal;
