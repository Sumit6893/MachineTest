import type { Request, Response } from 'express';
import * as auth from '../services/authService.js';

export async function signup(req: Request, res: Response): Promise<void> {
  res.status(201).json(await auth.signup(req.body));
}

export async function login(req: Request, res: Response): Promise<void> {
  res.json(await auth.login(req.body));
}
