import React from 'react';

const ExportConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-[90%] max-w-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Note</h3>
            <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xl font-bold">!</div>
            </div>
            <div className="flex-1 text-sm text-gray-700 leading-relaxed">
              {message}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 p-6 border-t">
          <button
            onClick={onClose}
            className="px-8 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm && onConfirm(); onClose(); }}
            className="px-8 py-2 bg-blue-400 text-white rounded hover:bg-blue-500"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportConfirmModal;
