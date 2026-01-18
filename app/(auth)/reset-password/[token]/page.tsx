'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { AuthForm, PasswordInput, Button, ErrorAlert } from '@/src/components';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const token = params.token as string;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, new_password: password }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const data = await response.json();
        setError(data.error || 'Something went wrong');
      }
    } catch (_err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthForm title="Password reset successful">
        <div className="text-center">
          <p className="mb-6 text-secondary-600">
            Your password has been successfully reset. You can now sign in with your new password.
          </p>
          <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
            Go to login
          </Link>
        </div>
      </AuthForm>
    );
  }

  return (
    <AuthForm title="Set new password" subtitle="Enter your new password below.">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <PasswordInput
          label="New Password"
          name="password"
          required
          showStrength
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PasswordInput
          label="Confirm New Password"
          name="confirmPassword"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <ErrorAlert message={error} />

        <Button type="submit" className="w-full" isLoading={loading}>
          Reset Password
        </Button>
      </form>
    </AuthForm>
  );
}
