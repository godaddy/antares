import { type ComponentProps, type ComponentType } from 'react';
import { useDataAttributes } from '@bento/use-data-attributes';
import { type SlotContext } from './context.ts';

/**
 * Interface representing the arguments required to override a component.
 *
 * @interface OverrideArgs
 * @property {Props} props - The properties of the component.
 * @property {ComponentType<Props>} Component - The component which should will be rendered.
 * @property {SlotContext<Props>} context - The current Slot context.
 * @property {string} name - The name of the component.
 * @private
 */
interface OverrideArgs<Props> {
  props: Props;
  Component: ComponentType<Props>;
  context: SlotContext<Props>;
  name: string;
}

/**
 * Represents the result of an override operation.
 *
 * @interface OverrideResult
 * @property {Object} props - The properties of the override result.
 * @property {string} props.data-override - A string indicating the override data.
 * @private
 */
interface OverrideResult {
  props: {
    'data-override'?: string;
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
export function override<Props extends Record<string, any>>({
  context,
  props
}: OverrideArgs<Props>): OverrideResult | undefined {
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
