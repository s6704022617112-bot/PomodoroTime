import React from 'react';
import { AlertCircle, RotateCcw, X } from 'lucide-react';

interface CancelConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  isDark: boolean;
}

export function CancelConfirmModal({
  isOpen,
  onConfirm,
  onClose,
}: CancelConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div
      id="cancel-confirm-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="cancel-confirm-modal"
        className="w-full max-w-sm rounded-3xl p-6 shadow-2xl transition-all border border-zinc-200/80 dark:border-zinc-800 text-center"
        style={{
          backgroundColor: 'var(--modal-bg)',
          color: 'var(--text)',
          boxShadow: '0 20px 40px var(--shadow)',
        }}
      >
        {/* Warning Icon */}
        <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3.5">
          <AlertCircle className="w-7 h-7" />
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
          ต้องการรีเซ็ตเวลาหรือไม่?
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm opacity-75 mt-2 leading-relaxed">
          การยกเลิกจะหยุดการจับเวลาและรีเซ็ตรอบปัจจุบันกลับไปยังจุดเริ่มต้น
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            id="cancel-dialog-dismiss-btn"
            type="button"
            onClick={onClose}
            className="w-full sm:flex-1 py-2.5 px-4 rounded-full text-sm font-semibold opacity-75 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
          >
            ไม่รีเซ็ต
          </button>
          <button
            id="cancel-dialog-confirm-btn"
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full sm:flex-1 py-2.5 px-4 rounded-full text-sm font-bold bg-[#FF6347] dark:bg-[#E2553D] hover:scale-105 text-white shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>ยืนยันรีเซ็ต</span>
          </button>
        </div>
      </div>
    </div>
  );
}
