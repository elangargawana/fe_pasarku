"use client";

import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export default function Input({ className = "", ...props }: Props) {
  return (
    <input
      {...props}
      className={`w-full rounded-full border border-gray-200 px-4 py-3 focus:outline-none ${className}`}
    />
  );
}
