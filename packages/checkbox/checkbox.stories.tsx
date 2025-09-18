import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { Checkbox, CheckboxGroup } from './src/index.tsx';
import { CheckboxExample } from './examples/checkbox.tsx';
import { CheckboxControlledExample } from './examples/checkbox-controlled.tsx';
import { CheckboxGroupControlledExample } from './examples/checkbox-group-controlled.tsx';
import { CheckboxGroupIndeterminateExample } from './examples/checkbox-group-indeterminate.tsx';
import { CheckboxGroupExample } from './examples/checkbox-group.tsx';

export default getMeta({
  title: 'components/checkbox'
});

export const CheckboxGroupProps = getComponentDocs(CheckboxGroup);

export const CheckboxProps = getComponentDocs(Checkbox);

export const CheckboxStory = getStory(CheckboxExample);

export const CheckboxGroupStory = getStory(CheckboxGroupExample);

export const CheckboxControlledStory = getStory(CheckboxControlledExample);

export const CheckboxGroupIndeterminateStory = getStory(CheckboxGroupIndeterminateExample);

export const CheckboxGroupControlledStory = getStory(CheckboxGroupControlledExample);
