import React from 'react';
import { Loader2, Activity } from 'lucide-react';

export default function LoadingState({
  title = 'Processing health data...',
  message = 'Executing machine learning inference against CDC BRFSS model pipeline.',
  variant = 'card', // 'card' | 'fullscreen' | 'skeleton'
}) {
  if (variant === 'skeleton') {
    return (
      <div className="space-y-4 animate-pulse w-full">
        <div className="h-8 bg-slate-200 rounded-lg w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-28 bg-slate-200 rounded-xl"></div>
          <div className="h-28 bg-slate-200 rounded-xl"></div>
          <div className="h-28 bg-slate-200 rounded-xl"></div>
        </div>
        <div className="h-64 bg-slate-200 rounded-xl"></div>
      </div>
    );
  }

  if (variant === 'fullscreen') {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-14 h-14 bg-navy-mist rounded-2xl mx-auto flex items-center justify-center text-navy-primary mb-4 border border-navy-soft animate-bounce">
            <Activity className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-navy-deep mb-2">{title}</h3>
          <p className="text-sm text-slate-500 mb-6">{message}</p>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-teal-accent">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Analyzing 21 survey indicators...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-card">
      <div className="w-12 h-12 bg-navy-mist rounded-2xl mx-auto flex items-center justify-center text-navy-primary mb-4 border border-navy-soft">
        <Loader2 className="w-6 h-6 animate-spin text-navy-primary" />
      </div>
      <h3 className="text-lg font-bold text-navy-deep mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-md mx-auto">{message}</p>
    </div>
  );
}

