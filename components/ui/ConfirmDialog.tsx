"use client";

import React from "react";

type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title = "Confirm",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const [visible, setVisible] = React.useState(false);
  const [animate, setAnimate] = React.useState(false);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (open) {
      setVisible(true);
      // delay sedikit supaya browser sempat render dulu (agar fade-in bisa terlihat)
      timeout = setTimeout(() => setAnimate(true), 20);
    } else {
      // matikan animasi dulu (fade-out)
      setAnimate(false);
      // tunggu sampai transisi selesai baru hapus dari DOM
      timeout = setTimeout(() => setVisible(false), 200);
    }

    return () => clearTimeout(timeout);
  }, [open]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ease-out ${
        animate ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ease-out ${
          animate ? "opacity-100" : "opacity-0"
        }`}
        onClick={onCancel}
      />

      {/* Modal box */}
      <div
        className={`bg-white rounded-lg p-6 shadow-lg z-10 max-w-sm w-full transform transition-all duration-200 ease-out ${
          animate
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-4 scale-95"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        )}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transform transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-green-300"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md border border-red-600 text-red-600 hover:bg-red-50 transform transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-red-300"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
