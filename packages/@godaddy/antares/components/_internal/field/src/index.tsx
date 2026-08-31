import { type ElementType, type ReactNode, forwardRef, useContext } from 'react';
import { mergeProps } from 'react-aria';
import { Provider as RACProvider, type TextProps as RACTextProps } from 'react-aria-components';
import type { FieldErrorProps as RACFieldErrorProps } from 'react-aria-components';
import type { PolymorphicComponent, PolymorphicProps, PolymorphicRef } from '#types/polymorphic-react.ts';
import { composeClassName } from '#utils/render-props.ts';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { InputContext } from '#components/input';
import { LabelContext } from '#components/label';
import { FieldStateContext, GroupContext, type FieldSize, type FieldState } from '#components/structure';
import { TextContext } from '#components/text';
import { TextAreaContext } from '#components/text-area';
import styles from './index.module.css';

export interface FieldOwnProps extends Omit<FlexOwnProps, 'as'> {
  /** Label text shown above the field. */
  label?: ReactNode;

  /** Helper text shown below the field. */
  description?: ReactNode;

  /** Error message shown when the field is invalid. Forwarded to FieldError. */
  errorMessage?: RACFieldErrorProps['children'];

  /** Whether the field is disabled. Inherited by a composed Group. @default false */
  isDisabled?: boolean;

  /** Visual size of the controls. Inherited by a composed Group. @default 'md' */
  size?: FieldSize;
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

function FieldContexts({ children, isDisabled, size }: { children: ReactNode } & FieldState) {
  const label = useContext(LabelContext);
  const group = useContext(GroupContext);
  const input = useContext(InputContext);
  const textArea = useContext(TextAreaContext);
  const text = useContext(TextContext);

  return (
    <RACProvider
      values={[
        [FieldStateContext, { isDisabled, size }],
        [LabelContext, mergeProps(label ?? {}, { className: styles.label })],
        [GroupContext, mergeProps(group ?? {}, { className: styles.group })],
        [InputContext, mergeProps(input ?? {}, { className: styles.input })],
        [TextAreaContext, mergeProps(textArea ?? {}, { className: styles.textarea })],
        [TextContext, mergeDescriptionClass(text, styles.description)]
      ]}
    >
      {children}
    </RACProvider>
  );
}

/**
 * Internal field shell: column layout plus merged RAC contexts.
 *
 * @param props - {@link FieldProps}
 */
export const Field = forwardRef(function Field(props: FieldProps<ElementType>, ref: PolymorphicRef<ElementType>) {
  const { as, children, gap = 'sm', className, size, ...rest } = props;
  const isDisabled = props.isDisabled;

  function withContexts(content: ReactNode) {
    return (
      <FieldContexts isDisabled={isDisabled} size={size}>
        {content}
      </FieldContexts>
    );
  }

  // RAC roots call function children with their render props, so keep the function
  // shape intact and wrap only what it returns.
  const content =
    typeof children === 'function'
      ? function renderWithContexts(renderProps: never) {
          return withContexts(children(renderProps));
        }
      : withContexts(children);

  return (
    <Flex
      direction="column"
      gap={gap}
      {...rest}
      as={as}
      ref={ref}
      className={composeClassName(className, styles.field)}
    >
      {content}
    </Flex>
  );
}) as PolymorphicComponent<FieldOwnProps>;

export { isComposedInterior } from './is-composed-interior.ts';
