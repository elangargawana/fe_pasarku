"use client";

import React from "react";

type Props = {
  value?: number | null;
  onChange?: (value: number | null) => void;
  placeholder?: string;
  className?: string;
  inputMode?: React.HTMLAttributeAnchorTarget | string;
};

export default function CurrencyInput({
  value = null,
  onChange,
  placeholder,
  className = "",
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    const n = digits ? parseInt(digits, 10) : null;
    onChange?.(n);
  };

  const display = typeof value === "number" && !isNaN(value) ? new Intl.NumberFormat("id-ID").format(value) : "";

  return (
    <input
      type="text"
      inputMode="numeric"
      value={display}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
    />
  );
}
