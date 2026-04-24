import type { RcFile } from 'syncpack';
const config: RcFile = {
  customTypes: {
    dependencies: {
      strategy: 'versionsByName',
      path: 'dependencies'
    },
    devDependencies: {
      strategy: 'versionsByName',
      path: 'devDependencies'
    }
  },
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
  dependencyTypes: ['dependencies', 'devDependencies'],
  semverGroups: [
    {
      range: '',
      packages: ['**'],
      dependencyTypes: ['dependencies', 'devDependencies'],
      dependencies: ['nx']
    },
    {
      range: '^',
      dependencyTypes: ['dependencies', 'devDependencies'],
      dependencies: ['**'],
      packages: ['**']
    }
  ],
  versionGroups: [
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
      label: 'Vitest version consistency',
      packages: ['**'],
      dependencies: ['vitest', '@vitest/coverage-v8', '@vitest/ui'],
      dependencyTypes: ['dev'],
      policy: 'sameRange'
    },

    {
      label: 'Build tools consistency',
      packages: ['**'],
      dependencies: ['tsdown', 'typescript'],
      dependencyTypes: ['dev', 'prod'],
      policy: 'sameRange'
    }
  ]
};

export default config;
