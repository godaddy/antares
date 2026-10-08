'use client';

import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Card, CardGroup, CardSelectionIndicator } from './src/index.tsx';
import { PlaygroundExample } from './examples/card-playground.tsx';

export default getMeta({
  title: 'components/Card'
});

export const Props = getComponentDocs(Card);

export const CardGroupProps = getComponentDocs(CardGroup);

export const CardSelectionIndicatorProps = getComponentDocs(CardSelectionIndicator);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    heading: 'Connect your domain',
    description: 'Give your website a memorable address so customers can find your business.'
  },
  argTypes: {
    heading: {
      control: 'text',
      description: 'Card heading'
    },
    description: {
      control: 'text',
      description: 'Card description'
    }
  }
});
