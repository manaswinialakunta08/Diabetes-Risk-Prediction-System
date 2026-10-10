import React from 'react';

export default function ToggleField({
  id,
  name,
  label,
  description,
  checked,
  onChange,
  disabled = false,
  className = '',
}) {
  const toggleId = id || name;
  const isChecked = Boolean(Number(checked) === 1 || checked === true);

  const handleToggle = () => {
    if (!disabled && onChange) {
      onChange(isChecked ? 0 : 1);
    }
  };

  return (
    <div
      onClick={handleToggle}
      className={`group flex items-start justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
        isChecked
          ? 'border-navy-primary/30 bg-navy-mist/30 shadow-xs'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <div className="pr-4 select-none">
        <label
          htmlFor={toggleId}
          className="text-sm font-semibold text-slate-900 group-hover:text-navy-deep cursor-pointer"
        >
          {label}
        </label>
        {description && (
          <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        role="switch"
        id={toggleId}
        aria-checked={isChecked}
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
        }}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-navy-primary focus:ring-offset-2 ${
          isChecked ? 'bg-navy-primary' : 'bg-slate-200'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
            isChecked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

