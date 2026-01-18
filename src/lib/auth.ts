import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production';
const SALT_ROUNDS = 10;

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(payload: JWTPayload, expiresIn: string | number = '7d'): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as SignOptions);
}

export function generateAccessToken(payload: JWTPayload): string {
  return generateToken(payload, '15m');
}

export function generateRefreshToken(payload: JWTPayload): string {
  return generateToken(payload, '7d');
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload;
  } catch (error) {
    return null;
  }
}
