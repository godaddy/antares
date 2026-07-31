'use client';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/button-playground.tsx';
import { getMeta, getComponentDocs, getExamples } from '@bento/storybook-addon-helpers';
import { Button, LinkButton } from './src/index.tsx';

export default getMeta({
  title: 'components/Button'
});

export const Props = getComponentDocs(Button);

export const LinkButtonProps = getComponentDocs(LinkButton);

// Discovered from `./examples` at build time: one indexed story per example,
// ordered by `@order` and titled/described from each example's JSDoc. The
// README renders the same set via `<Examples of={Stories.examples} />`.
export const examples = getExamples('./examples');

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    variant: 'primary',
    size: 'md',
    isDisabled: false,
    children: 'Button'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'critical', 'inline', 'minimal'],
      description: 'Visual variant of the button'
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Size of the button'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disable the button'
    },
    children: {
      control: 'text',
      description: 'Button label text'
    }
  }
};
