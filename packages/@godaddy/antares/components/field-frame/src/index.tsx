import { cx } from 'cva';
import { forwardRef, useContext, useMemo } from 'react';
import {
  DEFAULT_SLOT,
  ButtonContext as RACButtonContext,
  FieldError as RACFieldError,
  Group as RACGroup,
  GroupContext,
  InputContext,
  TextContext,
  InputProps,
  Label as RACLabel,
  Provider,
  TextAreaContext,
  TextAreaProps,
  useContextProps,
  type ButtonProps as RACButtonProps,
  type GroupProps as RACGroupProps
} from 'react-aria-components';
import { Text } from '#components/text';
import { Flex, type FlexProps } from '#components/layout/flex';
import styles from './index.module.css';

/**
 * Props for the FieldFrame component.
 *
 * Extends React Aria {@link GroupProps}. Optional `label`, `description`, and
 * `errorMessage` render Label, Text(slot=description), and FieldError respectively.
 * All other props (e.g. isDisabled, isReadOnly, className) are forwarded to the
 * inner Group.
 *
 * @public
 */
export interface FieldFrameProps extends RACGroupProps, Pick<FlexProps, 'gap'> {
  /** Label text shown above the frame. */
  label?: string;

  /** Helper text shown below the frame. */
  description?: string;

  /** Error message shown when invalid. */
  errorMessage?: string;

  /** Whether the field is required. */
  isRequired?: boolean;
}

/**
 * Renders the shared field frame (label, border, description, and error) and manages
 * accessibility. Must be used as a direct child of TextField, NumberField, DateField,
 * or Select; not valid standalone. Reads React Aria context from the parent field.
 *
 * @param props - {@link FieldFrameProps}.
 * @param ref - Ref for the root Group DOM node.
 *
 * @example
 *
 * // TextField
 * <TextField>
 *   <FieldFrame label="Email" description="We won't share it.">
 *     <Input type="email" />
 *   </FieldFrame>
 * </TextField>
 */
export const FieldFrame = forwardRef<HTMLDivElement, FieldFrameProps>(function FieldFrame(props, ref) {
  const { label, description, errorMessage, children, className, isRequired, isDisabled, gap, ...rest } = props;
  const [inputProps, inputRef] = useContextProps<InputProps, InputProps, HTMLInputElement>(
    { className: styles.input, disabled: isDisabled || false },
    null,
    InputContext
  );
  const [textAreaProps, textAreaRef] = useContextProps<TextAreaProps, TextAreaProps, HTMLTextAreaElement>(
    { className: styles.input, disabled: isDisabled || false },
    null,
    TextAreaContext
  );
  const [groupProps, groupRef] = useContextProps<RACGroupProps, RACGroupProps, HTMLDivElement>(rest, ref, GroupContext);
  const parentButtonContext = useContext(RACButtonContext);
  const parentTextContext = useContext(TextContext);
  const textContext = useMemo(
    function mergeDefaultSlot() {
      if (parentTextContext && 'slots' in parentTextContext) {
        return { ...parentTextContext, slots: { ...parentTextContext.slots, [DEFAULT_SLOT]: {} } };
      }
      return parentTextContext;
    },
    [parentTextContext]
  );
  const buttonContext = useMemo(
    function mergeButtonContext() {
      if (parentButtonContext && 'slots' in parentButtonContext) {
        const slots = Object.fromEntries(
          Object.entries(parentButtonContext.slots as Record<string, RACButtonProps>).map(([slot, slotValue]) => [
            slot,
            {
              ...slotValue,
              className: cx(styles.button, slotValue.className),
              isDisabled: slotValue.isDisabled || isDisabled
            }
          ])
        );
        return { ...parentButtonContext, slots: { ...slots, [DEFAULT_SLOT]: {} } };
      }

      const context = parentButtonContext as RACButtonProps;

      return {
        ...context,
        isDisabled: context.isDisabled || isDisabled,
        className: cx(styles.button, context.className)
      };
    },
    [parentButtonContext, isDisabled]
  );

  return (
    <Provider
      values={[
        [RACButtonContext, buttonContext],
        [GroupContext, { ...groupProps, ref: groupRef }],
        [InputContext, { ...inputProps, ref: inputRef }],
        [TextAreaContext, { ...textAreaProps, ref: textAreaRef }],
        [TextContext, textContext]
      ]}
    >
      <Flex direction="column" gap="sm">
        {label && (
          <RACLabel className={cx(styles.label)}>
            {label}
            {isRequired && <span className={styles['label-required']}> *</span>}
          </RACLabel>
        )}
        <Flex
          as={RACGroup}
          isDisabled={isDisabled || false}
          direction="row"
          wrap="nowrap"
          alignItems="stretch"
          gap={gap}
          className={cx(styles.frame, className)}
        >
          {children}
        </Flex>
        {errorMessage && <RACFieldError className={styles.error}>{errorMessage}</RACFieldError>}
        {description && (
          <Text as="div" slot="description" className={styles.description}>
            {description}
          </Text>
        )}
      </Flex>
    </Provider>
  );
});
