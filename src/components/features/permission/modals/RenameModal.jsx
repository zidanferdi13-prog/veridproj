import React, { useState, useEffect } from 'react';

const RenameModal = ({ isOpen, onClose, currentName = '', onConfirm }) => {
  const [name, setName] = useState(currentName);

  useEffect(() => {
    setName(currentName);
  }, [currentName, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/40">
      <div className="bg-white rounded-lg w-[90%] max-w-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-2xl font-semibold">Rename</h3>
        </div>
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Group Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Please enter"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex items-center justify-center gap-4 p-6 border-t">
          <button
            onClick={onClose}
            className="px-8 py-2 border border-gray-300 rounded bg-white"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(name)}
            className="px-8 py-2 bg-blue-400 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenameModal;
