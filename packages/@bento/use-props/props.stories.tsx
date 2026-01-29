import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './examples/button.tsx';
import { Nested } from './examples/nested.tsx';
import { Memo } from './examples/memo.tsx';

export default getMeta({
  title: 'hooks/use-props'
});

export const RenderProps = {
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

export const useProps = {
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

export const hook = {
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

export const Demo = getStory(Button, {
  args: {
    children: 'Hello World',
    id: 'button'
  }
});

export const ComplexComponent = getStory(Nested, {
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
  }
});

export const MemoProps = getStory(Memo);
