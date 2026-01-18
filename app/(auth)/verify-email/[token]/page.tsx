'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AuthForm, Button } from '@/src/components';

export default function TokenVerifyPage() {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Please wait while we verify your email...');
  const params = useParams();
  const token = params.token as string;
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          setStatus('success');
          setMessage('Your email has been successfully verified! You can now log in.');
        } else {
          const data = await response.json();
          setStatus('error');
          setMessage(data.error || 'Invalid or expired verification link.');
        }
      } catch (err) {
        setStatus('error');
        setMessage('An error occurred. Please try again.');
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token]);

  return (
    <AuthForm title="Email Verification">
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          {status === 'verifying' && (
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
          )}
          {status === 'success' && (
            <div className="rounded-full bg-success-100 p-3">
              <svg
                className="h-12 w-12 text-success-600"
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
          )}
          {status === 'error' && (
            <div className="rounded-full bg-danger-100 p-3">
              <svg
                className="h-12 w-12 text-danger-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
        </div>

        <p className="text-secondary-600">{message}</p>

        {status !== 'verifying' && (
          <Button className="w-full" onClick={() => router.push('/login')}>
            Go to login
          </Button>
        )}
      </div>
    </AuthForm>
  );
}
