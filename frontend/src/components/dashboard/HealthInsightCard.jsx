import React from 'react';
import { AlertCircle, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export default function HealthInsightCard({
  category,
  title,
  description,
  type = 'info', // 'warning' | 'positive' | 'neutral' | 'danger'
  recommendation,
  source = 'Self-reported survey indicator',
}) {
  const typeConfigs = {
    warning: {
      border: 'border-amber-200',
      bg: 'bg-amber-50/60',
      icon: AlertTriangle,
      iconColor: 'text-amber-600',
      badge: 'bg-amber-100 text-amber-800 border-amber-300',
      badgeText: 'Elevated Risk Factor',
    },
    danger: {
      border: 'border-red-200',
      bg: 'bg-red-50/60',
      icon: AlertCircle,
      iconColor: 'text-red-600',
      badge: 'bg-red-100 text-red-800 border-red-300',
      badgeText: 'High Priority Factor',
    },
    positive: {
      border: 'border-emerald-200',
      bg: 'bg-emerald-50/60',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      badgeText: 'Protective Indicator',
    },
    neutral: {
      border: 'border-slate-200',
      bg: 'bg-slate-50/80',
      icon: Info,
      iconColor: 'text-navy-primary',
      badge: 'bg-slate-100 text-slate-700 border-slate-200',
      badgeText: 'Baseline Observation',
    },
  };

  const config = typeConfigs[type] || typeConfigs.neutral;
  const Icon = config.icon;

  return (
    <div className={`rounded-xl border ${config.border} ${config.bg} p-4.5 transition-all shadow-xs`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${config.iconColor} shrink-0`} />
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
            {category}
          </span>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${config.badge}`}>
          {config.badgeText}
        </span>
      </div>

      <h4 className="text-sm font-bold text-navy-deep">{title}</h4>
      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{description}</p>

      {recommendation && (
        <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-xs text-slate-700">
          <strong className="text-navy-deep font-semibold">Clinical Note: </strong>
          {recommendation}
        </div>
      )}

      <div className="mt-2 text-[10px] text-slate-600 italic">
        Data origin: {source}
      </div>
    </div>
  );
}

