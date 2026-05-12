import { getMeta, getComponentDocs, getStory, getVariants } from '@bento/storybook-addon-helpers';
import { Button } from './src/index.tsx';
import { ButtonExample } from './examples/button.tsx';
import { ButtonVariantsExample } from './examples/variants.tsx';

export default getMeta({
  title: 'Bento/components/Button'
});

export const Props = getComponentDocs(Button);

export const Default = getStory(ButtonExample);

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
