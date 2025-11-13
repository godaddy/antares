// Components
export { Select } from './select';
export { SelectOption } from './select-option';

// State hooks (following architectural principle: hooks own state)
export { useSelectState } from './use-select-state';

// Component types
export type {
  SelectProps,
  SingleSelectProps,
  MultipleSelectProps,
  SelectionMode
} from './select';
export type { SelectOptionProps } from './select-option';

// Slot types
export type {
  SelectTriggerSlotProps,
  SelectValueSlotProps,
  SelectPopoverSlotProps,
  SelectListSlotProps,
  SelectSlots,
  PropsFromSelectSlot
} from './select';

// State types
export type { SelectStateOptions, SelectState } from './use-select-state';

// Re-export Placement type from React Aria for convenience
export type { Placement } from 'react-aria';
