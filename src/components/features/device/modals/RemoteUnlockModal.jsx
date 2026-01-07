import React from "react";
import { Modal } from "@components/common/Modal";
import { AlertCircle } from "lucide-react";

const RemoteUnlockModal = ({
  isOpen,
  onClose,
  onConfirm,
  deviceName = "Veridface",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Mengingatkan"
      maxWidth="max-w-md"
      footer={
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onClose}
            className="px-8 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Membatalkan
          </button>
          <button onClick={onConfirm}>OKE</button>
        </div>
      }
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <AlertCircle className="text-orange-500" size={28} />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-gray-700 text-base leading-relaxed">
              Konfirmasi apakah perangkat kontrol akses untuk{" "}
              <span className="font-semibold">{deviceName}</span> dapat dibuka
              dari jarak jauh?
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RemoteUnlockModal;
