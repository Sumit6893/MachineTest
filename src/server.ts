import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.get(`${env.apiBaseUrl}/health`, (_req, res) => res.json({ status: 'ok' }));
app.use(`${env.apiBaseUrl}/auth`, authRoutes);
app.use(`${env.apiBaseUrl}/categories`, categoryRoutes);
app.use(`${env.apiBaseUrl}/products`, productRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(env.port, () => console.log(`API running at http://localhost:${env.port}${env.apiBaseUrl}`));
