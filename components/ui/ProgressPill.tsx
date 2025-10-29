import React from 'react';

type Props = { percent: number };

export default function ProgressPill({ percent }: Props) {
  const p = Math.max(0, Math.min(100, Number(percent || 0)));
  const bgClass = p >= 70 ? 'bg-green-100' : p >= 40 ? 'bg-yellow-100' : 'bg-red-100';

  return (
    <div className="relative w-full">
      <div className="h-8 rounded-full border border-green-600 bg-green-50 overflow-hidden relative">
        <div
          className={["absolute left-0 top-0 bottom-0", bgClass].join(' ')}
          style={{ width: `${p}%`, transition: 'width 300ms ease' }}
        />
        <div className="relative z-10 flex items-center justify-center h-8 text-sm font-medium text-green-700">
          {p}%
        </div>
      </div>
    </div>
  );
}
