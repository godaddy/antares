import { getMeta, getInterfaceDocs, getStory } from '@bento/storybook-addon-helpers';
import { ForwardRefExample } from './examples/forward-ref.tsx';
import { SlotFunction } from './examples/slot-function.tsx';
import { SlotProps } from './examples/slot-props.tsx';
import { Nested } from './examples/nested.tsx';
import { Memo } from './examples/memo.tsx';
import { Merged } from './examples/merged.tsx';
import { type Slots } from './src/slots.tsx';

export default getMeta({
  title: 'Bento/higher-order components/slots'
});

export const SlotsAPI = getInterfaceDocs<Slots>();

export const withSlots = {
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

export const modifiers = {
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

export const NestedSlots = getStory(Nested, {
  args: {
    children: 'Hello World',
    id: 'button'
  }
});

export const MemoSlots = getStory(Memo);

export const PropsSlots = getStory(SlotProps);

export const FunctionalSlots = getStory(SlotFunction);

export const MergedSlots = getStory(Merged);

export const ForwardRefSlots = getStory(ForwardRefExample);
