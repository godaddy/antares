'use client';
import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { Modal } from './src/index.tsx';
import { DefaultExample } from './examples/default.tsx';
import { ControlledExample } from './examples/controlled.tsx';
import { WithActionsExample } from './examples/with-actions.tsx';
import { AlignmentExample } from './examples/alignment.tsx';
import { WithMediaExample } from './examples/with-media.tsx';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/modal-playground.tsx';

export default getMeta({
  title: 'Antares/Components/Modal'
});

export const Props = getComponentDocs(Modal);

export const Default = getStory(DefaultExample);

export const Controlled = getStory(ControlledExample);

export const WithActions = getStory(WithActionsExample);

export const Alignment = getStory(AlignmentExample);

export const WithMedia = getStory(WithMediaExample);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
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
};
