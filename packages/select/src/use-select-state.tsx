import { useSelectState as useReactAriaSelectState, SelectState } from 'react-stately';
import type { AriaSelectProps } from '@react-types/select';
import type { Collection, Node } from '@react-types/shared';

/**
 * Options for useSelectState hook.
 * @public
 */
export interface SelectStateOptions<T> extends AriaSelectProps<T> {
  /** The collection of items in the select. */
  collection?: Collection<Node<T>>;
}

/**
 * Hook that manages state for a Select component.
 *
 * This hook owns the state for select interactions including:
 * - Selected value(s) (single or multiple selection)
 * - Open/closed state
 * - Focus state
 * - Collection management
 *
 * It follows the architectural principle: "Hooks own state, Primitives render DOM."
 *
 * Note: In most cases, Select manages state internally. This hook is provided
 * for advanced use cases where external state management is needed.
 *
 * @param {SelectStateOptions<T>} props - Configuration for select state
 * @returns {SelectState<T>} State object with selection, open/close, and collection state
 * @public
 *
 * @example
 * ```typescript
 * function ControlledSelect() {
 *   // Note: Collection building is complex - typically let Select handle it internally
 *   // This example shows the concept but Select's internal state is recommended
 *   const state = useSelectState({
 *     defaultSelectedKey: 'option1',
 *     collection: myCollection
 *   });
 *
 *   return (
 *     <Select state={state}>
 *       <SelectOption value="option1">Option 1</SelectOption>
 *       <SelectOption value="option2">Option 2</SelectOption>
 *     </Select>
 *   );
 * }
 * ```
 */
export function useSelectState<T>(props: SelectStateOptions<T>): SelectState<T> {
  return useReactAriaSelectState(props as any) as SelectState<T>;
}
