import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { FocusLock } from './src/index.tsx';
import { BasicExample } from './examples/basic.tsx';
import { NestedExample } from './examples/nested.tsx';
import { OverlayExample } from './examples/overlay.tsx';
import { SelectExample } from './examples/select.tsx';
import { FormExample } from './examples/form.tsx';

export default getMeta({
  title: 'components/FocusLock'
});

export const Props = getComponentDocs(FocusLock);

export const Basic = getStory(BasicExample);

export const Nested = getStory(NestedExample);

export const Overlay = getStory(OverlayExample);

export const Select = getStory(SelectExample);

export const Form = getStory(FormExample);
