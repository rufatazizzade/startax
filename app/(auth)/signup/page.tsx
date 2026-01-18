'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormInput } from '@/src/components/FormInput';
import { PasswordInput } from '@/src/components/PasswordInput';
import { LoadingButton } from '@/src/components/LoadingButton';
import { ErrorAlert } from '@/src/components/ErrorAlert';

import { AuthForm } from '@/src/components/AuthForm';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email format';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters';

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
      } else {
        setServerError(result.error || 'Something went wrong');
      }
    } catch {
      setServerError('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title="Create your account"
      subtitle={
        <>
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </>
      }
    >
      <ErrorAlert message={serverError} />

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="First Name"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
          />
          <FormInput
            label="Last Name"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
          />
        </div>

        <FormInput
          label="Email address"
          name="email"
          id="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <PasswordInput
          label="Password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />

        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />

        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
            I agree to the{' '}
            <Link href="/terms" className="text-blue-600 hover:text-blue-500">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </Link>
          </label>
        </div>

        <div>
          <LoadingButton type="submit" className="w-full" loading={loading}>
            Sign up
          </LoadingButton>
        </div>
      </form>
    </AuthForm>
  );
}
