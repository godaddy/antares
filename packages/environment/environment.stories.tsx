import { ComponentLevelExample } from './examples/component-level.tsx';
import { CustomButtonExample } from './examples/custom-button.tsx';
import { IframeRenderingExample } from './examples/iframe-rendering.tsx';
import { OverrideProps } from './examples/override-props.tsx';
import type { Meta, StoryObj } from '@storybook/react';
import { Override } from './examples/override.tsx';
import React from 'react';

const meta: Meta<typeof Override> = {
  title: 'components/Environment',
  component: function Component() {
    return null;
  }
};

type Story = StoryObj<typeof Override>;

export default meta;

export const API: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    root: {
      description:
        'The root node (Document, ShadowRoot, or Node) to use for the environment context. This will automatically update the `window` and `document` props.',
      type: 'object',
      table: {
        type: { summary: 'Document | ShadowRoot | Node' }
      }
    },
    children: {
      description: 'The child components that will have access to the configured context',
      type: 'object',
      required: true,
      table: {
        type: { summary: 'ReactElement' }
      }
    },
    components: {
      description: 'Object that contains components that should be replaced',
      type: 'object',
      table: {
        type: { summary: 'Record<string, React.ComponentType<any> | { props: Record<string, any> }>' }
      }
    },
    window: {
      description: 'Get the window object for the rendering context',
      type: 'function',
      table: {
        type: { summary: '() => Window & typeof globalThis' },
        defaultValue: { summary: '() => window' }
      }
    },
    document: {
      description: 'Get the document object for the rendering context',
      type: 'function',
      table: {
        type: { summary: '() => Document' },
        defaultValue: { summary: '() => document' }
      }
    },
    sprite: {
      description: 'External sprite URL',
      type: 'string',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    }
  }
};

export const Demo: Story = {
  render: function renderDemo(args) {
    return <Override {...args} />;
  }
};

export const OverridePropsDemo: Story = {
  render: function renderOverridePropsDemo(args) {
    return <OverrideProps {...args} />;
  }
};

export const ComponentLevelOverride: Story = {
  render: function renderComponentLevelOverride(args) {
    return <ComponentLevelExample {...args} />;
  }
};

export const IframeRendering: Story = {
  render: function renderIframeRendering(args) {
    return <IframeRenderingExample {...args} />;
  }
};

export const Experimentation: Story = {
  render: function renderExperimentation(args) {
    return <CustomButtonExample {...args} />;
  }
};
