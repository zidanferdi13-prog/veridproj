import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const SettingsPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('system');
  const [qrCodeType, setQrCodeType] = useState('dynamic');
  const [timezone, setTimezone] = useState('Asia/Shanghai (UTC+8)');
  const [callbackSettings, setCallbackSettings] = useState('');

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 ${isCollapsed ? 'ml-20' : 'ml-64'} flex flex-col overflow-hidden transition-all duration-300`}>
        <Header />
        
        <main className="flex-1 overflow-y-auto p-8">
          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('system')}
              className={`px-6 py-2.5 rounded-t-lg font-medium transition-colors ${
                activeTab === 'system'
                  ? 'bg-white text-blue-500 border-b-2 border-blue-500'
                  : 'bg-transparent text-gray-600 hover:bg-white'
              }`}
            >
              System settings
            </button>
            <button
              onClick={() => setActiveTab('form')}
              className={`px-6 py-2.5 rounded-t-lg font-medium transition-colors ${
                activeTab === 'form'
                  ? 'bg-white text-blue-500 border-b-2 border-blue-500'
                  : 'bg-transparent text-gray-600 hover:bg-white'
              }`}
            >
              Form configuration
            </button>
          </div>

          <div className="bg-white rounded-lg p-8 border border-gray-200">
            {/* Account Information Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Account information</h3>
              
              <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">Organization administrator</div>
                  <div className="text-gray-800 font-medium">David Beckham</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">Administrator's mail</div>
                  <div className="text-gray-800 font-medium">yazid@veridface.com</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">Organization name</div>
                  <div className="text-gray-800 font-medium">Veridface Company</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">Organization Id</div>
                  <div className="text-gray-800 font-medium">9z1c1jydzv1dgpzf</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">appKey</div>
                  <div className="text-gray-800 font-medium">9z1c1jydzv1dgpzf</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">appSecret</div>
                  <div className="text-gray-800 font-medium">l54ckwoq6wwxdifpz9ifie5u0cj0lf7x</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">Version number</div>
                  <div className="text-gray-800 font-medium">V1.0.4</div>
                </div>
              </div>
            </div>

            {/* Account Settings Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Account settings</h3>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium min-w-[200px]">Access QR code configuration</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="qrCode"
                        value="dynamic"
                        checked={qrCodeType === 'dynamic'}
                        onChange={(e) => setQrCodeType(e.target.value)}
                        className="w-4 h-4 text-cyan-500 focus:ring-cyan-500"
                      />
                      <span className={`${qrCodeType === 'dynamic' ? 'text-blue-500 font-medium' : 'text-gray-700'}`}>
                        ✓ Vguang dynamic code
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="qrCode"
                        value="static"
                        checked={qrCodeType === 'static'}
                        onChange={(e) => setQrCodeType(e.target.value)}
                        className="w-4 h-4 text-gray-400 focus:ring-gray-400"
                      />
                      <span className="text-gray-700">Static pass-through code</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Zone Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Time zone</h3>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium min-w-[200px]">Time zone</span>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="flex-1 max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Asia/Shanghai (UTC+8)">Asia/Shanghai (UTC+8)</option>
                    <option value="Asia/Jakarta (UTC+7)">Asia/Jakarta (UTC+7)</option>
                    <option value="America/New_York (UTC-5)">America/New_York (UTC-5)</option>
                    <option value="Europe/London (UTC+0)">Europe/London (UTC+0)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Callback Settings Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Callback settings</h3>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <span className="text-gray-700 font-medium min-w-[200px] pt-2">Callback settings</span>
                  <input
                    type="text"
                    placeholder="Please enter"
                    value={callbackSettings}
                    onChange={(e) => setCallbackSettings(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
                Save Changes
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
