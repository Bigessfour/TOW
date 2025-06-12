import { neon } from '@neondatabase/serverless';

export async function handler() {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const news = await sql`SELECT * FROM news ORDER BY published_at DESC`;
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(news),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch news' }),
    };
  }
}
