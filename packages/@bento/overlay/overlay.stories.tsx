import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { Overlay as OverlayComponent } from './src/index.tsx';
import { Basic as BasicExample } from './examples/basic.tsx';
import { Modal as ModalExample } from './examples/modal.tsx';
import { Drawer as DrawerExample } from './examples/drawer.tsx';
import { UncontrolledWithTrigger as UncontrolledExample } from './examples/uncontrolled.tsx';
import { Popover as PopoverExample } from './examples/popover.tsx';

export default getMeta({
  title: 'components/Overlay'
});

export const Props = getComponentDocs(OverlayComponent);

export const Basic = getStory(BasicExample);

export const Modal = getStory(ModalExample);

export const Drawer = getStory(DrawerExample);

export const Uncontrolled = getStory(UncontrolledExample);

export const Popover = getStory(PopoverExample);
