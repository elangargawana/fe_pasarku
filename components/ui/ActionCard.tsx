"use client";

import React from "react";
import Image from "next/image";

type Props = {
  title: string;
  icon?: string; // path under public/
  badge?: number;
  onClick?: () => void;
};

export default function ActionCard({ title, icon, badge, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative w-full bg-green-50 border border-green-300 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 transform transition duration-150 hover:scale-[1.02] hover:shadow-lg hover:bg-green-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300"
    >
      {icon ? (
        <Image src={icon} alt={title} width={96} height={96} className="w-24 h-24 sm:w-20 sm:h-20 object-contain" />
      ) : (
        <div className="w-24 h-24 sm:w-20 sm:h-20 rounded-full bg-white/50" />
      )}

      <div className="flex items-center justify-center gap-2">
        <div className="text-sm text-green-700 font-medium text-center">{title}</div>
        {/* Inline badge for mobile (visible on small screens), corner badge for >= sm */}
        {typeof badge === 'number' && (
          <span className="inline-flex items-center justify-center bg-yellow-400 text-xs text-black rounded-full px-2 py-0.5 sm:hidden">{badge}</span>
        )}
      </div>

      {/* corner badge for sm+ screens */}
      {typeof badge === 'number' && (
        <span className="absolute top-3 right-4 hidden sm:inline-flex items-center justify-center bg-yellow-400 text-xs text-black rounded-full px-2 py-0.5">{badge}</span>
      )}
    </button>
  );
}
