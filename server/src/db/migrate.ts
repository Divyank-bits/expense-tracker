import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

// Database connection string
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/expense_tracker';

async function runMigrations() {
  console.log('Starting database migrations...');
  
  // Create a PostgreSQL connection pool
  const pool = new Pool({
    connectionString,
  });
  
  // Create a Drizzle instance
  const db = drizzle(pool);
  
  // Run migrations
  try {
    const migrationsFolder = path.join(__dirname, 'migrations');
    console.log(`Using migrations from: ${migrationsFolder}`);
    
    await migrate(db, { migrationsFolder });
    console.log('Migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    // Close the pool
    await pool.end();
  }
}

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations();
}

export { runMigrations };