import React from 'react';

export default function PageContainer({
  children,
  maxWidth = '7xl',
  className = '',
  title,
  subtitle,
  badge,
  actions,
}) {
  const maxWMap = {
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <main className={`min-h-[calc(100vh-140px)] py-8 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className={`mx-auto ${maxWMap[maxWidth] || 'max-w-7xl'}`}>
        {(title || subtitle || actions) && (
          <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              {badge && (
                <div className="mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-navy-mist text-navy-primary border border-navy-soft">
                    {badge}
                  </span>
                </div>
              )}
              {title && (
                <h1 className="text-2xl sm:text-3xl font-bold text-navy-deep tracking-tight">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-1.5 text-sm sm:text-base text-slate-500 max-w-3xl">
                  {subtitle}
                </p>
              )}
            </div>
            {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
          </div>
        )}
        {children}
      </div>
    </main>
  );
}

