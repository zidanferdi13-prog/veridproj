import React, { useState } from 'react';
import { Sidebar, Header } from '@components';
import { Calendar } from 'lucide-react';

const AttendanceSysPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2025-12-09');
  const [currentMonth, setCurrentMonth] = useState('December');
  const [currentYear, setCurrentYear] = useState(2025);

  const statsCards = [
    { label: 'Expected Attendance', count: '0Persons', color: 'bg-teal-400', icon: '📊' },
    { label: 'Already Attended', count: '0Persons', color: 'bg-blue-400', icon: '✓' },
    { label: 'Checked In', count: '0Persons', color: 'bg-purple-400', icon: '✓' },
    { label: 'Checked Out', count: '0Persons', color: 'bg-pink-400', icon: '✓' },
    { label: 'Card Adjustments', count: '0Persons', color: 'bg-gray-300', icon: '🔄' },
    { label: 'Late Arrivals', count: '0Persons', color: 'bg-orange-300', icon: '⏰' },
    { label: 'Early Departures', count: '0Persons', color: 'bg-yellow-300', icon: '📅' },
    { label: 'Not Checked In', count: '0Persons', color: 'bg-orange-400', icon: '📅' },
    { label: 'Not Checked Out', count: '0Persons', color: 'bg-yellow-400', icon: '📅' },
    { label: 'Missing Cards', count: '0Persons', color: 'bg-red-400', icon: '📅' },
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 ${isCollapsed ? 'ml-20' : 'ml-64'} flex flex-col overflow-hidden transition-all duration-300`}>
        <Header />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex gap-6">
            {/* Left Sidebar Menu */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-white rounded-lg border border-gray-200 mb-4 p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="text-blue-500" size={24} />
                  <h3 className="font-semibold text-gray-800">Attendance</h3>
                </div>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-3 rounded-lg bg-blue-500 text-white font-medium">
                    🏠 Home
                  </button>
                  <button className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium flex items-center gap-2">
                    ⚙️ Settings
                    <span className="ml-auto">›</span>
                  </button>
                  <button className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium flex items-center gap-2">
                    📊 Report
                    <span className="ml-auto">›</span>
                  </button>
                  <button className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium flex items-center gap-2">
                    📱 Devices
                    <span className="ml-auto">›</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Top Controls */}
              <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={20} className="text-gray-500" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Please select</option>
                  </select>
                  <button className="ml-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
                    📋 Card replacement processing
                  </button>
                </div>
              </div>

              {/* Warning Message */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-2">
                <span className="text-red-500">⚠️</span>
                <span className="text-red-600 font-medium">The number of people not checked in or out today may be incorrect.</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-5 gap-4 mb-6">
                {statsCards.map((card, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className={`w-12 h-12 ${card.color} rounded-full flex items-center justify-center mb-3 text-white text-xl`}>
                      {card.icon}
                    </div>
                    <div className="text-sm text-gray-600 mb-1">{card.label}</div>
                    <div className="text-2xl font-bold text-gray-800">{card.count}</div>
                  </div>
                ))}
              </div>

              {/* Calendar and Approval Management */}
              <div className="grid grid-cols-2 gap-6">
                {/* Calendar */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-gray-800">{currentYear}</div>
                      <div className="text-gray-600">{currentMonth}</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Previous Month
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Today
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Next Month
                      </button>
                    </div>
                  </div>
                  
                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {daysOfWeek.map((day) => (
                      <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                        {day}
                      </div>
                    ))}
                    {daysInMonth.map((day) => (
                      <div
                        key={day}
                        className="text-center py-3 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Approval Management */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Approval Management</h3>
                  <div className="flex items-center justify-center h-64 text-gray-400">
                    No Data
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AttendanceSysPage;
