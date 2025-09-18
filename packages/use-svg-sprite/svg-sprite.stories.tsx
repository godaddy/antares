import { getMeta, getStory } from '@bento/storybook-addon-helpers';
import { BasicUsage } from './examples/basic';
import { MultipleIcons } from './examples/multiple';


export default getMeta({
  title: 'Hooks/use-svg-sprite'
});

export const useSVGSpriteMeta = {
  tags: ['!dev', 'stable'],
  parameters: {
    controls: {
      expanded: true
    }
  },
  argTypes: {
    name: {
      description: 'The name of the SVG that should be added to the SVG sprite sheet',
      type: { name: 'string', required: true },
      control: 'text'
    },
    Graphic: {
      description: 'The component that renders the SVG content for the sprite sheet',
      type: { name: 'ReactElement', required: true },
      control: 'object'
    }
  }
};

export const BasicUsageStory = getStory(BasicUsage);

export const MultipleIconStory = getStory(MultipleIcons);
