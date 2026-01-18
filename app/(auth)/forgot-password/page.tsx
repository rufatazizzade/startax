'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AuthForm, Input, Button, ErrorAlert } from '@/src/components';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const data = await response.json();
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthForm title="Check your email">
        <div className="text-center">
          <p className="mb-6 text-secondary-600">
            We&apos;ve sent a password reset link to <strong>{email}</strong>.
          </p>
          <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
            Back to login
          </Link>
        </div>
      </AuthForm>
    );
  }

  return (
    <AuthForm
      title="Reset your password"
      subtitle="Enter your email and we'll send you a link to reset your password."
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <ErrorAlert message={error} />

        <Button type="submit" className="w-full" isLoading={loading}>
          Send reset link
        </Button>

        <div className="text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            Back to login
          </Link>
        </div>
      </form>
    </AuthForm>
  );
}
