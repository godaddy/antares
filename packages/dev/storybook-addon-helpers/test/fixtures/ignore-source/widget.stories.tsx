import { getComponentDocs } from '../../../src/storybook/getters.ts';
import type { BaseProps } from './base-props.ts';

interface WidgetProps extends BaseProps {
  /** Local to this file. */
  local: string;
}

function Widget(_props: WidgetProps) {
  return null;
}

// Drops the prop declared in base-props.ts (string = substring match on sourceFile).
export const Ignored = getComponentDocs(Widget, { ignoreSourceFiles: 'base-props' });

// Control export: no ignore, so both props are kept.
export const Kept = getComponentDocs(Widget);
