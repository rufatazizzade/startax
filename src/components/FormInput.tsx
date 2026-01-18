import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({ label, error, ...props }) => {
  return (
    <div className="mb-4">
      <label
        className="mb-1 block text-sm font-medium text-gray-700"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        className={`w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
