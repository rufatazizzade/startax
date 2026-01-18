import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`rounded-xl border border-secondary-200 bg-white shadow-soft ${className}`}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return <div className={`border-b border-secondary-200 px-6 py-4 ${className}`}>{children}</div>;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return <h3 className={`text-xl font-semibold text-secondary-900 ${className}`}>{children}</h3>;
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return <p className={`mt-1 text-sm text-secondary-600 ${className}`}>{children}</p>;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return <div className={`border-t border-secondary-200 px-6 py-4 ${className}`}>{children}</div>;
}
