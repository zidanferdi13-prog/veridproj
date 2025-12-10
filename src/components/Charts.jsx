import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const attendanceData = [
  { time: '08:30', value: 130 },
  { time: '08:45', value: 150 },
  { time: '09:00', value: 175 },
  { time: '09:15', value: 140 },
  { time: '09:30', value: 155 },
];

const recapData = [
  { name: 'Ontime', value: 100, color: '#3B82F6' },
  { name: 'Late', value: 26, color: '#60A5FA' },
  { name: 'Sick', value: 10, color: '#93C5FD' },
];

const AttendanceTrendChart = () => {
  const [activeFilter, setActiveFilter] = useState('Daily');

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BarChart3 size={24} className="text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-800">Attendance Trend</h3>
        </div>
        <div className="flex gap-2">
          {['Daily', 'Weekly', 'Monthly'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
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
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={attendanceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="time" 
            tick={{ fill: '#6B7280', fontSize: 12 }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis 
            tick={{ fill: '#6B7280', fontSize: 12 }}
            axisLine={{ stroke: '#E5E7EB' }}
            domain={[0, 200]}
            ticks={[0, 50, 100, 150, 200]}
            tickFormatter={(value) => `${(value / 60).toFixed(2)}`}
          />
          <Tooltip />
          <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const TodayRecapChart = () => {
  const [activeFilter, setActiveFilter] = useState('Daily');

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BarChart3 size={24} className="text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-800">Today Recap</h3>
        </div>
        <div className="flex gap-2">
          {['Daily', 'Weekly', 'Monthly'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
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
      <div className="flex items-center justify-between">
        <ResponsiveContainer width="60%" height={200}>
          <PieChart>
            <Pie
              data={recapData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {recapData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-3">
          {recapData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Charts = () => {
  return (
    <div className="grid grid-cols-2 gap-6 mb-6">
      <AttendanceTrendChart />
      <TodayRecapChart />
    </div>
  );
};

export default Charts;
