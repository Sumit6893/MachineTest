import { ResultSetHeader, RowDataPacket } from 'mysql2';
import db from '../config/db.js';
import type { Category } from '../types/models.js';

export async function createCategory(categoryName: string): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    'INSERT INTO Category (category_name) VALUES (?)', [categoryName],
  );
  return result.insertId;
}

export async function findCategories(): Promise<Category[]> {
  const [rows] = await db.query<(Category & RowDataPacket)[]>('SELECT * FROM Category ORDER BY category_id');
  return rows;
}

export async function updateCategory(id: number, categoryName: string): Promise<boolean> {
  const [result] = await db.execute<ResultSetHeader>(
    'UPDATE Category SET category_name = ? WHERE category_id = ?', [categoryName, id],
  );
  return result.affectedRows > 0;
}

export async function deleteCategory(id: number): Promise<boolean> {
  const [result] = await db.execute<ResultSetHeader>('DELETE FROM Category WHERE category_id = ?', [id]);
  return result.affectedRows > 0;
}
