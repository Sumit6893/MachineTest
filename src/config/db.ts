import mysql from 'mysql2/promise';
import { env } from './env.js';

const pool = mysql.createPool({
  ...env.db,
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
