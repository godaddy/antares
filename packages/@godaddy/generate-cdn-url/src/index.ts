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
 * Validates that a URL is a well-formed HTTP(S) URL with no credentials, query string, or fragment.
 * Rejects non-http(s) protocols, embedded credentials, and URLs with search/hash components.
 */
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
    if (parsed.username || parsed.password) return false;
    if (parsed.search || parsed.hash) return false;
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
 * Joins path segments with forward slashes, handling empty strings.
 * Rejects path traversal sequences ('..') to prevent directory escape.
 */
function joinPathSegments(segments: string[]): string {
  const normalized = segments
    .filter((segment) => segment !== '')
    .map(normalizeSegment)
    .filter((segment) => segment !== '');

  const path = normalized.join('/');

  const traversalPattern = /(?:^|\/)\.\.(?:\/|$)/;

  // Reject path traversal sequences
  if (traversalPattern.test(path)) {
    throw new Error('Path segments must not contain path traversal sequences (..)');
  }

  // Normalize backslashes and check decoded form to catch percent-encoded traversal (e.g. "%2e%2e")
  const normalizedForTraversal = path.replace(/\\/g, '/');
  if (traversalPattern.test(normalizedForTraversal)) {
    throw new Error('Path segments must not contain path traversal sequences (..)');
  }

  try {
    const decoded = decodeURIComponent(normalizedForTraversal);
    if (traversalPattern.test(decoded)) {
      throw new Error('Path segments must not contain path traversal sequences (..)');
    }
  } catch (e) {
    if (e instanceof Error && e.message.includes('path traversal')) {
      throw e;
    }
    throw new Error('Path segments contain invalid percent-encoding');
  }

  return path;
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

  // Reject mixed option shapes (both package and flexible fields provided)
  const hasPackageFields =
    isPackageUrlOptions(options) || 'packageName' in options || 'version' in options || 'assetPath' in options;
  const hasFlexibleFields = isFlexibleUrlOptions(options);

  if (hasPackageFields && hasFlexibleFields) {
    throw new Error('Invalid options: cannot provide both packageName/version and pathSegments');
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

  const finalUrl = `${baseUrl}/${path}`;

  // Encode path characters that encodeURI does not handle
  return encodeURI(finalUrl).replace(/\?/g, '%3F').replace(/#/g, '%23');
}
