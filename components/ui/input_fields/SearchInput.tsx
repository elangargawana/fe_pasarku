"use client";

import React from "react";

type SearchInputProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  onSearch?: (v: string) => void;
  debounceMs?: number;
  showButton?: boolean;
  className?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = "Cari Pedagang",
  onSearch,
  debounceMs = 300,
  showButton = true,
  className = "",
}: SearchInputProps) {
  const [internal, setInternal] = React.useState(value);

  React.useEffect(() => {
    setInternal(value);
  }, [value]);

  React.useEffect(() => {
    if (!debounceMs || debounceMs <= 0) return;
    const t = setTimeout(() => onChange(internal), debounceMs);
    return () => clearTimeout(t);
  }, [internal]);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onChange(internal);
      onSearch?.(internal);
    }
  };

  return (
    <div
      className={`flex items-center overflow-hidden rounded-full border border-gray-300 bg-white ${className}`}
      style={{ height: "38px" }}
    >
      <input
        type="search"
        value={internal}
        onChange={(e) => setInternal(e.target.value)}
        onKeyDown={handleKey}
        placeholder={placeholder}
        className="flex-1 h-full px-4 text-sm text-gray-700 placeholder-gray-400 outline-none border-none bg-transparent"
        aria-label={placeholder}
      />

      {showButton && (
        <button
          type="button"
          onClick={() => {
            onChange(internal);
            onSearch?.(internal);
          }}
          className="h-full px-4 bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21l-4.35-4.35"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="11"
              cy="11"
              r="6"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
