import React, { useState } from 'react';
import { AlertTriangle, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import Button from './Button';

export default function ErrorMessage({
  title = 'Assessment request failed',
  message = 'An unexpected error prevented the application from communicating with the prediction backend.',
  details,
  onRetry,
  className = '',
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      role="alert"
      className={`rounded-xl border border-red-200 bg-red-50/70 p-4 sm:p-5 text-slate-800 shadow-xs ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center text-red-600 shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-red-900">{title}</h4>
          <p className="mt-1 text-xs sm:text-sm text-red-700 leading-relaxed">
            {message}
          </p>

          {details && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs font-semibold text-red-800 hover:text-red-950 inline-flex items-center gap-1 focus:outline-none"
              >
                <span>{showDetails ? 'Hide technical diagnostics' : 'Show technical diagnostics'}</span>
                {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showDetails && (
                <pre className="mt-2 p-3 bg-red-950 text-red-100 rounded-lg text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                  {typeof details === 'object' ? JSON.stringify(details, null, 2) : details}
                </pre>
              )}
            </div>
          )}

          {onRetry && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                icon={RefreshCw}
                onClick={onRetry}
                className="bg-white border-red-300 text-red-700 hover:bg-red-50 hover:text-red-900"
              >
                Retry Request
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

