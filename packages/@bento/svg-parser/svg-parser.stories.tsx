import { getMeta, getStory } from '@bento/storybook-addon-helpers';
import { BasicExample } from './examples/basic';
import { ComplexExample } from './examples/complex';
import { CustomNodesExample } from './examples/custom-nodes';
import { CustomPropsExample } from './examples/custom-props';

export default getMeta({
  title: 'Bento/utility/svg-parser'
});

export const Basic = getStory(BasicExample);

export const Complex = getStory(ComplexExample);

export const CustomNodes = getStory(CustomNodesExample);

export const CustomProps = getStory(CustomPropsExample);

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
