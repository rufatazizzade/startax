import React from 'react';

interface Option {
  label: string;
  value: string;
}

interface FormRadioProps {
  label: string;
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const FormRadio: React.FC<FormRadioProps> = ({
  label,
  name: _name,
  options,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="w-full">
      <label className="mb-3 block text-sm font-medium text-secondary-700">{label}</label>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none ${
              value === option.value
                ? 'border-primary-600 ring-2 ring-primary-600'
                : 'border-secondary-300'
            }`}
          >
            <span className="flex flex-1">
              <span className="flex flex-col">
                <span className="block text-sm font-medium text-secondary-900">{option.label}</span>
              </span>
            </span>
            <svg
              className={`h-5 w-5 text-primary-600 ${value === option.value ? '' : 'invisible'}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ))}
      </div>
      {error && <p className="mt-1.5 text-sm text-danger-600">{error}</p>}
    </div>
  );
};
