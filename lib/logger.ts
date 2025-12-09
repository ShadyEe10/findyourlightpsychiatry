/**
 * Simple logger utility for server-side logging
 * In production, replace with a proper logging service (Winston, Pino, etc.)
 */

type LogLevel = 'info' | 'warn' | 'error';

function log(level: LogLevel, message: string, data?: unknown) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  
  // Only log in development or if explicitly enabled
  if (process.env.NODE_ENV === 'development' || process.env.ENABLE_LOGGING === 'true') {
    switch (level) {
      case 'info':
        console.log(logMessage, data ? JSON.stringify(data, null, 2) : '');
        break;
      case 'warn':
        console.warn(logMessage, data ? JSON.stringify(data, null, 2) : '');
        break;
      case 'error':
        console.error(logMessage, data ? JSON.stringify(data, null, 2) : '');
        break;
    }
  }
  
  // In production, you would send logs to a logging service here
  // Example: sendToLoggingService(level, message, data);
}

export const logger = {
  info: (message: string, data?: unknown) => log('info', message, data),
  warn: (message: string, data?: unknown) => log('warn', message, data),
  error: (message: string, data?: unknown) => log('error', message, data),
};

