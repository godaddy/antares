//
// NOTE: Import order matters here. The why-did-you-render import must be the
// first import of the files to ensure it can correctly interface with
// React and apply re-render tracking.
//
import './why-did-you-render.ts';
import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Bento',
          'Architecture',
          ['Guides', 'PDRs'],
          'components',
          'hooks',
          'higher-order components',
          'utility',
          'internal',
          '*'
        ]
      }
    },
    docs: {
      toc: {
        title: 'On this page',
        headingSelector: 'h2, h3'
      },

      codePanel: true
    }
  }
};

export default preview;
