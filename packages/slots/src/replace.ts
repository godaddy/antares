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
  props: Record<string, any>;
}

/**
 * Checks if the provided data is a props override instead of a component
 * override.
 *
 * @param {object} data - Determines if the data is a props override.
 * @returns {boolean} - Returns true if the data is a props override, false otherwise.
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
 * @param {ReplaceArgs} args - The arguments for the replace function.
 * @param {Props} args.props - The properties to be passed to the component.
 * @param {string} args.name - The name of the component to be replaced.
 * @param {BoxContext} args.context - The context containing the components.
 * @returns {Object} An object containing the updated props, the component to be replaced, and the updated context.
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
    props: {}
  } as any;

  const causes = (props['data-override'] || '').split(' ').filter(Boolean);
  if (!causes.includes('context')) causes.push('context');
  result.props = useDataAttributes({ override: causes });

  if (isPropsOverride(target)) result.props = { ...target.props };
  else result.Component = target;

  return result;
}
