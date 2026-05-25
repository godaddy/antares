import { SlotCustomization as SlotCustomizationExample } from './examples/slot-customization.tsx';
import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { CustomLabel as CustomLabelExample } from './examples/custom-label.tsx';
import { Dismiss as DismissComponent } from './src/index.tsx';
import { Basic as BasicExample } from './examples/basic.tsx';

export default getMeta({
  title: 'Bento/components/Dismiss'
});

export const Props = getComponentDocs(DismissComponent);

export const Basic = getStory(BasicExample);

export const CustomLabel = getStory(CustomLabelExample);

export const SlotCustomization = getStory(SlotCustomizationExample);
