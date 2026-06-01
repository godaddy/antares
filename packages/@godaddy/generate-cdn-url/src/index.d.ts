import type { GenerateCdnUrlOptions, PackageUrlOptions, FlexibleUrlOptions } from './types.ts';
export type { GenerateCdnUrlOptions, PackageUrlOptions, FlexibleUrlOptions };
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
export declare function generateCdnUrl(options: GenerateCdnUrlOptions): string;
//# sourceMappingURL=index.d.ts.map
