import type { Request, Response } from 'express';
import * as products from '../services/productService.js';

export async function create(req: Request, res: Response): Promise<void> {
  const id = await products.createProduct(req.body);
  res.status(201).json({ message: 'Product created', product_id: id });
}

export async function getAll(req: Request, res: Response): Promise<void> {
  res.json(await products.getProducts(req.query.page, req.query.pageSize));
}

export async function update(req: Request, res: Response): Promise<void> {
  await products.updateProduct(Number(req.params.id), req.body);
  res.json({ message: 'Product updated' });
}

export async function remove(req: Request, res: Response): Promise<void> {
  await products.deleteProduct(Number(req.params.id));
  res.json({ message: 'Product deleted' });
}
