import { forwardRef, type ReactNode } from 'react';
import {
  RadioButton as RACRadioButton,
  type RadioButtonProps as RACRadioButtonProps,
  RadioField as RACRadioField,
  type RadioFieldProps as RACRadioFieldProps,
  RadioGroup as RACRadioGroup,
  type RadioGroupProps as RACRadioGroupProps,
  type RadioGroupRenderProps as RACRadioGroupRenderProps,
  Provider as RACProvider,
  composeRenderProps,
  useSlottedContext
} from 'react-aria-components';
import { composeClassName } from '#utils/render-props.ts';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { Card, SelectionProvider } from '#components/card';
import { LabelContext } from '#components/label';
import { GroupContext, type GroupProps } from '#components/structure';
import fieldStyles from '../../_internal/field-styles/index.module.css';
import styles from './index.module.css';

interface RadioButtonProps extends Omit<RACRadioButtonProps, 'className' | 'children'>, Omit<FlexOwnProps, 'as'> {
  children?: RACRadioButtonProps['children'];
  className?: string;
}

function RadioButton(props: RadioButtonProps) {
  const { className, children, ...rest } = props;

  return (
    <Flex
      alignItems="center"
      gap="sm"
      {...rest}
      as={RACRadioButton}
      className={composeClassName(className, styles.radio)}
    >
      {function renderRadio(state) {
        return typeof children === 'function' ? children(state) : children;
      }}
    </Flex>
  );
}

export interface RadioProps extends Omit<RACRadioFieldProps, 'children'>, FlexOwnProps {
  /** Label text shown next to the indicator. */
  children?: ReactNode;

  /** Primary navigation destination when composed as a Card. */
  href?: string;

  /** Primary action when composed as a Card. */
  onPress?: (event: import('react-aria-components').PressEvent) => void;
}

/** Radio with an associated label. */
export const Radio = forwardRef<HTMLDivElement, RadioProps>(function Radio(
  { children, as, href, onPress, ...props },
  ref
) {
  if (as === Card) {
    return (
      <Flex
        padding="lg"
        gap="lg"
        direction="column"
        {...props}
        ref={ref}
        as={RACRadioField}
        render={function renderCard(domProps, state) {
          return (
            <Card
              direction="row"
              {...domProps}
              href={href}
              onPress={onPress}
              data-card-selected={state.isSelected || undefined}
              aria-label={props['aria-label']}
              aria-labelledby={props['aria-labelledby']}
            />
          );
        }}
      >
        <SelectionProvider kind="radio">{children}</SelectionProvider>
      </Flex>
    );
  }

  return (
    <Flex {...props} ref={ref} as={RACRadioField}>
      <RadioButton>
        <div className={styles.indicator} />
        {children}
      </RadioButton>
    </Flex>
  );
});

/** Layout an item `Group` inherits. `presentation` keeps it out of the radiogroup's a11y tree. */
function itemGroup(orientation: 'horizontal' | 'vertical'): GroupProps {
  const horizontal = orientation === 'horizontal';

  return { role: 'presentation', direction: horizontal ? 'row' : 'column', gap: horizontal ? 'lg' : 'md' };
}

export interface RadioGroupProps extends Omit<RACRadioGroupProps, 'children'>, Omit<FlexOwnProps, 'as' | 'className'> {
  /** Layout axis for the radio items. @default 'vertical' */
  orientation?: 'horizontal' | 'vertical';

  /** Field interior (`Label`, radios, description, `FieldError`). */
  children: ReactNode | ((renderProps: RACRadioGroupRenderProps) => ReactNode);
}

/**
 * Radio group. Compose `Label`, a `Group` of radios, description, and `FieldError`. The `Group`
 * picks up its axis, gap, and presentational role from `orientation`.
 *
 * @example
 * ```tsx
 * <RadioGroup>
 *   <Label>Select your plan</Label>
 *   <Group>
 *     <Radio value="basic">Basic</Radio>
 *   </Group>
 *   <FieldError />
 * </RadioGroup>
 * ```
 */
export function RadioGroup({
  children,
  className,
  orientation = 'vertical',
  gap = 'sm',
  isDisabled,
  ...props
}: RadioGroupProps) {
  return (
    <Flex
      direction="column"
      gap={gap}
      orientation={orientation}
      {...props}
      isDisabled={isDisabled}
      as={RACRadioGroup}
      className={composeClassName(className, fieldStyles.field, styles.radioGroup)}
    >
      {composeRenderProps(children, function body(node) {
        return <RadioGroupBody orientation={orientation}>{node}</RadioGroupBody>;
      })}
    </Flex>
  );
}

/**
 * Styles the label a RadioGroup owns and lays out the `Group` holding its items. It runs inside
 * `RACRadioGroup`, so it reads what React Aria wired to the label before republishing it.
 */
function RadioGroupBody({ orientation, children }: { orientation: 'horizontal' | 'vertical'; children: ReactNode }) {
  const label = useSlottedContext(LabelContext) ?? {};
  const group = useSlottedContext(GroupContext) ?? {};

  return (
    <RACProvider
      values={[
        [LabelContext, { ...label, className: composeClassName(label.className, fieldStyles.label) }],
        [GroupContext, { ...group, ...itemGroup(orientation) }]
      ]}
    >
      {children}
    </RACProvider>
  );
}
