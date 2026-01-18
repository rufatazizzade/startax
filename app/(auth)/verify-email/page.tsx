'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AuthForm, Button, ErrorAlert } from '@/src/components';

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    setError('');
    // In a real app, call an API to resend verification
    // For now we simulate success
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <AuthForm
      title="Verify your email"
      subtitle="We've sent a verification link to your email address. Please click the link to verify your account."
    >
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary-100 p-3">
            <svg
              className="h-12 w-12 text-primary-600"
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

        <p className="text-secondary-600">
          Didn&apos;t receive the email? Check your spam folder or click below to resend.
        </p>

        {sent && (
          <p className="text-sm font-medium text-success-600">
            Verification email resent successfully!
          </p>
        )}

        <ErrorAlert message={error} />

        <Button variant="outline" className="w-full" onClick={handleResend} isLoading={loading}>
          Resend verification email
        </Button>

        <div className="text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            Back to login
          </Link>
        </div>
      </div>
    </AuthForm>
  );
}
