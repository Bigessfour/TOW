import { neon } from '@neondatabase/serverless';

export async function handler() {
  const sql = neon(process.env.DATABASE_URL);
  const payments = await sql`SELECT * FROM payments ORDER BY date DESC`;
  return {
    statusCode: 200,
    body: JSON.stringify(payments),
  };
}
