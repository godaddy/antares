import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { DefaultExample } from './examples/default.tsx';
import { InputRefExample } from './examples/input-ref.tsx';
import { Control, ControlGroup } from './src/index.tsx';

export default getMeta({
  title: 'internal/control'
});

export const ControlGroupProps = getComponentDocs(ControlGroup);

export const ControlProps = getComponentDocs(Control);

export const Default = getStory(DefaultExample);

export const InputRef = getStory(InputRefExample);
