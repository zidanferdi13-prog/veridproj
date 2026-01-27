import React, { useState, useEffect } from "react";

const InviteVisitorModal = ({ isOpen, onClose, onConfirm }) => {
  const [form, setForm] = useState({
    visitor_name: "",
    visitor_phone: "",
    visitor_email: "",
    visit_purpose: "",
    visit_person: "",
    visit_date: "",
    visit_time_in: "",
    visit_time_out: "",
    note: "",
  });

  useEffect(() => {
    if (isOpen) {
      setForm({
        visitor_name: "",
        visitor_phone: "",
        visitor_email: "",
        visit_purpose: "",
        visit_person: "",
        visit_date: "",
        visit_time_in: "",
        visit_time_out: "",
        note: "",
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed overflow-y-auto inset-0 z-50 h-screen flex items-start justify-center py-12 bg-black/40">
      <div className="bg-white rounded-lg w-[90%] max-w-3xl shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-2xl font-semibold">Invite visitor</h3>
        </div>

        <div className="p-6 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Visitor Name
            </label>
            <input
              value={form.visitor_name}
              onChange={(e) =>
                setForm({ ...form, visitor_name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              value={form.visitor_phone}
              onChange={(e) =>
                setForm({ ...form, visitor_phone: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              value={form.visitor_email}
              onChange={(e) =>
                setForm({ ...form, visitor_email: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Visit Purpose
            </label>
            <input
              value={form.visit_purpose}
              onChange={(e) =>
                setForm({ ...form, visit_purpose: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Visit Person
            </label>
            <input
              value={form.visit_person}
              onChange={(e) =>
                setForm({ ...form, visit_person: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Visit Date</label>
            <input
              type="date"
              value={form.visit_date}
              onChange={(e) => setForm({ ...form, visit_date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Time In</label>
            <input
              type="time"
              value={form.visit_time_in}
              onChange={(e) =>
                setForm({ ...form, visit_time_in: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Time Out</label>
            <input
              type="time"
              value={form.visit_time_out}
              onChange={(e) =>
                setForm({ ...form, visit_time_out: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Note</label>
            <textarea
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 p-6 border-t">
          <button onClick={onClose} className="px-8 py-2 border rounded hover:bg-gray-100">
            Cancel
          </button>
          <button
            onClick={() => onConfirm(form)}
            className="px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteVisitorModal;
