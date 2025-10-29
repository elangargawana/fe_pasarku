"use client";

import React from "react";
import TransitionModal from "@/components/ui/TransitionModal";
import Image from "next/image";

type Props = {
  src?: string | null;
  alt?: string;
  show: boolean;
  onClose: () => void;
  maxHeight?: string; // css value like '80vh'
};

export default function ImageLightbox({ src, alt = "image", show, onClose, maxHeight = "80vh" }: Props) {
  if (!src) return null;

  return (
    <TransitionModal
      show={show}
      onClose={onClose}
      wrapperClassName={"items-center justify-center p-4 sm:p-0"}
      panelClassName={"relative max-w-4xl w-full mx-4"}
    >
      <button
        type="button"
        aria-label="Tutup"
        onClick={onClose}
        className="absolute top-3 right-3 z-50 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white text-gray-700 shadow hover:bg-gray-100 transition"
      >
        ✕
      </button>

      <div className="rounded-md overflow-hidden bg-black flex items-center justify-center">
        {src.startsWith("data:") ? (
          // data URLs (local previews) — keep as <img>
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className="w-full h-auto object-contain" style={{ maxHeight }} />
        ) : (
          <Image src={src} alt={alt} width={1200} height={800} unoptimized className="w-full h-auto object-contain" style={{ maxHeight }} />
        )}
      </div>
    </TransitionModal>
  );
}
