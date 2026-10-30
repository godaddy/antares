import {
  DEFAULT_SLOT,
  Provider as RACProvider,
  Menu as RACMenu,
  MenuItem as RACMenuItem,
  MenuSection as RACMenuSection,
  MenuTrigger as RACMenuTrigger,
  Separator as RACSeparator,
  SeparatorContext as RACSeparatorContext,
  SubmenuTrigger as RACSubmenuTrigger,
  TextContext as RACTextContext,
  composeRenderProps,
  type MenuItemProps as RACMenuItemProps,
  type MenuProps as RACMenuProps,
  type MenuSectionProps as RACMenuSectionProps,
  type MenuTriggerProps as RACMenuTriggerProps,
  type SeparatorProps as RACSeparatorProps,
  type SubmenuTriggerProps as RACSubmenuTriggerProps,
  type TextProps as RACTextProps,
  type Selection as RACSelection
} from 'react-aria-components';
import { forwardRef, useContext, type ForwardedRef, type ReactNode } from 'react';
import { cx } from 'cva';
import { composeClassName } from '#utils/render-props.ts';
import { Text } from '#components/text';
import { HeadingContext } from '#components/heading';
import { HeaderContext } from '#components/structure';
import { IconContext } from '#components/icon';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { PopoverContext } from '#components/popover';
import { textTreatmentClassName, useTypographyClassName } from '#components/_internal/typography';
import styles from './index.module.css';

/**
 * Props for the {@link MenuTrigger} component.
 */
export interface MenuTriggerProps extends RACMenuTriggerProps {}

/**
 * Anchors a menu to a trigger. Handles open state, keyboard navigation, and focus automatically.
 * Compose the `Popover` and `Menu` yourself. Place an optional `Heading` in the popover as a sibling to `Menu`.
 * Group labels go inside `MenuGroup`, not the trigger.
 *
 * @param props - {@link MenuTriggerProps}
 *
 * @example
 * ```tsx
 * <MenuTrigger>
 *   <Button>Edit</Button>
 *   <Popover aria-label="Menu">
 *     <Heading>Edit</Heading>
 *     <Menu aria-label="Actions">
 *       <MenuItem id="cut">Cut</MenuItem>
 *     </Menu>
 *   </Popover>
 * </MenuTrigger>
 * ```
 */
export function MenuTrigger(props: MenuTriggerProps) {
  return (
    <RACProvider
      values={[
        [
          PopoverContext,
          {
            hideArrow: true,
            containerProps: { className: styles.overlay }
          }
        ]
      ]}
    >
      <RACMenuTrigger {...props} />
    </RACProvider>
  );
}

/**
 * Props for the {@link Menu} component.
 */
export interface MenuProps<T> extends Omit<FlexOwnProps, 'as' | 'className' | 'style'>, RACMenuProps<T> {}

/**
 * A list of actions or options. Keyboard-navigable, supports typeahead and selection.
 * Renders rows only; compose selection indicators and icons from render props.
 *
 * @param props - {@link MenuProps}
 *
 * @example
 * ```tsx
 * <Menu aria-label="Actions" selectionMode="single">
 *   <MenuItem id="cut">Cut</MenuItem>
 * </Menu>
 * ```
 */
export const Menu = forwardRef(function Menu<T extends object>(
  { className, children, ...props }: MenuProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) {
  const headerTypography = useTypographyClassName('detail', { size: 'sm' });

  return (
    <RACProvider
      values={[
        [
          HeaderContext,
          {
            className: cx(headerTypography, styles.header),
            direction: 'column',
            alignItems: 'stretch',
            justifyContent: 'start',
            gap: '0',
            padding: ''
          }
        ],
        [
          HeadingContext,
          {
            slots: {
              [DEFAULT_SLOT]: {
                className: cx(headerTypography, styles.headerLabel),
                role: 'presentation',
                style: { fontVariationSettings: '"DSPL" 0' }
              }
            }
          }
        ],
        [
          IconContext,
          {
            width: 21,
            height: 21,
            'aria-hidden': true
          }
        ],
        [
          RACSeparatorContext,
          {
            className: styles.separator
          }
        ]
      ]}
    >
      <Flex
        direction="column"
        {...props}
        ref={ref}
        as={RACMenu<T>}
        className={composeClassName(className, styles.menu)}
      >
        {children}
      </Flex>
    </RACProvider>
  );
});

