'use client';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/playground.tsx';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { ListBoxBasic } from './examples/basic';
import { ListBoxControlledExample } from './examples/controlled';
import { ListBoxMultipleExample } from './examples/multiple';
import { ListBox } from './src/index.tsx';

export default getMeta({
  title: 'components/ListBox'
});

export const ListBoxProps = getComponentDocs(ListBox);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    'aria-label': 'Coffee',
    selectionMode: 'single'
  },
  argTypes: {
    'aria-label': { control: 'text' },
    selectionMode: { control: 'select', options: ['none', 'single', 'multiple'] }
  }
};

export const Basic = getStory(ListBoxBasic);

export const Controlled = getStory(ListBoxControlledExample);

export const Multiple = getStory(ListBoxMultipleExample);
