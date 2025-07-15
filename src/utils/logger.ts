import { Logger, LogLevel } from '@/types/index.js';

class LoggerImpl implements Logger {
  private logLevel: LogLevel = 'info';
  private timestamp = () => new Date().toISOString();

  setLogLevel(level: LogLevel) {
    this.logLevel = level;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3
    };
    return levels[level] >= levels[this.logLevel];
  }

  private formatMessage(level: LogLevel, msg: string): string {
    const timestamp = this.timestamp();
    return `[${timestamp}] [${level.toUpperCase()}] ${msg}`;
  }

  info(msg: string) {
    if (this.shouldLog('info')) {
      console.log(this.formatMessage('info', msg));
    }
  }

  error(msg: string) {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', msg));
    }
  }

  warn(msg: string) {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', msg));
    }
  }

  debug(msg: string) {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', msg));
    }
  }
}

export const logger = new LoggerImpl(); 