import { getMeta, getInterfaceDocs, getStory } from '@bento/storybook-addon-helpers';
import { ContextExample } from './examples/namespace.tsx';
import { type EnvContext, type SlotsContext } from './src/index.ts';

export default getMeta({
  title: 'internal/box'
});

export const slots = getInterfaceDocs<SlotsContext>();

export const env = getInterfaceDocs<EnvContext<any>>();

export const Namespace = getStory(ContextExample);
