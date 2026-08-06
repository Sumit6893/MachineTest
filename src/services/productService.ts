import * as products from '../models/productModel.js';
import { AppError } from '../utils/appError.js';

function validProduct(payload: Record<string, unknown>): { productName: string; categoryId: number } {
  const productName = String(payload.product_name ?? '').trim();
  const categoryId = Number(payload.category_id);
  if (!productName || !Number.isInteger(categoryId) || categoryId < 1) {
    throw new AppError(400, 'product_name and a valid category_id are required');
  }
  return { productName, categoryId };
}

export async function createProduct(payload: Record<string, unknown>) {
  const { productName, categoryId } = validProduct(payload);
  return products.createProduct(productName, categoryId);
}

export async function getProducts(pageValue: unknown, pageSizeValue: unknown) {
  const page = Math.max(1, Number(pageValue) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(pageSizeValue) || 10));
  return products.findProducts(pageSize, (page - 1) * pageSize);
}

export async function updateProduct(id: number, payload: Record<string, unknown>) {
  const { productName, categoryId } = validProduct(payload);
  if (!(await products.updateProduct(id, productName, categoryId))) throw new AppError(404, 'Product not found');
}

export async function deleteProduct(id: number) {
  if (!(await products.deleteProduct(id))) throw new AppError(404, 'Product not found');
}
