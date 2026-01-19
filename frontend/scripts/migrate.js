 
 
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Load environment variables if not present
// Note: In a real setup, use dotenv. customized for this specific environment
const DATABASE_URL = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/pixe_db?sslmode=disable";

async function migrate() {
    console.log('🚀 Starting Database Migration...');
    console.log(`target: ${DATABASE_URL.split('@')[1]}`); // Mask credentials

    const pool = new Pool({
        connectionString: DATABASE_URL,
        ssl: DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
    });

    try {
        const schemaPath = path.join(__dirname, '../db/schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf-8');

        console.log('📄 Reading schema.sql...');

        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // Execute the entire SQL block
            await client.query(schemaSql);

            await client.query('COMMIT');
            console.log('✅ Migration Successful! Schema applied.');
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }

    } catch (err) {
        console.error('❌ Migration Failed:', err);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

migrate();
