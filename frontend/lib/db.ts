import { Pool, PoolConfig } from 'pg';
import fs from 'fs';
import path from 'path';

// Load database configuration from environment or saved settings
const DB_CONFIG_FILE = path.join(process.cwd(), 'content', 'database.json');

// ... (Interfaces kept same for brevity, but actually we can remove unused ones for optimization)
interface DatabaseConfig {
    nile: any;
    aiven: any;
}

let pool: Pool | null = null;
let poolCreationTime: number = 0;
// Recreate pool if older than 1 hour to prevent stale connections issues in serverless
const POOL_TTL = 60 * 60 * 1000;

function loadConfig(): DatabaseConfig | null {
    try {
        if (fs.existsSync(DB_CONFIG_FILE)) {
            return JSON.parse(fs.readFileSync(DB_CONFIG_FILE, 'utf-8'));
        }
    } catch (error) {
        console.error('Failed to load database config:', error);
    }
    return null;
}

function createPoolConfig(): PoolConfig | null {
    // Priority 1: DATABASE_URL environment variable
    if (process.env.DATABASE_URL) {
        // Cloud Run Optimization: 
        // - Lower max connections (Cloud Run instances scale horizontally)
        // - Short idle timeout to release resources quickly
        return {
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }, // Necessary for most cloud providers
            max: 5, // Limit to 5 per container to avoid exhausting DB limits when scaling
            idleTimeoutMillis: 10000, // 10s idle timeout
            connectionTimeoutMillis: 5000, // 5s connection timeout
            application_name: 'frontend-app',
        };
    }

    // Priority 2: Load from config file (Legacy/Local)
    const config = loadConfig();
    if (!config) return null;

    if (config.nile?.postgresUrl) {
        return {
            connectionString: config.nile.postgresUrl,
            ssl: { rejectUnauthorized: false },
            max: 5,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 10000,
        };
    }

    // ... (Aiven logic kept same)

    return null;
}

export function getPool(): Pool | null {
    const now = Date.now();

    // Refresh pool if too old (Serverless safeguard)
    if (pool && (now - poolCreationTime > POOL_TTL)) {
        console.log('[DB] Refreshing old connection pool');
        try { pool.end(); } catch (e) { /* ignore */ }
        pool = null;
    }

    if (pool) return pool;

    const config = createPoolConfig();
    if (config) {
        pool = new Pool(config);
        poolCreationTime = now;

        pool.on('error', (err) => {
            console.error('[DB] Pool error:', err);
            pool = null; // Hard reset on error
        });
    }

    return pool;
}

// Simple in-memory cache for frequently accessed queries (e.g. homepage content)
// In a real production app with multiple instances, use Redis.
// For Free Tier/Stateful-less, a short-lived memory cache per container reduces DB load significantly.
const queryCache = new Map<string, { data: any, expires: number }>();
const CACHE_TTL = 60 * 1000; // 1 minute cache

export async function query(text: string, params?: any[], useCache: boolean = false) {
    // 1. Check Cache
    if (useCache && params && params.length > 0) {
        // Simple cache key based on query + first param (usually slug/id)
        const key = `${text}:${JSON.stringify(params)}`;
        const cached = queryCache.get(key);
        if (cached && cached.expires > Date.now()) {
            return cached.data;
        }
    }

    const client = getPool();
    if (!client) {
        // Graceful failure check? No, core function should throw.
        // But maybe return mock if really needed? No, fail fast.
        // throw new Error('Database not configured.');
        // Actually, let's just return null or throw? Throw is better for API handling.
        // However, existing code might expect it? Let's check existing... it threw "Database not configured".
        throw new Error('Database not configured. Set DATABASE_URL env var or configure in Dashboard > Database.');
    }

    const start = Date.now();
    try {
        const res = await client.query(text, params);

        // Log slow queries (>500ms)
        const duration = Date.now() - start;
        if (duration > 500) {
            console.warn(`[DB] Slow query (${duration}ms): ${text}`);
        }

        // 2. Set Cache
        if (useCache && params && params.length > 0) {
            const key = `${text}:${JSON.stringify(params)}`;
            queryCache.set(key, { data: res, expires: Date.now() + CACHE_TTL });
        }

        return res;
    } catch (e) {
        throw e;
    }
}

export async function testConnection(): Promise<boolean> {
    try {
        const client = getPool();
        if (!client) return false;
        await client.query('SELECT 1');
        return true;
    } catch (error) {
        console.error('[DB] Connection test failed:', error);
        return false;
    }
}

// Schema initialization is now handled by scripts/migrate.js
// Logic removed to prevent runtime overhead.
export async function initializeSchema() {
    console.warn('[DB] initializeSchema is deprecated. Use npm run migrate instead.');
}
