# @godaddy/generate-cdn-url

A modern, zero-dependency TypeScript library for generating CDN URLs for GoDaddy assets hosted at `https://img6.wsimg.com/`.

## Features

- 🎯 **Two flexible modes**: Package-based URLs and custom path segments
- 🔄 **Environment switching**: Replace hostnames for dev/staging/prod environments
- 📦 **Zero dependencies**: Uses native URL APIs for minimal bundle size
- 🛡️ **Type-safe**: Full TypeScript support with comprehensive type definitions
- ✅ **Well-tested**: 100% test coverage
- 🚀 **Modern**: ESM and CJS support with tree-shaking

## Installation

```bash
npm install @godaddy/generate-cdn-url
```

## Usage

### Package URL Mode (Standard Pattern)

Generate URLs following the standard GoDaddy CDN pattern: `{cdn}/{packageName}/{version}/{assetPath}`

```typescript
import { generateCdnUrl } from '@godaddy/generate-cdn-url';

// Basic package URL
const url = generateCdnUrl({
  cdn: 'https://img6.wsimg.com',
  packageName: 'my-package',
  version: '1.0.0'
});
// Returns: 'https://img6.wsimg.com/my-package/1.0.0'

// With asset path
const assetUrl = generateCdnUrl({
  cdn: 'https://img6.wsimg.com',
  packageName: 'my-package',
  version: '1.0.0',
  assetPath: 'dist/bundle.js'
});
// Returns: 'https://img6.wsimg.com/my-package/1.0.0/dist/bundle.js'

// With nested paths
const nestedUrl = generateCdnUrl({
  cdn: 'https://img6.wsimg.com',
  packageName: '@scope/package',
  version: '2.0.0',
  assetPath: 'dist/esm/components/button.js'
});
// Returns: 'https://img6.wsimg.com/@scope/package/2.0.0/dist/esm/components/button.js'
```

### Special versions.json Handling

The library automatically handles the special `versions.json` endpoint:

```typescript
// Using version: 'all'
const versionsUrl = generateCdnUrl({
  cdn: 'https://img6.wsimg.com',
  packageName: 'my-package',
  version: 'all'
});
// Returns: 'https://img6.wsimg.com/my-package/versions.json'

// Also works with 'list' or 'json'
const listUrl = generateCdnUrl({
  cdn: 'https://img6.wsimg.com',
  packageName: 'my-package',
  version: 'list'
});
// Returns: 'https://img6.wsimg.com/my-package/versions.json'
```

### Environment Switching with Hostname Replacement

Replace the CDN hostname for different environments (dev, staging, production):

```typescript
// Development environment
const devUrl = generateCdnUrl({
  cdn: 'https://img6.wsimg.com',
  packageName: 'my-package',
  version: '1.0.0',
  assetPath: 'dist/bundle.js',
  hostname: 'dev.img6.wsimg.com'
});
// Returns: 'https://dev.img6.wsimg.com/my-package/1.0.0/dist/bundle.js'

// Staging environment
const stagingUrl = generateCdnUrl({
  cdn: 'https://img6.wsimg.com',
  packageName: 'my-package',
  version: '1.0.0',
  assetPath: 'dist/bundle.js',
  hostname: 'staging.img6.wsimg.com'
});
// Returns: 'https://staging.img6.wsimg.com/my-package/1.0.0/dist/bundle.js'
```

### Flexible Path Segments Mode

For custom URL patterns that don't follow the standard package structure:

```typescript
// Custom path segments
const customUrl = generateCdnUrl({
  cdn: 'https://img6.wsimg.com',
  pathSegments: ['custom', 'path', 'to', 'asset.js']
});
// Returns: 'https://img6.wsimg.com/custom/path/to/asset.js'

// With hostname replacement
const customDevUrl = generateCdnUrl({
  cdn: 'https://img6.wsimg.com',
  pathSegments: ['legacy', 'assets', 'v1', 'bundle.js'],
  hostname: 'dev.img6.wsimg.com'
});
// Returns: 'https://dev.img6.wsimg.com/legacy/assets/v1/bundle.js'
```

## API Reference

### `generateCdnUrl(options)`

Generates a CDN URL based on the provided options.

#### Parameters

**options**: `PackageUrlOptions | FlexibleUrlOptions`

##### PackageUrlOptions

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| `cdn` | `string` | ✓ | The base CDN URL (e.g., `'https://img6.wsimg.com'`) |
| `packageName` | `string` | ✓ | The package name |
| `version` | `string` | ✓ | The package version. Special values `'all'`, `'list'`, or `'json'` generate a `versions.json` URL |
| `assetPath` | `string` | | Optional path to a specific asset within the package |
| `hostname` | `string` | | Optional hostname to replace the CDN hostname (for environment switching) |

