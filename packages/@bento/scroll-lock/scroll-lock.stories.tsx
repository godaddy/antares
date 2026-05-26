import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { ScrollLock as ScrollLockComponent } from './src/index.tsx';
import { BasicExample } from './examples/basic.tsx';
import { HookExample } from './examples/hook.tsx';
import { ModalExample } from './examples/modal.tsx';

export default getMeta({
  title: 'Bento/components/ScrollLock'
});

export const Props = getComponentDocs(ScrollLockComponent);

export const Basic = getStory(BasicExample);

export const Hook = getStory(HookExample);

export const Modal = getStory(ModalExample);
