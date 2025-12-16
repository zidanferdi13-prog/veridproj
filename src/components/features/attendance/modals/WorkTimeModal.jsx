import React, { useEffect, useState } from 'react';

const WorkTimeModal = ({ isOpen, onClose, onConfirm, initialStart, initialEnd }) => {
  const [startTime, setStartTime] = useState(initialStart || '');
  const [endTime, setEndTime] = useState(initialEnd || '');

  useEffect(() => {
    if (isOpen) {
      setStartTime(initialStart || '');
      setEndTime(initialEnd || '');
    }
  }, [isOpen, initialStart, initialEnd]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/40">
      <div className="bg-white rounded-lg w-[90%] max-w-4xl shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Work time settings</h3>
            <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-6">
            <label className="w-28 text-sm font-medium text-gray-700">Work time</label>
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-3 flex-1">
                <span className="text-gray-400">🕐</span>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-700 focus:outline-none"
                  placeholder="Please set the start time"
                />
              </div>

              <span className="text-gray-400">-</span>

              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-3 flex-1">
                <span className="text-gray-400">🕐</span>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-700 focus:outline-none"
                  placeholder="Please set the end time"
                />
              </div>
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
            onClick={() => { onConfirm && onConfirm({ startTime, endTime }); onClose(); }}
            className="px-8 py-2 bg-blue-400 text-white rounded hover:bg-blue-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkTimeModal;
