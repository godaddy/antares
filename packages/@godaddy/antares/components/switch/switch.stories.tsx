'use client';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { SwitchControlled } from './examples/controlled.tsx';
import { SwitchDefault } from './examples/default.tsx';
import { SwitchDisabled } from './examples/disabled.tsx';
import { SwitchLabelPosition } from './examples/label-position.tsx';
import { SwitchNoLabel } from './examples/no-label.tsx';
import { SwitchSelected } from './examples/selected.tsx';
import { SwitchSizes } from './examples/sizes.tsx';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/switch-playground.tsx';
import { Switch } from './src/index.tsx';

export default getMeta({ title: 'components/Switch', component: SwitchDefault });

export const Props = getComponentDocs(Switch);

export const Default = getStory(SwitchDefault);

export const Selected = getStory(SwitchSelected);

export const Sizes = getStory(SwitchSizes);

export const LabelPosition = getStory(SwitchLabelPosition);

export const NoLabel = getStory(SwitchNoLabel);

export const Disabled = getStory(SwitchDisabled);

export const Controlled = getStory(SwitchControlled);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
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
};
