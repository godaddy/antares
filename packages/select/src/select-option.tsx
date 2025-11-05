import React, { ForwardedRef, ReactNode } from 'react';
import { createLeafComponent } from '@react-aria/collections';
import type { Node } from '@react-types/shared';
import { ListBoxItemImpl } from '@bento/listbox';
import type { ListBoxItemProps, ListBoxItemRenderProps } from '@bento/listbox';

/**
 * Props for the SelectOption component.
 * This component maps the `value` prop (intuitive for Select API) to the `id` prop
 * (required by React Aria collection system), while reusing ListBoxItem's rendering logic.
 * Users can also use ListBoxItem directly with `id` prop if they prefer.
 * @interface SelectOptionProps
 */
export interface SelectOptionProps extends Omit<ListBoxItemProps<object>, 'id' | 'value'> {
  /** The value of the option (mapped to id for React Aria collection system) */
  readonly value: string | number;
  /** The unique id of the item. If not provided, value is used as id. */
  readonly id?: string | number;
  /** The contents of the option. Can be a render function that receives render props. */
  readonly children?: ReactNode | ((values: ListBoxItemRenderProps) => ReactNode);
}

/**
 * Optional convenience wrapper that maps value → id.
 * Users can also use ListBoxItem directly with id prop.
 * @internal
 */
function SelectOptionComponent(
  props: SelectOptionProps,
  forwardedRef: ForwardedRef<HTMLDivElement>,
  item: Node<object>
) {
  // Extract value prop (Select API) - it's already mapped to id by SelectOption
  // Pass remaining props through to ListBoxItemImpl - it handles all the rendering logic
  // Omit 'value' since ListBoxItemImpl expects 'id', not 'value'
  const { value: _value, ...restProps } = props;
  return <ListBoxItemImpl {...(restProps as Omit<SelectOptionProps, 'value'>)} ref={forwardedRef} __node={item} />;
}

/**
 * Base SelectOption component created through React Aria's collection system.
 * Uses 'item' node type (same as ListBoxItem) so they work together.
 * @internal
 */
const SelectOptionBase = createLeafComponent('item', SelectOptionComponent);

/**
 * SelectOption component that provides an intuitive API for Select while
 * reusing the same rendering logic as ListBoxItem.
 * Maps `value` prop to `id` prop for React Aria's collection system.
 *
 * @component
 * @example
 * ```tsx
 * <SelectOption value="apple">Apple</SelectOption>
 * ```
 * @public
 */
export const SelectOption = function SelectOption(args: SelectOptionProps) {
  const { value, ...restProps } = args;
  // Map value prop (Select API) to id prop (React Aria collection API)
  // restProps doesn't include 'value' since we destructured it, which is correct
  // since SelectOptionBase (created from createLeafComponent) expects ListBoxItemProps,
  // which has 'id' not 'value'. TypeScript requires assertion since restProps type
  // still includes 'value' in its type even though it's not in the object.
  return <SelectOptionBase {...(restProps as any)} id={value} />;
};
