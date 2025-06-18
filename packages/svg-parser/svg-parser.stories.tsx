import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { BasicExample } from './examples/basic';
import { ComplexExample } from './examples/complex';
import { CustomNodesExample } from './examples/custom-nodes';
import { CustomPropsExample } from './examples/custom-props';

const meta: Meta = {
  title: 'utility/svg-parser',
  component: () => null
};

export default meta;

export const Basic: StoryObj = {
  name: 'Basic',
  render: () => <BasicExample />
};

export const Complex: StoryObj = {
  name: 'Complex',
  render: () => <ComplexExample />
};

export const CustomNodes: StoryObj = {
  name: 'Custom Nodes',
  render: () => <CustomNodesExample />
};

export const CustomProps: StoryObj = {
  name: 'Custom Props',
  render: () => <CustomPropsExample />
};

export const svgParserAPI = {
  tags: ['!dev', 'stable'],
  name: 'parser',
  parameters: {
    controls: {
      expanded: true
    }
  },
  argTypes: {
    source: {
      control: 'text',
      description: 'The SVG string to be transformed'
    },
    nodes: {
      control: 'object',
      description:
        'Custom node transformation functions. Each key is an SVG element name to transform, and the value is a function that returns [componentName, props]'
    },
    props: {
      control: 'object',
      description:
        'Custom property transformation functions. Each key is an SVG attribute name to transform, and the value is a function that returns [propName, propValue]'
    }
  }
};
