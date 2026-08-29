import { type ElementType, type ReactNode, useContext } from 'react';
import { mergeProps } from 'react-aria';
import {
  GroupContext,
  InputContext,
  LabelContext,
  Provider as RACProvider,
  TextAreaContext,
  TextContext,
  type TextProps as RACTextProps
} from 'react-aria-components';
import type { FieldErrorProps as RACFieldErrorProps } from 'react-aria-components';
import type { PolymorphicComponent, PolymorphicProps, PolymorphicRef } from '#types/polymorphic-react.ts';
import { composeClassName } from '#utils/render-props.ts';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { ControlButtonContext } from '#components/control-button';
import { forwardRef } from 'react';
import styles from './index.module.css';

export interface FieldOwnProps extends FlexOwnProps {
  /** Label text shown above the field. */
  label?: ReactNode;

  /** Helper text shown below the field. */
  description?: ReactNode;

  /** Error message shown when the field is invalid. Forwarded to FieldError. */
  errorMessage?: RACFieldErrorProps['children'];
}

export type FieldProps<C extends ElementType = 'div'> = PolymorphicProps<C, FieldOwnProps>;

function mergeDescriptionClass(text: unknown, className: string) {
  const value = (text ?? {}) as RACTextProps & { slots?: Record<string, RACTextProps> };
  const slots = value.slots;

  if (slots) {
    return {
      ...value,
      slots: {
        ...slots,
        description: mergeProps(slots.description ?? {}, { className })
      }
    };
  }

  return {
    ...value,
    slots: {
      description: { className }
    }
  };
}

function FieldContexts({ children }: { children: ReactNode }) {
  const label = useContext(LabelContext);
  const group = useContext(GroupContext);
  const input = useContext(InputContext);
  const textArea = useContext(TextAreaContext);
  const text = useContext(TextContext);
  const controlButton = useContext(ControlButtonContext);

  return (
    <RACProvider
      values={[
        [LabelContext, mergeProps(label ?? {}, { className: styles.label })],
        [GroupContext, mergeProps(group ?? {}, { className: styles.group })],
        [InputContext, mergeProps(input ?? {}, { className: styles.input })],
        [TextAreaContext, mergeProps(textArea ?? {}, { className: styles.textarea })],
        [TextContext, mergeDescriptionClass(text, styles.description)],
        [ControlButtonContext, mergeProps(controlButton ?? {}, { className: styles.controlButton })]
      ]}
    >
      {children}
    </RACProvider>
  );
}

/**
 * Internal field shell: column layout plus merged RAC (and ControlButton) contexts.
 *
 * @param props - {@link FieldProps}
 */
export const Field = forwardRef(function Field(props: FieldProps<ElementType>, ref: PolymorphicRef<ElementType>) {
  const { as, children, gap = 'sm', className, ...rest } = props;

  return (
    <Flex
      direction="column"
      gap={gap}
      {...rest}
      as={as}
      ref={ref}
      className={composeClassName(className, styles.field)}
    >
      <FieldContexts>{children}</FieldContexts>
    </Flex>
  );
}) as PolymorphicComponent<FieldOwnProps>;
