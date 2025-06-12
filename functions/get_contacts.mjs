import { neon } from '@neondatabase/serverless';

export async function handler() {
  const sql = neon(process.env.DATABASE_URL);
  const contacts = await sql`SELECT * FROM contacts ORDER BY date DESC`;
  return {
    statusCode: 200,
    body: JSON.stringify(contacts),
  };
}
