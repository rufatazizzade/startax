'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormInput } from '@/src/components/FormInput';
import { LoadingButton } from '@/src/components/LoadingButton';
import { ErrorAlert } from '@/src/components/ErrorAlert';
import { useAuth } from '@/src/contexts/AuthContext';

import { AuthForm } from '@/src/components/AuthForm';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        login(result.data.accessToken, result.data.user);
        router.push(callbackUrl);
      } else {
        setServerError(result.error || 'Invalid credentials');
      }
    } catch {
      setServerError('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title="Sign in to Startax"
      subtitle={
        <>
          Or{' '}
          <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            create a new account
          </Link>
        </>
      }
    >
      <ErrorAlert message={serverError} />

      <form className="space-y-6" onSubmit={handleSubmit}>
        <FormInput
          label="Email address"
          name="email"
          id="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Password"
          name="password"
          id="password"
          type="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link
              href="/forgot-password"
              title="Forgot Password Page"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <LoadingButton type="submit" className="w-full" loading={loading}>
            Sign in
          </LoadingButton>
        </div>
      </form>
    </AuthForm>
  );
}
