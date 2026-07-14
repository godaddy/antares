import { getComponentDocs, getTypeDocs } from '../../src/storybook/getters.ts';
import { Widget, type WidgetProps } from './widget.tsx';

export const Props = getComponentDocs(Widget, {
  primary: ['label'],
  categories: {
    Events: [/^on/]
  }
});

export const TypeProps = getTypeDocs<WidgetProps>({ exclude: ['size'] });

export const NotADoc = 'just a string';
