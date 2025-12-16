import React from 'react';

const ExportLogModal = ({ isOpen, onClose, onConfirm, recordType, recordCount, dateRange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-[90%] max-w-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Export Confirmation</h3>
            <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xl font-bold">!</div>
            </div>
            <div className="flex-1 text-sm text-gray-700 leading-relaxed">
              <p className="mb-2">You are about to export <span className="font-semibold">{recordType}</span> records.</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Record type: <span className="font-medium text-gray-700">{recordType}</span></li>
                <li>Total records: <span className="font-medium text-gray-700">{recordCount}</span></li>
                {dateRange && <li>Date range: <span className="font-medium text-gray-700">{dateRange}</span></li>}
              </ul>
              <p className="mt-3 text-gray-600">Are you sure you want to export these records?</p>
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
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportLogModal;
