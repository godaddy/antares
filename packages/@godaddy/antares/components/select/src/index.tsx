import { forwardRef, useContext, type ReactNode } from 'react';
import {
  Select as RACSelect,
  type SelectProps as RACSelectProps,
  type SelectRenderProps as RACSelectRenderProps,
  type Key as RACKey,
  SelectValue as RACSelectValue,
  type SelectValueProps as RACSelectValueProps,
  useSlottedContext
} from 'react-aria-components';
import {
  Field,
  mapFieldChildren,
  normalizeFieldChildren,
  type FieldOwnProps,
  type FieldSize,
  type FieldSlots
} from '#components/_internal/field';
import { Button, ButtonContext, type ButtonProps } from '#components/button';
import { Icon } from '#components/icon';
import { ListBox, ListBoxItem, type ListBoxItemProps } from '#components/listbox';
import { Popover } from '#components/popover';
import { Content, Group, GroupContext } from '#components/structure';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

type SelectionMode = 'single' | 'multiple';

/** Chrome a parent field publishes on its `control` button slot. */
interface FieldControlChrome {
  size?: FieldSize;
  className?: ButtonProps['className'];
}

function selectSlots(variant: 'default' | 'control', chrome?: FieldControlChrome): FieldSlots {
  return {
    control: <SelectControl variant={variant} size={chrome?.size} className={chrome?.className} />,
    items: function wrapItems(items) {
      return <SelectOptions>{items}</SelectOptions>;
    }
  };
}

export interface SelectProps<T, M extends SelectionMode = 'single'>
  extends Omit<RACSelectProps<T, M>, 'children' | 'size' | 'items'>,
    FieldOwnProps {
  /** Visual size of the trigger. @default 'md' */
  size?: FieldSize;

  /** Complete field, or a control inside another field's Group. @default 'default' */
  variant?: 'default' | 'control';

  /** Field interior. Pass a function to read render props such as `isOpen`. */
  children: ReactNode | ((renderProps: RACSelectRenderProps) => ReactNode);
}

/**
 * Select field. Fills in the trigger and wraps loose items in a popover when omitted.
 * Use `variant="control"` to compose inside another field's Group.
 *
 * @example
 * ```tsx
 * <Select placeholder="Pick a drink">
 *   <Label>Coffee</Label>
 *   <SelectItem id="espresso">Espresso</SelectItem>
 * </Select>
 * ```
 */
export function Select<T extends object, M extends SelectionMode = 'single'>(props: SelectProps<T, M>) {
  const { children, size, variant = 'default', className, ...racProps } = props;
  const selectClass = composeClassName(className, styles.select);
  const group = useSlottedContext(GroupContext);
  // RAC's Select replaces ButtonContext for its interior, so read the parent chrome here.
  const inherited = useContext(ButtonContext) as { slots?: Record<string, FieldControlChrome> } | null;

  if (variant === 'control') {
    const chrome = { ...inherited?.slots?.control, size: size ?? inherited?.slots?.control?.size };

    return (
      <RACSelect {...racProps} isDisabled={racProps.isDisabled ?? group?.isDisabled} className={selectClass}>
        {mapFieldChildren(children, function fillInterior(node) {
          return normalizeFieldChildren(node, selectSlots('control', chrome));
        })}
      </RACSelect>
    );
  }

  return (
    <Field
      as={RACSelect as typeof RACSelect<T, M>}
      interior="box"
      size={size}
      slots={selectSlots('default')}
      {...racProps}
      className={selectClass}
    >
      {children}
    </Field>
  );
}

interface SelectControlProps {
  /** Field trigger, or a control inside another field's Group. @default 'default' */
  variant?: 'default' | 'control';

  /** Trigger size when composed as a control; the field publishes it otherwise. */
  size?: FieldSize;

  /** Parent field's control chrome; RAC's Select would otherwise drop it. */
  className?: ButtonProps['className'];
}

/** Preset trigger (`Group` + button) unless `variant="control"`. */
function SelectControl({ variant = 'default', size, className }: SelectControlProps) {
  const isControl = variant === 'control';
  const button = (
    <Button
      slot={isControl ? 'control' : 'trigger'}
      variant={isControl ? 'control' : undefined}
      size={size}
      className={className}
    >
      <SelectValue />
      <Icon icon="chevron-down" />
    </Button>
  );

  return isControl ? button : <Group alignItems="center">{button}</Group>;
}

interface SelectOptionsProps {
  /** `SelectItem`s. */
  children: ReactNode;
}

/** Preset popover wrapping loose `SelectItem`s. */
function SelectOptions({ children }: SelectOptionsProps) {
  return (
    <Popover hideArrow>
      <Content blockPadding="xs" inlinePadding="0">
        <ListBox>{children}</ListBox>
      </Content>
    </Popover>
  );
}

export interface SelectValueProps extends RACSelectValueProps<object> {}

/** Selected option, or the Select placeholder. */
export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(function SelectValue(props, ref) {
  const { className, ...rest } = props;

  return <RACSelectValue {...rest} ref={ref} className={composeClassName(className, styles.value)} />;
});

export interface SelectItemProps extends ListBoxItemProps {}

/** One option inside a Select. */
export function SelectItem(props: SelectItemProps) {
  return <ListBoxItem {...props} />;
}

export type SelectKey = RACKey;
