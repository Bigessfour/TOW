import { neon } from '@neondatabase/serverless';

export async function handler() {
  const sql = neon(process.env.DATABASE_URL);
  const services = await sql`SELECT * FROM services ORDER BY name ASC`;
  return {
    statusCode: 200,
    body: JSON.stringify(services),
  };
}
