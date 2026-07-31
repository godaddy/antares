'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Modal } from './src/index.tsx';
import { PlaygroundExample } from './examples/modal-playground.tsx';

export default getMeta({
  title: 'components/Modal'
});

export const Props = getComponentDocs(Modal);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    isDismissable: true,
    longContent: false,
    showFooter: true
  },
  argTypes: {
    isDismissable: {
      control: 'boolean',
      description: 'Whether the modal can be dismissed via overlay click or Escape key'
    },
    longContent: {
      control: 'boolean',
      description: 'Fill the content region so it scrolls while the header and footer stay pinned'
    },
    showFooter: {
      control: 'boolean',
      description: 'Render a footer with a ButtonGroup'
    }
  }
});
