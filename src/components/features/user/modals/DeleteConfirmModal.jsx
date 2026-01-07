import React from "react";
import { ConfirmModal } from "@components/common/Modal";

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  selectedCount,
  isLoading,
}) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={isLoading ? undefined : onClose}
      onConfirm={onConfirm}
      title="Delete Confirmation"
      message={`Are you sure you want to delete ${selectedCount} selected user(s)?`}
      subMessage="This action cannot be undone."
      cancelText="No"
      confirmText={isLoading ? "Deleting..." : "Yes"}
      confirmClassName={`bg-red-500 hover:bg-red-600 ${
        isLoading ? "opacity-60 cursor-not-allowed" : ""
      }`}
      confirmDisabled={isLoading} // 🔥 INI KUNCINYA
    />
  );
};

export default DeleteConfirmModal;
