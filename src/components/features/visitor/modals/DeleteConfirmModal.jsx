import React from 'react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, message = 'Are you sure?' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-[90%] max-w-md shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">Confirm delete</h3>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
        <div className="flex items-center justify-end gap-4 p-4 border-t">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
