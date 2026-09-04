'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { TextLockup } from './src/index.tsx';
import { PlaygroundExample } from './examples/text-lockup-playground.tsx';

export default getMeta({ title: 'components/TextLockup' });

export const Props = getComponentDocs(TextLockup);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    size: 'md',
    align: 'start',
    legibleLines: true,
    tagEyebrow: false
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'],
      description: 'Coordinated type size. Each part reads this tier on its own role ramp.'
    },
    align: {
      control: 'radio',
      options: ['start', 'center'],
      description: 'How the parts are aligned within the lockup.'
    },
    legibleLines: {
      control: 'boolean',
      description: 'Constrains the text parts to a comfortable line length for reading.'
    },
    tagEyebrow: {
      control: 'boolean',
      description: 'Render the eyebrow as a Tag rather than plain text.'
    }
  }
});
