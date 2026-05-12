import { getMeta, getStory } from '@bento/storybook-addon-helpers';
import { BasicExample } from './examples/basic.tsx';
import { AlreadyWrapped } from './examples/already-wrapped.tsx';
import { NoRef } from './examples/no-ref.tsx';
import { RestParams } from './examples/rest-params.tsx';

export default getMeta({
  title: 'Bento/higher-order components/forward'
});

export const Basic = getStory(BasicExample, {
  args: {
    children: 'Basic Example',
    className: 'example-class'
  }
});

export const Wrapped = getStory(AlreadyWrapped, {
  args: {
    children: 'Already Wrapped Example'
  }
});

export const NoRefExample = getStory(NoRef, {
  args: {
    children: 'No Ref Example'
  }
});

export const RestParamsExample = getStory(RestParams, {
  args: {
    children: 'Rest Parameters Example',
    className: 'rest-example'
  }
});
