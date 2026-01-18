'use client';

import { useAuth } from '@/src/contexts/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="mb-6 text-4xl font-bold text-secondary-900">Dashboard</h1>
      <p className="text-secondary-600">Welcome to your Startax dashboard, {user?.firstName}!</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="shadow-soft-md rounded-xl border border-secondary-200 bg-white p-6">
          <h3 className="mb-2 text-lg font-bold text-secondary-900">Tax Overview</h3>
          <p className="text-sm text-secondary-600">
            View your upcoming tax deadlines and estimated liabilities.
          </p>
        </div>
        <div className="shadow-soft-md rounded-xl border border-secondary-200 bg-white p-6">
          <h3 className="mb-2 text-lg font-bold text-secondary-900">AI Assistant</h3>
          <p className="text-sm text-secondary-600">
            Ask our AI any tax-related questions for your business.
          </p>
        </div>
        <div className="shadow-soft-md rounded-xl border border-secondary-200 bg-white p-6">
          <h3 className="mb-2 text-lg font-bold text-secondary-900">Business Profile</h3>
          <p className="text-sm text-secondary-600">
            Manage your business details and subscription.
          </p>
        </div>
      </div>
    </div>
  );
}
