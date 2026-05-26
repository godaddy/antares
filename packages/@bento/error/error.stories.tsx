import { getMeta, getInterfaceDocs, getStory } from '@bento/storybook-addon-helpers';
import { Throws } from './examples/throws.tsx';
import { type BentoErrorArgs } from './src/index.ts';

export default getMeta({
  title: 'Bento/utility/error'
});

export const Required = getInterfaceDocs<Pick<BentoErrorArgs, 'name' | 'method' | 'message'>>();

export const Optional = getInterfaceDocs<Pick<BentoErrorArgs, 'scope' | 'channel' | 'docs' | 'args'>>();

export const Demo = getStory(Throws, {
  args: {
    name: 'package-name',
    method: 'function-name',
    message: 'An error occurred'
  }
});
