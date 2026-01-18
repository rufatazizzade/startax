import { prisma } from './db';

export async function createAuditLog(
  userId: string | null,
  action: string,
  description: string,
  req?: Request
) {
  let ipAddress = null;
  let userAgent = null;

  if (req) {
    ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip');
    userAgent = req.headers.get('user-agent');
  }

  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        description,
        ipAddress,
        userAgent,
      },
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
  }
}
