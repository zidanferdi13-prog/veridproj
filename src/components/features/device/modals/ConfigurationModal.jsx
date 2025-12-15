import React from 'react';
import { Modal } from '@components/common/Modal';
import { X } from 'lucide-react';

export const ConfigurationModal = ({ isOpen, onClose, configData, onConfigChange, onConfirm, onGenConfigCode }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Konfigurasi perangkat"
      maxHeight="max-h-[90vh] overflow-y-auto"
    >
      <div className="p-6 space-y-6">
        {/* IP Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="w-32 text-right text-gray-700">IP</label>
            <div className="flex gap-2">
              <button
                onClick={() => onConfigChange('ipType', 'dynamic')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  configData.ipType === 'dynamic'
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Dynamic
              </button>
              <button
                onClick={() => onConfigChange('ipType', 'static')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  configData.ipType === 'static'
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Static
              </button>
            </div>
          </div>

          {/* Static IP Fields */}
          {configData.ipType === 'static' && (
            <>
              <div className="flex items-center gap-4">
                <label className="w-32 text-right text-gray-700">IP address</label>
                <input
                  type="text"
                  placeholder="Please enter"
                  value={configData.ipAddress}
                  onChange={(e) => onConfigChange('ipAddress', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-32 text-right text-gray-700">Subnet mask</label>
                <input
                  type="text"
                  placeholder="Please enter"
                  value={configData.subnetMask}
                  onChange={(e) => onConfigChange('subnetMask', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-32 text-right text-gray-700">Gateway</label>
                <input
                  type="text"
                  placeholder="Please enter"
                  value={configData.gateway}
                  onChange={(e) => onConfigChange('gateway', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-32 text-right text-gray-700">DNS</label>
                <input
                  type="text"
                  placeholder="Please enter"
                  value={configData.dns}
                  onChange={(e) => onConfigChange('dns', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}
        </div>

        <div className="border-t border-gray-200"></div>

        {/* Network Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="w-32 text-right text-gray-700">Network</label>
            <div className="flex gap-2">
              <button
                onClick={() => onConfigChange('networkType', 'ethernet')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  configData.networkType === 'ethernet'
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Ethernet
              </button>
              <button
                onClick={() => onConfigChange('networkType', 'wifi')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  configData.networkType === 'wifi'
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                WiFi
              </button>
            </div>
          </div>

          {/* WiFi Fields */}
          {configData.networkType === 'wifi' && (
            <>
              <div className="flex items-center gap-4">
                <label className="w-32 text-right text-gray-700">WIFI name</label>
                <input
                  type="text"
                  placeholder="BIL-Guest"
                  value={configData.wifiName}
                  onChange={(e) => onConfigChange('wifiName', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-32 text-right text-gray-700">WIFI password</label>
                <input
                  type="password"
                  placeholder="BILguest2@"
                  value={configData.wifiPassword}
                  onChange={(e) => onConfigChange('wifiPassword', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200"></div>

      <div className="flex flex-col items-center gap-4 p-6">
        <button
          onClick={onGenConfigCode}
          className="px-8 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center gap-2"
        >
          <span>⚙️</span>
          Gen Config Code
        </button>
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="px-8 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
          >
            <X size={18} />
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-8 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium flex items-center gap-2"
          >
            <span>✓</span>
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};
