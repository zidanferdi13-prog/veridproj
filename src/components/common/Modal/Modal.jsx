import React from 'react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children, footer, maxWidth = 'max-w-2xl', maxHeight = '' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg shadow-xl w-full ${maxWidth} mx-4 ${maxHeight}`}>
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>
        )}
        <div className={maxHeight ? 'overflow-y-auto' : ''}>{children}</div>
        {footer && (
          <div className="flex items-center justify-center gap-4 p-6 border-t border-gray-200">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export const ModalFooter = ({ 
  onCancel, 
  onConfirm, 
  cancelText = 'Cancel', 
  confirmText = 'Confirm',
  cancelIcon,
  confirmIcon,
  isLoading = false,
  confirmClassName = 'bg-cyan-500 hover:bg-cyan-600'
}) => (
  <>
    <button
      onClick={onCancel}
      disabled={isLoading}
      className="px-8 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {cancelIcon}
      {cancelText}
    </button>
    <button
      onClick={onConfirm}
      disabled={isLoading}
      className={`px-8 py-2 text-white rounded-lg transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${confirmClassName}`}
    >
      {isLoading && (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {confirmText}
    </button>
  </>
);

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, subMessage, confirmText = 'Yes', cancelText = 'No', confirmClassName = 'bg-cyan-500 hover:bg-cyan-600' }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="max-w-md"
      footer={
        <ModalFooter
          onCancel={onClose}
          onConfirm={onConfirm}
          cancelText={cancelText}
          confirmText={confirmText}
          confirmClassName={confirmClassName}
        />
      }
    >
      <div className="p-6">
        <p className="text-gray-700 text-center mb-2">{message}</p>
        {subMessage && (
          <p className="text-gray-500 text-sm text-center">{subMessage}</p>
        )}
      </div>
    </Modal>
  );
};
