"use client";

import React from "react";

type Variant = "blue" | "yellow" | "green" | "red" | "neutral";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: string; // tailwind classes for size if needed
}

const VARIANT_MAP: Record<Variant, string> = {
  blue: "border-2 border-blue-300 text-blue-500 hover:bg-blue-100 hover:border-blue-400 hover:text-blue-600",
  yellow: "border-2 border-yellow-200 text-yellow-600 hover:bg-yellow-100 hover:border-yellow-300 hover:text-yellow-700",
  green: "border-2 border-green-200 text-green-600 hover:bg-green-100 hover:border-green-300 hover:text-green-700",
  red: "border-2 border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300 hover:text-red-700",
  neutral: "border-2 border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-700",
};

export default function IconButton({ variant = "neutral", size = "w-10 h-10", className = "", children, ...rest }: IconButtonProps) {
  const variantClasses = VARIANT_MAP[variant];
  const base = `${size} rounded-full flex items-center justify-center transition-colors duration-150 ${variantClasses}`;

  return (
    <button className={`${base} ${className}`} {...rest}>
      {children}
    </button>
  );
}