##### FlexibleUrlOptions

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| `cdn` | `string` | ✓ | The base CDN URL (e.g., `'https://img6.wsimg.com'`) |
| `pathSegments` | `string[]` | ✓ | Array of path segments to join |
| `hostname` | `string` | | Optional hostname to replace the CDN hostname (for environment switching) |

#### Returns

`string` - The generated CDN URL

#### Throws

- `Error` - If required parameters are missing or invalid
- `Error` - If `cdn` is not a valid URL
- `Error` - If `pathSegments` is empty

## TypeScript Support

The library is written in TypeScript and includes comprehensive type definitions:

```typescript
import {
  generateCdnUrl,
  type PackageUrlOptions,
  type FlexibleUrlOptions,
  type GenerateCdnUrlOptions
} from '@godaddy/generate-cdn-url';

// Type-safe options
const options: PackageUrlOptions = {
  cdn: 'https://img6.wsimg.com',
  packageName: 'my-package',
  version: '1.0.0',
  assetPath: 'dist/bundle.js'
};

const url = generateCdnUrl(options);
```

The TypeScript compiler will catch invalid option combinations at compile time:

```typescript
// ❌ TypeScript error: Type 'string' is not assignable to type 'undefined'
const invalid = generateCdnUrl({
  cdn: 'https://img6.wsimg.com',
  packageName: 'my-package',
  pathSegments: ['custom', 'path']
});
```

## Migration from deploy-assets

If you're migrating from the `deploy-assets` library's `getAssetUrl` function:

### Before (deploy-assets)

```javascript
const { getAssetUrl } = require('deploy-assets');

// Required package.json with deployAssets config
const url = getAssetUrl('dist/bundle.js');
```

### After (@godaddy/generate-cdn-url)

```typescript
import { generateCdnUrl } from '@godaddy/generate-cdn-url';

// Explicit, programmatic configuration
const url = generateCdnUrl({
  cdn: 'https://img6.wsimg.com',
  packageName: process.env.npm_package_name,
  version: process.env.npm_package_version,
  assetPath: 'dist/bundle.js'
});
```

### Key Differences

1. **No config file lookup**: All parameters are explicitly provided
2. **Modern ESM/CJS**: Supports both module systems with tree-shaking
3. **TypeScript-first**: Full type safety out of the box
4. **Zero dependencies**: No `url-join` or other dependencies
5. **More flexible**: Support for custom path patterns via `pathSegments`

## Examples

### Dynamic Environment Configuration

```typescript
const getEnvironmentHostname = (env: string) => {
  switch (env) {
    case 'development':
      return 'dev.img6.wsimg.com';
    case 'staging':
      return 'staging.img6.wsimg.com';
    case 'production':
    default:
      return undefined; // Use default CDN hostname
  }
};

const url = generateCdnUrl({
  cdn: 'https://img6.wsimg.com',
  packageName: 'my-package',
  version: '1.0.0',
  assetPath: 'dist/bundle.js',
  hostname: getEnvironmentHostname(process.env.NODE_ENV)
});
```

### Helper Function for Package Assets

```typescript
import { generateCdnUrl } from '@godaddy/generate-cdn-url';

const CDN_BASE = 'https://img6.wsimg.com';
const PACKAGE_NAME = 'my-package';
const PACKAGE_VERSION = '1.0.0';

export function getAssetUrl(assetPath: string): string {
  return generateCdnUrl({
    cdn: CDN_BASE,
    packageName: PACKAGE_NAME,
    version: PACKAGE_VERSION,
    assetPath,
    hostname: process.env.CDN_HOSTNAME
  });
}

// Usage
const cssUrl = getAssetUrl('dist/styles.css');
const jsUrl = getAssetUrl('dist/app.js');
```

### Fetching Available Versions

```typescript
async function getAvailableVersions(packageName: string): Promise<string[]> {
  const versionsUrl = generateCdnUrl({
    cdn: 'https://img6.wsimg.com',
    packageName,
    version: 'all'
  });

  const response = await fetch(versionsUrl);
  const versions = await response.json();
  return versions;
}

const versions = await getAvailableVersions('my-package');
console.log('Available versions:', versions);
```

## Best Practices

1. **Store CDN configuration in environment variables** for easy environment switching
2. **Create helper functions** to avoid repeating common parameters
3. **Use TypeScript** to catch configuration errors at compile time
4. **Cache generated URLs** if generating the same URL multiple times
5. **Validate versions** before generating URLs if accepting user input

## License

MIT

## Contributing

Issues and pull requests are welcome at [https://github.com/godaddy/antares](https://github.com/godaddy/antares)
