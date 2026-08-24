'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Content, Header, Footer, ButtonGroup } from './src/index.tsx';
import { PlaygroundExample } from './examples/structure-playground.tsx';

export default getMeta({
  title: 'components/Structure'
});

export const ContentProps = getComponentDocs(Content);
export const HeaderProps = getComponentDocs(Header);
export const FooterProps = getComponentDocs(Footer);
export const ButtonGroupProps = getComponentDocs(ButtonGroup);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    contentGap: 'md',
    actionsJustify: 'end'
  },
  argTypes: {
    contentGap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: "Gap between the Content region's lines"
    },
    actionsJustify: {
      control: 'select',
      options: ['start', 'center', 'end', 'space-between', 'space-around'],
      description: 'Alignment of the ButtonGroup actions'
    }
  }
});
