import {
  User,
  UserProfile,
  ChatMessage,
  TaxRule,
  TaxDeadline,
  Subscription,
  AuditLog,
} from '@prisma/client';

export type { User, UserProfile, ChatMessage, TaxRule, TaxDeadline, Subscription, AuditLog };

export type UserWithProfile = User & {
  profile?: UserProfile | null;
};

export type ChatMessageWithUser = ChatMessage & {
  user: User;
};

export type SubscriptionWithUser = Subscription & {
  user: User;
};

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UpdateUserProfileData {
  country?: string;
  businessType?: string;
  monthlyRevenueRange?: string;
  currency?: string;
  numEmployees?: number;
}

export interface ChatRequest {
  message: string;
  conversationId?: string;
}

export interface ChatResponse {
  message: string;
  role: 'assistant' | 'user' | 'system';
  timestamp: Date;
}
