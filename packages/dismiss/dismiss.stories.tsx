import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { Basic } from './examples/basic.tsx';
import { CustomLabel } from './examples/custom-label.tsx';
import { SlotCustomization } from './examples/slot-customization.tsx';
import { Dismiss as DismissComponent } from './src/index.tsx';

export default getMeta({
  title: 'components/dismiss'
});

export const Props = getComponentDocs(DismissComponent);

export const Basic = getStory(Basic);

export const CustomLabel = getStory(CustomLabel);

export const SlotCustomization = getStory(SlotCustomization);

