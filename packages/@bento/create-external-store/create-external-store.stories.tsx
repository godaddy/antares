import { getMeta, getInterfaceDocs, getStory } from '@bento/storybook-addon-helpers';
import { CreateStore } from './examples/create-store.tsx';
import { Icon } from './examples/icon.tsx';
import { type Store as StoreType } from './src/create-external-store.ts';

export default getMeta({
  title: 'utility/create-external-store'
});

export const api = getInterfaceDocs<StoreType>();

export const Icons = getStory(Icon, {
  args: {
    icon: 'octopus-sausages',
    fill: 'salmon'
  }
});

export const Store = getStory(CreateStore, {
  args: {
    myArray: [1, 2, 3],
    aObject: { foo: 'bar' },
    someBoolean: true,
    more: 'hello world',
    data: 1337
  }
});
