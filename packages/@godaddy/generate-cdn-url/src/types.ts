/**
 * Options for generating a CDN URL with package-based structure
 */
export interface PackageUrlOptions {
  /**
   * The base CDN URL (e.g., 'https://img6.wsimg.com')
   */
  cdn: string;

  /**
   * The package name
   */
  packageName: string;

  /**
   * The package version. Special values 'all', 'list', or 'json' will generate a versions.json URL
   */
  version: string;

  /**
   * Optional path to a specific asset within the package
   */
  assetPath?: string;

  /**
   * Optional hostname to replace the CDN hostname (e.g., 'dev.img6.wsimg.com')
   */
  hostname?: string;

  /** @internal Prevents mixing with FlexibleUrlOptions */
  pathSegments?: never;
}

/**
 * Options for generating a CDN URL with flexible path segments
 */
export interface FlexibleUrlOptions {
  /**
   * The base CDN URL (e.g., 'https://img6.wsimg.com')
   */
  cdn: string;

  /**
   * Array of path segments to join
   */
  pathSegments: string[];

  /**
   * Optional hostname to replace the CDN hostname (e.g., 'dev.img6.wsimg.com')
   */
  hostname?: string;

  /** @internal Prevents mixing with PackageUrlOptions */
  packageName?: never;
  /** @internal Prevents mixing with PackageUrlOptions */
  version?: never;
  /** @internal Prevents mixing with PackageUrlOptions */
  assetPath?: never;
}

/**
 * Union type for all CDN URL generation options
 */
export type GenerateCdnUrlOptions = PackageUrlOptions | FlexibleUrlOptions;
