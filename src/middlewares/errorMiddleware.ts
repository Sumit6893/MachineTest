import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/appError.js';

export function notFound(_req: Request, res: Response): void { res.status(404).json({ message: 'Route not found' }); }

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
