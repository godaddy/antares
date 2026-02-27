import { describe, it } from 'vitest';
import assume from 'assume';
import { generateCdnUrl } from '../src/index.ts';

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
  });

  describe('Error Handling', function errorHandlingTests() {
    it('should throw error if options do not match any type', function invalidOptionsErrorTest() {
      assume(function shouldThrow() {
        generateCdnUrl({
          cdn: 'https://img6.wsimg.com'
        } as any);
      }).throws('Invalid options: must provide either packageName/version or pathSegments');
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
});
