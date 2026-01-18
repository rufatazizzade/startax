import { logger } from '@/src/lib/logger';

const APP_URL = process.env.APP_URL || 'http://localhost:3000';

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${APP_URL}/verify-email/${token}`;

  logger.info(`Sending verification email to ${email}`, { verificationLink });

  // In a real application, you would use a service like Resend, SendGrid, etc.
  // For now, we'll log it and assume success.
  if (process.env.NODE_ENV === 'production') {
    // Implement real email sending here
    // Example with Resend:
    // await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.EMAIL_SERVICE_API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
    //     to: [email],
    //     subject: 'Verify your email',
    //     html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`
    //   })
    // });
  }

  return true;
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${APP_URL}/reset-password/${token}`;

  logger.info(`Sending password reset email to ${email}`, { resetLink });

  if (process.env.NODE_ENV === 'production') {
    // Implement real email sending here
  }

  return true;
};

export const sendWelcomeEmail = async (email: string, userName: string) => {
  logger.info(`Sending welcome email to ${email}`, { userName });

  if (process.env.NODE_ENV === 'production') {
    // Implement real email sending here
  }

  return true;
};
