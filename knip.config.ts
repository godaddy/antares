import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  workspaces: {
    '.': {
      // Root workspace configuration
      entry: [
        'configs/*.mts' // Shared config files used by packages
      ],
      project: ['configs/**/*.{ts,mts}'],
      // Dependencies used in shared configs and ambient types
      ignore: [
        '@types/css-modules', // Provides ambient types for CSS modules
        '@types/mdx' // Provides ambient types for MDX files
      ]
    },
    'apps/docs': {
      // Ignore files and dependencies used by Storybook but not directly traceable
      ignore: ['.storybook/addons/why-did-you-render/**/*'], // Storybook addon files
      ignoreDependencies: [
        '@bento/*', // Used via Storybook story discovery
        'react-diff-viewer-continued' // Used in why-did-you-render addon
      ]
    },
    'packages/@bento/*': {
      // Ignore circular dependencies in examples and tests - these are for demo purposes
      ignore: [
        'examples/**/*', // Example files that may use circular dependencies for demos
        'test/**/*.test.tsx' // Test files that may need circular dependencies for testing
      ]
    },
    'packages/@godaddy/*': {
      // Ignore circular dependencies in examples and tests - these are for demo purposes
      ignore: [
        'examples/**/*', // Example files that may use circular dependencies for demos
        'test/**/*.test.tsx' // Test files that may need circular dependencies for testing
      ]
    },
    'packages/dev/*': {
      // Ignore circular dependencies in examples and tests - these are for demo purposes
      ignore: [
        'examples/**/*', // Example files that may use circular dependencies for demos
        'test/**/*.test.tsx' // Test files that may need circular dependencies for testing
      ]
    },
    'packages/dev/storybook-addon-helpers': {
      ignore: ['test/fixtures/**/*'] // Test fixture files are intentionally unused
    }
  },
  // Global ignores for dependencies that provide ambient types or are used in scripts
  ignoreDependencies: [
    '@types/css-modules', // CSS module types used globally
    '@types/mdx' // MDX types used globally
  ]
};

export default config;
