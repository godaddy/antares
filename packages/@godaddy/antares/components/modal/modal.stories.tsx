'use client';
import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { Modal } from './src/index.tsx';
import { DefaultExample } from './examples/default.tsx';
import { WithActionsExample } from './examples/with-actions.tsx';
import { WithMediaExample } from './examples/with-media.tsx';
import { HorizontalMediaExample } from './examples/horizontal-media.tsx';
import { FullscreenExample } from './examples/fullscreen.tsx';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/modal-playground.tsx';

export default getMeta({
  title: 'Antares/Components/Modal'
});

export const Props = getComponentDocs(Modal);

export const Default = getStory(DefaultExample);

export const WithActions = getStory(WithActionsExample);

export const WithMedia = getStory(WithMediaExample);

export const HorizontalMedia = getStory(HorizontalMediaExample);

export const Fullscreen = getStory(FullscreenExample);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    size: 'default',
    isDismissable: true,
    showMedia: false,
    mediaVariant: 'inset',
    alignment: 'default',
    mediaPosition: 'start',
    textAlign: 'start',
    fixedActions: false
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['default', 'large', 'fullscreen'],
      description: 'Size of the modal'
    },
    isDismissable: {
      control: 'boolean',
      description: 'Whether the modal can be dismissed'
    },
    showMedia: {
      control: 'boolean',
      description: 'Show a media element in the modal'
    },
    mediaVariant: {
      control: 'radio',
      options: ['inset', 'full-bleed'],
      description: 'How the media is displayed'
    },
    alignment: {
      control: 'radio',
      options: ['default', 'horizontal'],
      description: 'Layout direction when media is present'
    },
    mediaPosition: {
      control: 'radio',
      options: ['start', 'end'],
      description: 'Which side the media appears on in horizontal layout'
    },
    textAlign: {
      control: 'radio',
      options: ['start', 'center'],
      description: 'Text alignment within the content area'
    },
    fixedActions: {
      control: 'boolean',
      description: 'Whether footer actions are sticky at the bottom'
    }
  }
};
