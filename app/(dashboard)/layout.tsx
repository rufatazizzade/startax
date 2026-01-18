'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/contexts/AuthContext';

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
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-secondary-50">
      {/* Sidebar / Navigation */}
      <aside className="hidden w-64 border-r border-secondary-200 bg-white md:block">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary-600">Startax</h1>
        </div>
        <nav className="mt-6 space-y-2 px-4">
          <a
            href="/dashboard"
            className="block rounded-lg bg-secondary-100 px-4 py-2 font-medium text-secondary-900"
          >
            Dashboard
          </a>
          {/* More links would go here in a full implementation */}
        </nav>
        <div className="absolute bottom-0 w-64 border-t border-secondary-200 p-4">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 font-bold text-primary-700">
              {user.firstName ? user.firstName[0] : 'U'}
            </div>
            <div className="flex-1 truncate">
              <p className="truncate text-sm font-medium text-secondary-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="truncate text-xs text-secondary-500">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="mt-2 flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-danger-600 transition-colors hover:bg-danger-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1">
        <header className="flex h-16 items-center justify-between border-b border-secondary-200 bg-white px-8 md:justify-end">
          <h1 className="text-xl font-bold text-primary-600 md:hidden">Startax</h1>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-secondary-600 sm:inline">
              Welcome back, {user.firstName}
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 font-bold text-white">
              {user.firstName ? user.firstName[0] : 'U'}
            </div>
          </div>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
