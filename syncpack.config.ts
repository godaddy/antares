import type { RcFile } from 'syncpack';

const config: RcFile = {
  sortFirst: [
    'name',
    'private',
    'version',
    'description',
    'type',
    'types',
    'main',
    'module',
    'scripts',
    'repository',
    'keywords',
    'author',
    'license',
    'bugs',
    'homepage',
    'files',
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'exports'
  ],
  sortAz: [],
  formatBugs: false,
  formatRepository: false,
  dependencyGroups: [
    { aliasName: 'nx', dependencies: ['nx', '@nx/**'] },
    { aliasName: 'vitest', dependencies: ['vitest', '@vitest/**'] },
    { aliasName: 'storybook', dependencies: ['storybook', '@storybook/**'] },
    { aliasName: 'tailwindcss', dependencies: ['tailwindcss', '@tailwindcss/**'] },
    { aliasName: 'tsdown', dependencies: ['tsdown', '@tsdown/**'] },
    { aliasName: 'embla-carousel', dependencies: ['embla-carousel', 'embla-carousel-*'] },
    { aliasName: 'commitlint', dependencies: ['@commitlint/**'] }
  ],
  semverGroups: [
    {
      range: '',
      packages: ['**'],
      dependencyTypes: ['prod', 'dev'],
      dependencies: ['typescript']
    },
    {
      range: '',
      packages: ['**'],
      dependencyTypes: ['prod', 'dev'],
      dependencies: ['nx', '@nx/**']
    },
    {
      range: '^',
      dependencyTypes: ['prod', 'dev'],
      dependencies: ['**'],
      packages: ['**']
    }
  ],
  versionGroups: [
    {
      label: 'Shared dependency catalog',
      packages: ['**'],
      dependencies: [
        '@react-aria/utils',
        '@storybook/addon-docs',
        '@storybook/react-vite',
        '@types/mdast',
        '@types/react',
        '@types/react-dom',
        'react',
        'react-aria',
        'react-dom',
        'storybook',
        'tsdown',
        'typescript',
        'vite',
        'vitest',
        'vitest-browser-react'
      ],
      dependencyTypes: ['prod', 'dev'],
      policy: 'catalog'
    },
    {
      label: 'Stable TypeScript compiler',
      packages: ['**'],
      dependencies: ['typescript'],
      policy: 'sameRange'
    },
    {
      label: 'React peer dependencies',
      packages: ['**'],
      dependencies: ['react', 'react-dom'],
      dependencyTypes: ['peer'],
      isIgnored: true
    },

    {
      label: 'Bento packages',
      packages: ['**'],
      dependencies: ['@bento/**'],
      isIgnored: true
    },

    {
      label: 'Antares packages',
      packages: ['**'],
      dependencies: ['@godaddy/antares/**', '@godaddy/antares'],
      isIgnored: true
    },

    {
      label: 'Package family consistency',
      packages: ['**'],
      dependencies: ['storybook', 'vitest', 'tailwindcss', 'tsdown', 'commitlint', 'embla-carousel'],
      policy: 'sameRange'
    }
  ]
};

export default config;
