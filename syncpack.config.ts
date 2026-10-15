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
    { aliasName: 'vitest', dependencies: ['vitest', '@vitest/**'] }
  ],
  semverGroups: [
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
      dependencies: ['vitest'],
      dependencyTypes: ['dev']
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
