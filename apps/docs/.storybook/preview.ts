//
// NOTE: Import order matters here. The why-did-you-render import must be the
// first import of the files to ensure it can correctly interface with
// React and apply re-render tracking.
//
// import './why-did-you-render.ts';
import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { MermaidDiagram } from './components/MermaidDiagram';
import '../../../packages/@godaddy/antares/variables.css';
import './legacy-tokens.css';

function Pre(props: React.ComponentProps<'pre'>) {
  const child = props.children;

  if (React.isValidElement(child)) {
    const className = (child.props as { className?: string }).className;
    const isMermaid = typeof className === 'string' && className.includes('language-mermaid');

    if (isMermaid) {
      const code = (child.props as { children?: unknown }).children;
      return React.createElement(MermaidDiagram, {
        code: typeof code === 'string' ? code : String(code ?? '')
      });
    }
  }

  return React.createElement('pre', props);
}

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Bento',
          'Architecture',
          ['Guides', ['Primitives', 'Composition', 'Customization', 'Styling'], 'PDRs'],
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

      codePanel: true,
      components: {
        pre: Pre
      }
    }
  }
};

export default preview;
