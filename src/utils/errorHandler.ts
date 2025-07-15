import { ErrorHandler } from '@/types/index.js';
import { logger } from './logger.js';

export class ErrorHandlerImpl implements ErrorHandler {
  handle(error: any) {
    const errorInfo = this.parseError(error);
    
    logger.error(`[ErrorHandler] ${errorInfo.message}`);
    
    if (errorInfo.type === 'GitLabAPI') {
      logger.error(`[ErrorHandler] GitLab API Error: ${errorInfo.details}`);
    } else if (errorInfo.type === 'Validation') {
      logger.error(`[ErrorHandler] Validation Error: ${errorInfo.details}`);
    } else if (errorInfo.type === 'Network') {
      logger.error(`[ErrorHandler] Network Error: ${errorInfo.details}`);
    }

    return {
      error: errorInfo.message,
      type: errorInfo.type,
      details: errorInfo.details
    };
  }

  private parseError(error: any) {
    if (error.response) {
      // GitLab API error
      return {
        type: 'GitLabAPI',
        message: `GitLab API Error: ${error.response.status} ${error.response.statusText}`,
        details: error.response.data?.message || error.message
      };
    } else if (error.name === 'ZodError') {
      // Parameter validation error
      return {
        type: 'Validation',
        message: 'Parameter validation failed',
        details: error.errors?.map((e: any) => `${e.path.join('.')}: ${e.message}`).join(', ')
      };
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      // Network error
      return {
        type: 'Network',
        message: 'Network connection error',
        details: error.message
      };
    } else {
      // Generic error
      return {
        type: 'Unknown',
        message: error.message || 'Unknown error',
        details: error.stack
      };
    }
  }
}

export const errorHandler = new ErrorHandlerImpl(); 