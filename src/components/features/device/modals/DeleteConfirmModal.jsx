import React from 'react';
import { ConfirmModal } from '@components/common/Modal';

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, selectedCount }) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Confirmation"
      message={`Are you sure you want to delete ${selectedCount} selected device(s)?`}
      subMessage="This action cannot be undone."
      confirmClassName="bg-red-500 hover:bg-red-600"
    />
  );
};
