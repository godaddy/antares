import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { Radio, RadioGroup } from './src/index.tsx';
import { ControlledExample } from './examples/controlled.tsx';
import { UncontrolledExample } from './examples/uncontrolled.tsx';
import { SingleRadioExample } from './examples/single-radio.tsx';

export default getMeta({
  title: 'components/radio'
});

export const RadioGroupProps = getComponentDocs(RadioGroup);

export const RadioProps = getComponentDocs(Radio);

export const Controlled = getStory(ControlledExample);

export const Uncontrolled = getStory(UncontrolledExample);

export const SingleRadio = getStory(SingleRadioExample);
