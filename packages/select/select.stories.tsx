import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { SelectProps } from '@bento/select';
import { BasicSelectExample } from './examples/basic-example';

const meta: Meta<SelectProps<any>> = {
  title: 'components/Select',
  component: () => null as any,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'The Select primitive provides an accessible, customizable dropdown that overcomes native `<select>` limitations. Uses slot-based composition where Select acts as coordinator, applying necessary props to slotted children. Users can slot custom components (Button, Popover, ListBox, etc.) for maximum flexibility.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof BasicSelectExample>;

export const Basic: Story = {
  args: {
    placeholder: 'Select a fruit...',
    label: 'Favorite Fruit',
    selectionMode: 'single',
    withGroups: false,
    isDisabled: false,
    isRequired: false,
    isInvalid: false,
    showDescription: false,
    showError: false,
    name: '',
    placement: 'bottom start',
    offset: 4,
    crossOffset: 0,
    shouldFlip: true,
    containerPadding: 12
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when no value is selected.',
      table: { category: 'Content' }
    },
    label: {
      control: 'text',
      description: 'ARIA label for accessibility.',
      table: { category: 'Accessibility' }
    },
    selectionMode: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Selection mode: single allows one value, multiple allows multiple values.',
      table: { category: 'Behavior', defaultValue: { summary: 'single' } }
    },
    withGroups: {
      control: 'boolean',
      description: 'Display options in grouped sections.',
      table: { category: 'Content', defaultValue: { summary: 'false' } }
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the select is disabled.',
      table: { category: 'State', defaultValue: { summary: 'false' } }
    },
    isRequired: {
      control: 'boolean',
      description: 'Whether the select is required.',
      table: { category: 'Validation', defaultValue: { summary: 'false' } }
    },
    isInvalid: {
      control: 'boolean',
      description: 'Whether the select has validation errors.',
      table: { category: 'Validation', defaultValue: { summary: 'false' } }
    },
    showDescription: {
      control: 'boolean',
      description: 'Show description text below the select.',
      table: { category: 'Content', defaultValue: { summary: 'false' } }
    },
    showError: {
      control: 'boolean',
      description: 'Show error message below the select.',
      table: { category: 'Validation', defaultValue: { summary: 'false' } }
    },
    name: {
      control: 'text',
      description: 'Name attribute for form submission (enables hidden select).',
      table: { category: 'Forms' }
    },
    placement: {
      control: 'select',
      options: [
        'top',
        'top start',
        'top end',
        'bottom',
        'bottom start',
        'bottom end',
        'left',
        'left start',
        'left end',
        'right',
        'right start',
        'right end'
      ],
      description: 'Popover placement relative to trigger.',
      table: { category: 'Layout', defaultValue: { summary: 'bottom start' } }
    },
    offset: {
      control: { type: 'number', min: 0, max: 50, step: 1 },
      description: 'Distance (px) between trigger and popover.',
      table: { category: 'Layout', defaultValue: { summary: '4' } }
    },
    crossOffset: {
      control: { type: 'number', min: -100, max: 100, step: 1 },
      description: 'Cross-axis offset (px) for fine-tuning position.',
      table: { category: 'Layout', defaultValue: { summary: '0' } }
    },
    shouldFlip: {
      control: 'boolean',
      description: 'Whether popover flips to opposite side when space is limited.',
      table: { category: 'Layout', defaultValue: { summary: 'true' } }
    },
    containerPadding: {
      control: { type: 'number', min: 0, max: 50, step: 1 },
      description: 'Minimum padding (px) between popover and viewport edges.',
      table: { category: 'Layout', defaultValue: { summary: '12' } }
    },
    onChange: {
      action: 'value changed',
      description: 'Callback when value changes.',
      table: { category: 'Events' }
    }
  },
  render: (args) => <BasicSelectExample {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic Select component with full Storybook controls. Use the controls panel to explore all features including single/multi selection, grouped options, validation states, form integration, and positioning options.'
      }
    }
  }
};
