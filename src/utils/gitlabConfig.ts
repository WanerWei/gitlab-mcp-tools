import { GitlabConfig } from '@/types';
import { logger } from './logger';

/**
 * GitLab Configuration Utility
 * Unified handling of token and gitlabUrl retrieval and validation
 */

/**
 * Get GitLab configuration from environment variables
 * @returns GitlabConfig object
 * @throws Error if required configuration is missing
 */
export function getGitlabConfig(): GitlabConfig {
  const token = process.env.GITLAB_TOKEN;
  const gitlabUrl = process.env.GITLAB_URL;

  if (!token) {
    const error = "GITLAB_TOKEN environment variable is not set";
    logger.error(`[GitlabConfig] ${error}`);
    throw new Error(error);
  }

  if (!gitlabUrl) {
    const error = "GITLAB_URL environment variable is not set";
    logger.error(`[GitlabConfig] ${error}`);
    throw new Error(error);
  }

  const config: GitlabConfig = {
    token,
    gitlabUrl: normalizeGitlabUrl(gitlabUrl),
  };

  if (!validateGitlabConfig(config)) {
    const error = "GitLab configuration validation failed";
    logger.error(`[GitlabConfig] ${error}`);
    throw new Error(error);
  }

  logger.debug(`[GitlabConfig] Configuration loaded successfully: ${config.gitlabUrl}`);
  return config;
}

/**
 * Validate GitLab configuration
 * @param config GitlabConfig object
 * @returns boolean
 */
export function validateGitlabConfig(config: GitlabConfig): boolean {
  if (!config.token || config.token.trim() === '') {
    logger.error('[GitlabConfig] Token is empty');
    return false;
  }

  if (!config.gitlabUrl || config.gitlabUrl.trim() === '') {
    logger.error('[GitlabConfig] GitLab URL is empty');
    return false;
  }

  try {
    new URL(config.gitlabUrl);
  } catch {
    logger.error(`[GitlabConfig] Invalid GitLab URL: ${config.gitlabUrl}`);
    return false;
  }

  return true;
}

/**
 * Normalize GitLab URL
 * @param url GitLab URL
 * @returns normalized URL
 */
function normalizeGitlabUrl(url: string): string {
  let normalizedUrl = url.trim();
  
  // Ensure URL starts with http or https
  if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
    normalizedUrl = `https://${normalizedUrl}`;
  }
  
  // Remove trailing slash
  normalizedUrl = normalizedUrl.replace(/\/$/, '');
  
  return normalizedUrl;
}

/**
 * Get configuration safely (without throwing exceptions)
 * @returns GitlabConfig | null
 */
export function getGitlabConfigSafe(): GitlabConfig | null {
  try {
    return getGitlabConfig();
  } catch (error) {
    logger.error(`[GitlabConfig] Failed to get configuration safely: ${error}`);
    return null;
  }
}
