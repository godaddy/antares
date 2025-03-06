import type { Meta, StoryObj } from '@storybook/react';
import { CreateStore } from './examples/create-store.tsx';
import { Icon } from './examples/icon.tsx';

const meta: Meta<typeof CreateStore> = {
  title: 'utility/create-external-store',
  component: () => null
};

type Story = StoryObj<typeof Store>;

export default meta;

export const api: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    subscribe: {
      description: 'Subscribe to changes in the store. The callback is called anytime a item in the store changes.',
      type: 'function',
      table: {
        defaultValue: { summary: 'subscribe((changes) => {})' },
        type: { summary: 'function' }
      }
    },
    dispatch: {
      description:
        'Notify subscribers of changes in the store. This is automatically called when a item in the store changes.',
      type: 'function',
      table: {
        defaultValue: { summary: 'dispatch(changes)' },
        type: { summary: 'function' }
      }
    },
    getSnapshot: {
      description: 'Returns the current snapshot of the store.',
      type: 'function',
      table: {
        defaultValue: { summary: 'getSnapshot()' },
        type: { summary: 'function' }
      }
    },
    ondemand: {
      description: 'Registers an async loader function to be called when data is requested for an unknown key.',
      type: 'function',
      table: {
        defaultValue: { summary: 'ondemand(async (key) => {})' },
        type: { summary: 'function' }
      }
    },
    pick: {
      description: 'Returns a function that retrieves the value associated with the specified key from the store.',
      type: 'function',
      table: {
        defaultValue: { summary: 'getSnapshot = pick(key)' },
        type: { summary: 'function' }
      }
    },
    only: {
      description: 'Creates a function that listens for changes to a specific key.',
      type: 'function',
      table: {
        defaultValue: { summary: 'subscribe = only(key)' },
        type: { summary: 'function' }
      }
    },
    set: {
      description: 'Adds data to the store, updates the snapshot, and calls the subscribers.',
      type: 'function',
      table: {
        defaultValue: { summary: 'set({ data: here })' },
        type: { summary: 'function' }
      }
    }
  }
};

export const Icons: Story = {
  args: {
    icon: 'octopus-sausages',
    fill: 'salmon'
  },
  render: (args) => <Icon {...args} />
};

export const Store: Story = {
  args: {
    myArray: [1, 2, 3],
    aObject: { foo: 'bar' },
    someBoolean: true,
    more: 'hello world',
    data: 1337
  },
  render: (args) => <CreateStore {...args} />
};
