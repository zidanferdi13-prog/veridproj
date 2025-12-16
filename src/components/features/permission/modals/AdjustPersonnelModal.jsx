import React, { useState, useEffect } from 'react';

const AdjustPersonnelModal = ({ isOpen, onClose, onConfirm, initialSelected, personnelList = [] }) => {
  const [selected, setSelected] = useState(initialSelected || []);

  useEffect(() => {
    if (!isOpen) return;
    setSelected(initialSelected || []);
  }, [isOpen]);

  const toggle = (id) => {
    setSelected((s) => (s.includes(id) ? s.filter(x => x !== id) : [...s, id]));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 bg-black/40">
      <div className="bg-white rounded-lg w-[95%] max-w-4xl shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold">Adjust personnel</h3>
        </div>

        <div className="p-6 grid grid-cols-2 gap-6">
          {/* Left: list */}
          <div className="bg-white border rounded p-4 h-72 overflow-auto">
            <div className="mb-3">
              <input className="w-full px-3 py-2 border rounded" placeholder="Query personnel under the current group" />
            </div>
            <ul className="space-y-2 text-sm">
              {(personnelList.length ? personnelList : [1,2,3,4,5,6]).map((p) => {
                const id = typeof p === 'object' ? p.id : p;
                const label = typeof p === 'object' ? p.label || p.name || `Person ${id}` : `Person #${id}`;
                return (
                  <li key={id} className="flex items-center gap-3">
                    <input type="checkbox" checked={selected.includes(id)} onChange={() => toggle(id)} />
                    <span className="text-cyan-600">{label}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: selected */}
          <div className="bg-white border rounded p-4 h-72 overflow-auto">
            <div className="text-sm font-medium mb-3">Selected: {selected.length}</div>
            <ul className="space-y-3">
              {selected.length === 0 && <li className="text-sm text-gray-500">No selection</li>}
              {selected.map(id => (
                <li key={id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                  <div className="text-sm">Person #{id}</div>
                  <button onClick={() => toggle(id)} className="text-red-500">×</button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <button className="px-3 py-2 bg-green-50 text-green-600 rounded border border-green-200 text-sm">Show all selected&gt;&gt;</button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 p-6 border-t">
          <button onClick={onClose} className="px-6 py-2 border border-gray-300 rounded bg-white">Cancel</button>
          <button onClick={() => onConfirm(selected)} className="px-6 py-2 bg-blue-400 text-white rounded">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default AdjustPersonnelModal;
