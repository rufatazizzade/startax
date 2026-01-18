import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
});

export const userProfileSchema = z.object({
  country: z.string().optional(),
  businessType: z.string().optional(),
  monthlyRevenueRange: z.string().optional(),
  currency: z.string().length(3).optional(),
  numEmployees: z.number().int().positive().optional(),
});

export const chatMessageSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty').max(5000),
  conversationId: z.string().optional(),
});

export function isValidEmail(email: string): boolean {
  try {
    emailSchema.parse(email);
    return true;
  } catch {
    return false;
  }
}

export function isStrongPassword(password: string): boolean {
  try {
    passwordSchema.parse(password);
    return true;
  } catch {
    return false;
  }
}

export function getPasswordStrength(password: string): {
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) score++;
  else feedback.push('Use at least 8 characters');

  if (password.length >= 12) score++;

  if (/[A-Z]/.test(password)) score++;
  else feedback.push('Include uppercase letters');

  if (/[a-z]/.test(password)) score++;
  else feedback.push('Include lowercase letters');

  if (/[0-9]/.test(password)) score++;
  else feedback.push('Include numbers');

  if (/[^A-Za-z0-9]/.test(password)) score++;
  else feedback.push('Include special characters');

  return { score, feedback };
}
