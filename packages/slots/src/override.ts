import { type ComponentProps, type ComponentType } from 'react';
import { useDataAttributes } from '@bento/use-data-attributes';
import { type SlotContext } from './context.ts';

interface OverrideArgs {
  props: ComponentProps<any>;
  Component: ComponentType;
  context: SlotContext;
  name: string;
}

interface OverrideResult {
  props: {
    'data-override': string;
  };
}

const triggers: string[] = ['className', 'style'];

/**
 * Overrides the properties of a given context based on certain conditions.
 *
 * @param {OverrideArgs} args - The arguments containing context and props.
 * @param {SlotContext} args.context - The context object.
 * @param {ComponentProps} args.props - The properties object.
 * @returns {OverrideResult | undefined} The result containing the updated properties or undefined if no overrides are applied.
 * @public
 */
export function override({ context, props }: OverrideArgs): OverrideResult | undefined {
  const causes: string[] = [];
  const { namespace, slots, override } = context;
  const slot: Record<string, any> | undefined = slots[namespace.join('.')];

  if (typeof props['data-override'] === 'string') {
    causes.push(...props['data-override'].split(' '));
  }

  if (override && !causes.includes('context')) causes.push('context');

  triggers.forEach(function forEach(name) {
    if (name in props) causes.push(name);
  });

  if (slot)
    Object.keys(slot).forEach(function forEach(name) {
      if (triggers.includes(name) && !causes.includes(name)) causes.push(name);
      if (!causes.includes('slot')) causes.push('slot');
    });

  if (!causes.length) return;

  return {
    props: useDataAttributes({ override: causes })
  };
}
