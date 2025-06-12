import { neon } from '@neondatabase/serverless';

export async function handler() {
  const sql = neon(process.env.DATABASE_URL);
  const blends = await sql`SELECT * FROM coffee_blends`;
  return {
    statusCode: 200,
    body: JSON.stringify(blends),
  };
}
