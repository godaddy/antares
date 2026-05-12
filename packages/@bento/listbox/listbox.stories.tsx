import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ListBox } from '@bento/listbox';

// Import example components
import { BasicListBoxExample } from './examples/basic-listbox';
import { SectionsExample } from './examples/sections';
import { DynamicCollectionExample } from './examples/dynamic-collection';
import { SectionsDynamicExample } from './examples/sections-dynamic';
import { SlotsDynamicSectionsExample } from './examples/slots-dynamic-sections';

const meta: Meta<typeof ListBox> = {
  title: 'Bento/components/ListBox',
  component: () => null,
  parameters: {
    layout: 'centered',
    controls: { expanded: true }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  'aria-label': 'Bento box selection'
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
  selectionBehavior: {
    control: { type: 'select' as const },
    options: ['toggle', 'replace'],
    description: 'Toggle: clicking again deselects. Replace: always replaces current selection.',
    table: { defaultValue: { summary: 'toggle' }, type: { summary: "'toggle' | 'replace'" } }
  },
  selectionMode: {
    control: { type: 'select' as const },
    options: ['single', 'multiple', 'none'],
    description: 'How many items can be selected.',
    table: { defaultValue: { summary: 'single' }, type: { summary: "'single' | 'multiple' | 'none'" } }
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
    description: 'Nav axis: vertical (Up/Down) or horizontal (Left/Right).',
    table: { defaultValue: { summary: 'vertical' }, type: { summary: "'vertical' | 'horizontal'" } }
  },
  shouldFocusWrap: {
    control: { type: 'boolean' as const },
    description: 'Arrow key nav wraps at ends.',
    table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' } }
  },
  shouldFocusOnHover: {
    control: { type: 'boolean' as const },
    description: 'Focus items on hover.',
    table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' } }
  },
  autoFocus: {
    control: { type: 'select' as const },
    options: [true, false, 'first', 'last'],
    description: 'Auto focus: true/false/first/last.',
    table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean | "first" | "last"' } }
  },
  disallowEmptySelection: {
    control: { type: 'boolean' as const },
    description: 'Prevent clearing the last selection.',
    table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' } }
  },
  layout: {
    control: { type: 'select' as const },
    options: ['stack', 'grid'],
    description: 'Item layout style.',
    table: { defaultValue: { summary: 'stack' }, type: { summary: "'stack' | 'grid'" } }
  },
  className: {
    control: { type: 'text' as const },
    description: 'Class on root ListBox (string or fn).',
    table: { defaultValue: { summary: '—' }, type: { summary: 'string | (props) => string' } }
  },
  style: {
    control: { type: 'object' as const },
    description: 'Inline style on root (object or fn).',
    table: { defaultValue: { summary: '—' }, type: { summary: 'CSSProperties | (props) => CSSProperties' } }
  },
  escapeKeyBehavior: {
    control: { type: 'select' as const },
    options: ['clearSelection', 'none'],
    description: 'Escape key behavior.',
    table: { defaultValue: { summary: 'none' }, type: { summary: "'clearSelection' | 'none'" } }
  }
};

export const Props: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    items: {
      description: 'The items to render in the listbox. Each item must include a unique `key` property.',
      table: {
        type: { summary: 'ItemWithKey[]' }
      }
    },
    children: {
      description:
        'Function to render each item when `items` prop is provided, or static children elements like Option components.',
      table: {
        type: { summary: '((item: ItemWithKey) => ReactNode) | ReactNode' }
      }
    },
    selectedKeys: {
      description:
        'The currently selected keys (controlled mode). Can be a Set of keys or the string "all" to select all items.',
      table: {
        type: { summary: 'Selection (Set<Key> | "all")' }
      }
    },
    defaultSelectedKeys: {
      description:
        'The initial selected keys (uncontrolled mode). Can be a Set of keys or the string "all" to select all items.',
      table: {
        type: { summary: 'Selection (Set<Key> | "all")' }
      }
    },
    onSelectionChange: {
      description:
        'Callback when selection changes. Receives the new selection and a meta object with event and state information.',
      table: {
        type: { summary: '(keys: Selection, meta: Meta) => void' }
      }
    },
    selectionMode: {
      description: 'The selection mode of the listbox.',
      table: {
        defaultValue: { summary: 'single' },
        type: { summary: "'single' | 'multiple' | 'none'" }
      }
    },
    disabledKeys: {
      description: 'The keys of items that should be disabled and not selectable.',
      table: {
        type: { summary: 'Iterable<Key>' }
      }
    },
    disallowEmptySelection: {
      description: 'Whether to prevent the user from deselecting the last selected item.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    shouldFocusWrap: {
      description: 'Whether focus should wrap around when navigating with arrow keys.',
      table: {
        type: { summary: 'boolean' }
      }
    },
    orientation: {
      description: 'The orientation of the listbox, affecting keyboard navigation direction.',
      table: {
        defaultValue: { summary: 'vertical' },
        type: { summary: "'vertical' | 'horizontal'" }
      }
    },
    autoFocus: {
      description: 'Whether to focus the listbox on mount.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    renderEmptyState: {
      description: 'Function to render when the listbox has no items.',
      table: {
        type: { summary: '(props: ListBoxRenderProps) => ReactNode' }
      }
    },
    'aria-label': {
      description: 'Optional ARIA label for the listbox. Required for accessibility if no visible label is provided.',
      table: {
        type: { summary: 'string' }
      }
    },
    'aria-describedby': {
      description: 'Optional ARIA described by for the listbox. References an element ID that describes the listbox.',
      table: {
        type: { summary: 'string' }
      }
    },
    'aria-details': {
      description:
        'Optional ARIA details for the listbox. References an element ID with additional details about the listbox.',
      table: {
        type: { summary: 'string' }
      }
    },
    'aria-labelledby': {
      description: 'Optional ARIA labelledby for the listbox. References an element ID that labels the listbox.',
      table: {
        type: { summary: 'string' }
      }
    }
  }
};

