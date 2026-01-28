import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar, Header } from "@components";
import { RotateCcw } from "lucide-react";
import {
  WorkTimeModal,
  ExportConfirmModal,
} from "@components/features/attendance/modals";
import { getAttendance } from "../utils/api/attendance";

// const attendanceData = [
//   { id: 1, name: 'Andhika', group: '-', phone: '-', date: '2025-12-09', clockIn: '-', deviceIn: '-', clockOut: '-', deviceOut: '-', duration: '-', lateness: '-', departure: '-' },
//   { id: 2, name: 'Iswa', group: '-', phone: '-', date: '2025-12-09', clockIn: '-', deviceIn: '-', clockOut: '-', deviceOut: '-', duration: '-', lateness: '-', departure: '-' },
//   { id: 3, name: 'Bobby of B...', group: '-', phone: '-', date: '2025-12-09', clockIn: '-', deviceIn: '-', clockOut: '-', deviceOut: '-', duration: '-', lateness: '-', departure: '-' },
//   { id: 4, name: 'Strongman...', group: '-', phone: '-', date: '2025-12-09', clockIn: '-', deviceIn: '-', clockOut: '-', deviceOut: '-', duration: '-', lateness: '-', departure: '-' },
//   { id: 5, name: 'Harry Potter', group: '-', phone: '-', date: '2025-12-09', clockIn: '-', deviceIn: '-', clockOut: '-', deviceOut: '-', duration: '-', lateness: '-', departure: '-' },
//   { id: 6, name: 'Kiayi Khalis', group: '-', phone: '-', date: '2025-12-09', clockIn: '-', deviceIn: '-', clockOut: '-', deviceOut: '-', duration: '-', lateness: '-', departure: '-' },
// ];

