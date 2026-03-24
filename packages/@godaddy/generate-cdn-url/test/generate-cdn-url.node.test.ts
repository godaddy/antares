import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import { describe, it } from 'vitest';
import assume from 'assume';
import { generateCdnUrl } from '@godaddy/generate-cdn-url';

describe('generateCdnUrl', function generateCdnUrlTests() {
  describe('Package URL Mode', function packageUrlModeTests() {
    it('should generate a basic URL with packageName and version', function basicUrlTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        packageName: 'my-package',
        version: '1.0.0'
      });

      assume(url).equals('https://img6.wsimg.com/my-package/1.0.0');
    });

    it('should generate a URL with assetPath', function urlWithAssetPathTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        packageName: 'my-package',
        version: '1.0.0',
        assetPath: 'dist/bundle.js'
      });

      assume(url).equals('https://img6.wsimg.com/my-package/1.0.0/dist/bundle.js');
    });

    it('should handle nested assetPath', function nestedAssetPathTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        packageName: 'my-package',
        version: '1.0.0',
        assetPath: 'dist/esm/components/button.js'
      });

      assume(url).equals('https://img6.wsimg.com/my-package/1.0.0/dist/esm/components/button.js');
    });

    it('should handle empty assetPath', function emptyAssetPathTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        packageName: 'my-package',
        version: '1.0.0',
        assetPath: ''
      });

      assume(url).equals('https://img6.wsimg.com/my-package/1.0.0');
    });

    it('should replace hostname when provided', function replaceHostnameTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        packageName: 'my-package',
        version: '1.0.0',
        hostname: 'dev.img6.wsimg.com'
      });

      assume(url).equals('https://dev.img6.wsimg.com/my-package/1.0.0');
    });

    it('should replace hostname and include assetPath', function replaceHostnameWithAssetPathTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        packageName: 'my-package',
        version: '1.0.0',
        assetPath: 'dist/bundle.js',
        hostname: 'staging.img6.wsimg.com'
      });

      assume(url).equals('https://staging.img6.wsimg.com/my-package/1.0.0/dist/bundle.js');
    });

    it('should handle version "all" as versions.json', function versionAllTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        packageName: 'my-package',
        version: 'all'
      });

      assume(url).equals('https://img6.wsimg.com/my-package/versions.json');
    });

    it('should handle version "list" as versions.json', function versionListTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        packageName: 'my-package',
        version: 'list'
      });

      assume(url).equals('https://img6.wsimg.com/my-package/versions.json');
    });

    it('should handle version "json" as versions.json', function versionJsonTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        packageName: 'my-package',
        version: 'json'
      });

      assume(url).equals('https://img6.wsimg.com/my-package/versions.json');
    });

    it('should handle version "ALL" (uppercase) as versions.json', function versionUppercaseTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        packageName: 'my-package',
        version: 'ALL'
      });

      assume(url).equals('https://img6.wsimg.com/my-package/versions.json');
    });

    it('should ignore assetPath when version is "all"', function versionAllIgnoreAssetPathTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        packageName: 'my-package',
        version: 'all',
        assetPath: 'dist/bundle.js'
      });

      assume(url).equals('https://img6.wsimg.com/my-package/versions.json');
    });

    it('should handle leading slashes in assetPath', function leadingSlashesTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        packageName: 'my-package',
        version: '1.0.0',
        assetPath: '/dist/bundle.js'
      });

      assume(url).equals('https://img6.wsimg.com/my-package/1.0.0/dist/bundle.js');
    });

    it('should handle trailing slashes in assetPath', function trailingSlashesTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        packageName: 'my-package',
        version: '1.0.0',
        assetPath: 'dist/bundle.js/'
      });

      assume(url).equals('https://img6.wsimg.com/my-package/1.0.0/dist/bundle.js');
    });

    it('should handle multiple slashes in assetPath', function multipleSlashesTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        packageName: 'my-package',
        version: '1.0.0',
        assetPath: '//dist//bundle.js//'
      });

      assume(url).equals('https://img6.wsimg.com/my-package/1.0.0/dist/bundle.js');
    });

    it('should handle trailing slash in cdn', function cdnTrailingSlashTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com/',
        packageName: 'my-package',
        version: '1.0.0'
      });

      assume(url).equals('https://img6.wsimg.com/my-package/1.0.0');
    });

    it('should encode special characters in the URL', function encodeSpecialCharsTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        packageName: 'my-package',
        version: '1.0.0',
        assetPath: 'dist/file with spaces.js'
      });

      assume(url).equals('https://img6.wsimg.com/my-package/1.0.0/dist/file%20with%20spaces.js');
    });

    it('should encode question marks in assetPath', function encodeQuestionMarkInAssetPathTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        packageName: 'my-package',
        version: '1.0.0',
        assetPath: 'dist/file?v=2.js'
      });

      assume(url).equals('https://img6.wsimg.com/my-package/1.0.0/dist/file%3Fv=2.js');
    });

    it('should encode hash characters in assetPath', function encodeHashInAssetPathTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        packageName: 'my-package',
        version: '1.0.0',
        assetPath: 'dist/file#section.js'
      });

      assume(url).equals('https://img6.wsimg.com/my-package/1.0.0/dist/file%23section.js');
    });

    it('should throw error if cdn is missing', function cdnMissingErrorTest() {
      assume(function shouldThrow() {
        generateCdnUrl({
          cdn: '',
          packageName: 'my-package',
          version: '1.0.0'
        });
      }).throws('cdn is required');
    });

    it('should throw error if cdn is invalid URL', function cdnInvalidErrorTest() {
      assume(function shouldThrow() {
        generateCdnUrl({
          cdn: 'not-a-valid-url',
          packageName: 'my-package',
          version: '1.0.0'
        });
      }).throws('cdn must be a valid URL');
    });

    it('should throw error if cdn uses non-http protocol', function cdnNonHttpErrorTest() {
      assume(function shouldThrow() {
        generateCdnUrl({
          cdn: 'ftp://img6.wsimg.com',
          packageName: 'my-package',
          version: '1.0.0'
        });
      }).throws('cdn must be a valid URL');
    });

    it('should throw error if cdn uses javascript protocol', function cdnJavascriptProtocolErrorTest() {
      assume(function shouldThrow() {
        generateCdnUrl({
          cdn: 'javascript:alert(1)',
          packageName: 'my-package',
          version: '1.0.0'
        });
      }).throws('cdn must be a valid URL');
    });

    it('should throw error if cdn contains embedded credentials', function cdnCredentialsErrorTest() {
      assume(function shouldThrow() {
        generateCdnUrl({
          cdn: 'https://user:pass@img6.wsimg.com',
          packageName: 'my-package',
          version: '1.0.0'
        });
      }).throws('cdn must be a valid URL');
    });

    it('should throw error if cdn contains query string', function cdnQueryStringErrorTest() {
      assume(function shouldThrow() {
        generateCdnUrl({
          cdn: 'https://img6.wsimg.com?foo=bar',
          packageName: 'my-package',
          version: '1.0.0'
        });
      }).throws('cdn must be a valid URL');
    });

    it('should throw error if cdn contains hash fragment', function cdnHashFragmentErrorTest() {
      assume(function shouldThrow() {
        generateCdnUrl({
          cdn: 'https://img6.wsimg.com#section',
          packageName: 'my-package',
          version: '1.0.0'
        });
      }).throws('cdn must be a valid URL');
    });

    it('should throw error if packageName is missing', function packageNameMissingErrorTest() {
      assume(function shouldThrow() {
        generateCdnUrl({
          cdn: 'https://img6.wsimg.com',
          packageName: '',
          version: '1.0.0'
        });
      }).throws('packageName is required');
    });

    it('should throw error if version is missing', function versionMissingErrorTest() {
      assume(function shouldThrow() {
        generateCdnUrl({
          cdn: 'https://img6.wsimg.com',
          packageName: 'my-package',
          version: ''
        });
      }).throws('version is required');
    });
  });

  describe('Flexible Path Segments Mode', function flexiblePathSegmentsTests() {
    it('should generate URL with path segments', function pathSegmentsTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        pathSegments: ['custom', 'path', 'to', 'asset.js']
      });

      assume(url).equals('https://img6.wsimg.com/custom/path/to/asset.js');
    });

    it('should handle single path segment', function singleSegmentTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        pathSegments: ['asset.js']
      });

      assume(url).equals('https://img6.wsimg.com/asset.js');
    });

    it('should replace hostname with path segments', function hostnameWithPathSegmentsTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        pathSegments: ['custom', 'path', 'asset.js'],
        hostname: 'dev.img6.wsimg.com'
      });

      assume(url).equals('https://dev.img6.wsimg.com/custom/path/asset.js');
    });

    it('should handle empty strings in path segments', function emptyStringsInSegmentsTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        pathSegments: ['custom', '', 'path', '', 'asset.js']
      });

      assume(url).equals('https://img6.wsimg.com/custom/path/asset.js');
    });

    it('should handle leading slashes in path segments', function leadingSlashesInSegmentsTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        pathSegments: ['/custom', '/path', '/asset.js']
      });

      assume(url).equals('https://img6.wsimg.com/custom/path/asset.js');
    });

    it('should handle trailing slashes in path segments', function trailingSlashesInSegmentsTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        pathSegments: ['custom/', 'path/', 'asset.js/']
      });

      assume(url).equals('https://img6.wsimg.com/custom/path/asset.js');
    });

    it('should encode special characters in path segments', function encodeSegmentsTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        pathSegments: ['custom path', 'file name.js']
      });

      assume(url).equals('https://img6.wsimg.com/custom%20path/file%20name.js');
    });

    it('should encode question marks in path segments', function encodeQuestionMarkTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        pathSegments: ['path', 'file?v=1.js']
      });

      assume(url).equals('https://img6.wsimg.com/path/file%3Fv=1.js');
    });

    it('should encode hash characters in path segments', function encodeHashTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        pathSegments: ['path', 'file#section.js']
      });

      assume(url).equals('https://img6.wsimg.com/path/file%23section.js');
    });

    it('should throw error if pathSegments is empty', function emptyPathSegmentsErrorTest() {
      assume(function shouldThrow() {
        generateCdnUrl({
          cdn: 'https://img6.wsimg.com',
          pathSegments: []
        });
      }).throws('pathSegments must be a non-empty array');
    });

    it('should throw error if pathSegments contains only empty strings', function onlyEmptyStringsErrorTest() {
      assume(function shouldThrow() {
        generateCdnUrl({
          cdn: 'https://img6.wsimg.com',
          pathSegments: ['', '', '']
        });
      }).throws('pathSegments must be a non-empty array');
    });

    it('should throw error if cdn is missing', function flexibleCdnMissingErrorTest() {
      assume(function shouldThrow() {
        generateCdnUrl({
          cdn: '',
          pathSegments: ['custom', 'path']
        });
      }).throws('cdn is required');
    });

    it('should throw error if pathSegments contain path traversal sequences', function pathTraversalSegmentsErrorTest() {
      assume(function shouldThrow() {
        generateCdnUrl({
          cdn: 'https://img6.wsimg.com',
          pathSegments: ['..', '..', 'etc', 'passwd']
        });
      }).throws('Path segments must not contain path traversal sequences (..)');
    });

    it('should throw error if pathSegments contain embedded path traversal', function embeddedPathTraversalErrorTest() {
      assume(function shouldThrow() {
        generateCdnUrl({
          cdn: 'https://img6.wsimg.com',
          pathSegments: ['assets/../secrets']
        });
      }).throws('Path segments must not contain path traversal sequences (..)');
    });
  });

  describe('Error Handling', function errorHandlingTests() {
    it('should throw error if options do not match any type', function invalidOptionsErrorTest() {
      assume(function shouldThrow() {
        generateCdnUrl({
          cdn: 'https://img6.wsimg.com'
        } as any);
      }).throws('Invalid options: must provide either packageName/version or pathSegments');
    });

    it('should throw error if both packageName/version and pathSegments are provided', function mixedOptionsErrorTest() {
      assume(function shouldThrow() {
        generateCdnUrl({
          cdn: 'https://img6.wsimg.com',
          packageName: 'my-package',
          version: '1.0.0',
          pathSegments: ['custom', 'path']
        } as any);
      }).throws('Invalid options: cannot provide both packageName/version and pathSegments');
    });

    it('should throw error if assetPath contains path traversal', function assetPathTraversalErrorTest() {
      assume(function shouldThrow() {
        generateCdnUrl({
          cdn: 'https://img6.wsimg.com',
          packageName: 'my-package',
          version: '1.0.0',
          assetPath: '../../etc/passwd'
        });
      }).throws('Path segments must not contain path traversal sequences (..)');
    });
  });

  describe('Edge Cases', function edgeCasesTests() {
    it('should handle different CDN domains', function differentDomainsTest() {
      const url = generateCdnUrl({
        cdn: 'https://example.com',
        packageName: 'my-package',
        version: '1.0.0'
      });

      assume(url).equals('https://example.com/my-package/1.0.0');
    });

    it('should handle CDN with port number', function portNumberTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com:8080',
        packageName: 'my-package',
        version: '1.0.0'
      });

      assume(url).equals('https://img6.wsimg.com:8080/my-package/1.0.0');
    });

    it('should preserve port when replacing hostname', function preservePortTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com:8080',
        packageName: 'my-package',
        version: '1.0.0',
        hostname: 'dev.img6.wsimg.com'
      });

      assume(url).equals('https://dev.img6.wsimg.com:8080/my-package/1.0.0');
    });

    it('should handle http protocol', function httpProtocolTest() {
      const url = generateCdnUrl({
        cdn: 'http://img6.wsimg.com',
        packageName: 'my-package',
        version: '1.0.0'
      });

      assume(url).equals('http://img6.wsimg.com/my-package/1.0.0');
    });

    it('should handle complex version strings', function complexVersionTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        packageName: 'my-package',
        version: '1.0.0-beta.1+build.123'
      });

      assume(url).equals('https://img6.wsimg.com/my-package/1.0.0-beta.1+build.123');
    });

    it('should handle scoped package names', function scopedPackageTest() {
      const url = generateCdnUrl({
        cdn: 'https://img6.wsimg.com',
        packageName: '@scope/package',
        version: '1.0.0'
      });

      assume(url).equals('https://img6.wsimg.com/@scope/package/1.0.0');
    });
  });

  describe('Public API', function packageSuite() {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    describe('#exports', function exportsSuite() {
      Object.keys(pkg.exports).forEach(function each(subpaths) {
        describe(`${subpaths}`, function subpathsSuite() {
          const exportPath = (pkg.exports as any)[subpaths];

          if (typeof exportPath === 'string') {
            return it(`exports ${subpaths} exists`, async function exportedTest() {
              const path = resolve(__dirname, '..', exportPath);
              await fs.access(path, fs.constants.F_OK);
            });
          }

          Object.keys(exportPath).forEach(function each(exported) {
            Object.keys(exportPath[exported]).forEach(function each(key) {
              it(`conditional export "${exported}.${key}" exists for ${join(pkg.name, subpaths)}`, async function exportedTest() {
                const path = resolve(__dirname, '..', exportPath[exported][key]);
                await fs.access(path, fs.constants.F_OK);
              });
            });
          });
        });
      });
    });
  });
});
