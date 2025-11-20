/* v8 ignore next */
import React, { useMemo } from 'react';
import type { InputHTMLAttributes } from 'react';
import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import { useDataAttributes } from '@bento/use-data-attributes';
import { useFocusRing, useHover } from 'react-aria';
import { mergeRefs, useObjectRef, mergeProps } from '@react-aria/utils';
import type { HoverEvents } from 'react-aria';

/**
 * Render props provided to className and style functions.
 */
export interface InputRenderProps {
  /**
   * Whether the input is currently hovered with a mouse.
   * @selector [data-hovered]
   */
  isHovered: boolean;
  /**
   * Whether the input is focused, either via a mouse or keyboard.
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the input is keyboard focused.
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the input is disabled.
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the input is invalid.
   * @selector [data-invalid]
   */
  isInvalid: boolean;
}

/**
 * Props for the Input component.
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'style'>, HoverEvents {
  /**
   * The id of the input element. This is useful for accessibility purposes.
   */
  id?: string;

  /**
   * The type of the input element.
   * @default 'text'
   */
  type?: InputHTMLAttributes<HTMLInputElement>['type'];

  /**
   * Temporary text that occupies the text input when it is empty.
   */
  placeholder?: string;

  /**
   * Whether the input should be focused on mount.
   */
  autoFocus?: boolean;

  /**
   * The CSS className for the element. A function may be provided to compute the class based on component state.
   */
  className?: string | ((renderProps: InputRenderProps) => string);

  /**
   * The inline style for the element. A function may be provided to compute the style based on component state.
   */
  style?: React.CSSProperties | ((renderProps: InputRenderProps) => React.CSSProperties);
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
  React.forwardRef<HTMLInputElement, InputProps>(function Input(args: InputProps, ref) {
    const { props, apply } = useProps(args);
    const { disabled, readOnly, type, required, inputPropRef, value, checked, autoFocus } = props;

    const inputRef = useObjectRef(useMemo(() => mergeRefs(ref, inputPropRef), [ref, inputPropRef]));
    const { isFocused, isFocusVisible, focusProps } = useFocusRing({
      isTextInput: type !== 'checkbox' && type !== 'radio' && type !== 'range',
      autoFocus: autoFocus
    });
    const { hoverProps, isHovered } = useHover(props);

    return (
      <input
        {...apply({ ...mergeProps(props, focusProps, hoverProps) })}
        ref={inputRef}
        {...useDataAttributes({
          focused: isFocused,
          hovered: isHovered,
          focusVisible: isFocusVisible,
          disabled: disabled || false,
          invalid: !!props['aria-invalid'] && props['aria-invalid'] !== 'false',
          readonly: readOnly || false,
          required: required || false,
          empty: value === '' || value === undefined || value === null,
          checked: type === 'checkbox' || type === 'radio' ? !!checked : undefined
        })}
      />
    );
  })
);
