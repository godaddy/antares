import { getMeta, getStory, getTypeDocs } from '@bento/storybook-addon-helpers';
import { Throws } from './examples/throws.tsx';
import { type BentoErrorArgs } from './src/index.ts';

export default getMeta({
  title: 'Bento/utility/error'
});

export const Required = getTypeDocs<BentoErrorArgs>({
  include: ['name', 'method', 'message']
});

export const Optional = getTypeDocs<BentoErrorArgs>({
  include: ['scope', 'channel', 'docs', 'args']
});

export const Demo = getStory(Throws, {
  args: {
    name: 'package-name',
    method: 'function-name',
    message: 'An error occurred'
  }
});
