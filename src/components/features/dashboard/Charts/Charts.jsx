import React, { useState, useEffect } from 'react';
import { BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';

const BASE_API = import.meta.env.VITE_API_URL;

// Batas jam masuk kerja (dalam format "HH:MM")
const WORK_START_HOUR = 9;
const WORK_START_MINUTE = 0;

// Fallback data jika API gagal
const FALLBACK_TREND = [
  { time: '00:00', value: 5 },
  { time: '06:00', value: 45 },
  { time: '08:00', value: 120 },
  { time: '10:00', value: 110 },
  { time: '12:00', value: 95 },
  { time: '14:00', value: 100 },
  { time: '16:00', value: 80 },
  { time: '18:00', value: 35 },
];

const FALLBACK_RECAP = [
  { name: 'Ontime', value: 100, color: '#3B82F6' },
  { name: 'Late', value: 26, color: '#60A5FA' },
  { name: 'Sick', value: 10, color: '#93C5FD' },
];

const getDateRange = (filter) => {
  const today = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const fmt = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const todayStr = fmt(today);

  if (filter === 'Daily') {
    return { tanggalawal: todayStr, tanggalakhir: todayStr };
  } else if (filter === 'Weekly') {
    const start = new Date(today);
    start.setDate(today.getDate() - 6);
    return { tanggalawal: fmt(start), tanggalakhir: todayStr };
  } else {
    const start = new Date(today);
    start.setDate(today.getDate() - 29);
    return { tanggalawal: fmt(start), tanggalakhir: todayStr };
  }
};

const AttendanceTrendChart = () => {
  const [activeFilter, setActiveFilter] = useState('Daily');
  const [attendanceData, setAttendanceData] = useState(FALLBACK_TREND);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAttendanceTrend();
  }, [activeFilter]);

  const fetchAttendanceTrend = async () => {
    setLoading(true);
    setError(null);
    try {
      const { tanggalawal, tanggalakhir } = getDateRange(activeFilter);
      const res = await axios.get(`${BASE_API}attendance/attendancedata`, {
        params: { tanggalawal, tanggalakhir },
      });
      console.log("data res attendance trend", res.data.data);
      const rawData = res.data.data || [];

      if (rawData.length === 0) {
        setAttendanceData(FALLBACK_TREND);
        return;
      }

      // Aggregate per jam (Daily) atau per hari (Weekly/Monthly)
      if (activeFilter === 'Daily') {
        const hourMap = {};
        rawData.forEach((r) => {
          const hour = r.clock_in ? r.clock_in.substring(0, 2) + ':00' : null;
          if (hour) hourMap[hour] = (hourMap[hour] || 0) + 1;
        });
        const aggregated = Object.entries(hourMap)
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([time, value]) => ({ time, value }));
        setAttendanceData(aggregated.length > 0 ? aggregated : FALLBACK_TREND);
      } else {
        const dayMap = {};
        rawData.forEach((r) => {
          const day = r.date || r.attendance_date;
          if (day) dayMap[day] = (dayMap[day] || 0) + 1;
        });
        const aggregated = Object.entries(dayMap)
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([time, value]) => ({ time, value }));
        setAttendanceData(aggregated.length > 0 ? aggregated : FALLBACK_TREND);
      }
    } catch (err) {
      console.error('Fetch attendance trend gagal:', err);
      // Jangan crash UI — tetap tampilkan fallback
      setAttendanceData(FALLBACK_TREND);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 md:gap-0">
        <div className="flex items-center gap-2 md:gap-3">
          <BarChart3 size={20} className="text-gray-700 md:w-6 md:h-6" />
          <h3 className="text-base md:text-lg font-semibold text-gray-800">Attendance Trend</h3>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['Daily', 'Weekly', 'Monthly'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      {loading && (
        <div className="flex items-center justify-center h-[200px] md:h-[250px] text-gray-500 text-sm">
          Loading chart data...
        </div>
      )}
      {error && !loading && (
        <div className="flex items-center justify-center h-[200px] md:h-[250px] text-red-500 text-xs md:text-sm">
          Error: {error}
        </div>
      )}
      {!loading && !error && (
        <ResponsiveContainer width="100%" height={200} className="md:h-[250px]">
          <BarChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              tick={{ fill: '#6B7280', fontSize: 10 }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              tick={{ fill: '#6B7280', fontSize: 10 }}
              axisLine={{ stroke: '#E5E7EB' }}
              domain={[0, 200]}
              ticks={[0, 50, 100, 150, 200]}
              tickFormatter={(value) => `${(value / 60).toFixed(2)}`}
            />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

const TodayRecapChart = () => {
  const [activeFilter, setActiveFilter] = useState('Daily');
  const [recapData, setRecapData] = useState(FALLBACK_RECAP);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodayRecap();
  }, [activeFilter]);

  const fetchTodayRecap = async () => {
    setLoading(true);
    setError(null);
    try {
      const { tanggalawal, tanggalakhir } = getDateRange(activeFilter);
      const res = await axios.get(`${BASE_API}attendance/attendancedata`, {
        params: { tanggalawal, tanggalakhir },
      });
      console.log("data res today recap", res.data.data);
      const rawData = res.data.data || [];

      if (rawData.length === 0) {
        setRecapData(FALLBACK_RECAP);
        return;
      }

      // Hitung ontime, late, absent dari data
      let ontime = 0;
      let late = 0;
      let absent = 0;
      rawData.forEach((r) => {
        if (!r.clock_in) {
          absent++;
        } else {
          const clockIn = r.clock_in || '';
          const [h, m] = clockIn.split(':').map(Number);
          // Anggap telat jika masuk setelah WORK_START_HOUR:WORK_START_MINUTE
          if (h > WORK_START_HOUR || (h === WORK_START_HOUR && m > WORK_START_MINUTE)) {
            late++;
          } else {
            ontime++;
          }
        }
      });

      setRecapData([
        { name: 'Ontime', value: ontime, color: '#3B82F6' },
        { name: 'Late', value: late, color: '#60A5FA' },
        { name: 'Absent', value: absent, color: '#93C5FD' },
      ]);
    } catch (err) {
      console.error('Fetch today recap gagal:', err);
      // Jangan crash UI — tetap tampilkan fallback
      setRecapData(FALLBACK_RECAP);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 md:gap-0">
        <div className="flex items-center gap-2 md:gap-3">
          <BarChart3 size={20} className="text-gray-700 md:w-6 md:h-6" />
          <h3 className="text-base md:text-lg font-semibold text-gray-800">Today Recap</h3>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['Daily', 'Weekly', 'Monthly'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      {loading && (
        <div className="flex items-center justify-center h-[200px] text-gray-500 text-sm">
          Loading chart data...
        </div>
      )}
      {error && !loading && (
        <div className="flex items-center justify-center h-[200px] text-red-500 text-xs md:text-sm">
          Error: {error}
        </div>
      )}
      {!loading && !error && (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <ResponsiveContainer width="100%" height={200} className="lg:w-[60%]">
            <PieChart>
              <Pie
                data={recapData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {recapData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 md:gap-3 lg:w-[40%]">
            {recapData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 md:w-3 md:h-3 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs md:text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Charts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
      <AttendanceTrendChart />
      <TodayRecapChart />
    </div>
  );
};



export default Charts;
