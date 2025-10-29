"use client";

import React from "react";

type Props = {
  show: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  panelClassName?: string;
  wrapperClassName?: string;
};

export default function TransitionModal({
  show,
  onClose,
  children,
  panelClassName = "w-full sm:max-w-4xl",
  // center by default (vertical + horizontal centering)
  wrapperClassName = "p-4 sm:p-0 items-center justify-center",
}: Props) {
  // Render nothing when not mounted? We keep it mounted but hide via classes to preserve state.
  return (
    <div
      className={`fixed inset-0 z-50 flex ${wrapperClassName} transition-opacity duration-200 ease-out ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!show}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => onClose && onClose()}
      />

      {/* Panel container - center child so panel is vertically centered */}
      <div className="relative z-10 mx-4 w-full max-w-7xl flex items-center justify-center">
        <div
          className={`relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all ${panelClassName} ${
            show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 sm:-translate-y-2 scale-95"
          }`}
          role="dialog"
          aria-modal="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
