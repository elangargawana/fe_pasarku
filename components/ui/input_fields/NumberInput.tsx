"use client";

import React from "react";

type Props = {
  value?: string | number;
  onChange?: (next: string) => void;
  placeholder?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number | string;
  readOnly?: boolean;
};

export default function NumberInput({ value = "", onChange, placeholder, className = "", min, max, step, readOnly }: Props) {
  return (
    <input
      type="number"
      value={value as any}
      onChange={(e) => onChange && onChange(e.target.value)}
      placeholder={placeholder}
      min={min}
      max={max}
      step={step}
      readOnly={readOnly}
      className={`w-full rounded-full border border-gray-200 px-4 py-3 focus:outline-none ${className}`}
    />
  );
}
