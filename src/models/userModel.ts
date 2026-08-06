import { ResultSetHeader, RowDataPacket } from 'mysql2';
import db from '../config/db.js';
import type { User } from '../types/models.js';

export async function createUser(name: string, email: string, passwordHash: string): Promise<User> {
  const [result] = await db.execute<ResultSetHeader>(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name, email, passwordHash],
  );
  const user = await findUserById(result.insertId);
  if (!user) throw new Error('User was created but could not be retrieved');
  return user;
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const [rows] = await db.execute<(User & RowDataPacket)[]>('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

export async function findUserById(id: number): Promise<User | undefined> {
  const [rows] = await db.execute<(User & RowDataPacket)[]>('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
}
