'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FormInput } from '@/src/components/FormInput';
import { LoadingButton } from '@/src/components/LoadingButton';
import { ErrorAlert } from '@/src/components/ErrorAlert';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus('loading');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const result = await response.json();
        setError(result.error || 'Something went wrong');
        setStatus('idle');
      }
    } catch {
      setError('Failed to connect to the server');
      setStatus('idle');
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          {status === 'success' ? (
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Check your email</h3>
              <p className="mt-2 text-sm text-gray-600">
                We&apos;ve sent a password reset link to{' '}
                <span className="font-semibold">{email}</span>.
              </p>
              <div className="mt-6">
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Back to login
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <ErrorAlert message={error} />
              <FormInput
                label="Email address"
                name="email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div>
                <LoadingButton type="submit" className="w-full" loading={status === 'loading'}>
                  Send reset link
                </LoadingButton>
              </div>
              <div className="text-center">
                <Link
                  href="/login"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
