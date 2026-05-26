import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { RotateSVG } from './examples/rotate-illustration.tsx';
import { RenderingSvg } from './examples/rendering-svg.tsx';
import { Illustration } from './src/index.tsx';

export default getMeta({
  title: 'Bento/components/Illustration',
  component: Illustration,
  argTypes: {
    flip: {
      options: ['none', 'horizontal', 'vertical'],
      control: { type: 'radio' }
    },
    rotate: {
      options: [0, 90, 180, 270],
      control: { type: 'radio' }
    }
  }
});

export const Props = getComponentDocs(Illustration);

export const Demo = getStory(RenderingSvg, {
  args: {
    title: 'A play button'
  }
});

export const Rotate = getStory(RotateSVG);
