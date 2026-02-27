import type { GenerateCdnUrlOptions, PackageUrlOptions, FlexibleUrlOptions } from './types.ts';

export type { GenerateCdnUrlOptions, PackageUrlOptions, FlexibleUrlOptions };

/**
 * Type guard to check if options are PackageUrlOptions
 */
function isPackageUrlOptions(options: GenerateCdnUrlOptions): options is PackageUrlOptions {
  return 'packageName' in options && 'version' in options;
}

/**
 * Type guard to check if options are FlexibleUrlOptions
 */
function isFlexibleUrlOptions(options: GenerateCdnUrlOptions): options is FlexibleUrlOptions {
  return 'pathSegments' in options;
}

/**
 * Validates that a string is a valid URL
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Normalizes a path segment by removing leading/trailing slashes and collapsing multiple slashes
 */
function normalizeSegment(segment: string): string {
  return segment
    .replace(/^\/+|\/+$/g, '') // Remove leading and trailing slashes
    .replace(/\/+/g, '/'); // Collapse multiple slashes to single slash
}

/**
 * Joins path segments with forward slashes, handling empty strings
 */
function joinPathSegments(segments: string[]): string {
  const normalized = segments
    .filter((segment) => segment !== '')
    .map(normalizeSegment)
    .filter((segment) => segment !== '');

  return normalized.join('/');
}

/**
 * Replaces the hostname of a URL
 */
function replaceHostname(baseUrl: string, newHostname: string): string {
  const url = new URL(baseUrl);
  url.hostname = newHostname;
  return url.toString();
}

/**
 * Generates a CDN URL for GoDaddy assets hosted at https://img6.wsimg.com/
 *
 * @param options - Configuration options for URL generation
 * @returns The generated CDN URL
 *
 * @example
 * ```typescript
 * // Package-based URL
 * generateCdnUrl({
 *   cdn: 'https://img6.wsimg.com',
 *   packageName: 'my-package',
 *   version: '1.0.0',
 *   assetPath: 'dist/bundle.js'
 * })
 * // Returns: 'https://img6.wsimg.com/my-package/1.0.0/dist/bundle.js'
 *
 * // versions.json URL
 * generateCdnUrl({
 *   cdn: 'https://img6.wsimg.com',
 *   packageName: 'my-package',
 *   version: 'all'
 * })
 * // Returns: 'https://img6.wsimg.com/my-package/versions.json'
 *
 * // Flexible path segments
 * generateCdnUrl({
 *   cdn: 'https://img6.wsimg.com',
 *   pathSegments: ['custom', 'path', 'to', 'asset.js']
 * })
 * // Returns: 'https://img6.wsimg.com/custom/path/to/asset.js'
 *
 * // With hostname replacement
 * generateCdnUrl({
 *   cdn: 'https://img6.wsimg.com',
 *   packageName: 'my-package',
 *   version: '1.0.0',
 *   hostname: 'dev.img6.wsimg.com'
 * })
 * // Returns: 'https://dev.img6.wsimg.com/my-package/1.0.0'
 * ```
 */
export function generateCdnUrl(options: GenerateCdnUrlOptions): string {
  // Validate CDN URL
  if (!options.cdn) {
    throw new Error('cdn is required');
  }

  if (!isValidUrl(options.cdn)) {
    throw new Error('cdn must be a valid URL');
  }

  let baseUrl = options.cdn;

  // Replace hostname if provided
  if (options.hostname) {
    baseUrl = replaceHostname(baseUrl, options.hostname);
  }

  // Remove trailing slash from base URL
  baseUrl = baseUrl.replace(/\/$/, '');

  let path: string;

  if (isPackageUrlOptions(options)) {
    // Package URL mode
    if (!options.packageName) {
      throw new Error('packageName is required');
    }

    if (!options.version) {
      throw new Error('version is required');
    }

    // Check for versions.json special case
    const versionsKeywords = ['all', 'list', 'json'];
    if (versionsKeywords.includes(options.version.toLowerCase())) {
      path = joinPathSegments([options.packageName, 'versions.json']);
    } else {
      const segments = [options.packageName, options.version];
      if (options.assetPath) {
        segments.push(options.assetPath);
      }
      path = joinPathSegments(segments);
    }
  } else if (isFlexibleUrlOptions(options)) {
    // Flexible path segments mode
    if (!options.pathSegments || options.pathSegments.length === 0) {
      throw new Error('pathSegments must be a non-empty array');
    }

    path = joinPathSegments(options.pathSegments);

    // Check if path is empty after filtering/normalization
    if (!path) {
      throw new Error('pathSegments must be a non-empty array');
    }
  } else {
    throw new Error('Invalid options: must provide either packageName/version or pathSegments');
  }

  // Construct final URL and encode
  const finalUrl = `${baseUrl}/${path}`;
  return encodeURI(finalUrl);
}
