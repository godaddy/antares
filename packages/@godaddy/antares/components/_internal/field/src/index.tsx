import { cx } from 'cva';
import { type ElementType, forwardRef, type ReactNode, useContext } from 'react';
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
  FieldError as RACFieldError,
  FieldErrorContext as RACFieldErrorContext,
  type FieldErrorProps as RACFieldErrorProps,
  Group as RACGroup,
  Input as RACInput,
  type InputProps as RACInputProps,
  Label as RACLabel,
  type LabelProps as RACLabelProps,
  type GroupProps as RACGroupProps,
  TextArea as RACTextArea,
  type TextAreaProps as RACTextAreaProps
} from 'react-aria-components';
import type { PolymorphicComponent, PolymorphicProps, PolymorphicRef } from '../../../../types/polymorphic-react.ts';
import { Box, type BoxOwnProps } from '#components/layout/box';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { Text, type TextProps } from '#components/text';
import styles from './index.module.css';

export interface FieldOwnProps extends FlexOwnProps {
  /** Label text shown above the field. */
  label?: ReactNode;

  /** Helper text shown below the field. */
  description?: ReactNode;

  /** Error message shown when the field is invalid. Forwarded to {@link FieldError}. */
  errorMessage?: RACFieldErrorProps['children'];
}

export type FieldProps<C extends ElementType = 'div'> = PolymorphicProps<C, FieldOwnProps>;

/**
 * Vertical layout for a single field. Pass `as={RACTextField}` (or another RAC field
 * wrapper) to merge the field's RAC provider into this element instead of nesting.
 *
 * @param props - {@link FieldProps}
 *
 * @example
 * <Field as={RACTextField} {...fieldProps}>
 *   <FieldLabel isRequired>Email</FieldLabel>
 *   <FieldGroup><Input /></FieldGroup>
 *   <FieldDescription>We won't share it.</FieldDescription>
 *   <FieldError />
 * </Field>
 */
export const Field = forwardRef(function Field(props: FieldProps<ElementType>, ref: PolymorphicRef<ElementType>) {
  const { as, gap = 'sm', className, ...rest } = props;
  return <Flex direction="column" gap={gap} {...rest} as={as} ref={ref} className={cx(styles.field, className)} />;
}) as PolymorphicComponent<FieldOwnProps>;

export interface FieldLabelProps extends RACLabelProps {
  /** When true, renders a required indicator (`*`) after the label text. */
  isRequired?: boolean;
}

/**
 * Field label with an optional required indicator. Renders nothing when empty, so
 * callers can forward an optional `label` prop without guarding.
 *
 * @param props - {@link FieldLabelProps}
 */
export function FieldLabel(props: FieldLabelProps) {
  const { isRequired, children, className, ...rest } = props;

  if (!children) {
    return null;
  }

  return (
    <RACLabel {...rest} className={cx(styles.label, className)}>
      {children}
      {isRequired && <span className={styles.labelRequired}> *</span>}
    </RACLabel>
  );
}

export interface FieldDescriptionProps extends Omit<TextProps, 'as' | 'slot'> {}

/**
 * Field helper text, associated with the field via `slot="description"`. Renders
 * nothing when empty, so callers can forward an optional `description` prop without
 * guarding.
 *
 * @param props - {@link FieldDescriptionProps}
 */
export function FieldDescription(props: FieldDescriptionProps) {
  const { children, className, ...rest } = props;

  if (!children) {
    return null;
  }

  return (
    <Text {...rest} slot="description" className={cx(styles.description, className)}>
      {children}
    </Text>
  );
}

export interface FieldErrorProps extends RACFieldErrorProps {}

/**
 * Field error message; renders only when the field is invalid.
 *
 * @param props - {@link FieldErrorProps}
 */
export function FieldError(props: FieldErrorProps) {
  const { className, ...rest } = props;
  return <RACFieldError {...rest} className={cx(styles.error, className)} />;
}

export type FieldSize = 'sm' | 'md';

export interface FieldGroupProps extends RACGroupProps, FlexOwnProps {
  /** Controls input/textarea/fieldButton font-size and padding inside the group. @default 'md' */
  size?: FieldSize;
}

/**
 * Bordered, elevated control box for boxed fields (TextField, NumberField, Select,
 * DateField). Children declare their position with `data-field-group-{start,middle,end}`
 * markers and are styled by descendant CSS in this module — no RAC context injection.
 *
 * @param props - {@link FieldGroupProps}
 * @param ref - Ref for the root Group DOM node.
 */
export const FieldGroup = forwardRef<HTMLDivElement, FieldGroupProps>(function FieldGroup(props, ref) {
  const { className, gap, isInvalid, size, ...rest } = props;

  // RAC fields publish their runtime validation state (e.g. native validation on form
  // submit) through FieldErrorContext, not as a prop. Fall back to it so the box turns
  // invalid alongside the FieldError, while an explicit isInvalid prop still wins.
  const validation = useContext(RACFieldErrorContext);
  const isInvalidResolved = isInvalid ?? validation?.isInvalid;

  return (
    <Flex
      direction="row"
      wrap="nowrap"
      alignSelf="stretch"
      alignItems="stretch"
      elevation="card"
      gap={gap}
      isInvalid={isInvalidResolved}
      data-size={size === 'sm' ? 'sm' : undefined}
      {...rest}
      as={RACGroup}
      ref={ref}
      className={cx(styles.group, className)}
    />
  );
});

export interface InputProps extends RACInputProps, BoxOwnProps {}

/**
 * Antares Input component using Box and RAC Input.
 *
 * @param props - {@link InputProps}
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  const { className, ...rest } = props;

  return <Box flex={1} {...rest} as={RACInput} ref={ref} className={cx(styles.input, className)} />;
});

export interface FieldButtonProps extends RACButtonProps, FlexOwnProps {}

/**
 * Click target for a control inside a {@link FieldGroup} (NumberField steppers,
 * Select trigger, search submit, etc.).
 *
 * @param props - {@link FieldButtonProps}
 */
export const FieldButton = forwardRef<HTMLButtonElement, FieldButtonProps>(function FieldButton(props, ref) {
  const { className, ...rest } = props;
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      {...rest}
      as={RACButton}
      ref={ref}
      className={cx(styles.fieldButton, className)}
    />
  );
});

export interface TextAreaProps extends RACTextAreaProps, BoxOwnProps {}

/**
 * Antares TextArea component using Box and RAC TextArea.
 *
 * @param props - {@link TextAreaProps}
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(props, ref) {
  const { className, ...rest } = props;

  return <Box flex={1} {...rest} as={RACTextArea} ref={ref} className={cx(styles.input, styles.textarea, className)} />;
});
