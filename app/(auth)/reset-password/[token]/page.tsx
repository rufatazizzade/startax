'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FormInput } from '@/src/components/FormInput';
import { PasswordInput } from '@/src/components/PasswordInput';
import { LoadingButton } from '@/src/components/LoadingButton';
import { ErrorAlert } from '@/src/components/ErrorAlert';

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError(null);
    setStatus('loading');

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => router.push('/login'), 3000);
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
          Create new password
        </h2>
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Password reset successful</h3>
              <p className="mt-2 text-sm text-gray-600">
                Your password has been reset successfully. Redirecting to login...
              </p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <ErrorAlert message={error} />
              <PasswordInput
                label="New Password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FormInput
                label="Confirm New Password"
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div>
                <LoadingButton type="submit" className="w-full" loading={status === 'loading'}>
                  Reset password
                </LoadingButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
