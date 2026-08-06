import bcrypt from 'bcryptjs';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.js';
import { createUser, findUserByEmail } from '../models/userModel.js';
import type { PublicUser } from '../types/models.js';
import { AppError } from '../utils/appError.js';

const toPublicUser = ({ id, name, email, created_at }: { id: number; name: string; email: string; created_at: Date }): PublicUser => ({ id, name, email, created_at });
const tokenFor = (id: number, email: string): string => jwt.sign({ id, email }, env.jwtSecret, { expiresIn: env.jwtExpiresIn as SignOptions['expiresIn'] });

export async function signup(payload: Record<string, unknown>) {
  const name = String(payload.name ?? '').trim();
  const email = String(payload.email ?? '').trim().toLowerCase();
  const password = String(payload.password ?? '');
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || password.length < 8) {
    throw new AppError(400, 'name, a valid email, and a password of at least 8 characters are required');
  }
  if (await findUserByEmail(email)) throw new AppError(409, 'Email is already registered');
  const user = await createUser(name, email, await bcrypt.hash(password, 12));
  return { user: toPublicUser(user), token: tokenFor(user.id, user.email) };
}

export async function login(payload: Record<string, unknown>) {
  const email = String(payload.email ?? '').trim().toLowerCase();
  const password = String(payload.password ?? '');
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password_hash))) throw new AppError(401, 'Invalid email or password');
  return { user: toPublicUser(user), token: tokenFor(user.id, user.email) };
}
