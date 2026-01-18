'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/contexts/AuthContext';
import { LoadingButton } from '@/src/components/LoadingButton';
import { ErrorAlert } from '@/src/components/ErrorAlert';
import { FormInput } from '@/src/components/FormInput';
import { FormSelect } from '@/src/components/FormSelect';
import { FormRadio } from '@/src/components/FormRadio';
import { StepIndicator } from '@/src/components/StepIndicator';

const countries = [
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'IT', label: 'Italy' },
  { value: 'ES', label: 'Spain' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'BE', label: 'Belgium' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'AT', label: 'Austria' },
  { value: 'PL', label: 'Poland' },
  { value: 'SE', label: 'Sweden' },
];

const businessTypes = [
  { id: 'SOLE_TRADER', name: 'Sole Trader' },
  { id: 'LLC', name: 'LLC / Limited Company' },
  { id: 'FREELANCER', name: 'Freelancer' },
  { id: 'STARTUP', name: 'Startup' },
  { id: 'PARTNERSHIP', name: 'Partnership' },
];

const revenueRanges = [
  { id: '0_5K', name: '€0 - €5k' },
  { id: '5K_25K', name: '€5k - €25k' },
  { id: '25K_100K', name: '€25k - €100k' },
  { id: '100K_500K', name: '€100k - €500k' },
  { id: '500K_PLUS', name: '€500k+' },
];

const currencies = [
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'GBP', label: 'GBP - British Pound' },
  { value: 'PLN', label: 'PLN - Polish Złoty' },
  { value: 'SEK', label: 'SEK - Swedish Krona' },
  { value: 'ATS', label: 'ATS - Austrian Schilling' },
];

const countryCurrencies: Record<string, string> = {
  DE: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  ES: 'EUR',
  GB: 'GBP',
  BE: 'EUR',
  NL: 'EUR',
  AT: 'EUR',
  PL: 'PLN',
  SE: 'SEK',
};

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    country: '',
    businessType: '',
    monthlyRevenueRange: '',
    currency: 'EUR',
    numEmployees: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (formData.country) {
      setFormData((prev) => ({
        ...prev,
        currency: countryCurrencies[formData.country] || 'EUR',
      }));
    }
  }, [formData.country]);

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const result = await response.json();
        setError(result.error || 'Failed to complete onboarding');
      }
    } catch {
      setError('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <StepIndicator currentStep={step} totalSteps={5} />

        <ErrorAlert message={error} />

        {step === 1 && (
          <div>
            <h2 className="mb-4 text-2xl font-bold">Which country is your business in?</h2>
            <FormSelect
              label="Country"
              options={countries}
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              placeholder="Select a country"
            />
            <LoadingButton className="w-full" disabled={!formData.country} onClick={handleNext}>
              Next
            </LoadingButton>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="mb-4 text-2xl font-bold">What is your business type?</h2>
            <FormRadio
              label="Business Type"
              name="businessType"
              options={businessTypes}
              value={formData.businessType}
              onChange={(value) => setFormData({ ...formData, businessType: value })}
            />
            <div className="flex space-x-4">
              <button className="flex-1 py-2 font-medium text-gray-600" onClick={handleBack}>
                Back
              </button>
              <LoadingButton
                className="flex-1"
                disabled={!formData.businessType}
                onClick={handleNext}
              >
                Next
              </LoadingButton>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="mb-4 text-2xl font-bold">Monthly revenue range?</h2>
            <FormRadio
              label="Revenue Range"
              name="revenueRange"
              options={revenueRanges}
              value={formData.monthlyRevenueRange}
              onChange={(value) => setFormData({ ...formData, monthlyRevenueRange: value })}
            />
            <div className="flex space-x-4">
              <button className="flex-1 py-2 font-medium text-gray-600" onClick={handleBack}>
                Back
              </button>
              <LoadingButton
                className="flex-1"
                disabled={!formData.monthlyRevenueRange}
                onClick={handleNext}
              >
                Next
              </LoadingButton>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="mb-4 text-2xl font-bold">Currency?</h2>
            <p className="mb-6 text-gray-600">
              Based on your country, we&apos;ve selected <strong>{formData.currency}</strong>.
            </p>
            <FormSelect
              label="Currency"
              options={currencies}
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
            />
            <div className="flex space-x-4">
              <button className="flex-1 py-2 font-medium text-gray-600" onClick={handleBack}>
                Back
              </button>
              <LoadingButton className="flex-1" onClick={handleNext}>
                Next
              </LoadingButton>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="mb-4 text-2xl font-bold">How many employees?</h2>
            <FormInput
              label="Number of employees"
              type="number"
              min="0"
              value={formData.numEmployees}
              onChange={(e) =>
                setFormData({ ...formData, numEmployees: parseInt(e.target.value) || 0 })
              }
            />
            <div className="mt-6 flex space-x-4">
              <button className="flex-1 py-2 font-medium text-gray-600" onClick={handleBack}>
                Back
              </button>
              <LoadingButton className="flex-1" loading={loading} onClick={handleSubmit}>
                Complete
              </LoadingButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
