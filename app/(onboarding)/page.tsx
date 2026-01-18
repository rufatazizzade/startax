'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  AuthForm,
  FormSelect,
  FormRadio,
  Input,
  Button,
  StepIndicator,
  ErrorAlert,
} from '@/src/components';
import { useAuth } from '@/src/contexts/AuthContext';

const COUNTRIES = [
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR' },
  { label: 'Italy', value: 'IT' },
  { label: 'Spain', value: 'ES' },
  { label: 'United Kingdom', value: 'GB' },
  { label: 'Belgium', value: 'BE' },
  { label: 'Netherlands', value: 'NL' },
  { label: 'Austria', value: 'AT' },
  { label: 'Poland', value: 'PL' },
  { label: 'Sweden', value: 'SE' },
];

const BUSINESS_TYPES = [
  { label: 'Sole Trader', value: 'SOLE_TRADER' },
  { label: 'LLC / Private Limited Company', value: 'LLC' },
  { label: 'Freelancer', value: 'FREELANCER' },
  { label: 'Startup', value: 'STARTUP' },
  { label: 'Partnership', value: 'PARTNERSHIP' },
];

const REVENUE_RANGES = [
  { label: '€0 - €5k', value: '0_5K' },
  { label: '€5k - €25k', value: '5K_25K' },
  { label: '€25k - €100k', value: '25K_100K' },
  { label: '€100k - €500k', value: '100K_500K' },
  { label: '€500k+', value: '500K_PLUS' },
];

const COUNTRY_CURRENCY_MAP: Record<string, string> = {
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
    business_type: '',
    monthly_revenue_range: '',
    currency: 'EUR',
    num_employees: '0',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { refreshUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (formData.country) {
      setFormData((prev) => ({
        ...prev,
        currency: COUNTRY_CURRENCY_MAP[formData.country] || 'EUR',
      }));
    }
  }, [formData.country]);

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

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
      await refreshUser();
      router.push('/dashboard');
      } else {
      const data = await response.json();
      setError(data.error || 'Failed to complete onboarding');
      }
      } catch (_err) {
      setError('An error occurred. Please try again.');
      } finally {
      setLoading(false);
      }
      };

  return (
    <AuthForm
      title="Let&apos;s set up your profile"
      subtitle="This helps us tailor Startax to your business needs."
    >
      <div className="space-y-8">
        <StepIndicator currentStep={step} totalSteps={5} />

        {step === 1 && (
          <FormSelect
            label="Which country is your business based in?"
            options={COUNTRIES}
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          />
        )}

        {step === 2 && (
          <FormRadio
            label="What is your business type?"
            name="business_type"
            options={BUSINESS_TYPES}
            value={formData.business_type}
            onChange={(val) => setFormData({ ...formData, business_type: val })}
          />
        )}

        {step === 3 && (
          <FormRadio
            label="What is your estimated monthly revenue?"
            name="monthly_revenue_range"
            options={REVENUE_RANGES}
            value={formData.monthly_revenue_range}
            onChange={(val) => setFormData({ ...formData, monthly_revenue_range: val })}
          />
        )}

        {step === 4 && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-secondary-700">Confirm your business currency</p>
            <div className="rounded-lg bg-secondary-100 p-4 text-center text-2xl font-bold text-secondary-900">
              {formData.currency}
            </div>
            <p className="text-xs text-secondary-500">
              Automatically selected based on your country.
            </p>
          </div>
        )}

        {step === 5 && (
          <Input
            label="How many employees do you have?"
            type="number"
            min="0"
            value={formData.num_employees}
            onChange={(e) => setFormData({ ...formData, num_employees: e.target.value })}
          />
        )}

        <ErrorAlert message={error} />

        <div className="flex justify-between gap-4">
          {step > 1 && (
            <Button variant="secondary" className="w-full" onClick={handleBack}>
              Back
            </Button>
          )}
          {step < 5 ? (
            <Button
              className="w-full"
              onClick={handleNext}
              disabled={!formData.country && step === 1}
            >
              Next
            </Button>
          ) : (
            <Button className="w-full" onClick={handleSubmit} isLoading={loading}>
              Complete Setup
            </Button>
          )}
        </div>
      </div>
    </AuthForm>
  );
}
