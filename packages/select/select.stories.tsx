import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { SelectProps } from '@bento/select';
import { BasicSelectExample } from './examples/basic-select';
import { SelectWithGroupsExample } from './examples/select-with-groups';
import { SelectWithFormExample } from './examples/select-with-form';
import { CustomComponentsExample } from './examples/custom-components';
import { UsingListBoxItemExample } from './examples/using-listbox-item';
import { MultiSelectExample } from './examples/multi-select';

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
type Story = StoryObj<SelectProps<any>>;

const defaultArgs = {
  'aria-label': 'Select an option'
};

const defaultArgTypes = {
  selectionMode: {
    control: { type: 'select' as const },
    options: ['single', 'multiple'],
    description: 'Selection mode: single allows one value (Key), multiple allows multiple values (Set<Key>).',
    table: { defaultValue: { summary: 'single' }, type: { summary: "'single' | 'multiple'" } }
  },
  value: {
    control: { type: 'text' as const },
    description: 'The currently selected value (controlled mode). Key for single mode, Set<Key> for multiple mode.',
    table: { type: { summary: 'Key | Set<Key>' } }
  },
  defaultValue: {
    control: { type: 'text' as const },
    description: 'The initial selected value (uncontrolled mode). Key for single mode, Set<Key> for multiple mode.',
    table: { type: { summary: 'Key | Set<Key>' } }
  },
  onValueChange: {
    action: 'value changed',
    description: 'Callback when value changes. Receives Key for single mode, Set<Key> for multiple mode.',
    table: { type: { summary: '(value: Key | Set<Key>) => void' } }
  },
  isDisabled: {
    control: { type: 'boolean' as const },
    description: 'Whether the select is disabled.',
    table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' } }
  },
  isRequired: {
    control: { type: 'boolean' as const },
    description: 'Whether the select is required.',
    table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' } }
  },
  isInvalid: {
    control: { type: 'boolean' as const },
    description: 'Whether the select has validation errors.',
    table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' } }
  },
  name: {
    control: { type: 'text' as const },
    description: 'Name attribute for form submission (enables hidden select).',
    table: { type: { summary: 'string' } }
  },
  'aria-label': {
    control: { type: 'text' as const },
    description: 'ARIA label for accessibility.',
    table: { type: { summary: 'string' } }
  },
  'aria-labelledby': {
    control: { type: 'text' as const },
    description: 'ARIA labelledby for accessibility.',
    table: { type: { summary: 'string' } }
  },
  placeholder: {
    control: { type: 'text' as const },
    description: 'Placeholder text shown when no value is selected.',
    table: { type: { summary: 'string' } }
  },
  placement: {
    control: { type: 'select' as const },
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
    description: 'Overlay placement relative to trigger.',
    table: { defaultValue: { summary: 'bottom start' }, type: { summary: 'Placement' } }
  },
  offset: {
    control: { type: 'number' as const },
    description: 'Distance (px) between trigger and overlay.',
    table: { defaultValue: { summary: '4' }, type: { summary: 'number' } }
  },
  crossOffset: {
    control: { type: 'number' as const },
    description: 'Cross-axis offset (px) for fine-tuning overlay position.',
    table: { defaultValue: { summary: '0' }, type: { summary: 'number' } }
  },
  shouldFlip: {
    control: { type: 'boolean' as const },
    description: 'Whether overlay flips to opposite side when space is limited.',
    table: { defaultValue: { summary: 'true' }, type: { summary: 'boolean' } }
  },
  containerPadding: {
    control: { type: 'number' as const },
    description: 'Minimum padding (px) between overlay and viewport edges.',
    table: { defaultValue: { summary: '12' }, type: { summary: 'number' } }
  }
};

export const Props: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    ...defaultArgTypes,
    children: {
      description:
        'Slotted children: Button with slot="trigger", Text with slot="value", Popover with slot="popover", ListBox with slot="listbox".',
      table: { type: { summary: 'ReactNode' } }
    }
  }
};

export const Basic: Story = {
  args: {
    ...defaultArgs,
    placeholder: 'Select a fruit...',
    isDisabled: false,
    isRequired: false,
    isInvalid: false
  },
  argTypes: defaultArgTypes,
  render: (args) => <BasicSelectExample {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic Select example using slot-based composition. Select coordinates props to slotted children: Button (trigger), Text (value), Popover (overlay), and ListBox (options).'
      }
    }
  }
};

export const WithGroups: Story = {
  args: {
    ...defaultArgs,
    'aria-label': 'Bento box menu',
    placeholder: 'Choose a meal...'
  },
  argTypes: defaultArgTypes,
  render: (args) => <SelectWithGroupsExample {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Select with grouped options using ListBoxSection. Groups organize related options and provide accessible section headers.'
      }
    }
  }
};

export const FormIntegration: Story = {
  args: {
    ...defaultArgs,
    name: 'fruit',
    placeholder: 'Select a fruit...',
    isRequired: true
  },
  argTypes: defaultArgTypes,
  render: (args) => <SelectWithFormExample {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Select with form integration. When the `name` prop is provided, Select renders a hidden native `<select>` element for form submission and autofill compatibility. SelectOption maps `value` prop to `id` prop for React Aria collection system.'
      }
    }
  }
};

export const CustomComponents: Story = {
  render: () => <CustomComponentsExample />,
  parameters: {
    docs: {
      description: {
        story:
          'Example showing how users can bring custom components that implement the slot interfaces. Custom trigger and value components can be styled and enhanced while Select coordinates the necessary props.'
      }
    }
  }
};

export const UsingListBoxItem: Story = {
  args: {
    ...defaultArgs,
    placeholder: 'Select an option...'
  },
  argTypes: defaultArgTypes,
  render: (args) => <UsingListBoxItemExample {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Example using ListBoxItem directly with `id` prop instead of SelectOption with `value` prop. SelectOption is a convenience wrapper that maps `value` → `id`, but users can use ListBoxItem directly if preferred.'
      }
    }
  }
};

export const MultipleSelection: Story = {
  args: {
    ...defaultArgs,
    selectionMode: 'multiple',
    'aria-label': 'Select ingredients',
    placeholder: 'Choose ingredients...'
  },
  argTypes: defaultArgTypes,
  render: (args) => <MultiSelectExample {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Select with selectionMode="multiple" allows selecting multiple options. The value becomes Set<Key> instead of a single Key. Uses ListBox selectionMode="multiple" internally and manages Set state.'
      }
    }
  }
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '300px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Normal</label>
        <BasicSelectExample placeholder="Select a fruit..." />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Disabled</label>
        <BasicSelectExample isDisabled placeholder="Select a fruit..." />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Required</label>
        <BasicSelectExample isRequired placeholder="Select a fruit..." />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Invalid</label>
        <BasicSelectExample isInvalid placeholder="Select a fruit..." />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>With Selected Value</label>
        <BasicSelectExample value="banana" placeholder="Select a fruit..." />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select component in different states: normal, disabled, required, invalid, and with a selected value.'
      }
    }
  }
};
