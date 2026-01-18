import React from 'react';

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: string;
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, options, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="mb-2 block text-sm font-medium text-secondary-700">{label}</label>
        <select
          ref={ref}
          className={`w-full rounded-lg border bg-white px-4 py-2.5 text-secondary-900 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed disabled:bg-secondary-100 disabled:text-secondary-500 ${error ? 'border-danger-500 focus:ring-danger-500' : 'border-secondary-300'} ${className}`}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1.5 text-sm text-danger-600">{error}</p>}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';
