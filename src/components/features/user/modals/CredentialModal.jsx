import React from 'react';
import { Modal, ModalFooter } from '@components/common/Modal';

const CredentialModal = ({ 
  isOpen, 
  onClose, 
  activeTab, 
  setActiveTab, 
  credentialData, 
  onFileUpload, 
  onCredentialChange, 
  onConfirm 
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Manajemen Kredensial"
      maxWidth="max-w-3xl"
      footer={
        <ModalFooter
          onCancel={onClose}
          onConfirm={onConfirm}
          cancelText="Cancel"
          confirmText="Save"
        />
      }
    >
      <div className="flex border-b border-gray-200">
        {['face', 'card', 'password', 'qrcode'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === tab
                ? 'text-cyan-500 border-b-2 border-cyan-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'face' ? 'Face' : tab === 'card' ? 'Card' : tab === 'password' ? 'Password' : 'QR code'}
          </button>
        ))}
      </div>

      <div className="p-8">
        {activeTab === 'face' && (
          <div className="flex flex-col items-center">
            <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6 border-2 border-dashed border-gray-300">
              {credentialData.faceImage ? (
                <img
                  src={URL.createObjectURL(credentialData.faceImage)}
                  alt="Face"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <div className="text-6xl text-gray-400 mb-2">+</div>
                  <p className="text-gray-400 text-sm">Upload Face Image</p>
                </div>
              )}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => onFileUpload('faceImage', null)}
                className="px-6 py-2 bg-white border border-red-300 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium"
              >
                Delete
              </button>
              <label className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium cursor-pointer">
                Download
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onFileUpload('faceImage', e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        )}

        {activeTab === 'card' && (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md mb-6">
              <label className="block text-gray-700 font-medium mb-2">Card ID / RFID Number</label>
              <input
                type="text"
                placeholder="Enter card ID or scan RFID"
                value={credentialData.cardId}
                onChange={(e) => onCredentialChange('cardId', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => onCredentialChange('cardId', '')}
                className="px-6 py-2 bg-white border border-red-300 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium"
              >
                Clear
              </button>
              <button className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium">
                Scan Card
              </button>
            </div>
          </div>
        )}

        {activeTab === 'password' && (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md mb-6">
              <label className="block text-gray-700 font-medium mb-2">User Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={credentialData.userPassword}
                onChange={(e) => onCredentialChange('userPassword', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <p className="text-gray-500 text-sm mt-2">Minimum 6 characters</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => onCredentialChange('userPassword', '')}
                className="px-6 py-2 bg-white border border-red-300 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium"
              >
                Clear
              </button>
              <button className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium">
                Generate Random
              </button>
            </div>
          </div>
        )}

        {activeTab === 'qrcode' && (
          <div className="flex flex-col items-center">
            <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6 border-2 border-dashed border-gray-300">
              {credentialData.qrCode ? (
                <img
                  src={URL.createObjectURL(credentialData.qrCode)}
                  alt="QR Code"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <div className="text-6xl text-gray-400 mb-2">+</div>
                  <p className="text-gray-400 text-sm">Upload QR Code</p>
                </div>
              )}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => onFileUpload('qrCode', null)}
                className="px-6 py-2 bg-white border border-red-300 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium"
              >
                Delete
              </button>
              <label className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium cursor-pointer">
                Download
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onFileUpload('qrCode', e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CredentialModal;
