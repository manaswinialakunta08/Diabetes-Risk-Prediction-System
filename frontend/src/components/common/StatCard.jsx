import React from 'react';

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  badgeType = 'default', // 'default' | 'success' | 'warning' | 'danger' | 'info'
  variant = 'default',
  className = '',
}) {
  const badgeColors = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    info: 'bg-navy-mist text-navy-primary border-navy-soft',
  };

  return (
    <div
      className={`bg-white rounded-xl border border-slate-200/90 p-5 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between ${className}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 shrink-0">
            <Icon className="w-4 h-4 text-navy-primary" />
          </div>
        )}
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-navy-deep tracking-tight">
            {value}
          </span>
          {badge && (
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                badgeColors[badgeType] || badgeColors.default
              }`}
            >
              {badge}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs text-slate-500 mt-1.5">{subtitle}</p>}
      </div>
    </div>
  );
}

