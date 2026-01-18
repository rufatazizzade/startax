import Link from 'next/link';
import { Button } from '@/src/components';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-secondary-200 bg-white">
        <nav className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-xl font-bold text-white">
              S
            </div>
            <span className="text-2xl font-bold text-secondary-900">Startax</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-secondary-900 sm:text-6xl">
              Simplify Your Tax Management with <span className="text-primary-600">AI-Powered</span>{' '}
              Insights
            </h1>
            <p className="mb-8 text-xl text-secondary-600">
              Startax helps small businesses navigate tax complexities with intelligent automation,
              real-time calculations, and personalized guidance.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-secondary-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-bold text-secondary-900">
              Why Choose Startax?
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-soft">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-secondary-900">
                  AI-Powered Insights
                </h3>
                <p className="text-secondary-600">
                  Get intelligent recommendations and answers to your tax questions instantly.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-soft">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-secondary-900">
                  Real-Time Calculations
                </h3>
                <p className="text-secondary-600">
                  Calculate your tax obligations accurately with our advanced tools.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-soft">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-secondary-900">Deadline Tracking</h3>
                <p className="text-secondary-600">
                  Never miss a tax deadline with automated reminders and alerts.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-secondary-900">Ready to Get Started?</h2>
              <p className="mb-8 text-lg text-secondary-600">
                Join thousands of small businesses simplifying their tax management with Startax.
              </p>
              <Link href="/register">
                <Button size="lg">Start Your Free Trial</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-secondary-200 bg-secondary-50">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center text-secondary-600">
            <p>&copy; 2024 Startax. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