/**
 * Props for the {@link MenuGroup} component.
 */
export interface MenuGroupProps<T extends object>
  extends Omit<FlexOwnProps, 'as' | 'children' | 'className' | 'style'>,
    RACMenuSectionProps<T> {}

/**
 * Groups items under an optional label. Selection applies only to this group's items.
 * Put `Header` and `Heading` inside for the label; the group heading is presentational.
 *
 * @param props - {@link MenuGroupProps}
 */
export const MenuGroup = forwardRef(function MenuGroup<T extends object>(
  { className, children, ...props }: MenuGroupProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <Flex
      direction="column"
      {...props}
      ref={ref}
      as={RACMenuSection<T>}
      className={composeClassName(className, styles.group)}
    >
      {children}
    </Flex>
  );
});

/**
 * Props for the {@link MenuItem} component.
 */
export interface MenuItemProps extends Omit<FlexOwnProps, 'as' | 'children'>, RACMenuItemProps {}

type TextSlots = { slots: Record<string | symbol, RACTextProps> };

/**
 * One action or option. Use a string label or render props for composed content.
 * String child = label + typeahead value. For composed content, use render props and `textValue`.
 * Compose all indicators (checks, chevrons, icons) from state.
 *
 * @param props - {@link MenuItemProps}
 *
 * @example
 * ```tsx
 * <MenuItem id="cut" textValue="Cut">
 *   {({ isSelected }) => (
 *     <>
 *       <Text slot="label">Cut</Text>
 *       {isSelected && <Icon icon="checkmark" />}
 *     </>
 *   )}
 * </MenuItem>
 * ```
 */
export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(function MenuItem(
  { children, className, ...props },
  ref
) {
  const textValue = props.textValue ?? (typeof children === 'string' ? children : undefined);
  const typographyClass = useTypographyClassName('text', { size: 'sm' });

  return (
    <Flex
      alignItems="center"
      {...props}
      ref={ref}
      as={RACMenuItem}
      textValue={textValue}
      className={composeClassName(className, typographyClass, styles.item)}
    >
      {composeRenderProps(children, function renderItem(content) {
        return <MenuItemBody>{content}</MenuItemBody>;
      })}
    </Flex>
  );
});

/**
 * Internal: Handles the label slot for menu items. Runs inside `MenuItem`.
 */
function MenuItemBody({ children }: { children?: ReactNode }) {
  const { slots } = useContext(RACTextContext) as TextSlots;
  const inherit = textTreatmentClassName('inherit');
  const label = { ...slots?.label, className: cx(slots?.label?.className, inherit, styles.label) };

  return (
    <RACProvider values={[[RACTextContext, { slots: { ...slots, [DEFAULT_SLOT]: label, label } }]]}>
      {typeof children === 'string' ? <Text slot="label">{children}</Text> : children}
    </RACProvider>
  );
}

/**
 * Props for the {@link SubmenuTrigger} component.
 */
export interface SubmenuTriggerProps extends RACSubmenuTriggerProps {}

/**
 * Opens a nested menu from a `MenuItem`. Keyboard navigation and hover are automatic.
 * Parent item stays pressed while the submenu is open.
 *
 * @param props - {@link SubmenuTriggerProps}
 */
export function SubmenuTrigger(props: SubmenuTriggerProps) {
  return <RACSubmenuTrigger {...props} />;
}

/**
 * Props for the {@link Separator} component.
 */
export interface SeparatorProps extends RACSeparatorProps {}

/**
 * A visual divider between items or groups. Not focusable or selectable.
 *
 * @param props - {@link SeparatorProps}
 */
export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(function Separator(props, ref) {
  return <RACSeparator {...props} ref={ref} />;
});

/** Selection type for a menu. */
export type { RACSelection as Selection };
