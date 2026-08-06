import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const token = req.header('Authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) { res.status(401).json({ message: 'Bearer token is required' }); return; }
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    if (typeof payload === 'string' || typeof payload.id !== 'number' || typeof payload.email !== 'string') {
      res.status(401).json({ message: 'Invalid token' }); return;
    }
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}
