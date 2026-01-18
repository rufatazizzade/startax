import React from 'react';
import { Card } from './Card';

interface AuthFormProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string | React.ReactNode;
}

export const AuthForm: React.FC<AuthFormProps> = ({ children, title, subtitle }) => {
  return (
    <div className="flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-secondary-900">
          {title}
        </h2>
        {subtitle && <div className="mt-2 text-center text-sm text-secondary-600">{subtitle}</div>}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="px-4 py-8 sm:px-10">{children}</Card>
      </div>
    </div>
  );
};
