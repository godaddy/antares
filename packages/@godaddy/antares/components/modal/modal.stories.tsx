'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Modal, ModalTrigger } from './src/index.tsx';
import { PlaygroundExample } from './examples/modal-playground.tsx';

export default getMeta({
  title: 'components/Modal'
});

export const Props = getComponentDocs(Modal);

export const ModalTriggerProps = getComponentDocs(ModalTrigger);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    isDismissable: true,
    isKeyboardDismissDisabled: false,
    longContent: false,
    showActions: true,
    showTitle: true,
    longTitle: false
  },
  argTypes: {
    isDismissable: {
      control: 'boolean',
      description: 'Whether the modal can be dismissed via overlay click or Escape key'
    },
    isKeyboardDismissDisabled: {
      control: 'boolean',
      description: 'Prevent Escape from closing the modal'
    },
    longContent: {
      control: 'boolean',
      description: 'Fill the content region so it scrolls while the title row and actions stay pinned'
    },
    showActions: {
      control: 'boolean',
      description: 'Render a ButtonGroup with the modal actions'
    },
    showTitle: {
      control: 'boolean',
      description: 'Render a Heading slot="title". With it off, the close button keeps its top-right position'
    },
    longTitle: {
      control: 'boolean',
      description: 'Use a title long enough to wrap, showing that it wraps around the close button'
    }
  }
});
