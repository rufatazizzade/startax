import { logger } from '@/src/lib/logger';

// const EMAIL_FROM = process.env.EMAIL_FROM_ADDRESS || 'noreply@startax.com';
const APP_URL = process.env.APP_URL || 'http://localhost:3000';

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  // In a real app, you would use Resend, SendGrid, etc.
  // For now, we log it and simulate success
  logger.info(`Sending email to ${to} with subject "${subject}"`, { html: html.substring(0, 100) + '...' });
  
  return true;
}

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${APP_URL}/verify-email/${token}`;
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #3b82f6;">Verify your email</h2>
      <p>Welcome to Startax! Please click the button below to verify your email address.</p>
      <a href="${verificationUrl}" style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 20px 0;">Verify Email</a>
      <p>If you didn't create an account, you can safely ignore this email.</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 12px; color: #64748b;">Startax Team</p>
    </div>
  `;
  return sendEmail({ to: email, subject: 'Verify your email - Startax', html });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${APP_URL}/reset-password/${token}`;
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #3b82f6;">Reset your password</h2>
      <p>You requested a password reset. Click the button below to set a new password.</p>
      <a href="${resetUrl}" style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 20px 0;">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, you can safely ignore this email.</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 12px; color: #64748b;">Startax Team</p>
    </div>
  `;
  return sendEmail({ to: email, subject: 'Reset your password - Startax', html });
}

export async function sendWelcomeEmail(email: string, userName: string) {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #3b82f6;">Welcome to Startax, ${userName}!</h2>
      <p>We're excited to have you on board. Startax is here to help you manage your taxes effortlessly with AI.</p>
      <p>Get started by exploring your dashboard and setting up your first tax profile.</p>
      <a href="${APP_URL}/dashboard" style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 20px 0;">Go to Dashboard</a>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 12px; color: #64748b;">Startax Team</p>
    </div>
  `;
  return sendEmail({ to: email, subject: 'Welcome to Startax!', html });
}
