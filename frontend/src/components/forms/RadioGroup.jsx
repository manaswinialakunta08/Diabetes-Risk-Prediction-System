import React from 'react';

export default function RadioGroup({
  name,
  label,
  value,
  onChange,
  options = [],
  helperText,
  error,
  required = false,
  orientation = 'horizontal', // 'horizontal' | 'vertical' | 'cards'
  className = '',
}) {
  return (
    <fieldset className={`w-full ${className}`}>
      {label && (
        <legend className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </legend>
      )}

      {helperText && <p className="text-xs text-slate-500 mb-2">{helperText}</p>}

      <div
        className={
          orientation === 'horizontal'
            ? 'flex flex-wrap gap-2'
            : orientation === 'vertical'
            ? 'flex flex-col gap-2'
            : 'grid grid-cols-1 sm:grid-cols-2 gap-2.5'
        }
      >
        {options.map((opt) => {
          const isSelected = Number(value) === Number(opt.value);
          const optionId = `${name}-${opt.value}`;

          return (
            <label
              key={opt.value}
              htmlFor={optionId}
              className={`relative flex items-center justify-between p-3 rounded-lg border text-sm cursor-pointer transition-all ${
                isSelected
                  ? 'border-navy-primary bg-navy-mist/40 text-navy-deep font-semibold shadow-xs ring-1 ring-navy-primary/30'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  id={optionId}
                  name={name}
                  value={opt.value}
                  checked={isSelected}
                  onChange={() => onChange(opt.value)}
                  className="w-4 h-4 text-navy-primary border-slate-300 focus:ring-navy-primary/30"
                />
                <span className="select-none">{opt.label}</span>
              </div>
              {opt.badge && (
                <span className="text-xs text-slate-500 font-normal ml-2">
                  {opt.badge}
                </span>
              )}
            </label>
          );
        })}
      </div>

      {error && <p className="mt-1.5 text-xs text-red-600 font-medium">{error}</p>}
    </fieldset>
  );
}

