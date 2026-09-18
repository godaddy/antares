import type { ReactNode } from 'react';
import {
  DEFAULT_SLOT,
  Provider as RACProvider,
  TextField as RACTextField,
  type TextFieldProps as RACTextFieldProps,
  composeRenderProps,
  useSlottedContext
} from 'react-aria-components';
import { TypographyContext } from '#components/_internal/typography';
import { SizeProvider, useSize, type InterfaceSize } from '#components/size-provider';
import { ButtonContext, type ButtonProps } from '#components/button';
import { InputContext } from '#components/input';
import { LabelContext } from '#components/label';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { GroupContext } from '#components/structure';
import { TextAreaContext } from '#components/text-area';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';
import fieldStyles from '../../_internal/field-styles/index.module.css';

export interface TextFieldProps extends Omit<RACTextFieldProps, 'size'>, Omit<FlexOwnProps, 'as' | 'className'> {
  /** Field interior. Pass a function to read field state. */
  children: RACTextFieldProps['children'];

  /** Default value (uncontrolled). */
  defaultValue?: string;

  /** Current value (controlled). */
  value?: string;

  /** Visual size of the input. @default 'md' */
  size?: InterfaceSize;

  /** Name of the input element, used when submitting a form. */
  name?: string;

  /** Handler called when the value changes. */
  onChange?: RACTextFieldProps['onChange'];
}

interface TextFieldBodyProps {
  /** Visual size of the controls. */
  size?: InterfaceSize;

  /** Whether the field is disabled. */
  isDisabled?: boolean;

  children: ReactNode;
}

/**
 * Styles the parts a TextField owns. It runs inside `RACTextField`, so it reads what React Aria
 * wired to each part and republishes it with the field's chrome; a part's own props still win last,
 * in its `useContextProps`.
 */
function TextFieldBody({ size = 'md', isDisabled, children }: TextFieldBodyProps) {
  const label = useSlottedContext(LabelContext) ?? {};
  const input = useSlottedContext(InputContext) ?? {};
  const textArea = useSlottedContext(TextAreaContext) ?? {};
  const group = useSlottedContext(GroupContext) ?? {};
  const supportSize = { sm: 'md', md: 'lg', lg: 'xl' } as const;
  const support = { role: 'detail', size: supportSize[size], emphasis: 'passive' } as const;

  const control: ButtonProps = { variant: 'control', size, isDisabled, className: fieldStyles.control };

  return (
    <RACProvider
      values={[
        [
          TypographyContext,
          {
            defaults: { label: { size } },
            slots: { description: { body: support, detail: support }, error: { detail: { size: supportSize[size] } } }
          }
        ],
        [LabelContext, { ...label, className: composeClassName(label.className, fieldStyles.label) }],
        [
          InputContext,
          {
            ...input,
            className: composeClassName(input.className, fieldStyles.input, fieldStyles.typography, styles.input)
          }
        ],
        [
          TextAreaContext,
          {
            ...textArea,
            className: composeClassName(textArea.className, fieldStyles.textarea, fieldStyles.typography, styles.input)
          }
        ],

        // The box group owns the chrome, so it carries the disabled state instead of each child dimming itself.
        [
          GroupContext,
          { ...group, isDisabled, className: composeClassName(group.className, fieldStyles.group, styles.surface) }
        ],
        [
          ButtonContext,
          {
            // React Aria's TextField publishes no ButtonContext, so the field publishes both
            // entries itself. Unslotted buttons keep the interface size without control chrome.
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
  const { children, size: sizeProp, gap, className, isDisabled, ...rest } = props;

  const size = useSize(sizeProp);
  const defaultGap = { sm: 'xs', md: 'sm', lg: 'md' } as const;

  return (
    <SizeProvider size={size}>
      <Flex
        direction="column"
        gap={gap ?? defaultGap[size]}
        {...rest}
        isDisabled={isDisabled}
        as={RACTextField}
        data-interior="box"
        data-size={size}
        data-typography=""
        className={composeClassName(className, fieldStyles.field, styles.field)}
      >
        {composeRenderProps(children, function body(node) {
          return (
            <TextFieldBody size={size} isDisabled={isDisabled}>
              {node}
            </TextFieldBody>
          );
        })}
      </Flex>
    </SizeProvider>
  );
}
