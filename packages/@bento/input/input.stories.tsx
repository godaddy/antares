import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { Input } from './src/index.tsx';
import { BasicFormExample } from './examples/basic-form.tsx';
import { ControlledInput } from './examples/controlled.tsx';
import { UncontrolledInput } from './examples/uncontrolled.tsx';
import { FormExample } from './examples/form.tsx';

export default getMeta({
  title: 'Bento/components/Input'
});

export const Props = getComponentDocs(Input);

export const BasicForm = getStory(BasicFormExample);

export const Controlled = getStory(ControlledInput);

export const Uncontrolled = getStory(UncontrolledInput);

export const Form = getStory(FormExample);
