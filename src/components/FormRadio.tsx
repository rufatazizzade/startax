import React from 'react';

interface Option {
  id: string;
  name: string;
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
  name,
  options,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="mb-4">
      <span className="mb-2 block text-sm font-medium text-gray-700">{label}</span>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.id}
            className={`flex cursor-pointer items-center rounded-lg border p-3 transition-colors ${
              value === option.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              name={name}
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              value={option.id}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
            />
            <span className="ml-3 font-medium text-gray-900">{option.name}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
