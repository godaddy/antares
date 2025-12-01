/* v8 ignore next */
import React from 'react';
import type { InputHTMLAttributes } from 'react';
import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import { useDataAttributes } from '@bento/use-data-attributes';
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
export const Input = withSlots<InputProps>(
  'BentoInput',
  React.forwardRef<HTMLInputElement, InputProps>(function Input(args: InputProps) {
    const { props, apply } = useProps(args);
    const { autoFocus } = props;

    const { isFocused, isFocusVisible, focusProps } = useFocusRing({
      isTextInput: props.type !== 'checkbox' && props.type !== 'radio' && props.type !== 'range',
      autoFocus: autoFocus
    });
    const { hoverProps, isHovered } = useHover(props);

    return (
      <input
        {...apply({ ...mergeProps(props, focusProps, hoverProps) })}
        {...useDataAttributes({
          focused: isFocused,
          hovered: isHovered,
          focusVisible: isFocusVisible,
          disabled: props.disabled || false,
          invalid: !!props['aria-invalid'] && props['aria-invalid'] !== 'false',
          readonly: props.readOnly || false,
          required: props.required || false,
          empty: props.value === '' || props.value === undefined || props.value === null,
          checked: props.type === 'checkbox' || props.type === 'radio' ? !!props.checked : undefined
        })}
      />
    );
  })
);
