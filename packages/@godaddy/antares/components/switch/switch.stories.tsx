'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { PlaygroundExample } from './examples/switch-playground.tsx';
import { Switch } from './src/index.tsx';

export default getMeta({ title: 'components/Switch', component: Switch });

export const Props = getComponentDocs(Switch);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    children: 'Wi-Fi',
    size: 'md',
    labelPosition: 'start',
    isSelected: false,
    isDisabled: false
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Label content rendered alongside the track'
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Size of the switch'
    },
    labelPosition: {
      control: 'radio',
      options: ['start', 'end'],
      description: 'Position of the label relative to the track'
    },
    isSelected: {
      control: 'boolean',
      description: 'Controlled on/off state'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disable interaction'
    }
  }
});
