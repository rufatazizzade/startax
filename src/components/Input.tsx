import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-secondary-700">{label}</label>
        )}
        <input
          ref={ref}
          className={`w-full rounded-lg border bg-white px-4 py-2.5 text-secondary-900 transition-colors placeholder:text-secondary-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed disabled:bg-secondary-100 disabled:text-secondary-500 ${error ? 'border-danger-500 focus:ring-danger-500' : 'border-secondary-300'} ${className} `}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-danger-600">{error}</p>}
        {helperText && !error && <p className="mt-1.5 text-sm text-secondary-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
