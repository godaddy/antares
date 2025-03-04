import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './examples/container.tsx';

const meta: Meta<typeof Container> = {
  title: 'hooks/use-data-attributes',
  component: () => null
};

type Story = StoryObj<typeof Container>;

export default meta;

export const useDataAttributes: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    props: {
      description: 'The object that needs to be introduced as data- attributes',
      type: 'object',
      required: true
    }
  }
};

export const Demo: Story = {
  args: {
    example: ['1', '2', 'foo-bar'],
    focused: true,
    transform: { rotate: '45deg' },
    children: 'Inspect my DOM to see the resulting data- attributes'
  },
  render: (args) => <Container {...args} />
};
