import { type ReactNode, useContext } from 'react';
import { mergeProps } from 'react-aria';
import {
  DEFAULT_SLOT,
  NumberField as RACNumberField,
  type NumberFieldProps as RACNumberFieldProps,
  Provider as RACProvider,
  composeRenderProps,
  useSlottedContext
} from 'react-aria-components';
import { ButtonContext, type ButtonProps } from '#components/button';
import { Icon } from '#components/icon';
import { InputContext } from '#components/input';
import { LabelContext } from '#components/label';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { SizeProvider, sizeScaleClassName, useDeclaredSize, type ScaleSize } from '#components/size-provider';
import { GroupContext } from '#components/structure';
import { composeClassName } from '#utils/render-props.ts';
import fieldStyles from '../../_internal/field-styles/index.module.css';

export interface NumberFieldProps
  extends Omit<RACNumberFieldProps, 'children' | 'size'>,
    Omit<FlexOwnProps, 'as' | 'className'> {
  /** Field interior. Pass a function to read field state. */
  children: RACNumberFieldProps['children'];

  /** Size of the field and everything inside it. Follows the size scope when omitted. */
  size?: ScaleSize;
}

/** Faces for stepper `Button`s left empty. Local children replace them. */
const STEPPER_FACES = {
  decrement: <Icon icon="minus" />,
  increment: <Icon icon="plus" />
};

interface NumberFieldBodyProps {
  /** Whether the field is disabled. */
  isDisabled?: boolean;

  children: ReactNode;
}

/**
 * Styles the parts a NumberField owns and fills its stepper faces. It runs inside `RACNumberField`,
 * so it reads the increment/decrement props React Aria wired and republishes them with the field's
 * chrome and an icon; a button's own props still win last, in its `useContextProps`.
 */
function NumberFieldBody({ isDisabled, children }: NumberFieldBodyProps) {
  const label = useSlottedContext(LabelContext) ?? {};
  const input = useSlottedContext(InputContext) ?? {};
  const group = useSlottedContext(GroupContext) ?? {};
  const stepperSlots =
    (useContext(ButtonContext) as { slots?: Record<string | symbol, ButtonProps> } | null)?.slots ?? {};
  // Chrome only. It carries no disabled state, so merging it over a stepper cannot overwrite the
  // bounds state React Aria published for that stepper.
  const control: ButtonProps = { variant: 'control', className: fieldStyles.control };

  return (
    <RACProvider
      values={[
        [LabelContext, { ...label, className: composeClassName(label.className, fieldStyles.label) }],
        [InputContext, { ...input, className: composeClassName(input.className, fieldStyles.input) }],

        // The box group owns the chrome, so it carries the disabled state for the parts the field paints.
        [GroupContext, { ...group, isDisabled, className: composeClassName(group.className, fieldStyles.group) }],
        [
          ButtonContext,
          {
            slots: {
              // React Aria publishes only the stepper slots, so an unslotted Button inside the
              // field would throw. A Button the field does not own inherits nothing, so this entry
              // is empty; it is here only to keep the interior free-form.
              [DEFAULT_SLOT]: {},
              control: { ...control, isDisabled },
              decrement: mergeProps(stepperSlots.decrement, control, { children: STEPPER_FACES.decrement }),
              increment: mergeProps(stepperSlots.increment, control, { children: STEPPER_FACES.increment })
            }
          }
        ]
      ]}
    >
      {children}
    </RACProvider>
  );
}

/**
 * Numeric input field. Compose `Label`, the control, description, and `FieldError`.
 *
 * An empty `Button slot="decrement"` / `slot="increment"` picks up its icon and `variant` from
 * the field, so a stepper needs no icon imports.
 *
 * @example
 * ```tsx
 * <NumberField minValue={0} maxValue={100}>
 *   <Label>Quantity</Label>
 *   <Group>
 *     <Button slot="decrement" />
 *     <Input />
 *     <Button slot="increment" />
 *   </Group>
 *   <FieldError />
 * </NumberField>
 * ```
 */
export function NumberField(props: NumberFieldProps) {
  const { children, size, gap = 'var(--_size-gap)', className, isDisabled, ...rest } = props;
  const scale = useDeclaredSize(size);

  return (
    <SizeProvider size={size}>
      <Flex
        direction="column"
        gap={gap}
        {...rest}
        isDisabled={isDisabled}
        as={RACNumberField}
        data-interior="box"
        className={composeClassName(className, fieldStyles.field, sizeScaleClassName(scale))}
      >
        {composeRenderProps(children, function body(node) {
          return <NumberFieldBody isDisabled={isDisabled}>{node}</NumberFieldBody>;
        })}
      </Flex>
    </SizeProvider>
  );
}
