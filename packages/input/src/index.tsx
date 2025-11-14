import React, { useMemo } from 'react';
import type { InputHTMLAttributes } from 'react';
import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import { useDataAttributes } from '@bento/use-data-attributes';
import { useFocusRing, useHover, mergeProps } from 'react-aria';
import { mergeRefs, useObjectRef } from '@react-aria/utils';
import type { HoverEvents } from 'react-aria';

function getTypeSpecificProps(type: string, props: InputProps) {
  switch (type) {
    case 'checkbox':
    case 'radio':
      return {
        checked: props.checked,
        defaultChecked: props.defaultChecked,
        value: props.value,
        name: props.name,
        required: props.required,
        disabled: props.disabled,
        readOnly: props.readOnly
      };
    case 'number':
    case 'range':
      return {
        min: props.min,
        max: props.max,
        step: props.step,
        value: props.value,
        defaultValue: props.defaultValue,
        required: props.required,
        disabled: props.disabled,
        readOnly: props.readOnly,
        name: props.name
      };
    case 'file':
      return {
        multiple: props.multiple,
        accept: props.accept,
        required: props.required,
        disabled: props.disabled,
        name: props.name
      };
    default: // text, email, password, etc.
      return {
        value: props.value,
        defaultValue: props.defaultValue,
        placeholder: props.placeholder,
        required: props.required,
        disabled: props.disabled,
        readOnly: props.readOnly,
        name: props.name,
        pattern: props.pattern,
        autoComplete: props.autoComplete,
        minLength: props.minLength,
        maxLength: props.maxLength
      };
  }
}

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

export const Input = withSlots(
  'BentoInput',
  React.forwardRef<HTMLInputElement, InputProps>(function Input(args, ref) {
    const { props, apply } = useProps(args);
    const { disabled, readOnly, type, required, inputPropRef, value, checked, role, autoFocus } = props;
    const isInvalid = !!props['aria-invalid'] && props['aria-invalid'] !== 'false';
    const isDisabled = disabled || false;
    const isReadOnly = readOnly || false;
    const isRequired = required || false;
    const isEmpty = value === '' || value === undefined || value === null;
    const isChecked = type === 'checkbox' || type === 'radio' ? !!checked : undefined;

    const typeSpecificProps = getTypeSpecificProps(type, props);
    const inputRef = useObjectRef(useMemo(() => mergeRefs(ref, inputPropRef), [ref, inputPropRef]));
    const { isFocused, isFocusVisible, focusProps } = useFocusRing({
      isTextInput: type !== 'checkbox' && type !== 'radio' && type !== 'range',
      autoFocus: autoFocus
    });
    const { hoverProps, isHovered } = useHover(props);
    console.log({ focusProps, hoverProps, typeSpecificProps, props });

    return (
      <input
        {...mergeProps(props, focusProps, hoverProps)}
        {...apply(typeSpecificProps)}
        ref={inputRef}
        role={role}
        aria-label={props['aria-label']}
        aria-labelledby={props['aria-labelledby']}
        aria-describedby={props['aria-describedby']}
        aria-invalid={isInvalid}
        {...useDataAttributes({
          focused: isFocused,
          disabled: isDisabled,
          hovered: isHovered,
          focusVisible: isFocusVisible,
          invalid: isInvalid,
          readonly: isReadOnly,
          required: isRequired,
          empty: isEmpty,
          checked: isChecked
        })}
      />
    );
  })
);
