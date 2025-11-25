import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { Drawer } from './src/index.tsx';
import { BasicDrawerExample } from './examples/basic.tsx';
import { ConstrainedDrawerExample } from './examples/constrained.tsx';
import { BottomSheetExample } from './examples/bottom-sheet.tsx';
import { GestureDrawerExample } from './examples/gestures.tsx';
import './examples/examples.css';

export default getMeta({
  title: 'components/drawer'
});

export const Props = getComponentDocs(Drawer);

export const Default = getStory(BasicDrawerExample);

export const Constrained = getStory(ConstrainedDrawerExample);

export const BottomSheet = getStory(BottomSheetExample);

export const Gestures = getStory(GestureDrawerExample);
