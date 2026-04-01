'use client';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/button-playground.tsx';
import { getMeta, getComponentDocs } from '@bento/storybook-addon-helpers';
import { SecondaryExample } from './examples/secondary.tsx';
import { TertiaryExample } from './examples/tertiary.tsx';
import { CriticalExample } from './examples/critical.tsx';
import { DisabledExample } from './examples/disabled.tsx';
import { DefaultExample } from './examples/default.tsx';
import { PrimaryExample } from './examples/primary.tsx';
import { MinimalExample } from './examples/minimal.tsx';
import { InlineExample } from './examples/inline.tsx';
import { Button, LinkButton } from './src/index.tsx';
import { SizesExample } from './examples/sizes.tsx';
import { IconExample } from './examples/icon.tsx';

export default getMeta({
  title: 'Antares/Components/Button',
});

export const Props = getComponentDocs(Button);

export const LinkButtonProps = getComponentDocs(LinkButton);

export const Default = DefaultExample;

export const Primary = PrimaryExample;

export const Secondary = SecondaryExample;

export const Tertiary = TertiaryExample;

export const Critical = CriticalExample;

export const Inline = InlineExample;

export const Minimal = MinimalExample;

export const Icon = IconExample;

export const Disabled = DisabledExample;

export const Sizes = SizesExample;

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    variant: 'primary',
    size: 'md',
    isDisabled: false,
    children: 'Button'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'critical', 'inline', 'minimal'],
      description: 'Visual variant of the button'
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Size of the button'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disable the button'
    },
    children: {
      control: 'text',
      description: 'Button label text'
    }
  }
};
