import { type ComponentType, type CSSProperties } from 'react';
import { useDataAttributes } from '@bento/use-data-attributes';
import { type BoxContext } from '@bento/box';

/**
 * Checks if a given key is a CSS variable.
 *
 * @param {string} key - The key to check.
 * @returns {boolean} - Returns true if the key is a CSS variable, otherwise false.
 * @private
 */
function isCSSVariable(key: string) {
  return key.startsWith('--');
}

/**
 * Interface representing the arguments required to override a component.
 *
 * @interface OverrideArgs
 * @property {Props} props - The properties of the component.
 * @property {ComponentType<Props>} Component - The component which should be rendered.
 * @property {BoxContext<Props>} context - The current Slot context.
 * @property {string} name - The name of the component.
 * @private
 */
interface OverrideArgs<Props> {
  props: Props;
  Component: ComponentType<Props>;
  context: BoxContext<Props>;
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
 * @param {BoxContext} args.context - The context object.
 * @param {ComponentProps} args.props - The properties object.
 * @returns {OverrideResult | undefined} The result containing the updated properties or undefined if no overrides are applied.
 * @public
 */
export function override<Props extends Record<string, any>>({
  context,
  props
}: OverrideArgs<Props>): OverrideResult | undefined {
  const causes: string[] = [];
  const { namespace, assigned, override } = context.slots;
  const slot: Record<string, any> | undefined = assigned[namespace.join('.')];

  if (typeof props['data-override'] === 'string') {
    causes.push(...props['data-override'].split(' '));
  }

  if (override && !causes.includes('context')) causes.push('context');
  if ('className' in props && !causes.includes('className')) causes.push('className');

  //
  // For style we need to take a more sophisticated approach, users are allowed
  // to define CSS variables in the style prop, so we need to check if the keys
  // are prefixed with `--` or not.
  //
  if ('style' in props && !causes.includes('style')) {
    const style = props.style as CSSProperties;
    const keys = Object.keys(style);

    if (keys.some((key) => !isCSSVariable(key))) {
      causes.push('style');
    }
  }

  if (slot) {
    Object.keys(slot).forEach(function forEach(name) {
      if (triggers.includes(name) && !causes.includes(name)) causes.push(name);
      if (!causes.includes('slot')) causes.push('slot');
    });
  }

  if (!causes.length) return;
  return {
    props: useDataAttributes({ override: causes })
  };
}
