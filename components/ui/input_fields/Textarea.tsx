"use client";

import React from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
};

export default function Textarea({ className = "", ...props }: Props) {
  return (
    <textarea
      {...props}
      className={`w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none ${className}`}
    />
  );
}
