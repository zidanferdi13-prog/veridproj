import React from 'react';

const VisitorAppCodeModal = ({ isOpen, onClose, qrData = 'https://example.com/visitor', onDownload }) => {
  if (!isOpen) return null;

  // placeholder QR — real app should render QR from qrData
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/40">
      <div className="bg-white rounded-lg w-[90%] max-w-sm shadow-lg overflow-hidden p-6 text-center">
        <h3 className="text-xl font-semibold mb-4">Visitor application code</h3>
        <div className="mb-4">
          <div className="inline-block p-4 bg-white border rounded">
            {/* placeholder - use a QR component or canvas in real app */}
            <img src={`data:image/png;base64,${''}`} alt="qr" className="w-56 h-56 bg-gray-100" />
          </div>
        </div>
        <button
          onClick={onDownload}
          className="px-4 py-2 bg-cyan-400 text-white rounded mb-2"
        >
          Download QR code
        </button>
        <div className="text-sm text-gray-500 mt-2">Form configuration &gt;</div>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">✕</button>
      </div>
    </div>
  );
};

export default VisitorAppCodeModal;
