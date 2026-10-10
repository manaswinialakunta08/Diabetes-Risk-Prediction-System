import React from 'react';
import { ClipboardList } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = ClipboardList,
  title = 'No assessment recorded yet',
  description = 'Complete the health indicators questionnaire to generate your baseline risk profile and population analytics.',
  actionLabel = 'Start Health Assessment',
  onAction,
  className = '',
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-card ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-navy-mist mx-auto flex items-center justify-center text-navy-primary mb-4 border border-navy-soft">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-navy-deep tracking-tight mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

