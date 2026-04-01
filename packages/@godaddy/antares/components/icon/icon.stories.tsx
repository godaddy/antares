'use client';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/icon-playground.tsx';
import { getMeta, getStory, getComponentDocs } from '@bento/storybook-addon-helpers';
import { IconExample } from './examples/icon.tsx';

export default getMeta({
  title: 'Antares/Components/Icon',
  component: IconExample,
  args: {
    icon: 'star'
  }
});

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    icon: 'star',
    width: 24,
    height: 24
  },
  argTypes: {
    icon: { control: 'text' },
    color: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' }
  }
};

export const Icon = getStory(IconExample);

export const Props = getComponentDocs(IconExample);
