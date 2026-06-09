'use client';
import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { Tag } from './src/index.tsx';
import { DefaultExample } from './examples/default.tsx';
import { EmphasesExample } from './examples/emphases.tsx';
import { SizesExample } from './examples/sizes.tsx';
import { HighContrastExample } from './examples/high-contrast.tsx';
import { IconsExample } from './examples/icons.tsx';
import { InlineExample } from './examples/inline.tsx';
import { IndicatorExample } from './examples/indicator.tsx';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/tag-playground.tsx';

export default getMeta({
  title: 'components/Tag'
});

export const Props = getComponentDocs(Tag);

export const Default = getStory(DefaultExample);

export const Emphases = getStory(EmphasesExample);

export const Sizes = getStory(SizesExample);

export const Inline = getStory(InlineExample);

export const HighContrast = getStory(HighContrastExample);

export const Icons = getStory(IconsExample);

export const Indicator = getStory(IndicatorExample);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    emphasis: 'passive',
    size: 'sm',
    design: 'filled',
    highContrast: false,
    indicator: false,
    children: 'Tag'
  },
  argTypes: {
    emphasis: {
      control: 'select',
      options: ['passive', 'critical', 'warning', 'success', 'info', 'highlight', 'premium', 'internal', 'neutral'],
      description: 'The semantic emphasis of the tag'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the tag'
    },
    design: {
      control: 'select',
      options: ['filled', 'inline'],
      description: 'The visual design mode'
    },
    highContrast: {
      control: 'boolean',
      description: 'Enable high-contrast color variant'
    },
    indicator: {
      control: 'boolean',
      description: 'Show indicator dot'
    },
    children: {
      control: 'text',
      description: 'The tag label text'
    }
  }
};
