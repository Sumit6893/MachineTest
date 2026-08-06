import type { Request, Response } from 'express';
import * as categories from '../services/categoryService.js';

export async function create(req: Request, res: Response): Promise<void> {
  const id = await categories.createCategory(req.body);
  res.status(201).json({ message: 'Category created', category_id: id });
}

export async function getAll(_req: Request, res: Response): Promise<void> { res.json(await categories.getCategories()); }

export async function update(req: Request, res: Response): Promise<void> {
  await categories.updateCategory(Number(req.params.id), req.body);
  res.json({ message: 'Category updated' });
}

export async function remove(req: Request, res: Response): Promise<void> {
  await categories.deleteCategory(Number(req.params.id));
  res.json({ message: 'Category deleted' });
}
