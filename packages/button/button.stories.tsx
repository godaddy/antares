import { getMeta, getComponentDocs, getStory, getVariants } from '@bento/storybook-addon-helpers';
import { Button } from './src/index.tsx';
import { ButtonExample } from './examples/button.tsx';
import { ButtonVariantsExample } from './examples/variants.tsx';

const defaultArgs = {
  children: 'Click me'
};

export default getMeta({
  title: 'components/Button',
  args: defaultArgs,
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'The content to display inside the button.',
      table: { type: { summary: 'ReactNode' } }
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' } }
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'The type of button.',
      table: { defaultValue: { summary: 'button' }, type: { summary: "'button' | 'submit' | 'reset'" } }
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Defines a string value that labels the button (useful for icon-only buttons).',
      table: { type: { summary: 'string' } }
    }
  }
});

export const Props = getComponentDocs(Button);

export const Default = getStory(ButtonExample, {
  args: defaultArgs
});

export const Styles = getVariants(ButtonVariantsExample, {
  primary: {
    args: {
      onPress: () => console.log('primary pressed!'),
      style: { backgroundColor: 'red', color: 'white' }
    }
  },
  secondary: {
    args: {
      children: 'Secondary!',
      style: { backgroundColor: 'blue', color: 'white' }
    }
  }
});
