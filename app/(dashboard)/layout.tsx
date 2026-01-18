'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/contexts/AuthContext';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white shadow-md">
        <div className="p-6">
          <Link href="/dashboard" className="text-2xl font-bold text-blue-600">
            Startax
          </Link>
        </div>
        <nav className="mt-6 px-4">
          <Link
            href="/dashboard"
            className="flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          >
            Dashboard
          </Link>
          <Link
            href="/chat"
            className="mt-2 flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          >
            AI Assistant
          </Link>
          <Link
            href="/tax-calculator"
            className="mt-2 flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          >
            Tax Calculator
          </Link>
          <Link
            href="/deadlines"
            className="mt-2 flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          >
            Deadlines
          </Link>
          <Link
            href="/settings"
            className="mt-2 flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between bg-white px-8 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800">Welcome, {user.firstName}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <button
              onClick={logout}
              className="text-sm font-medium text-red-600 hover:text-red-500"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-8">{children}</main>
      </div>
    </div>
  );
}
