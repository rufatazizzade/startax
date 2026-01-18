'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ErrorAlert } from '@/src/components/ErrorAlert';

export default function VerifyTokenPage() {
  const { token } = useParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const result = await response.json();

        if (response.ok) {
          setStatus('success');
          // Automatically redirect to login after 3 seconds
          setTimeout(() => router.push('/login'), 3000);
        } else {
          setStatus('error');
          setError(result.error || 'Verification failed');
        }
      } catch {
        setStatus('error');
        setError('Failed to connect to the server');
      }
    };

    if (token) {
      verify();
    }
  }, [token, router]);

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 text-center shadow sm:rounded-lg sm:px-10">
          {status === 'loading' && (
            <div className="flex flex-col items-center">
              <svg
                className="mb-4 h-10 w-10 animate-spin text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <h2 className="text-xl font-semibold">Verifying your email...</h2>
            </div>
          )}

          {status === 'success' && (
            <div>
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
              <h2 className="mb-2 text-2xl font-bold text-gray-900">Email verified!</h2>
              <p className="mb-6 text-gray-600">
                Your email has been successfully verified. You are being redirected to the login
                page.
              </p>
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Click here if you are not redirected
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div>
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-red-100 p-3">
                  <svg
                    className="h-8 w-8 text-red-600"
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
              </div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900">Verification failed</h2>
              <ErrorAlert message={error} />
              <div className="mt-6">
                <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                  Try signing up again
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
