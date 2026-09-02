import { forwardRef, type ReactNode } from 'react';
import {
  Select as RACSelect,
  type SelectProps as RACSelectProps,
  type SelectRenderProps as RACSelectRenderProps,
  type Key as RACKey,
  SelectValue as RACSelectValue,
  type SelectValueProps as RACSelectValueProps
} from 'react-aria-components';
import {
  Field,
  mapFieldChildren,
  normalizeFieldChildren,
  type FieldOwnProps,
  type FieldSize,
  type FieldSlots
} from '#components/_internal/field';
import { Button } from '#components/button';
import { Icon } from '#components/icon';
import { ListBox, ListBoxItem, type ListBoxItemProps } from '#components/listbox';
import { Popover } from '#components/popover';
import { Content, Group } from '#components/structure';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

type SelectionMode = 'single' | 'multiple';

function selectSlots(variant: 'default' | 'control'): FieldSlots {
  return {
    control: <SelectControl variant={variant} />,
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

  if (variant === 'control') {
    return (
      <RACSelect {...racProps} className={selectClass}>
        {mapFieldChildren(children, function fillInterior(node) {
          return normalizeFieldChildren(node, selectSlots('control'));
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
}

/** Preset trigger (`Group` + button) unless `variant="control"`. */
function SelectControl({ variant = 'default' }: SelectControlProps) {
  const button = (
    <Button slot={variant === 'control' ? 'control' : 'trigger'}>
      <SelectValue />
      <Icon icon="chevron-down" />
    </Button>
  );

  return variant === 'control' ? button : <Group alignItems="center">{button}</Group>;
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
