import { type ComponentProps, type ComponentType } from 'react';
import { type SlotContext } from './context.ts';

interface ReplaceArgs {
  props: ComponentProps<any>;
  Component: ComponentType;
  context: SlotContext;
  name: string;
}

/**
 * Replaces a component in the context with the specified name and props.
 *
 * @param {ReplaceArgs} args - The arguments for the replace function.
 * @param {ComponentProps} args.props - The properties to be passed to the component.
 * @param {string} args.name - The name of the component to be replaced.
 * @param {SlotContext} args.context - The context containing the components.
 * @returns {Object} An object containing the updated props, the component to be replaced, and the updated context.
 * @public
 */
export function replace({ props, name, context }: ReplaceArgs) {
  if (!(name in context.components)) return;

  const causes = (props['data-override'] || '').split(' ').filter(Boolean);
  if (!causes.includes('context')) causes.push('context');

  return {
    props: { 'data-override': causes.join(' ') },
    Component: context.components[name],
    context: { override: true }
  };
}
