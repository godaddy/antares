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
  // Get slot generation for this namespace. Default to current generation if not tracked.
  //
  const slotGeneration = context.slots?.slotGenerations?.[currentNamespace] ?? currentLockGeneration;
  const isEarlierGeneration = slotGeneration < currentLockGeneration;

  if (typeof props['data-override'] === 'string') {
    causes.push(...props['data-override'].split(' '));
  }

  if (overrideFlag && !causes.includes('context')) causes.push('context');

  //
  // Only flag className/style if they came from a slot assignment (exist in the slot object)
  // AND the slot is from an earlier generation. Props that are only in `props` (not from slots)
  // might be from the component's own render (e.g., CSS modules) and shouldn't be flagged.
  //
  if (slot && isEarlierGeneration) {
    let hasFlaggableChanges = false;

    if ('className' in slot && !causes.includes('className')) {
      causes.push('className');
      hasFlaggableChanges = true;
    }

    if ('style' in slot && !causes.includes('style')) {
      const style = slot.style as CSSProperties;
      const keys = Object.keys(style);
      const hasNonCSSVariables = keys.some((key) => !isCSSVariable(key));

      if (hasNonCSSVariables) {
        causes.push('style');
        hasFlaggableChanges = true;
      }
    }

    // Check for other slot modifications (not className/style/children which are handled separately)
    const slotKeys = Object.keys(slot).filter((key) => !['className', 'style'].includes(key));
    if (slotKeys.length > 0) {
      hasFlaggableChanges = true;
    }

    // Only add 'slot' if there are actual modifications worth flagging
    if (hasFlaggableChanges && !causes.includes('slot')) {
      causes.push('slot');
    }
  }

  if (!causes.length) return;
  return {
    props: useDataAttributes({ override: causes })
  };
}