export const StaticItems: Story = {
  args: {
    ...defaultArgs,
    selectionMode: 'single',
    selectionBehavior: 'toggle',
    orientation: 'vertical',
    shouldFocusWrap: false,
    shouldFocusOnHover: false,
    disallowEmptySelection: false
  },
  argTypes: defaultArgTypes,
  render: (args) => <BasicListBoxExample {...args} />
};

export const DynamicItems: Story = {
  args: {
    ...defaultArgs,
    'aria-label': 'Bento selection',

    items: [
      { id: 'chicken-teriyaki', name: 'Chicken Teriyaki' },
      { id: 'salmon-bento', name: 'Salmon Bento' },
      { id: 'beef-bowl', name: 'Beef Bowl' },
      { id: 'katsu-curry', name: 'Katsu Curry' },
      { id: 'tempura-box', name: 'Tempura Box' }
    ],

    selectionMode: 'single',
    selectionBehavior: 'toggle',
    orientation: 'vertical',
    shouldFocusWrap: false,
    shouldFocusOnHover: false,
    disallowEmptySelection: false,
    id: 'bento',
    layout: 'stack'
  },
  argTypes: {
    ...defaultArgTypes,
    items: {
      control: { type: 'object' as const },
      description: 'Array of data objects passed through the `items` prop.'
    }
  },
  render: (args) => <DynamicCollectionExample {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Note: React Aria automatically prefixes DOM IDs (e.g., `react-aria[hash]-[instance]-option-[key]`) for accessibility and uniqueness. Use `data-key` or `data-text-value` attributes for reliable element selection instead of DOM IDs.'
      }
    }
  }
};

export const WithSections: Story = {
  args: {
    ...defaultArgs,
    selectionMode: 'single',
    selectionBehavior: 'toggle',
    orientation: 'vertical'
  },
  argTypes: defaultArgTypes,
  render: (args) => <SectionsExample {...args} />
};

export const WithSectionsDynamic: Story = {
  args: {
    ...defaultArgs,
    /**
     * Categories are included here so they can be edited live from the
     * Storybook Controls panel. Each category becomes a section and must have
     * a unique `id`, a `name`, and an `items` array (items need `id` + `name`).
     */
    categories: [
      {
        id: 'main-dishes',
        name: 'Main Dishes',
        items: [
          { id: 'chicken-teriyaki', name: 'Chicken Teriyaki' },
          { id: 'salmon-bento', name: 'Salmon Bento' },
          { id: 'beef-bowl', name: 'Beef Bowl' }
        ]
      },
      {
        id: 'side-dishes',
        name: 'Side Dishes',
        items: [
          { id: 'pickled-vegetables', name: 'Pickled Vegetables' },
          { id: 'edamame', name: 'Edamame' },
          { id: 'miso-soup', name: 'Miso Soup' }
        ]
      }
    ],
    selectionMode: 'single',
    selectionBehavior: 'toggle',
    orientation: 'vertical'
  } as any,
  argTypes: {
    ...defaultArgTypes,
    categories: {
      control: { type: 'object' as const },
      description: 'Array of category objects rendered as ListBox sections.'
    }
  } as any,
  render: (args) => <SectionsDynamicExample {...args} />
};

export const WithSlotsDynamicSections: Story = {
  args: {
    ...defaultArgs,
    categories: [
      {
        id: 'main-dishes',
        name: 'Main Dishes',
        items: [
          { id: 'chicken-teriyaki', name: 'Chicken Teriyaki' },
          { id: 'salmon-bento', name: 'Salmon Bento' },
          { id: 'beef-bowl', name: 'Beef Bowl' }
        ]
      },
      {
        id: 'side-dishes',
        name: 'Side Dishes',
        items: [
          { id: 'pickled-vegetables', name: 'Pickled Vegetables' },
          { id: 'edamame', name: 'Edamame' },
          { id: 'miso-soup', name: 'Miso Soup' }
        ]
      }
    ],
    selectionMode: 'single',
    selectionBehavior: 'toggle',
    orientation: 'vertical'
  } as any,
  argTypes: {
    ...defaultArgTypes,
    categories: {
      control: { type: 'object' as const },
      description: 'Array of category objects rendered as ListBox sections.'
    }
  } as any,
  render: (args) => <SlotsDynamicSectionsExample {...args} />
};
