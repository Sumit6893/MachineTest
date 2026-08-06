import * as categories from '../models/categoryModel.js';
import { AppError } from '../utils/appError.js';

function validName(value: unknown): string {
  const name = String(value ?? '').trim();
  if (!name) throw new AppError(400, 'category_name is required');
  return name;
}

export async function createCategory(payload: Record<string, unknown>) {
  return categories.createCategory(validName(payload.category_name));
}

export async function getCategories() {
  return categories.findCategories();
}

export async function updateCategory(id: number, payload: Record<string, unknown>) {
  const updated = await categories.updateCategory(id, validName(payload.category_name));
  if (!updated) throw new AppError(404, 'Category not found');
}

export async function deleteCategory(id: number) {
  if (!(await categories.deleteCategory(id))) throw new AppError(404, 'Category not found');
}
