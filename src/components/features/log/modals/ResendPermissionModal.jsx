import React, { useState, useEffect } from 'react';

const ResendPermissionModal = ({ isOpen, onClose, onConfirm, selectedRecords = [] }) => {
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (isOpen) {
      setReason('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/40">
      <div className="bg-white rounded-lg w-[90%] max-w-3xl shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Resend Permission</h3>
            <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="text-blue-500 text-xl">ℹ️</div>
              <div className="flex-1 text-sm text-blue-700">
                <p className="font-medium mb-1">About Resend Permission</p>
                <p>This action will resend authorization permissions to the selected devices or users. Please provide a reason for this action.</p>
              </div>
            </div>
          </div>

          {selectedRecords.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selected Records ({selectedRecords.length})
              </label>
              <div className="max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
                {selectedRecords.map((record, index) => (
                  <div key={index} className="text-sm text-gray-600 py-1">
                    • {record.device || record.name || `Record ${index + 1}`}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please enter the reason for resending permission..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
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
            onClick={() => {
              if (reason.trim()) {
                onConfirm && onConfirm(reason);
                onClose();
              } else {
                alert('Please provide a reason');
              }
            }}
            className="px-8 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!reason.trim()}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResendPermissionModal;
