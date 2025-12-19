import { useDataAttributes } from '@bento/use-data-attributes';
import { type BoxContext } from '@bento/box';
import { type ComponentType } from 'react';

/**
 * Interface representing the arguments required for replacing a component.
 *
 * @interface ReplaceArgs
 * @property {Props} props - The properties of the component.
 * @property {ComponentType<Props>} Component - The component which should be rendered.
 * @property {SlotContext<Props>} context - The current Slot context.
 * @property {string} name - The name of the component.
 * @private
 */
interface ReplaceArgs<Props> {
  props: Props;
  Component: ComponentType<Props>;
  context: BoxContext<Props>;
  name: string;
}

/**
 * Interface for props override objects
 * @private
 */
interface PropsOverride {
  /** The properties of the props override. */
  props: Record<string, any>;
}

/**
 * Checks if the provided data is a props override instead of a component
 * override.
 *
 * @param data - The data to check.
 * @returns Returns true if the data is a props override, false otherwise.
 * @private
 */
function isPropsOverride(data: any): data is PropsOverride {
  if (typeof data !== 'object' || Array.isArray(data)) return false;

  const keys = Object.keys(data);
  return keys.includes('props') && keys.length === 1;
}

/**
 * Replaces a component in the context with the specified name and props.
 *
 * @param args.props - The properties to be passed to the component.
 * @param args.name - The name of the component to be replaced.
 * @param args.context - The context containing the components.
 * @returns An object containing the updated props, the component to be replaced, and the updated context.
 * @public
 */
export function replace<Props extends Record<string, any>>({ props, name, context }: ReplaceArgs<Props>) {
  if (!context.env || !context.env.components || !(name in context.env.components)) return;

  const target = context.env.components[name];
  if (!target) return;

  const result = {
    context: {
      slots: {
        override: !!target
      }
    },
    props: undefined as Record<string, any> | undefined,
    Component: undefined as ComponentType<Props> | undefined
  } as any;

  if (isPropsOverride(target)) result.props = { ...target.props };
  else result.Component = target;

  const locked = context.env?.locked ?? false;
  if (!locked) return result;

  const causes = (props['data-override'] || '').split(' ').filter(Boolean);
  if (!causes.includes('context')) causes.push('context');

  // Merge props from original and override target for override detection
  const mergedProps = isPropsOverride(target) ? { ...props, ...target.props } : props;

  // Check for className and style overrides in the merged props
  if ('className' in mergedProps && !causes.includes('className')) {
    causes.push('className');
  }
  if ('style' in mergedProps && !causes.includes('style')) {
    // Check if style contains non-CSS-variable properties
    const styleKeys = Object.keys(mergedProps.style || {});
    const hasNonCSSVariables = styleKeys.some((key) => !key.startsWith('--'));
    if (hasNonCSSVariables) {
      causes.push('style');
    }
  }

  const overrideProps = useDataAttributes({ override: causes });
  if (isPropsOverride(target)) {
    result.props = {
      ...overrideProps,
      ...result.props
    };
  } else {
    result.props = overrideProps;
  }

  return result;
}
