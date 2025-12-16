import React from 'react';
import { X, AlertCircle } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Reminder</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <AlertCircle size={24} className="text-orange-500" />
              </div>
            </div>
            <p className="text-gray-700 pt-1">
              {message || 'Confirm removing the selected permission group?'}
            </p>
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
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
