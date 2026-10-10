import React from 'react';
import { Info } from 'lucide-react';

export default function ChartCard({
  title,
  subtitle,
  badge,
  infoTooltip,
  action,
  children,
  className = '',
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/90 shadow-card p-5 sm:p-6 flex flex-col justify-between ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-navy-deep tracking-tight">{title}</h3>
            {badge && (
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-navy-mist text-navy-primary border border-navy-soft">
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2">
          {action}
          {infoTooltip && (
            <div className="group relative">
              <button
                type="button"
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label="Clinical metric information"
              >
                <Info className="w-4 h-4" />
              </button>
              <div className="hidden group-hover:block absolute right-0 bottom-full mb-2 w-64 p-2.5 bg-slate-900 text-white text-xs rounded-lg shadow-xl z-30 leading-snug">
                {infoTooltip}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full min-h-[260px] flex-1 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
}

