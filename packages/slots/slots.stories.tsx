import { SlotFunction } from './examples/slot-function.tsx';
import { ContextExample } from './examples/namespace.tsx';
import type { Meta, StoryObj } from '@storybook/react';
import { SlotProps } from './examples/slot-props.tsx';
import { Button } from './examples/button.tsx';
import { Nested } from './examples/nested.tsx';
import { Memo } from './examples/memo.tsx';

const meta: Meta<typeof Button> = {
  title: 'higher-order components/slots',
  component: () => null
};

type Story = StoryObj<typeof Button>;

export default meta;

export const SlotsAPI: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    prop: {
      description:
        'A named part of a component that can be customized. This is implemented by the consuming component. The exposed slot names of a component are available in the components documentation.',
      type: 'string'
    },
    props: {
      description:
        'An object that contains the customizations for the slots. The main way you interact with the slot system as a consumer.',
      type: 'object',
      table: {
        defaultValue: { summary: '{}' },
        type: { summary: 'object' }
      }
    }
  }
};

export const withSlots: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    name: {
      description: 'The unique name of the component. This is used to identify the component for slot overrides.',
      type: 'string'
    },
    Component: {
      description: 'The component that should be rendered.',
      type: 'function'
    },
    modifier: {
      description: 'The modifier functions that should be applied to the component.',
      type: 'array',
      table: {
        defaultValue: { summary: 'override, replaces' },
        type: { summary: 'array' }
      }
    }
  }
};

export const context: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    components: {
      description:
        'Mapping of the components that should be replaced. Where the key if the unique identifier of the function and the value the component it should be replaced with.',
      type: 'object',
      table: {
        defaultValue: { summary: '{}' },
        type: { summary: 'object' }
      }
    },
    namespace: {
      description: 'Ordered list of parent slot names that will be used as namespace.',
      type: 'array',
      table: {
        defaultValue: { summary: '[]' },
        type: { summary: 'array' }
      }
    },
    override: {
      description: 'Indicator if a `components` override has been applied to the parent or current component.',
      type: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    slots: {
      description: 'Object where the key are the namespaced slot names and the value are the slot components.',
      type: 'object',
      table: {
        defaultValue: { summary: '{}' },
        type: { summary: 'object' }
      }
    }
  }
};

export const modifiers: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    Component: {
      description: 'The component that should be rendered.',
      type: 'React.ComponentType',
      table: {
        defaultValue: { summary: '<Component />' },
        type: { summary: 'React.ComponentType' }
      }
    },
    context: {
      description: 'The above mentioned context object',
      type: 'Slots',
      table: {
        defaultValue: { summary: 'Slots' },
        type: { summary: 'Slots' }
      }
    },
    props: {
      description: 'The props that are passed down from the developer.',
      type: 'object',
      table: {
        defaultValue: { summary: '{}' },
        type: { summary: 'object' }
      }
    }
  }
};

export const NestedSlots: Story = {
  args: {
    children: 'Hello World',
    id: 'button'
  },

  render: (args) => <Nested {...args} />
};

export const MemoSlots: Story = {
  render: (args) => <Memo {...args} />
};

export const PropsSlots: Story = {
  render: (args) => <SlotProps {...args} />
};

export const FunctionalSlots: Story = {
  render: (args) => <SlotFunction {...args} />
};

export const Namespace: Story = {
  render: (args) => <ContextExample {...args} />
};
