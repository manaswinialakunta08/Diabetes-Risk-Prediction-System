import React from 'react';

export default function IndicatorBadge({
  label,
  value,
  positiveIsGood = true,
  className = '',
}) {
  const isPositive = Number(value) === 1;

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';
  if (isPositive) {
    colorClasses = positiveIsGood
      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
      : 'bg-red-50 text-red-800 border-red-200';
  } else {
    colorClasses = positiveIsGood
      ? 'bg-amber-50 text-amber-800 border-amber-200'
      : 'bg-emerald-50 text-emerald-800 border-emerald-200';
  }

  return (
    <div
      className={`inline-flex items-center justify-between px-3 py-1.5 rounded-lg border text-xs font-medium ${colorClasses} ${className}`}
    >
      <span>{label}</span>
      <span className="ml-2 font-bold uppercase text-[10px]">
        {isPositive ? 'Present' : 'Not Reported'}
      </span>
    </div>
  );
}

