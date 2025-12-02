import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { SelectProps } from '@bento/select';
import { BasicSelectExample } from './examples/basic-example';
import { StaticSelectExample } from './examples/static-select';
import { DynamicSelectExample } from './examples/dynamic-select';
import { GroupedSelectExample } from './examples/grouped-select';

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
type BasicStory = StoryObj<typeof BasicSelectExample>;
type StaticStory = StoryObj<typeof StaticSelectExample>;
type DynamicStory = StoryObj<typeof DynamicSelectExample>;
type GroupedStory = StoryObj<typeof GroupedSelectExample>;

export const Static: StaticStory = {
  args: {
    placeholder: 'Select a fruit...',
    label: 'Favorite Fruit'
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
    onChange: {
      action: 'value changed',
      description: 'Callback when value changes.',
      table: { category: 'Events' }
    }
  },
  render: (args) => <StaticSelectExample {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Minimal Select example with static JSX children. This is the simplest way to use Select and covers most common use cases.'
      }
    }
  }
};

export const Dynamic: DynamicStory = {
  args: {
    placeholder: 'Select a fruit...',
    label: 'Favorite Fruit',
    showEmptyState: false
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
    showEmptyState: {
      control: 'boolean',
      description: 'Show empty state using renderEmptyState prop.',
      table: { category: 'Content', defaultValue: { summary: 'false' } }
    },
    onChange: {
      action: 'value changed',
      description: 'Callback when value changes.',
      table: { category: 'Events' }
    }
  },
  render: (args) => <DynamicSelectExample {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Dynamic collection example using the items prop with typed data. Demonstrates Node<T>.value pattern for accessing rich item data (emoji, calories) in the value display and list items. Also showcases renderEmptyState.'
      }
    }
  }
};

export const Grouped: GroupedStory = {
  args: {
    placeholder: 'Select a fruit...',
    label: 'Favorite Fruit'
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
    onChange: {
      action: 'value changed',
      description: 'Callback when value changes.',
      table: { category: 'Events' }
    }
  },
  render: (args) => <GroupedSelectExample {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Grouped Select example using ListBoxSection and Header to organize options into categories. Note: grouping only works with static JSX children, not dynamic collections.'
      }
    }
  }
};

export const AllFeatures: BasicStory = {
  args: {
    placeholder: 'Select a fruit...',
    label: 'Favorite Fruit',
    selectionMode: 'single',
    withGroups: false,
    useDynamicCollection: false,
    showEmptyState: false,
    controlledOpen: false,
    isDisabled: false,
    isRequired: false,
    isInvalid: false,
    showDescription: false,
    showError: false,
    name: '',
    autoFocus: false,
    defaultOpen: false,
    disabledKeys: [],
    placement: 'bottom start',
    offset: 0,
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
      description: 'Display options in grouped sections (static children only).',
      table: { category: 'Content', defaultValue: { summary: 'false' } }
    },
    useDynamicCollection: {
      control: 'boolean',
      description: 'Use dynamic collection with items prop and Node<T>.value pattern (showcases rich data access).',
      table: { category: 'Content', defaultValue: { summary: 'false' } }
    },
    showEmptyState: {
      control: 'boolean',
      description: 'Show empty state using renderEmptyState prop (only when useDynamicCollection is enabled).',
      table: { category: 'Content', defaultValue: { summary: 'false' } }
    },
    controlledOpen: {
      control: 'boolean',
      description: 'Use controlled open state (isOpen/onOpenChange) instead of defaultOpen.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } }
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
    autoFocus: {
      control: 'boolean',
      description: 'Whether the select should receive focus on mount.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } }
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the select popover should be open by default (uncontrolled).',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } }
    },
    disabledKeys: {
      control: 'object',
      description: 'Array of keys for items that should be disabled (e.g., ["grape", "kiwi"]).',
      table: { category: 'Behavior', defaultValue: { summary: '[]' } }
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
      table: { category: 'Layout', defaultValue: { summary: '0' } }
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
    },
    onOpenChange: {
      action: 'open state changed',
      description: 'Callback when open state changes (used with controlledOpen).',
      table: { category: 'Events' }
    }
  },
  render: (args) => <BasicSelectExample {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'All features example with full Storybook controls. Use the controls panel to explore every capability: single/multi selection, static vs dynamic collections (with Node<T>.value access), grouped options, empty state rendering, controlled open state, validation states, form integration, and positioning options. This example serves as both a comprehensive playground and test harness.'
      }
    }
  }
};
