import React, { useState, useEffect } from 'react';

const AdjustTimeModal = ({ isOpen, onClose, onConfirm, initial }) => {
  const [type, setType] = useState((initial && initial.type) || 'permanent');

  useEffect(() => {
    if (!isOpen) return;
    setType((initial && initial.type) || 'permanent');
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 bg-black/40">
      <div className="bg-white rounded-lg w-[90%] max-w-3xl shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-2xl font-semibold">Adjust time</h3>
        </div>
        <div className="p-8">
          <div className="mb-6">
            <div className="text-gray-700 mb-3">Effective type</div>
            <label className="flex items-center gap-3 text-cyan-600">
              <input type="radio" name="effect" value="permanent" checked={type === 'permanent'} onChange={() => setType('permanent')} />
              <span>Permanent effect</span>
            </label>
            <label className="flex items-center gap-3 mt-3 text-gray-700">
              <input type="radio" name="effect" value="period" checked={type === 'period'} onChange={() => setType('period')} />
              <span>Custom period</span>
            </label>
            {type === 'period' && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <input type="date" className="px-3 py-2 border rounded" />
                <input type="date" className="px-3 py-2 border rounded" />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 p-6 border-t">
          <button onClick={onClose} className="px-8 py-2 border border-gray-300 rounded bg-white">Cancel</button>
          <button onClick={() => onConfirm({ type })} className="px-8 py-2 bg-blue-400 text-white rounded">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default AdjustTimeModal;
