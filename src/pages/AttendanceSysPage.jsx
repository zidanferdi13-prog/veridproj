import React, { useState } from 'react';
import { MainLayout } from '@components';
import { Calendar } from 'lucide-react';

const AttendanceSysPage = () => {
  const [selectedDate, setSelectedDate] = useState('2025-12-09');
  const [currentMonth, setCurrentMonth] = useState('December');
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedSection, setSelectedSection] = useState('home');
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);

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
    <MainLayout>
      <main className="flex-1 overflow-y-auto p-8">
          <div className="flex gap-6">
            {/* Left Sidebar Menu */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-white rounded-lg border border-gray-200 mb-4 p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="text-blue-500" size={24} />
                  <h3 className="font-semibold text-gray-800">Attendance</h3>
                </div>
                <div>
                  <button
                    onClick={() => setSelectedSection('home')}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium mb-2 ${selectedSection === 'home' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
                    Home
                  </button>

                  <div>
                    <button
                      onClick={() => setIsSettingsOpen(prev => !prev)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
                      <span className="text-left">Settings</span>
                      <svg
                        className={`w-4 h-4 transform transition-transform ${isSettingsOpen ? 'rotate-90' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {isSettingsOpen && (
                      <div className="mt-2 space-y-2 pl-4">
                        <button
                          onClick={() => setSelectedSection('Groups')}
                          className={`w-full text-left px-4 py-2 rounded-lg font-medium ${selectedSection === 'Groups' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
                          Groups
                        </button>
                        <button
                          onClick={() => setSelectedSection('Shifts')}
                          className={`w-full text-left px-4 py-2 rounded-lg font-medium ${selectedSection === 'Shifts' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
                          Shifts
                        </button>
                        <button
                          onClick={() => setSelectedSection('Schedule')}
                          className={`w-full text-left px-4 py-2 rounded-lg font-medium ${selectedSection === 'Schedule' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
                          Schedule
                        </button>
                        
                      </div>
                    )}

                    <button
                      onClick={() => setSelectedSection('Report')}
                      className={`w-full text-left px-4 py-2 rounded-lg font-medium ${selectedSection === 'Report' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
                      Report
                    </button>
                    <button
                      onClick={() => setSelectedSection('Devices')}
                      className={`w-full text-left px-4 py-2 rounded-lg font-medium ${selectedSection === 'Devices' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
                      Devices
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Section Content */}
              <div>
                {/* Shared top controls */}
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
                      Actions
                    </button>
                  </div>
                </div>

                {selectedSection === 'home' && (
                  <>
                    <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                      <div className="mb-4 text-red-500">The number of people not checked in or out today may be incorrect.</div>

                      <div className="grid grid-cols-5 gap-4">
                        {statsCards.map((c) => (
                          <div key={c.label} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${c.color}`}>{c.icon}</div>
                            <div>
                              <div className="text-sm text-gray-500">{c.label}</div>
                              <div className="font-semibold text-gray-800">{c.count}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2">
                          <div className="bg-white rounded border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="font-semibold text-gray-800">{currentYear} {currentMonth}</h3>
                              <div className="space-x-2">
                                <button className="px-3 py-1 border rounded text-sm">Previous Month</button>
                                <button className="px-3 py-1 border rounded text-sm">Today</button>
                                <button className="px-3 py-1 border rounded text-sm">Next Month</button>
                              </div>
                            </div>

                            <div className="grid grid-cols-7 gap-2 text-center">
                              {daysOfWeek.map((d) => (
                                <div key={d} className="text-sm font-medium text-gray-500">{d}</div>
                              ))}

                              {daysInMonth.map((day) => (
                                <div key={day} className="py-6 border rounded text-sm text-gray-700">{day}</div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="col-span-1">
                          <div className="bg-white rounded-lg border border-gray-100 p-6 h-full">
                            <h4 className="font-semibold mb-4">Approval Management</h4>
                            <div className="text-gray-400 text-sm">No Data</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedSection === 'Groups' && (
                  <>
                    <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Group Name</label>
                          <input className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Please enter" />
                        </div>
                        <div className="col-span-2 flex items-end justify-end">
                          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg">Search</button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                              <th className="py-4 px-6">Name</th>
                              <th className="py-4 px-6">Attendance Type</th>
                              <th className="py-4 px-6">Attendance Time</th>
                              <th className="py-4 px-6">Number of Attendees</th>
                              <th className="py-4 px-6">Operation</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colSpan="5" className="py-12 text-center text-gray-400">No Data</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}

                {selectedSection === 'Shifts' && (
                  <>
                    <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                      <div className="flex items-center gap-4">
                        <input className="px-4 py-2 border border-gray-300 rounded-lg" placeholder="Attendance Shift" />
                        <div className="ml-auto">
                          <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg border border-green-200">Add</button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                              <th className="py-4 px-6">Shift Name</th>
                              <th className="py-4 px-6">Attendance Time</th>
                              <th className="py-4 px-6">Operation</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colSpan="3" className="py-12 text-center text-gray-400">No Data</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}

                {selectedSection === 'Schedule' && (
                  <>
                    <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Group Name</label>
                          <input className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Please enter" />
                        </div>
                        <div className="col-span-2 flex items-end justify-end">
                          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg">Search</button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                              <th className="py-4 px-6">Name</th>
                              <th className="py-4 px-6">Attendance Time</th>
                              <th className="py-4 px-6">Operation</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colSpan="3" className="py-12 text-center text-gray-400">No Data</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}

                {selectedSection === 'Report' && (
                  <>
                    <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                      <div className="flex items-center gap-4">
                        <input className="px-4 py-2 border border-gray-300 rounded-lg w-64" placeholder="Report name" />
                        <div className="ml-auto">
                          <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg border border-green-200">Add</button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                              <th className="py-4 px-6">Name</th>
                              <th className="py-4 px-6">Type</th>
                              <th className="py-4 px-6">Report Fields</th>
                              <th className="py-4 px-6">Last Updated</th>
                              <th className="py-4 px-6">Operation</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colSpan="5" className="py-12 text-center text-gray-400">No Data</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}

                {selectedSection === 'Devices' && (
                  <>
                    <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                      <div className="flex items-center gap-4">
                        <input className="px-4 py-2 border border-gray-300 rounded-lg w-64" placeholder="Attendance Machine" />
                        <div className="ml-auto">
                          <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg border border-green-200">Add</button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                              <th className="py-4 px-6">Device Name</th>
                              <th className="py-4 px-6">SN Code</th>
                              <th className="py-4 px-6">Device Model</th>
                              <th className="py-4 px-6">Device Group</th>
                              <th className="py-4 px-6">Monitoring Status</th>
                              <th className="py-4 px-6">Operation</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colSpan="6" className="py-12 text-center text-gray-400">No Data</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
    </MainLayout>
  );
};

export default AttendanceSysPage;
