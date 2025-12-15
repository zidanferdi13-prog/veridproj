import React from 'react';
import { Modal, ModalFooter } from '@components/common/Modal';
import { X } from 'lucide-react';

export const AddDeviceModal = ({ isOpen, onClose, formData, onFormChange, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tambahkan perangkat"
      footer={
        <ModalFooter
          onCancel={onClose}
          onConfirm={onConfirm}
          cancelIcon={<X size={18} />}
          confirmIcon={<span>✓</span>}
        />
      }
    >
      <div className="p-6 space-y-4">
        {/* SN */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-right text-gray-700">
            <span className="text-red-500">*</span> SN
          </label>
          <input
            type="text"
            placeholder="Please enter"
            value={formData.sn}
            onChange={(e) => onFormChange('sn', e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Model */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-right text-gray-700">
            <span className="text-red-500">*</span> Model
          </label>
          <select
            value={formData.model}
            onChange={(e) => onFormChange('model', e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="VF104">VF104</option>
            <option value="VF105">VF105</option>
            <option value="VF106">VF106</option>
          </select>
        </div>

        {/* Device */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-right text-gray-700">
            <span className="text-red-500">*</span> Device
          </label>
          <input
            type="text"
            placeholder="Please enter"
            value={formData.device}
            onChange={(e) => onFormChange('device', e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Groups */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-right text-gray-700">Groups</label>
          <select
            value={formData.groups}
            onChange={(e) => onFormChange('groups', e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Please select</option>
            <option value="Ungrouped">Ungrouped</option>
            <option value="Group A">Group A</option>
            <option value="Group B">Group B</option>
          </select>
        </div>

        {/* Note */}
        <div className="flex items-start gap-4">
          <label className="w-32 text-right text-gray-700 pt-2">Note</label>
          <textarea
            placeholder="Please enter"
            value={formData.note}
            onChange={(e) => onFormChange('note', e.target.value)}
            rows={4}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
      </div>
    </Modal>
  );
};
