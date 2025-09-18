import { getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Container } from './examples/container.tsx';

export default getMeta({
  title: 'hooks/use-data-attributes'
});

export const useDataAttributesProps = {
  tags: ['!dev', 'stable'],
  argTypes: {
    props: {
      description: 'The object that needs to be introduced as data- attributes',
      type: 'object',
      required: true
    }
  }
};

export const Demo = getStory(Container, {
  args: {
    example: ['1', '2', 'foo-bar'],
    focused: true,
    transform: { rotate: '45deg' },
    children: 'Inspect my DOM to see the resulting data- attributes'
  }
});
