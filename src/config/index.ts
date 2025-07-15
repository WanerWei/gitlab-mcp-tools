import { GitlabConfig } from '@/types/index.js';

export interface AppConfig {
  gitlab: GitlabConfig;
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
    enableTimestamp: boolean;
  };
  server: {
    name: string;
    version: string;
  };
}

const DEFAULT_CONFIG: AppConfig = {
  gitlab: {
    token: '',
    gitlabUrl: ''
  },
  logging: {
    level: 'info',
    enableTimestamp: true
  },
  server: {
    name: 'gitlab-mcp-tools',
    version: '1.0.0'
  }
};

export function getAppConfig(): AppConfig {
  return {
    ...DEFAULT_CONFIG,
    gitlab: {
      token: process.env.GITLAB_TOKEN || '',
      gitlabUrl: process.env.GITLAB_URL || ''
    },
    logging: {
      level: (process.env.LOG_LEVEL as any) || DEFAULT_CONFIG.logging.level,
      enableTimestamp: process.env.LOG_TIMESTAMP !== 'false'
    }
  };
}

export function validateConfig(config: AppConfig): boolean {
  if (!config.gitlab.token) {
    console.error('GITLAB_TOKEN environment variable is not set');
    return false;
  }
  
  if (!config.gitlab.gitlabUrl) {
    console.error('GITLAB_URL environment variable is not set');
    return false;
  }
  
  return true;
} 