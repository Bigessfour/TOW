import { neon } from '@neondatabase/serverless';

export async function handler() {
  const sql = neon(process.env.DATABASE_URL);
  const officials = await sql`SELECT * FROM officials ORDER BY name ASC`;
  return {
    statusCode: 200,
    body: JSON.stringify(officials),
  };
}
