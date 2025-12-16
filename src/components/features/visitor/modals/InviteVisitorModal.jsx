import React, { useState, useEffect } from 'react';

const InviteVisitorModal = ({ isOpen, onClose, onConfirm, initial }) => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', permissionId: '', note: '' });

  useEffect(() => {
    if (!isOpen) return;
    // only reset when modal opens; avoid depending on `initial` reference to prevent
    // infinite update loops when caller passes a fresh object literal each render.
    setForm({ name: '', phone: '', email: '', permissionId: '', note: '', ...(initial || {}) });
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 bg-black/40">
      <div className="bg-white rounded-lg w-[90%] max-w-3xl shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-2xl font-semibold">Invite visitor</h3>
        </div>

        <div className="p-6 grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Visitor</label>
            <input
              value={form.name}
              onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Please enter"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Please enter"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              value={form.email}
              onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Please enter"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
            <select
              value={form.permissionId}
              onChange={(e) => setForm(prev => ({ ...prev, permissionId: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Please select</option>
              <option value="1">Group A</option>
              <option value="2">Group B</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
            <textarea
              value={form.note}
              onChange={(e) => setForm(prev => ({ ...prev, note: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Please enter"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 p-6 border-t">
          <button onClick={onClose} className="px-8 py-2 border border-gray-300 rounded bg-white">× Cancel</button>
          <button
            onClick={() => onConfirm(form)}
            className="px-8 py-2 bg-cyan-400 text-white rounded"
          >
            ✓ Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteVisitorModal;