const AttendancePage = ({ initialTab }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const initial =
    (location && location.state && location.state.initialTab) ||
    initialTab ||
    "details";
  const [activeTab, setActiveTab] = useState(initial);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await getAttendance();
      console.log("attendance res", res.data.data);

      setAttendanceData(res.data.data || []);
    } catch (error) {
      console.error("Get attendance failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location && location.state && location.state.initialTab) {
      setActiveTab(location.state.initialTab);
    }
  }, [location && location.state && location.state.initialTab]);
  const [filters, setFilters] = useState({
    group: "",
    name: "",
    phone: "",
    startDate: "2025-12-09",
    endDate: "2025-12-09",
  });
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [isExportConfirmOpen, setIsExportConfirmOpen] = useState(false);
  const [workTime, setWorkTime] = useState({ start: "09:00", end: "18:00" });

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleWorkConfirm = ({ startTime, endTime }) => {
    setWorkTime({ start: startTime, end: endTime });
    // TODO: persist to backend
    // eslint-disable-next-line no-console
    console.log("Work time set to", startTime, endTime);
  };

  const generateCSV = (rows) => {
    const header = [
      "Name",
      "Group",
      "Phone",
      "Date",
      "Clock in",
      "Device in",
      "Clock out",
      "Device out",
      "Duration (H)",
      "Lateness (H)",
      "Departure (H)",
    ];
    const lines = [header.join(",")];
    rows.forEach((r) => {
      const row = [
        r.name,
        r.group,
        r.phone,
        r.date,
        r.clockIn,
        r.deviceIn,
        r.clockOut,
        r.deviceOut,
        r.duration,
        r.lateness,
        r.departure,
      ];
      // escape commas/newlines
      const esc = row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`);
      lines.push(esc.join(","));
    });
    return lines.join("\n");
  };

  const handleExport = () => {
    // In real app apply filters - here we export the static attendanceData
    const rows = attendanceData; // TODO: apply filters
    const csv = generateCSV(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance_export_${filters.startDate}_${filters.endDate}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setFilters({
      group: "",
      name: "",
      phone: "",
      startDate: "2025-12-09",
      endDate: "2025-12-09",
    });
  };

  const timeToSeconds = (time) => {
    if (!time) return 0;
    const [h, m, s] = time.split(":").map(Number);
    return h * 3600 + m * 60 + s;
  };

  const getDurationHours = (timeIn, timeOut) => {
    if (!timeIn || !timeOut) return "-";

    const diffSeconds = timeToSeconds(timeOut) - timeToSeconds(timeIn);
    if (diffSeconds <= 0) return "0";

    return (diffSeconds / 3600).toFixed(2);
  };

  const getLatenessHours = (timeIn, workStart = "09:00:00") => {
    if (!timeIn) return "-";

    const late = timeToSeconds(timeIn) - timeToSeconds(workStart);
    return late > 0 ? (late / 3600).toFixed(2) : "0.00";
  };

  const getDepartureHours = (timeOut, workEnd = "18:00:00") => {
    if (!timeOut) return "-";

    const early = timeToSeconds(workEnd) - timeToSeconds(timeOut);
    return early > 0 ? (early / 3600).toFixed(2) : "0.00";
  };

  const timeFormat = (time) => {
    return 
  } 

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div
        className={`flex-1 ${isCollapsed ? "ml-20" : "ml-64"} flex flex-col overflow-hidden transition-all duration-300`}
      >
        <Header />

        <main className="flex-1 overflow-y-auto p-8">
          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("details")}
              className={`px-6 py-2.5 rounded-t-lg font-medium transition-colors ${
                activeTab === "details"
                  ? "bg-white text-blue-500 border-b-2 border-blue-500"
                  : "bg-transparent text-gray-600 hover:bg-white"
              }`}
            >
              Attendance details
            </button>
            <button
              onClick={() => setActiveTab("statistics")}
              className={`px-6 py-2.5 rounded-t-lg font-medium transition-colors ${
                activeTab === "statistics"
                  ? "bg-white text-blue-500 border-b-2 border-blue-500"
                  : "bg-transparent text-gray-600 hover:bg-white"
              }`}
            >
              Attendance statistics
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group
                </label>
                <select
                  value={filters.group}
                  onChange={(e) => handleFilterChange("group", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Please enter"
                  value={filters.name}
                  onChange={(e) => handleFilterChange("name", e.target.value)}
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
                  onChange={(e) => handleFilterChange("phone", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) =>
                      handleFilterChange("startDate", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-500">To</span>
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) =>
                      handleFilterChange("endDate", e.target.value)
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
              onClick={() => setIsWorkModalOpen(true)}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium border border-blue-200"
            >
              ⚙️ Work time settings
            </button>
            <button
              onClick={() => setIsExportConfirmOpen(true)}
              className="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors font-medium border border-orange-200"
            >
              📥 Export
            </button>
          </div>

          {/* Modals */}
          <WorkTimeModal
            isOpen={isWorkModalOpen}
            onClose={() => setIsWorkModalOpen(false)}
            onConfirm={handleWorkConfirm}
            initialStart={workTime.start}
            initialEnd={workTime.end}
          />

          <ExportConfirmModal
            isOpen={isExportConfirmOpen}
            onClose={() => setIsExportConfirmOpen(false)}
            onConfirm={handleExport}
            message={`Date range: ${filters.startDate}-${filters.endDate}, Personnel count: ${attendanceData.length}. Are you sure to export?`}
          />

          {/* Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-max min-w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                      Name
                    </th>
                    {/* <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                      Group
                    </th> */}
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                      Phone
                    </th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                      Date
                    </th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                      Clock in
                    </th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                      Device In
                    </th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                      Clock out
                    </th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                      Device Out
                    </th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                      Duration (H)
                    </th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                      Lateness Duration (H)
                    </th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                      Departure Duration (H)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="11"
                        className="py-12 text-center text-gray-400"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : attendanceData.length === 0 ? (
                    <tr>
                      <td
                        colSpan="11"
                        className="py-12 text-center text-gray-400"
                      >
                        No data available
                      </td>
                    </tr>
                  ) : (
                    attendanceData.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-6">{item.name}</td>
                        {/* <td className="py-4 px-6">
                          {item.group || "tidak ada"}
                        </td> */}
                        <td className="py-4 px-6">{item.mobile}</td>
                        <td className="py-4 px-6">{(item.attendance_date).split('T')[0]}</td>
                        <td className="py-4 px-6">{item.time_in}</td>
                        <td className="py-4 px-6">{item.device_in || "-"}</td>
                        <td className="py-4 px-6">{item.time_out}</td>
                        <td className="py-4 px-6">{item.device_out || "-"}</td>

                        {/* belum bisa karena string mungkin */}
                        <td className="py-4 px-6">
                          {getDurationHours(item.time_in, item.time_out)}
                        </td>
                        <td className="py-4 px-6">
                          {getLatenessHours(item.time_in)}
                        </td>
                        <td className="py-4 px-6">
                          {getDepartureHours(item.time_out)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Total{" "}
                <span className="font-semibold">{attendanceData.length}</span>
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
        </main>
      </div>
    </div>
  );
};

export default AttendancePage;
