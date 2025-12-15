import React from 'react';
import { ConfirmModal } from '@components/common/Modal';

const ExportConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Export Data Confirmation"
      message="Are you sure you want to export user data?"
      subMessage="This will download all user information to a CSV file."
      cancelText="No"
      confirmText="Yes"
    />
  );
};

export default ExportConfirmModal;
