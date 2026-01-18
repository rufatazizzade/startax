import React from 'react';

interface AuthFormProps {
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}

export const AuthForm: React.FC<AuthFormProps> = ({ title, subtitle, children }) => {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{title}</h2>
        {subtitle && <p className="mt-2 text-center text-sm text-gray-600">{subtitle}</p>}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">{children}</div>
      </div>
    </div>
  );
};
