import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './examples/button.tsx';
import { Nested } from './examples/nested.tsx';
import { Memo } from './examples/memo.tsx';

const meta: Meta<typeof Button> = {
  title: '@bento/render-props',
  component: () => null
};

type Story = StoryObj<typeof Button>;

export default meta;

export const RenderProps: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    original: {
      description:
        'If the component is assigning a default value to the given prop, the original value be a reference to the previous assigned value.',
      type: 'object',
      table: {
        defaultValue: { summary: 'The original assigned value' },
        type: { summary: 'any' }
      }
    },
    props: {
      description: 'All the props that were passed to the component.',
      type: 'object',
      table: {
        defaultValue: { summary: '{}' },
        type: { summary: 'object' }
      }
    },
    state: {
      description: 'The exposed state of the component.',
      type: 'object',
      table: {
        defaultValue: { summary: '{}' },
        type: { summary: 'object' }
      }
    },
    slots: {
      description:
        'If slots are used to modify the component, this will contain a reference to the original slots object',
      type: 'object',
      table: {
        defaultValue: { summary: '{}' },
        type: { summary: 'object' }
      }
    }
  }
};

export const useRenderProps: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    props: {
      description: 'The props of the component.',
      type: 'object',
      required: true
    },
    state: {
      description: 'Any state to be exposed to the render props.',
      type: 'object',
      table: {
        defaultValue: { summary: '{}' },
        type: { summary: 'object' }
      }
    }
  }
};

export const hook: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    props: {
      description: 'The props of the component.',
      table: {
        defaultValue: { summary: '{ ...props, ...slots }' },
        type: { summary: 'object' }
      }
    },
    apply: {
      description: 'Any state to be exposed to the render props.',
      type: 'function',
      table: {
        defaultValue: { summary: 'function(attr)' },
        type: { summary: 'function' }
      }
    }
  }
};

export const Demo: Story = {
  args: {
    children: 'Hello World',
    id: 'button'
  }
};

export const ComplexComponent: Story = {
  args: {
    slots: {
      'example-container.button': {
        as: 'a',
        children: 'Click Me',
        href: 'https://example.com',
        className: function className({ original }) {
          return [original, 'button'].filter(Boolean).join(' ');
        }
      }
    }
  },

  render: (args) => <Nested {...args} />
};

export const MemoProps: Story = {
  title: '@bento/slots/stories',
  render: (args) => <Memo {...args} />
};
