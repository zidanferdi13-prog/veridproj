import React from 'react';
import { Modal } from '@components/common/Modal';
import { Upload } from 'lucide-react';

const ImportModal = ({ isOpen, onClose, files, onFilesDrop, onFilesSelect, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Import Information"
      maxWidth="max-w-3xl"
      footer={
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onClose}
            className="px-8 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={files.length === 0}
            className={`px-8 py-2 rounded-lg transition-colors font-medium ${
              files.length > 0
                ? 'bg-cyan-500 text-white hover:bg-cyan-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Upload
          </button>
        </div>
      }
    >
      <div className="p-6">
        {/* Buttons */}
        <div className="flex gap-3 mb-6">
          <button className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">
            Template download
          </button>
        </div>

        {/* Upload Area */}
        <div 
          onDrop={onFilesDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById('import-file-input').click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-12 mb-6 text-center hover:border-cyan-400 transition-colors cursor-pointer"
        >
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 mb-4 text-gray-400">
              <Upload size={80} />
            </div>
            <p className="text-gray-700 mb-2">
              Drag and drop the file here or <span className="text-cyan-500">click to upload</span>
            </p>
          </div>
        </div>
        <input
          id="import-file-input"
          type="file"
          multiple
          accept=".csv,.zip"
          onChange={onFilesSelect}
          className="hidden"
        />

        {/* Files List */}
        {files.length > 0 && (
          <div className="mb-6 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-700 mb-2">Selected Files:</h3>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded">
                  <span className="truncate">{file.name}</span>
                  <span className="text-gray-400 ml-2">{(file.size / 1024).toFixed(2)} KB</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ImportModal;
