'use client';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/avatar-playground.tsx';
import { ButtonExample } from './examples/button.tsx';
import { ButtonDisabledExample } from './examples/button-disabled.tsx';
import { ButtonPlaygroundExample, type ButtonPlaygroundExampleProps } from './examples/button-playground.tsx';
import { ButtonSelectedExample } from './examples/button-selected.tsx';
import { DefaultExample } from './examples/default.tsx';
import { EmphasisExample } from './examples/emphasis.tsx';
import { IconFallbackExample } from './examples/icon-fallback.tsx';
import { ImageFallbackExample } from './examples/image-fallback.tsx';
import { ImageExample } from './examples/image.tsx';
import { ShapesExample } from './examples/shapes.tsx';
import { Avatar, AvatarButton, AvatarFallback, AvatarImage } from './src/index.tsx';

export default getMeta({
  title: 'components/Avatar'
});

export const Props = getComponentDocs(Avatar);
export const AvatarImageProps = getComponentDocs(AvatarImage);
export const AvatarFallbackProps = getComponentDocs(AvatarFallback);
export const AvatarButtonProps = getComponentDocs(AvatarButton);

export const Default = getStory(DefaultExample);
export const Image = getStory(ImageExample);
export const ImageFallback = getStory(ImageFallbackExample);
export const Shapes = getStory(ShapesExample);
export const Emphasis = getStory(EmphasisExample);
export const IconFallback = getStory(IconFallbackExample);
export const Button = getStory(ButtonExample);
export const ButtonSelected = getStory(ButtonSelectedExample);
export const ButtonDisabled = getStory(ButtonDisabledExample);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    shape: 'circle',
    size: 'md',
    emphasis: 'primary',
    fallback: 'UT'
  },
  argTypes: {
    shape: {
      control: 'radio',
      options: ['circle', 'square'],
      description: 'Whether the avatar represents a person or an organization.'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Avatar diameter.'
    },
    emphasis: {
      control: 'select',
      options: [
        'primary',
        'subtle',
        'figure0',
        'figure1',
        'figure2',
        'figure3',
        'figure4',
        'figure5',
        'figure6',
        'figure7',
        'figure8',
        'figure9',
        'figure10',
        'figure11',
        'figure12',
        'figure13',
        'figure14'
      ],
      description: 'Surface color treatment.'
    },
    src: {
      control: 'text',
      description: 'Optional image source URL.'
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image.'
    },
    fallback: {
      control: 'text',
      description: 'Monogram or fallback content.'
    }
  }
};

export const ButtonPlayground = {
  render: (args: ButtonPlaygroundExampleProps) => <ButtonPlaygroundExample {...args} />,
  args: {
    shape: 'circle',
    size: 'md',
    emphasis: 'primary',
    fallback: 'UT',
    ariaLabel: 'Account',
    isSelected: false,
    isDisabled: false
  },
  argTypes: {
    shape: {
      control: 'radio',
      options: ['circle', 'square'],
      description: 'Whether the avatar represents a person or an organization.'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Avatar diameter.'
    },
    emphasis: {
      control: 'select',
      options: [
        'primary',
        'subtle',
        'figure0',
        'figure1',
        'figure2',
        'figure3',
        'figure4',
        'figure5',
        'figure6',
        'figure7',
        'figure8',
        'figure9',
        'figure10',
        'figure11',
        'figure12',
        'figure13',
        'figure14'
      ],
      description: 'Surface color treatment.'
    },
    src: {
      control: 'text',
      description: 'Optional image source URL.'
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image.'
    },
    fallback: {
      control: 'text',
      description: 'Monogram or fallback content.'
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible name for the button.'
    },
    isSelected: {
      control: 'boolean',
      description: 'Whether the button shows its selected ring.'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the button is disabled.'
    }
  }
};
