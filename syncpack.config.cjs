/** @type {import('syncpack').RcFile} */
const config = {
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
    // React peer dependencies - keep as range for compatibility
    {
      label: 'React peer dependencies',
      packages: ['**'],
      dependencies: ['react', 'react-dom'],
      dependencyTypes: ['peer'],
      isIgnored: true
    },

    // @bento packages - ignore all of them (keep current patterns)
    {
      label: 'Bento packages',
      packages: ['**'],
      dependencies: ['@bento/**'],
      isIgnored: true
    }
  ]
};

module.exports = config;
