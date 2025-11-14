import { type ComponentType, type CSSProperties } from 'react';
import { useDataAttributes } from '@bento/use-data-attributes';
import { type BoxContext } from '@bento/box';

/**
 * Checks if a given key is a CSS variable.
 *
 * @param key - The key to check.
 * @returns true if the key is a CSS variable, otherwise false.
 * @private
 */
function isCSSVariable(key: string) {
  return key.startsWith('--');
}

/**
 * Interface representing the arguments required to override a component.
 *
 * @private
 */
interface OverrideArgs<Props> {
  /** The properties of the component. */
  props: Props;

  /** The component which should be rendered. */
  Component: ComponentType<Props>;

  /** The current Slot context. */
  context: BoxContext<Props>;

  /** The name of the component. */
  name: string;
}

/**
 * Represents the result of an override operation.
 *
 * @private
 */
interface OverrideResult {
  /** The properties of the override result. */
  props: {
    /** A string indicating the override data. */
    'data-override'?: string;
  };
}

const triggers: string[] = ['className', 'style'];

/**
 * Overrides the properties of a given context based on certain conditions.
 * When the environment is locked, only flags slots that were added before
 * the lock boundary (have a lower lockGeneration).
 *
 * @param args.context - The context object.
 * @param args.props - The properties object.
 * @returns The result containing the updated properties or undefined if no overrides are applied.
 * @public
 */
export function override<Props extends Record<string, any>>({
  context,
  props
}: OverrideArgs<Props>): OverrideResult | undefined {
  const causes: string[] = [];
  const { namespace, assigned, override: overrideFlag } = context.slots;
  const currentNamespace = namespace.join('.');
  const slot: Record<string, any> | undefined = assigned[currentNamespace];

  //
  // Data override is only supported when the environment is locked.
  //
  if (!(context.env?.locked ?? false)) return;

  const currentLockGeneration = context.env?.lockGeneration ?? 0;
  //
  // Default to generation 0 (before any locks) if no slot generation is tracked
  // This ensures props are flagged as overrides unless explicitly tracked at current generation
  //
  const slotGeneration = context.slots?.slotGenerations?.[currentNamespace] ?? 0;

  if (typeof props['data-override'] === 'string') {
    causes.push(...props['data-override'].split(' '));
  }

  if (overrideFlag && !causes.includes('context')) causes.push('context');

  // Only flag className if slot is from an earlier generation
  if ('className' in props && !causes.includes('className') && slotGeneration < currentLockGeneration) {
    causes.push('className');
  }

  //
  // For style we need to take a more sophisticated approach, users are allowed
  // to define CSS variables in the style prop, so we need to check if the keys
  // are prefixed with `--` or not.
  //
  if ('style' in props && !causes.includes('style')) {
    const style = props.style as CSSProperties;
    const keys = Object.keys(style);

    if (keys.some((key) => !isCSSVariable(key)) && slotGeneration < currentLockGeneration) {
      causes.push('style');
    }
  }

  // Only flag slot modifications if the slot's generation is less than the current lock generation
  if (slot && slotGeneration < currentLockGeneration) {
    // Any slot modification from an earlier generation should be flagged
    if (!causes.includes('slot')) {
      causes.push('slot');
    }
    // Also add specific triggers if present
    Object.keys(slot).forEach(function forEach(name) {
      if (triggers.includes(name) && !causes.includes(name)) {
        causes.push(name);
      }
    });
  }

  if (!causes.length) return;
  return {
    props: useDataAttributes({ override: causes })
  };
}
