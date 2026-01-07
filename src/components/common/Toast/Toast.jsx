import React, { useEffect } from "react";
import { AlertCircle, CheckCircle, X } from "lucide-react";

export const Toast = ({ message, type = "success", onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = type === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200";
  const textColor = type === "success" ? "text-green-800" : "text-red-800";
  const iconColor = type === "success" ? "text-green-500" : "text-red-500";
  const Icon = type === "success" ? CheckCircle : AlertCircle;

  return (
    <div
      className={`fixed top-4 right-4 flex items-center gap-3 px-4 py-3 rounded-lg border ${bgColor} shadow-lg z-50 animate-in slide-in-from-top`}
    >
      <Icon size={20} className={iconColor} />
      <span className={`text-sm font-medium ${textColor}`}>{message}</span>
      <button
        onClick={onClose}
        className={`ml-2 ${textColor} hover:opacity-70`}
      >
        <X size={16} />
      </button>
    </div>
  );
};
