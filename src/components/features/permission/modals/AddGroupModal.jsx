import React from 'react';
import { X } from 'lucide-react';

const AddGroupModal = ({ isOpen, onClose, groupName, onGroupNameChange, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Add Permission Group Name</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4">
            <label className="w-32 text-gray-700 font-medium">
              Group Name
            </label>
            <input
              type="text"
              placeholder="Please enter"
              value={groupName}
              onChange={(e) => onGroupNameChange(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="px-8 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGroupModal;
