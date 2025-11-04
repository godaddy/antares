import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';
import { Text } from '@bento/text';
import React, { type ComponentProps } from 'react';
import { FieldError } from './other-primitives';

export interface ControlGroupProps extends ComponentProps<'div'> {
  /** The control elements to render within the group. */
  children: React.ReactNode;

  /** The label for the control group. */
  label?: React.ReactNode;

  /** Props to pass to the label element. */
  labelProps?: ComponentProps<'label'>;

  /** Additional description text for the control group. */
  description?: React.ReactNode;

  /** Props to pass to the description element. */
  descriptionProps?: ComponentProps<'div'>;

  /** Error message to display below the controls. */
  errorMessage?: React.ReactNode;

  /** Props to pass to the error message element. */
  errorMessageProps?: ComponentProps<'div'>;

  /** The props passed to the content element. */
  contentProps?: ComponentProps<'div'>;
}

/**
 * The `ControlGroup` is a container for a group of controls.
 * It is used to group controls with a shared label and description.
 * It also provides a standardized way to display error messages.
 */
export const ControlGroup = withSlots('BentoControlGroup', function ControlGroup(args: ControlGroupProps) {
  const { props } = useProps(args);
  const {
    children,
    label,
    contentProps,
    labelProps,
    description,
    descriptionProps,
    errorMessage,
    errorMessageProps,
    ...restProps
  } = props;

  return (
    <div {...restProps}>
      <Text slot="label" {...labelProps}>
        {label}
      </Text>

      <div {...contentProps}>{children}</div>

      {description && (
        <Text slot="description" {...descriptionProps}>
          {description}
        </Text>
      )}

      {errorMessage && (
        <FieldError slot="error" {...errorMessageProps}>
          {errorMessage}
        </FieldError>
      )}
    </div>
  );
});
