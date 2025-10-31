import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';
import { Text } from '@bento/text';
import React, { type ComponentProps } from 'react';
import { VisuallyHidden } from './other-primitives';

export interface ControlProps extends ComponentProps<'label'> {
  /** A ref for the HTML input element. */
  inputRef?: React.Ref<HTMLInputElement>;

  /** Props to pass to the underlying input element. */
  inputProps?: ComponentProps<'input'>;

  /** The label for the control. */
  label?: React.ReactNode;

  /** Props to pass to the label element. */
  labelProps?: ComponentProps<'label'>;

  /** Additional content for the control. */
  children?: React.ReactNode;
}

/**
 * The `Control` consists of a label and an visually hidden input element.
 * The label is used to describe the control and the input element is used to capture user input.
 */
export const Control = withSlots('BentoControl', function Control(args: ControlProps) {
  const { props } = useProps(args);
  const { inputRef, inputProps, labelProps, children, label, ...restProps } = props;

  return (
    <Text as="label" {...labelProps} {...restProps}>
      <VisuallyHidden as="span">
        <input {...inputProps} ref={inputRef} />
      </VisuallyHidden>
      {children}
      {label && <Text slot="label">{label}</Text>}
    </Text>
  );
});
