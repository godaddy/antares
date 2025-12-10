import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Menu } from '@bento/menu';

// Import example components
import { BasicMenuExample } from './examples/basic-menu';
import { SelectionMenuExample } from './examples/selection-menu';
import { SectionsExample } from './examples/sections';
import { MenuTriggerExample } from './examples/menu-trigger';
import { DynamicMenuExample } from './examples/dynamic-menu';

const meta: Meta<typeof Menu> = {
  title: 'components/Menu',
  component: () => null,
  parameters: {
    layout: 'centered',
    controls: { expanded: true }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  'aria-label': 'Menu actions'
};

const defaultArgTypes = {
  'aria-label': {
    control: { type: 'text' as const },
    description: 'A11y label when there is no visible label.',
    table: { type: { summary: 'string' } }
  },
  id: {
    control: { type: 'text' as const },
    description: 'Unique element id (optional).',
    table: { type: { summary: 'string' } }
  },
  selectionMode: {
    control: { type: 'select' as const },
    options: ['none', 'single', 'multiple'],
    description: 'Selection mode for menu items.',
    table: { defaultValue: { summary: 'none' }, type: { summary: "'none' | 'single' | 'multiple'" } }
  },
  defaultSelectedKeys: {
    control: { type: 'object' as const },
    description: 'Initial selection (array of keys).',
    table: { defaultValue: { summary: '—' }, type: { summary: 'Key[]' } }
  },
  selectedKeys: {
    control: { type: 'object' as const },
    description: 'Controlled selection (array of keys).',
    table: { defaultValue: { summary: '—' }, type: { summary: 'Key[] | "all"' } }
  },
  disabledKeys: {
    control: { type: 'object' as const },
    description: 'Keys to disable (must match ids).',
    table: { defaultValue: { summary: '—' }, type: { summary: 'Key[]' } }
  },
  orientation: {
    control: { type: 'select' as const },
    options: ['vertical', 'horizontal'],
    description: 'Menu orientation.',
    table: { defaultValue: { summary: 'vertical' }, type: { summary: "'vertical' | 'horizontal'" } }
  },
  onAction: {
    action: 'onAction',
    description: 'Called when a menu item is activated.',
    table: { type: { summary: '(key: Key) => void' } }
  },
  onClose: {
    action: 'onClose',
    description: 'Called when the menu is closed.',
    table: { type: { summary: '() => void' } }
  },
  className: {
    control: { type: 'text' as const },
    description: 'CSS class name.',
    table: { type: { summary: 'string' } }
  },
  style: {
    control: { type: 'object' as const },
    description: 'Inline styles.',
    table: { type: { summary: 'CSSProperties' } }
  }
};

export const BasicMenu: Story = {
  args: defaultArgs,
  argTypes: defaultArgTypes,
  render: (args) => <BasicMenuExample {...args} />
};

export const SelectionMenu: Story = {
  args: {
    ...defaultArgs,
    selectionMode: 'single'
  },
  argTypes: defaultArgTypes,
  render: (args) => <SelectionMenuExample {...args} />
};

export const MenuWithSections: Story = {
  args: defaultArgs,
  argTypes: defaultArgTypes,
  render: (args) => <SectionsExample {...args} />
};

export const MenuTriggerStory: Story = {
  args: defaultArgs,
  argTypes: defaultArgTypes,
  render: (args) => <MenuTriggerExample {...args} />
};

export const DynamicMenu: Story = {
  args: defaultArgs,
  argTypes: defaultArgTypes,
  render: (args) => <DynamicMenuExample {...args} />
};
