export const APP_NAME = 'Startax';
export const APP_DESCRIPTION = 'Your AI-powered tax assistant for small businesses';

export const SUBSCRIPTION_PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    features: ['5 AI chat messages per month', 'Basic tax information', 'Tax deadline reminders'],
  },
  STARTER: {
    name: 'Starter',
    price: 29,
    features: [
      '100 AI chat messages per month',
      'Tax calculation tools',
      'Multi-country support',
      'Email support',
    ],
  },
  PROFESSIONAL: {
    name: 'Professional',
    price: 99,
    features: [
      'Unlimited AI chat messages',
      'Advanced tax planning',
      'Custom tax rules',
      'Priority support',
      'Export reports',
    ],
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 299,
    features: [
      'Everything in Professional',
      'Dedicated account manager',
      'Custom integrations',
      'API access',
      'White-label options',
    ],
  },
} as const;

export const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'Netherlands',
  'Sweden',
] as const;

export const BUSINESS_TYPES = [
  'Sole Proprietor',
  'LLC',
  'Corporation',
  'Partnership',
  'Non-Profit',
  'Freelancer',
] as const;

export const MONTHLY_REVENUE_RANGES = [
  '$0 - $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000+',
] as const;

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: '$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
] as const;

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    VERIFY: '/api/auth/verify',
  },
  USER: {
    PROFILE: '/api/user/profile',
    UPDATE: '/api/user/update',
  },
  CHAT: {
    SEND: '/api/chat/send',
    HISTORY: '/api/chat/history',
  },
  TAX: {
    RULES: '/api/tax/rules',
    DEADLINES: '/api/tax/deadlines',
    CALCULATE: '/api/tax/calculate',
  },
  SUBSCRIPTION: {
    CREATE: '/api/subscription/create',
    CANCEL: '/api/subscription/cancel',
    UPDATE: '/api/subscription/update',
  },
} as const;

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  CHAT: '/dashboard/chat',
  TAX_CALCULATOR: '/dashboard/calculator',
  DEADLINES: '/dashboard/deadlines',
  PROFILE: '/dashboard/profile',
  SUBSCRIPTION: '/dashboard/subscription',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN: '/admin',
} as const;
