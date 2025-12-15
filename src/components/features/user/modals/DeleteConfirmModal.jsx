import React from 'react';
import { ConfirmModal } from '@components/common/Modal';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, selectedCount }) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Confirmation"
      message={`Are you sure you want to delete ${selectedCount} selected user(s)?`}
      subMessage="This action cannot be undone."
      cancelText="No"
      confirmText="Yes"
      confirmClassName="bg-red-500 hover:bg-red-600"
    />
  );
};

export default DeleteConfirmModal;
