import type { Meta, StoryObj } from '@storybook/react';
import { FocusLock } from './src/index.tsx';
import { BasicExample } from './examples/basic.tsx';
import { NestedExample } from './examples/nested.tsx';
import { OverlayExample } from './examples/overlay.tsx';
import { SelectExample } from './examples/select.tsx';
import { FormExample } from './examples/form.tsx';
import React from 'react';

const meta: Meta<typeof FocusLock> = {
  title: 'Components/FocusLock',
  component: FocusLock,
  tags: ['autodocs'],
  argTypes: {
    contain: {
      control: 'boolean',
      description: 'Whether to contain focus within the scope',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    restoreFocus: {
      control: 'boolean',
      description: 'Whether to restore focus when the scope unmounts',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    autoFocus: {
      control: 'boolean',
      description: 'Whether to automatically focus the first element',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof FocusLock>;

export const Props: Story = {
  args: {
    contain: true,
    restoreFocus: true,
    autoFocus: true,
    children: <div>Focus lock content</div>
  }
};

export const Basic: Story = {
  render: () => <BasicExample />
};

export const Nested: Story = {
  render: () => <NestedExample />
};

export const Overlay: Story = {
  render: () => <OverlayExample />
};

export const Select: Story = {
  render: () => <SelectExample />
};

export const Form: Story = {
  render: () => <FormExample />
};
