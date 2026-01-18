import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({ label, options, error, ...props }) => {
  return (
    <div className="mb-4">
      <label
        className="mb-1 block text-sm font-medium text-gray-700"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <select
        className={`w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      >
        {props.placeholder && <option value="">{props.placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
