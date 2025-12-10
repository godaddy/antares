import { useDataAttributes } from '@bento/use-data-attributes';
import type { SelectionMode } from './types';

/**
 * Generates data attributes for the Menu element based on its current state.
 * These attributes are used for styling selectors and accessibility indicators.
 *
 * @param config - Configuration object containing Menu state flags
 * @returns Object with data attributes for the Menu element
 * @internal
 */
export function useMenuDataAttributes({
  isOpen,
  isEmpty,
  isFocused,
  isFocusVisible,
  orientation,
  selectionMode
}: {
  readonly isOpen?: boolean;
  readonly isEmpty: boolean;
  readonly isFocused: boolean;
  readonly isFocusVisible: boolean;
  readonly orientation?: 'vertical' | 'horizontal';
  readonly selectionMode?: SelectionMode;
}) {
  return useDataAttributes({
    open: isOpen,
    empty: isEmpty,
    focused: isFocused,
    'focus-visible': isFocusVisible,
    orientation,
    'selection-mode': selectionMode !== 'none' ? selectionMode : undefined
  });
}

/**
 * Generates data attributes for MenuItem elements based on their state.
 * These attributes are used for styling selectors and accessibility indicators.
 *
 * @param config - Configuration object containing MenuItem state flags
 * @returns Object with data attributes for the MenuItem element
 * @internal
 */
export function useMenuItemDataAttributes({
  isSelected,
  isDisabled,
  isHovered,
  isFocused,
  isFocusVisible,
  isPressed,
  hasSubmenu,
  isOpen,
  selectionMode,
  selectionBehavior
}: {
  readonly isSelected: boolean;
  readonly isDisabled: boolean;
  readonly isHovered: boolean;
  readonly isFocused: boolean;
  readonly isFocusVisible: boolean;
  readonly isPressed: boolean;
  readonly hasSubmenu?: boolean;
  readonly isOpen?: boolean;
  readonly selectionMode: SelectionMode;
  readonly selectionBehavior: 'toggle' | 'replace';
}) {
  return useDataAttributes({
    selected: isSelected,
    checked: isSelected && (selectionMode === 'single' || selectionMode === 'multiple'),
    disabled: isDisabled,
    hovered: isHovered,
    focused: isFocused,
    'focus-visible': isFocusVisible,
    pressed: isPressed,
    'has-submenu': hasSubmenu,
    open: isOpen,
    'selection-mode': selectionMode,
    'selection-behavior': selectionBehavior
  });
}
