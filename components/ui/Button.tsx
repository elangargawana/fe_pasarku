"use client";

import React from 'react';
// styles are provided globally from app/globals.css

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'danger' | 'success';
  children: React.ReactNode;
};

export default function Button({ variant = 'primary', children, ...rest }: Props){
  // allow consumer to pass className via rest
  const { className, ...restProps } = rest as any;

  const base = 'inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed';
  const primary = 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow hover:from-green-600 hover:to-green-700 focus-visible:ring-green-300 transform transition duration-150 ease-out hover:scale-105 disabled:from-gray-300 disabled:to-gray-300 disabled:bg-gray-300 disabled:text-gray-600 disabled:shadow-none';
  // flat success variant: no scale on hover, slightly darker bg
  const success = 'bg-green-600 text-white border border-transparent hover:bg-green-700 focus-visible:ring-green-300 shadow-none disabled:bg-gray-300 disabled:text-gray-600 disabled:border-gray-300 disabled:shadow-none';
  const outline = 'bg-white border border-green-200 text-green-600 hover:bg-green-50 focus-visible:ring-green-300 transform transition duration-150 ease-out disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400 disabled:shadow-none';
  // flat danger variant (no scale on hover) to match existing red pill style
  const danger = 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-300 shadow-none transition-colors duration-150 ease-out disabled:bg-gray-300 disabled:text-gray-600 disabled:shadow-none';

  let variantCls = outline;
  if (variant === 'primary') variantCls = primary;
  if (variant === 'danger') variantCls = danger;
  if (variant === 'success') variantCls = success;
  const cls = [base, variantCls, className].filter(Boolean).join(' ');

  return (
    <button {...restProps} className={cls}>
      {children}
    </button>
  );
}
