import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import * as schema from './schema';

// Load environment variables
dotenv.config();

// Database connection string
const connectionString = process.env.DATABASE_URL

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString,
});

// Create Drizzle ORM instance with schema
export const db = drizzle(pool, { schema });

// Function to test database connection
export const testConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Database connection successful:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

// Export pool for direct queries if needed
export { pool };