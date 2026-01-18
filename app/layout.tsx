import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Startax - AI-Powered Tax Assistant',
  description:
    'Simplify your tax management with AI-powered insights and automation for small businesses.',
  keywords: ['tax', 'AI', 'small business', 'tax assistant', 'tax calculator'],
  authors: [{ name: 'Startax Team' }],
  openGraph: {
    title: 'Startax - AI-Powered Tax Assistant',
    description: 'Simplify your tax management with AI-powered insights and automation.',
    type: 'website',
  },
};

import { AuthProvider } from '@/src/contexts/AuthContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
