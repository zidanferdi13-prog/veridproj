import React, { useState } from 'react';
import { Sidebar, Header } from '@components';
import { RotateCcw } from 'lucide-react';
import { ExportLogModal, ResendPermissionModal } from '@components/features/log/modals';

const logData = [
  {
    id: 1,
    name: '-',
    userType: '-',
    phoneEmail: '-',
    passTime: '2025-10-18 ...',
    device: 'Veridface',
    sn: 'J257280001',
    accessType: 'Face',
    credential: 'stranger',
    result: 'Fail',
    capture: '/api/placeholder/50/50'
  },
  {
    id: 2,
    name: 'David Beckh...',
    userType: 'organization',
    phoneEmail: 'yazid@veridf...',
    passTime: '2025-10-18 ...',
    device: 'Veridface',
    sn: 'J257280001',
    accessType: 'Face',
    credential: '9mjmdtwk4q...',
    result: 'Success',
    capture: '/api/placeholder/50/50'
  },
  {
    id: 3,
    name: 'David Beckh...',
    userType: 'organization',
    phoneEmail: 'yazid@veridf...',
    passTime: '2025-10-18 ...',
    device: 'Veridface',
    sn: 'J257280001',
    accessType: 'Face',
    credential: '9mjmdtwk4q...',
    result: 'Success',
    capture: '/api/placeholder/50/50'
  },
];

const LogPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('access');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isResendModalOpen, setIsResendModalOpen] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState([]);
  
  // Filters untuk Access records
  const [accessFilters, setAccessFilters] = useState({
    userType: '',
    deviceName: '',
    accessType: '',
    name: '',
    result: '',
    passTime: '',
    startDate: '',
    endDate: '',
  });
  
  // Filters untuk Authorization records
  const [authFilters, setAuthFilters] = useState({
    device: '',
    username: '',
    sn: '',
    result: '',
    type: '',
    startDate: '',
    endDate: '',
  });
  
  // Filters untuk Operation log
  const [operationFilters, setOperationFilters] = useState({
    functionalModule: '',
    operationContent: '',
    name: '',
    phone: '',
    startDate: '',
    endDate: '',
  });
  
  // Filters untuk Alarm records
  const [alarmFilters, setAlarmFilters] = useState({
    alarmType: '',
    alarmLevel: '',
    deviceName: '',
    startDate: '',
    endDate: '',
  });

  const handleFilterChange = (field, value) => {
    if (activeTab === 'access') {
      setAccessFilters(prev => ({ ...prev, [field]: value }));
    } else if (activeTab === 'authorization') {
      setAuthFilters(prev => ({ ...prev, [field]: value }));
    } else if (activeTab === 'operation') {
      setOperationFilters(prev => ({ ...prev, [field]: value }));
    } else if (activeTab === 'alarm') {
      setAlarmFilters(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleReset = () => {
    if (activeTab === 'access') {
      setAccessFilters({
        userType: '',
        deviceName: '',
        accessType: '',
        name: '',
        result: '',
        passTime: '',
        startDate: '',
        endDate: '',
      });
    } else if (activeTab === 'authorization') {
      setAuthFilters({
        device: '',
        username: '',
        sn: '',
        result: '',
        type: '',
        startDate: '',
        endDate: '',
      });
    } else if (activeTab === 'operation') {
      setOperationFilters({
        functionalModule: '',
        operationContent: '',
        name: '',
        phone: '',
        startDate: '',
        endDate: '',
      });
    } else if (activeTab === 'alarm') {
      setAlarmFilters({
        alarmType: '',
        alarmLevel: '',
        deviceName: '',
        startDate: '',
        endDate: '',
      });
    }
  };

  const handleExport = () => {
    // Generate CSV based on active tab and filters
    const csvData = generateCSV(logData, activeTab);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTab}_records_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    // eslint-disable-next-line no-console
    console.log('Exporting', activeTab, 'records');
  };

  const handleResendPermission = (reason) => {
    // TODO: API call to resend permission
    // eslint-disable-next-line no-console
    console.log('Resending permission with reason:', reason, 'for', selectedRecords.length, 'records');
  };

  const generateCSV = (data, type) => {
    const headers = {
      access: ['Name', 'User Type', 'Phone/Email', 'Pass Time', 'Device', 'SN', 'Access Type', 'Credential', 'Result'],
      authorization: ['Device', 'SN', 'Model', 'Groups', 'Username', 'Type', 'Credential', 'Result', 'Interval', 'Reason'],
      operation: ['Name', 'Phone', 'Functional Module', 'Operation Content', 'Operation IP', 'Operation Time'],
      alarm: ['SN', 'Area', 'Alarm Level', 'Alarm Type', 'Alarm Time']
    };
    
    const header = headers[type] || headers.access;
    const lines = [header.join(',')];
    
    data.forEach(row => {
      const values = Object.values(row).slice(1); // Skip ID
      const escaped = values.map(v => `"${String(v).replace(/"/g, '""')}"`);
      lines.push(escaped.join(','));
    });
    
    return lines.join('\n');
  };

  const getRecordTypeName = () => {
    const names = {
      access: 'Access Records',
      authorization: 'Authorization Records',
      operation: 'Operation Log',
      alarm: 'Alarm Records'
    };
    return names[activeTab] || 'Records';
  };

  const getDateRange = () => {
    let filters = accessFilters;
    if (activeTab === 'authorization') filters = authFilters;
    else if (activeTab === 'operation') filters = operationFilters;
    else if (activeTab === 'alarm') filters = alarmFilters;
    
    if (filters.startDate && filters.endDate) {
      return `${filters.startDate} - ${filters.endDate}`;
    }
    return 'All dates';
  };

  const renderFilters = () => {
    if (activeTab === 'access') {
      return (
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">User type</label>
            <select
              value={accessFilters.userType}
              onChange={(e) => handleFilterChange('userType', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Please select</option>
              <option value="organization">Organization</option>
              <option value="visitor">Visitor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Device Name</label>
            <input
              type="text"
              placeholder="Please enter"
              value={accessFilters.deviceName}
              onChange={(e) => handleFilterChange('deviceName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Access Type</label>
            <select
              value={accessFilters.accessType}
              onChange={(e) => handleFilterChange('accessType', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Please select</option>
              <option value="face">Face</option>
              <option value="card">Card</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              placeholder="Please enter"
              value={accessFilters.name}
              onChange={(e) => handleFilterChange('name', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Result</label>
            <select
              value={accessFilters.result}
              onChange={(e) => handleFilterChange('result', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Please select</option>
              <option value="success">Success</option>
              <option value="fail">Fail</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pass time</label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                placeholder="startDate"
                value={accessFilters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-500">To</span>
              <input
                type="date"
                placeholder="endDate"
                value={accessFilters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      );
    } else if (activeTab === 'authorization') {
      return (
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Device</label>
            <input
              type="text"
              placeholder="Please enter"
              value={authFilters.device}
              onChange={(e) => handleFilterChange('device', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              placeholder="Please enter"
              value={authFilters.username}
              onChange={(e) => handleFilterChange('username', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SN</label>
            <input
              type="text"
              placeholder="Please enter"
              value={authFilters.sn}
              onChange={(e) => handleFilterChange('sn', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Result</label>
            <select
              value={authFilters.result}
              onChange={(e) => handleFilterChange('result', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Please select</option>
              <option value="success">Success</option>
              <option value="fail">Fail</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={authFilters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Please select</option>
              <option value="face">Face</option>
              <option value="card">Card</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Interval</label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                placeholder="startDate"
                value={authFilters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-500">To</span>
              <input
                type="date"
                placeholder="endDate"
                value={authFilters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      );
    } else if (activeTab === 'operation') {
      return (
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Functional module</label>
            <select
              value={operationFilters.functionalModule}
              onChange={(e) => handleFilterChange('functionalModule', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Please select</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Operation content</label>
            <input
              type="text"
              placeholder="Please enter"
              value={operationFilters.operationContent}
              onChange={(e) => handleFilterChange('operationContent', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              placeholder="Please enter"
              value={operationFilters.name}
              onChange={(e) => handleFilterChange('name', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="text"
              placeholder="Please enter"
              value={operationFilters.phone}
              onChange={(e) => handleFilterChange('phone', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Operation time</label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                placeholder="startDate"
                value={operationFilters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-500">To</span>
              <input
                type="date"
                placeholder="endDate"
                value={operationFilters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      );
    } else if (activeTab === 'alarm') {
      return (
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alarm type</label>
            <select
              value={alarmFilters.alarmType}
              onChange={(e) => handleFilterChange('alarmType', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Please select</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alarm level</label>
            <select
              value={alarmFilters.alarmLevel}
              onChange={(e) => handleFilterChange('alarmLevel', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Please select</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Device Name</label>
            <input
              type="text"
              placeholder="Please enter"
              value={alarmFilters.deviceName}
              onChange={(e) => handleFilterChange('deviceName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Interval</label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                placeholder="startDate"
                value={alarmFilters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-500">To</span>
              <input
                type="date"
                placeholder="endDate"
                value={alarmFilters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      );
    }
  };

  const renderTable = () => {
    if (activeTab === 'access') {
      return (
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Name</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">User type</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Phone/Email</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Pass time</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Device</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">SN</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Access Type</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Credential</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Result</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Capture</th>
            </tr>
          </thead>
          <tbody>
            {logData.map((log) => (
              <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-gray-700">{log.name}</td>
                <td className="py-4 px-6 text-gray-700">{log.userType}</td>
                <td className="py-4 px-6 text-gray-700">{log.phoneEmail}</td>
                <td className="py-4 px-6 text-gray-700">{log.passTime}</td>
                <td className="py-4 px-6 text-gray-700">{log.device}</td>
                <td className="py-4 px-6 text-gray-700">{log.sn}</td>
                <td className="py-4 px-6 text-gray-700">{log.accessType}</td>
                <td className="py-4 px-6 text-gray-700">{log.credential}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    log.result === 'Success'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {log.result}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <img 
                    src={log.capture} 
                    alt="Capture" 
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (activeTab === 'authorization') {
      return (
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Device</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">SN</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Model</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Groups</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Username</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Type</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Credential</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Result</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Interval</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="10" className="py-12 text-center text-gray-400">No data available</td>
            </tr>
          </tbody>
        </table>
      );
    } else if (activeTab === 'operation') {
      return (
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Name</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Phone</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Functional module</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Operation content</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Operation IP</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Operation time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="6" className="py-12 text-center text-gray-400">No data available</td>
            </tr>
          </tbody>
        </table>
      );
    } else if (activeTab === 'alarm') {
      return (
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">SN</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Area</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Alarm level</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Alarm type</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold">Alarm time</th>
            </tr>
          </thead>
          <tbody>
            {activeTab === 'alarm' && (
              <>
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-gray-700">J257280001</td>
                  <td className="py-4 px-6 text-gray-700">Veridface</td>
                  <td className="py-4 px-6 text-gray-700">Medium</td>
                  <td className="py-4 px-6 text-gray-700">Device offline</td>
                  <td className="py-4 px-6 text-gray-700">2025-10-18 11:19:27</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-gray-700">J257280001</td>
                  <td className="py-4 px-6 text-gray-700">Veridface</td>
                  <td className="py-4 px-6 text-gray-700">Low</td>
                  <td className="py-4 px-6 text-gray-700">Device online</td>
                  <td className="py-4 px-6 text-gray-700">2025-10-18 11:07:21</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-gray-700">J257280001</td>
                  <td className="py-4 px-6 text-gray-700">Veridface</td>
                  <td className="py-4 px-6 text-gray-700">Medium</td>
                  <td className="py-4 px-6 text-gray-700">Device offline</td>
                  <td className="py-4 px-6 text-gray-700">2025-10-18 11:07:07</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-gray-700">J257280001</td>
                  <td className="py-4 px-6 text-gray-700">Veridface</td>
                  <td className="py-4 px-6 text-gray-700">Low</td>
                  <td className="py-4 px-6 text-gray-700">Device online</td>
                  <td className="py-4 px-6 text-gray-700">2025-10-18 11:05:36</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 ${isCollapsed ? 'ml-20' : 'ml-64'} flex flex-col overflow-hidden transition-all duration-300`}>
        <Header />
        
        <main className="flex-1 overflow-y-auto p-8">
          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('access')}
              className={`px-6 py-2.5 rounded-t-lg font-medium transition-colors ${
                activeTab === 'access'
                  ? 'bg-white text-blue-500 border-b-2 border-blue-500'
                  : 'bg-transparent text-gray-600 hover:bg-white'
              }`}
            >
              Access records
            </button>
            <button
              onClick={() => setActiveTab('authorization')}
              className={`px-6 py-2.5 rounded-t-lg font-medium transition-colors ${
                activeTab === 'authorization'
                  ? 'bg-white text-blue-500 border-b-2 border-blue-500'
                  : 'bg-transparent text-gray-600 hover:bg-white'
              }`}
            >
              Authorization records
            </button>
            <button
              onClick={() => setActiveTab('operation')}
              className={`px-6 py-2.5 rounded-t-lg font-medium transition-colors ${
                activeTab === 'operation'
                  ? 'bg-white text-blue-500 border-b-2 border-blue-500'
                  : 'bg-transparent text-gray-600 hover:bg-white'
              }`}
            >
              Operation log
            </button>
            <button
              onClick={() => setActiveTab('alarm')}
              className={`px-6 py-2.5 rounded-t-lg font-medium transition-colors ${
                activeTab === 'alarm'
                  ? 'bg-white text-blue-500 border-b-2 border-blue-500'
                  : 'bg-transparent text-gray-600 hover:bg-white'
              }`}
            >
              Alarm records
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
            {renderFilters()}
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

          {/* Action Buttons - different per tab */}
          <div className="mb-6 flex flex-wrap gap-3">
            {activeTab === 'access' && (
              <>
                <button 
                  onClick={() => setIsExportModalOpen(true)}
                  className="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors font-medium border border-orange-200">
                  📥 Export
                </button>
                <button 
                  onClick={() => setIsExportModalOpen(true)}
                  className="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors font-medium border border-orange-200">
                  📥 Export records
                </button>
              </>
            )}
            
            {activeTab === 'authorization' && (
              <button 
                onClick={() => setIsResendModalOpen(true)}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium border border-red-200">
                🔄 Resend permission
              </button>
            )}
            
            {activeTab === 'operation' && (
              <button 
                onClick={() => setIsExportModalOpen(true)}
                className="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors font-medium border border-orange-200">
                📥 Export
              </button>
            )}
            
            {activeTab === 'alarm' && (
              <button 
                onClick={() => setIsExportModalOpen(true)}
                className="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors font-medium border border-orange-200">
                📥 Export
              </button>
            )}
          </div>

          {/* Modals */}
          <ExportLogModal
            isOpen={isExportModalOpen}
            onClose={() => setIsExportModalOpen(false)}
            onConfirm={handleExport}
            recordType={getRecordTypeName()}
            recordCount={logData.length}
            dateRange={getDateRange()}
          />

          <ResendPermissionModal
            isOpen={isResendModalOpen}
            onClose={() => setIsResendModalOpen(false)}
            onConfirm={handleResendPermission}
            selectedRecords={selectedRecords}
          />

          {/* Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              {renderTable()}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Total <span className="font-semibold">{activeTab === 'alarm' ? '4' : activeTab === 'access' ? logData.length : '0'}</span>
              </div>
              <div className="flex items-center gap-4">
                <select className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>20/page</option>
                  <option>50/page</option>
                  <option>100/page</option>
                </select>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                    &lt;
                  </button>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded-lg">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50" disabled>
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

export default LogPage;
