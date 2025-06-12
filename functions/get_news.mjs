import { neon } from '@neondatabase/serverless';

export async function handler() {
  const sql = neon(process.env.DATABASE_URL);
  const news = await sql`SELECT * FROM news ORDER BY date DESC`;
  return {
    statusCode: 200,
    body: JSON.stringify(news),
  };
}
