import React, { useMemo } from 'react';
import { Container, type ContainerProps } from '@bento/container';
import { useDataAttributes } from '@bento/use-data-attributes';
import { Icon } from '@bento/icon';
import { Input } from '@bento/input';
import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';
import { VisuallyHidden } from '@bento/visually-hidden';
import { mergeProps, mergeRefs, useObjectRef } from '@react-aria/utils';
import { useFocusRing, useHover, useRadio, type AriaRadioProps } from 'react-aria';
import { RadioGroupStateContext } from './radio-group-state';

export interface RadioProps extends AriaRadioProps, Omit<ContainerProps, keyof AriaRadioProps> {
  /** The value of the radio button, used when submitting an HTML form. */
  value: string;

  /** A ref for the HTML input element. */
  inputRef?: React.Ref<HTMLInputElement>;

  /** The label for the Radio. Accepts any renderable node. */
  children?: React.ReactNode;

  /**
   * Whether the radio button is disabled or not. Shows that a selection exists,
   * but is not available in that circumstance.
   */
  isDisabled?: boolean;

  /** Whether the element should receive focus on render. */
  autoFocus?: boolean;
}

/**
 * The `Radio` is a single radio option that can be selected by the user.
 */
export const Radio = withSlots('BentoRadio', function Radio(args: RadioProps) {
  const { props, apply } = useProps(args);
  const state = React.useContext(RadioGroupStateContext)!;
  const ref = React.useRef<HTMLInputElement>(null);
  const inputRef = useObjectRef(useMemo(() => mergeRefs(ref, props.inputRef), [ref, props.inputRef]));
  const { isFocused, isFocusVisible, focusProps } = useFocusRing();
  const { inputProps, labelProps, isSelected, isPressed } = useRadio(props as RadioProps, state, inputRef);
  const interactionDisabled = props.isDisabled || state.isReadOnly;
  const { hoverProps, isHovered } = useHover({
    ...props,
    isDisabled: interactionDisabled
  });

  return (
    <Container
      as="label"
      {...apply(mergeProps(labelProps, hoverProps))}
      {...useDataAttributes({
        selected: isSelected,
        pressed: isPressed,
        hovered: isHovered,
        focused: isFocused,
        focusVisible: isFocusVisible,
        disabled: props.isDisabled,
        readonly: state.isReadOnly,
        invalid: state.isInvalid,
        required: state.isRequired
      })}
    >
      <VisuallyHidden>
        <Input {...mergeProps(inputProps, focusProps)} ref={inputRef as any} />
      </VisuallyHidden>

      {isSelected ? (
        <Icon slot="icon-checked" icon="radioChecked">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx={12} cy={12} r={8 - 6 / 2} fill="none" stroke="orange" strokeWidth={6} />
          </svg>
        </Icon>
      ) : (
        <Icon slot="icon-unchecked" icon="radioUnchecked">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx={12} cy={12} r={8} fill="none" stroke="gray" strokeWidth={2} />
          </svg>
        </Icon>
      )}
      {props.children}
    </Container>
  );
});
