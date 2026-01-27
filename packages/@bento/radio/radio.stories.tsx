import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { Radio, RadioGroup } from './src/index.tsx';
import { ControlledExample } from './examples/controlled.tsx';
import { UncontrolledExample } from './examples/uncontrolled.tsx';
import { SingleRadioExample } from './examples/single-radio.tsx';
import { ErrorHandlingExample, ErrorHandlingExampleWithState } from './examples/error-handling.tsx';

export default getMeta({
  title: 'components/Radio'
});

export const RadioGroupProps = getComponentDocs(RadioGroup);

export const RadioProps = getComponentDocs(Radio);

export const Controlled = getStory(ControlledExample);

export const Uncontrolled = getStory(UncontrolledExample);

export const SingleRadio = getStory(SingleRadioExample);

export const ErrorHandling = getStory(ErrorHandlingExample);

export const ErrorHandlingWithState = getStory(ErrorHandlingExampleWithState);
