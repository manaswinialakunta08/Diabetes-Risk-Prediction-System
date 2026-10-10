import React from 'react';

export default function FormSection({
  title,
  subtitle,
  badge,
  icon: Icon,
  children,
  className = '',
}) {
  return (
    <section className={`bg-white rounded-2xl border border-slate-200/90 shadow-card p-5 sm:p-7 ${className}`}>
      <div className="flex items-start justify-between pb-5 mb-6 border-b border-slate-100">
        <div className="flex items-start gap-3.5">
          {Icon && (
            <div className="w-10 h-10 rounded-xl bg-navy-mist flex items-center justify-center text-navy-primary shrink-0 border border-navy-soft">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div>
            {badge && (
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-slate-100 text-slate-600 mb-1">
                {badge}
              </span>
            )}
            <h3 className="text-lg font-bold text-navy-deep tracking-tight">{title}</h3>
            {subtitle && <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>
      </div>

      <div className="space-y-6">{children}</div>
    </section>
  );
}

