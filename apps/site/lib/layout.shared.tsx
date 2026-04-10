import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const gitConfig = {
  user: 'godaddy',
  repo: 'antares',
  branch: 'main'
};

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: 'UXCore'
  },
  links: [
    {
      text: 'Documentation',
      url: '/docs',
      on: 'nav'
    }
  ],
  githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`
};
