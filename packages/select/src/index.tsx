// Component exports
export { Select } from './select';
export { SelectOption } from './select-option';

// State hooks (following architectural principle: hooks own state)
export { useSelectState } from './use-select-state';

// Type exports
export type {
  SelectProps,
  SingleSelectProps,
  MultipleSelectProps,
  SelectionMode
} from './select';
export type { SelectOptionProps } from './select-option';
export type {
  SelectTriggerSlotProps,
  SelectValueSlotProps,
  SelectPopoverSlotProps,
  SelectListSlotProps,
  SelectSlots,
  PropsFromSelectSlot
} from './select';
export type { SelectStateOptions } from './use-select-state';
export type { SelectState } from 'react-stately';

// Re-exports
export type { Placement } from 'react-aria';
