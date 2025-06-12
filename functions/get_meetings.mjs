import { neon } from '@neondatabase/serverless';

export async function handler() {
  const sql = neon(process.env.DATABASE_URL);
  const meetings = await sql`SELECT * FROM meetings ORDER BY meeting_date DESC`;
  return {
    statusCode: 200,
    body: JSON.stringify(meetings),
  };
}
