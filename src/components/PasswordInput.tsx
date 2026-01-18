import React, { useState } from 'react';
import { getPasswordStrength } from '@/src/lib/validation';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ label, error, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const strength = props.value ? getPasswordStrength(props.value as string) : null;

  const strengthColors = [
    'bg-gray-200',
    'bg-red-400',
    'bg-orange-400',
    'bg-yellow-400',
    'bg-blue-400',
    'bg-green-400',
    'bg-green-600',
  ];

  return (
    <div className="mb-4">
      <label
        className="mb-1 block text-sm font-medium text-gray-700"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <div className="relative">
        <input
          className={`w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          type={showPassword ? 'text' : 'password'}
          {...props}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {strength && (
        <div className="mt-2">
          <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`h-full w-1/6 border-r border-white last:border-0 ${
                  i < strength.score ? strengthColors[strength.score] : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Password strength:{' '}
            {strength.score === 0
              ? 'Very weak'
              : strength.score < 3
                ? 'Weak'
                : strength.score < 5
                  ? 'Medium'
                  : 'Strong'}
          </p>
          {strength.feedback.length > 0 && strength.score < 6 && (
            <ul className="mt-1 list-inside list-disc text-xs text-gray-500">
              {strength.feedback.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
