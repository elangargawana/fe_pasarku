"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = {
  /** controlled previews as data URLs */
  previews?: string[];
  onChange?: (previews: string[]) => void;
  maxFiles?: number;
  accept?: string;
  maxSizeMB?: number;
  note?: string;
};

export default function PhotoUploader({
  previews = [],
  onChange,
  maxFiles = 3,
  accept = "image/png, image/jpeg, image/jpg",
  maxSizeMB = 1,
  note,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [localPreviews, setLocalPreviews] = useState<string[]>(previews || []);
  React.useEffect(() => {
    const t = setTimeout(() => setLocalPreviews(previews || []), 0);
    return () => clearTimeout(t);
  }, [previews]);

  const readFiles = (files: FileList | null) => {
    if (!files) return;
    const available = Math.max(0, maxFiles - localPreviews.length);
    const incoming = Array.from(files).slice(0, available);
    if (incoming.length === 0) return;

    const readers: Promise<string>[] = incoming.map((f) => {
      return new Promise((res, rej) => {
        if (f.size > maxSizeMB * 1024 * 1024) {
          // skip oversized files
          return res("");
        }
        const r = new FileReader();
        r.onload = () => res(String(r.result));
        r.onerror = () => res("");
        r.readAsDataURL(f);
      });
    });

    Promise.all(readers).then((dataUrls) => {
      const filtered = dataUrls.filter(Boolean);
      const next = [...localPreviews, ...filtered].slice(0, maxFiles);
      setLocalPreviews(next);
      onChange?.(next);
    });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    readFiles(e.target.files);
    // reset input so same file can be selected again
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeAt = (index: number) => {
    const next = localPreviews.filter((_, i) => i !== index);
    setLocalPreviews(next);
    onChange?.(next);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start gap-6">
      <label className="group w-full sm:w-44 h-36 shrink-0 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-green-300 hover:border-green-400 p-3 text-center cursor-pointer">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          className="hidden"
          onChange={handleInput}
        />
        <div className="text-green-600 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15l-5-5-7 7-4-4" />
            <circle cx="8.5" cy="8.5" r="1.5" />
          </svg>
        </div>
        <div className="text-sm text-gray-600">
          <div className="font-semibold">Choose a file</div>
          <div className="text-xs">or a drag it here</div>
        </div>
      </label>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-700">Preview</div>
          <div className="text-sm text-gray-500">{localPreviews.length}/{maxFiles} Foto</div>
        </div>

        <div className="flex gap-3 overflow-x-auto">
          {Array.from({ length: maxFiles }).map((_, i) => (
            <div key={i} className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden relative flex items-center justify-center">
              {localPreviews[i] ? (
                <>
                  <img src={localPreviews[i]} alt={`preview-${i}`} className="object-cover w-full h-full" />
                  <button
                    type="button"
                    onClick={() => removeAt(i)}
                    className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-red-600 hover:bg-white"
                    aria-label="Hapus foto"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">&nbsp;</div>
              )}
            </div>
          ))}
        </div>

        {note && <div className="text-xs text-gray-500 mt-2">{note}</div>}
      </div>
    </div>
  );
}
