/* v8 ignore next */
import React from 'react';
import type { InputHTMLAttributes } from 'react';
import { useDataAttributes } from '@bento/use-data-attributes';
import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import { useFocusRing, useHover } from 'react-aria';
import { mergeProps } from '@react-aria/utils';
import type { HoverEvents } from 'react-aria';

/**
 * Props for the Input component.
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, keyof HoverEvents> {
  /** Whether the input should be focused on mount. */
  autoFocus?: boolean;
}

/**
 * A universal input primitive component that renders an `<input>` element with React Aria interactions.
 * Supports all HTML input types with proper accessibility, hover, and focus management.
 *
 * @component
 * @param {InputProps} props - The properties passed to the Input component.
 *
 * @example
 * ```tsx
 * // Text input
 * <Input type="text" placeholder="Enter text" />
 *
 * // Checkbox
 * <Input type="checkbox" />
 *
 * // With render props
 * <Input
 *   type="email"
 *   className={(state) => state.isFocusVisible ? 'focused' : ''}
 * />
 * ```
 *
 * @public
 */
export const Input = withSlots('BentoInput', function Input(...args: [InputProps, React.Ref<HTMLInputElement>?]) {
  const flatArgs = Object.assign({}, ...args);
  const { props, apply } = useProps(flatArgs);
  const { autoFocus } = props;

  const { isFocused, isFocusVisible, focusProps } = useFocusRing({
    isTextInput: true,
    autoFocus: autoFocus
  });
  const { hoverProps, isHovered } = useHover(props);

  const mergedProps = mergeProps(props, focusProps, hoverProps);

  return (
    <input
      {...apply(mergedProps)}
      {...useDataAttributes({
        focused: isFocused,
        hovered: isHovered,
        focusVisible: isFocusVisible,
        disabled: mergedProps.disabled || false,
        invalid: !!mergedProps['aria-invalid'] && mergedProps['aria-invalid'] !== 'false',
        readonly: mergedProps.readOnly || false,
        required: mergedProps.required || false,
        empty: mergedProps.value === '' || mergedProps.value === undefined || mergedProps.value === null,
        checked: mergedProps.type === 'checkbox' || mergedProps.type === 'radio' ? !!mergedProps.checked : undefined
      })}
    />
  );
}) as React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
