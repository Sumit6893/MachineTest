# Machine Test API

1. Copy `.env.example` to `.env` and set your MySQL and JWT values.
2. Create the database named in `DB_NAME`, then run `database/schema.sql` in it.
3. Run `npm run dev`, or build with `npm run build` and start with `npm start`.

All API routes use `API_BASE_URL` from `.env` (default: `/api`).

- `POST /api/auth/signup` with `{ name, email, password }`
- `POST /api/auth/login` with `{ email, password }`
- `GET /api/health`
- Category and product routes are `/api/categories` and `/api/products`, and require `Authorization: Bearer <token>`.
