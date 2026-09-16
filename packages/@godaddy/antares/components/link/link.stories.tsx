'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Link } from './src/index.tsx';
import { PlaygroundExample } from './examples/link-playground.tsx';

export default getMeta({ title: 'components/Link' });
export const Props = getComponentDocs(Link);
export const Examples = getExamples('./examples');
export const Playground = getStory(PlaygroundExample, {
  args: { href: '/about', children: 'About' },
  argTypes: {
    href: { control: 'text', description: 'Destination URL' },
    children: { control: 'text', description: 'Link label' }
  }
});
