import 'dotenv/config';

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 3000),
  apiBaseUrl: `/${(process.env.API_BASE_URL ?? 'api').replace(/^\/+|\/+$/g, '')}`,
  db: {
    host: required('DB_HOST'),
    port: Number(process.env.DB_PORT ?? 3306),
    user: required('DB_USER'),
    password: required('DB_PASS'),
    database: required('DB_NAME'),
  },
  jwtSecret: required('JWT_SECRET'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
};
