import type { ReactNode } from 'react';
import {
  DEFAULT_SLOT,
  Provider as RACProvider,
  TextField as RACTextField,
  type TextFieldProps as RACTextFieldProps,
  composeRenderProps,
  useSlottedContext
} from 'react-aria-components';
import { surfaceClassName } from '#components/_internal/typography';
import { ButtonContext, type ButtonProps } from '#components/button';
import { InputContext } from '#components/input';
import { LabelContext } from '#components/label';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { DeclaredSize, sizeScaleClassName, type InterfaceSize } from '#components/size-scope';
import { GroupContext } from '#components/structure';
import { TextAreaContext } from '#components/text-area';
import { composeClassName } from '#utils/render-props.ts';
import fieldStyles from '../../_internal/field-styles/index.module.css';

export interface TextFieldProps extends Omit<RACTextFieldProps, 'size'>, Omit<FlexOwnProps, 'as' | 'className'> {
  /** Field interior. Pass a function to read field state. */
  children: RACTextFieldProps['children'];

  /** Default value (uncontrolled). */
  defaultValue?: string;

  /** Current value (controlled). */
  value?: string;

  /** Size of the field and every part it owns. Follows the size scope when omitted. */
  size?: InterfaceSize;

  /** Name of the input element, used when submitting a form. */
  name?: string;

  /** Handler called when the value changes. */
  onChange?: RACTextFieldProps['onChange'];
}

interface TextFieldBodyProps {
  /** Whether the field is disabled. */
  isDisabled?: boolean;

  children: ReactNode;
}

/**
 * Styles the parts a TextField owns. It runs inside `RACTextField`, so it reads what React Aria
 * wired to each part and republishes it with the field's chrome; a part's own props still win last,
 * in its `useContextProps`.
 */
function TextFieldBody({ isDisabled, children }: TextFieldBodyProps) {
  const label = useSlottedContext(LabelContext) ?? {};
  const input = useSlottedContext(InputContext) ?? {};
  const textArea = useSlottedContext(TextAreaContext) ?? {};
  const group = useSlottedContext(GroupContext) ?? {};

  const control: ButtonProps = { variant: 'control', isDisabled, className: fieldStyles.control };

  return (
    <RACProvider
      values={[
        [LabelContext, { ...label, className: composeClassName(label.className, fieldStyles.label) }],
        [InputContext, { ...input, className: composeClassName(input.className, fieldStyles.input) }],
        [TextAreaContext, { ...textArea, className: composeClassName(textArea.className, fieldStyles.textarea) }],

        // The box group owns the chrome, so it carries the disabled state instead of each child dimming itself.
        [GroupContext, { ...group, isDisabled, className: composeClassName(group.className, fieldStyles.group) }],
        [
          ButtonContext,
          {
            // React Aria's TextField publishes no ButtonContext, so the field publishes both
            // entries itself. A Button the field does not own inherits nothing: the default entry
            // is here only so an unslotted Button does not throw.
            slots: { [DEFAULT_SLOT]: {}, control }
          }
        ]
      ]}
    >
      {children}
    </RACProvider>
  );
}

/**
 * Text input field. Compose `Label`, `Input`/`TextArea`, optional `Group`, description, and `FieldError`.
 * The field is a size scope: its parts, and any control composed inside, follow its `size`.
 *
 * @example
 * ```tsx
 * <TextField>
 *   <Label>Email</Label>
 *   <Input placeholder="you@example.com" />
 *   <Text slot="description">We won't share it.</Text>
 *   <FieldError />
 * </TextField>
 * ```
 */
export function TextField(props: TextFieldProps) {
  const { children, size, gap = 'var(--_size-gap, var(--sp-sm))', className, isDisabled, ...rest } = props;

  return (
    <DeclaredSize size={size}>
      <Flex
        direction="column"
        gap={gap}
        {...rest}
        isDisabled={isDisabled}
        as={RACTextField}
        data-interior="box"
        className={composeClassName(className, fieldStyles.field, surfaceClassName, sizeScaleClassName(size))}
      >
        {composeRenderProps(children, function body(node) {
          return <TextFieldBody isDisabled={isDisabled}>{node}</TextFieldBody>;
        })}
      </Flex>
    </DeclaredSize>
  );
}
