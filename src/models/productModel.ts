import { ResultSetHeader, RowDataPacket } from 'mysql2';
import db from '../config/db.js';
import type { Product } from '../types/models.js';

export async function createProduct(productName: string, categoryId: number): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    'INSERT INTO Product (product_name, category_id) VALUES (?, ?)', [productName, categoryId],
  );
  return result.insertId;
}

export async function findProducts(pageSize: number, offset: number): Promise<Product[]> {
  const [rows] = await db.execute<(Product & RowDataPacket)[]>(
    `SELECT p.product_id, p.product_name, c.category_id, c.category_name
     FROM Product p JOIN Category c ON p.category_id = c.category_id
     ORDER BY p.product_id LIMIT ? OFFSET ?`, [pageSize, offset],
  );
  return rows;
}

export async function updateProduct(id: number, productName: string, categoryId: number): Promise<boolean> {
  const [result] = await db.execute<ResultSetHeader>(
    'UPDATE Product SET product_name = ?, category_id = ? WHERE product_id = ?', [productName, categoryId, id],
  );
  return result.affectedRows > 0;
}

export async function deleteProduct(id: number): Promise<boolean> {
  const [result] = await db.execute<ResultSetHeader>('DELETE FROM Product WHERE product_id = ?', [id]);
  return result.affectedRows > 0;
}
