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
    centered: false,
    showMedia: false,
    mediaVariant: 'full',
    mediaDirection: 'column',
    mediaPosition: 'start',
    showActions: true,
    actionsJustifyContent: 'end',
    actionsDirection: 'row'
  },
  argTypes: {
    isDismissable: {
      control: 'boolean',
      description: 'Whether the modal can be dismissed via overlay click or Escape key'
    },
    centered: {
      control: 'boolean',
      description: 'Whether the title and description are centered'
    },
    showMedia: {
      control: 'boolean',
      description: 'Show a media element in the modal'
    },
    mediaVariant: {
      control: 'radio',
      options: ['full', 'inset'],
      description: 'How the media is displayed within the modal'
    },
    mediaDirection: {
      control: 'radio',
      options: ['column', 'row'],
      description: 'Layout direction of the media relative to the content'
    },
    mediaPosition: {
      control: 'radio',
      options: ['start', 'end'],
      description: 'Which side the media appears on'
    },
    showActions: {
      control: 'boolean',
      description: 'Show footer action buttons'
    },
    actionsJustifyContent: {
      control: 'radio',
      options: ['start', 'center', 'end'],
      description: 'Horizontal alignment of footer action buttons'
    },
    actionsDirection: {
      control: 'radio',
      options: ['row', 'column'],
      description: 'Layout direction of footer action buttons'
    }
  }
});
