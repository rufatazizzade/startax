type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatMessage(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
    };
  }

  private log(level: LogLevel, message: string, data?: any): void {
    const entry = this.formatMessage(level, message, data);

    if (this.isDevelopment) {
      console.log(JSON.stringify(entry, null, 2));
    } else {
      console.log(JSON.stringify(entry));
    }
  }

  info(message: string, data?: any): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: any): void {
    this.log('warn', message, data);
  }

  error(message: string, error?: any): void {
    const errorData =
      error instanceof Error ? { message: error.message, stack: error.stack } : error;
    this.log('error', message, errorData);
  }

  debug(message: string, data?: any): void {
    if (this.isDevelopment) {
      this.log('debug', message, data);
    }
  }
}

export const logger = new Logger();
export default logger;
