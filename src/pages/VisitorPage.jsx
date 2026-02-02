import React, { useEffect, useState } from "react";
import { MainLayout } from "@components";
import {
  InviteVisitorModal,
  VisitorAppCodeModal,
  DeleteConfirmModal,
} from "@components/features/visitor";
import { RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addVisitor, deleteVisitor, getVisitors } from "../utils/api/visitor";

const VisitorPage = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isAppCodeOpen, setIsAppCodeOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [activeVisitor, setActiveVisitor] = useState(null);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    name: "",
    phone: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    setLoading(true);
    try {
      const res = await getVisitors();
      console.log("res visitor", res);

      setVisitors(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFilters({
      name: "",
      phone: "",
      startTime: "",
      endTime: "",
    });
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleInviteConfirm = async (payload) => {
    try {
      console.log("payload add visitor", payload);

      await addVisitor(payload);
      setIsInviteOpen(false);
      fetchVisitors();
    } catch (error) {
      console.error("Add visitor failed", error);
    }
  };

  const handleDelete = () => {
    if (selectedItems.length === 0) {
      alert("Please select visitors to delete");
      return;
    }
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedItems.length === 0) return;

    try {
      for (const id of selectedItems) {
        await deleteVisitor(id);
      }

      setSelectedItems([]);
      setIsDeleteModalOpen(false);
      fetchVisitors();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <MainLayout>
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("list")}
          className={`px-6 py-2.5 rounded-t-lg font-medium transition-colors ${
            activeTab === "list"
              ? "bg-white text-blue-500 border-b-2 border-blue-500"
              : "bg-transparent text-gray-600 hover:bg-white"
          }`}
        >
          Visitor List
        </button>
        <button
          onClick={() => setActiveTab("review")}
          className={`px-6 py-2.5 rounded-t-lg font-medium transition-colors ${
            activeTab === "review"
              ? "bg-white text-blue-500 border-b-2 border-blue-500"
              : "bg-transparent text-gray-600 hover:bg-white"
          }`}
        >
          Visitor review
        </button>
      </div>

      {activeTab === "list" && (
        <>
          {/* Filters */}
          <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Please enter"
                      value={filters.name}
                      onChange={(e) =>
                        handleFilterChange("name", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="text"
                      placeholder="Please enter"
                      value={filters.phone}
                      onChange={(e) =>
                        handleFilterChange("phone", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="startTime"
                        value={filters.startTime}
                        onChange={(e) =>
                          handleFilterChange("startTime", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="text"
                        placeholder="endTime"
                        value={filters.endTime}
                        onChange={(e) =>
                          handleFilterChange("endTime", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2">
                    <span>🔍</span>
                    Search
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
                  >
                    <RotateCcw size={16} />
                    Reset
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mb-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setIsInviteOpen(true)}
                  className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium border border-green-200"
                >
                  + Invite visitor
                </button>
                <button
                  onClick={() => setIsAppCodeOpen(true)}
                  className="px-4 py-2 bg-cyan-50 text-cyan-600 rounded-lg hover:bg-cyan-100 transition-colors font-medium border border-cyan-200"
                >
                  🔑 Visitor application code
                </button>
                <button
                  onClick={() =>
                    navigate("/permission", {
                      state: { initialTab: "permission" },
                    })
                  }
                  className="px-4 py-2 bg-cyan-50 text-cyan-600 rounded-lg hover:bg-cyan-100 transition-colors font-medium border border-cyan-200"
                >
                  ✓ Visitor permissions
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium border border-red-200"
                >
                  🗑️ Delete
                </button>
              </div>

              {/* Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="py-4 px-6">
                          <input
                            type="checkbox"
                            checked={
                              visitors.length > 0 &&
                              selectedItems.length === visitors.length
                            }
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedItems(
                                  visitors.map((v) => v.id_visitor),
                                );
                              } else {
                                setSelectedItems([]);
                              }
                            }}
                          />
                        </th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                          Visitor
                        </th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                          Phone
                        </th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                          Credential
                        </th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                          Permissions
                        </th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                          Note
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td
                            colSpan="6"
                            className="py-12 text-center text-gray-400"
                          >
                            Loading...
                          </td>
                        </tr>
                      ) : visitors.length === 0 ? (
                        <tr>
                          <td
                            colSpan="6"
                            className="py-12 text-center text-gray-400"
                          >
                            No data available
                          </td>
                        </tr>
                      ) : (
                        visitors.map((v) => (
                          <tr
                            key={v.id_visitor}
                            className="border-b border-gray-100"
                          >
                            <td className="py-4 px-6">
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(v.id_visitor)}
                                onChange={() => handleSelectItem(v.id_visitor)}
                              />
                            </td>
                            <td className="py-4 px-6">{v.visitor_name}</td>
                            <td className="py-4 px-6">{v.visitor_phone}</td>
                            <td className="py-4 px-6">{v.visitor_email}</td>
                            <td className="py-4 px-6">{v.visit_purpose}</td>
                            <td className="py-4 px-6">{v.note || "-"}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Total <span className="font-semibold">0</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <select className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>20/page</option>
                      <option>50/page</option>
                      <option>100/page</option>
                    </select>
                    <div className="flex items-center gap-2">
                      <button
                        className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                        disabled
                      >
                        &lt;
                      </button>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded-lg">
                        1
                      </button>
                      <button
                        className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50"
                        disabled
                      >
                        &gt;
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Go to</span>
                      <input
                        type="number"
                        defaultValue={1}
                        className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "review" && (
            <>
              {/* Visitor Review Filters */}
              <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Please enter"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                      <option value="">Please select</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="text"
                      placeholder="Please enter"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="startTime"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="text"
                      placeholder="endTime"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium">
                    🔍 Search
                  </button>
                  <button className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    Reset
                  </button>
                </div>
              </div>

              {/* Review Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="py-4 px-6">Visitor</th>
                        <th className="py-4 px-6">Phone</th>
                        <th className="py-4 px-6">Email</th>
                        <th className="py-4 px-6">Time</th>
                        <th className="py-4 px-6">Inviter</th>
                        <th className="py-4 px-6">Reviewer</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6">Note</th>
                        <th className="py-4 px-6">Operation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td
                            colSpan="6"
                            className="py-12 text-center text-gray-400"
                          >
                            Loading...
                          </td>
                        </tr>
                      ) : visitors.length === 0 ? (
                        <tr>
                          <td
                            colSpan="6"
                            className="py-12 text-center text-gray-400"
                          >
                            No data available
                          </td>
                        </tr>
                      ) : (
                        visitors.map((v) => (
                          <tr
                            key={v.id_visitor}
                            className="border-b border-gray-100"
                          >
                            <td className="py-4 px-6">
                              <input type="checkbox" />
                            </td>
                            <td className="py-4 px-6">{v.visitor_name}</td>
                            <td className="py-4 px-6">{v.visitor_phone}</td>
                            <td className="py-4 px-6">{v.visitor_email}</td>
                            <td className="py-4 px-6">{v.visit_purpose}</td>
                            <td className="py-4 px-6">{v.note || "-"}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">Total 0</div>
                  <div className="flex items-center gap-4">
                    <select className="px-3 py-1 border border-gray-300 rounded-lg">
                      <option>20/page</option>
                      <option>50/page</option>
                    </select>
                    <div className="flex items-center gap-2">
                      <button
                        className="px-3 py-1 border border-gray-300 rounded-lg"
                        disabled
                      >
                        ‹
                      </button>
                      <span className="px-3 py-1 bg-blue-500 text-white rounded">
                        1
                      </span>
                      <button
                        className="px-3 py-1 border border-gray-300 rounded-lg"
                        disabled
                      >
                        ›
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Go to</span>
                      <input
                        type="number"
                        defaultValue={1}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
      
      {/* Modals */}
      <InviteVisitorModal
          isOpen={isInviteOpen}
          onClose={() => setIsInviteOpen(false)}
          onConfirm={handleInviteConfirm}
        />

        <VisitorAppCodeModal
          isOpen={isAppCodeOpen}
          onClose={() => setIsAppCodeOpen(false)}
          onDownload={() => {
            console.log("Download QR");
          }}
        />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        message={`Confirm removing the selected ${selectedItems.length} visitor(s)?`}
      />
    </MainLayout>
  );
};

export default VisitorPage;
