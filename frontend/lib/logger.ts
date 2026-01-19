import winston from 'winston';
import path from 'path';

const LOG_DIR = path.join(process.cwd(), 'logs');

// Create transports list
const transports: winston.transport[] = [];

// In Production (Cloud Run), we MUST log to Console (stdout) for Cloud Logging to pick it up.
// File logging is useless in stateless containers.
if (process.env.NODE_ENV === 'production') {
    transports.push(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json() // JSON format is best for Cloud Logging structured logs
        ),
    }));
} else {
    // In Local Development, log to files for persistence and console for debug
    transports.push(new winston.transports.File({ filename: path.join(LOG_DIR, 'error.log'), level: 'error' }));
    transports.push(new winston.transports.File({ filename: path.join(LOG_DIR, 'combined.log') }));
    transports.push(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
    }));
}

// Create a logger instance
const logger = winston.createLogger({
    level: 'info',
    defaultMeta: { service: 'frontend-app' },
    transports: transports,
});

export function logPageVisit(url: string, method: string = 'GET', ip: string = 'unknown') {
    logger.info({
        message: 'Page Visit',
        url,
        method,
        ip,
        timestamp: new Date().toISOString()
    });
}

export function logError(error: Error | string, context: Record<string, any> = {}) {
    logger.error({
        message: typeof error === 'string' ? error : error.message,
        stack: typeof error === 'string' ? undefined : error.stack,
        ...context,
        timestamp: new Date().toISOString()
    });
}

export default logger;
