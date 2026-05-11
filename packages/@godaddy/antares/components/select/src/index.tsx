import {
  Button as RACButton,
  FieldError as RACFieldError,
  Header as RACHeader,
  Label as RACLabel,
  ListBox as RACListBox,
  ListBoxItem as RACListBoxItem,
  ListBoxSection as RACListBoxSection,
  Popover as RACPopover,
  Select as RACSelect,
  SelectValue as RACSelectValue,
  type Key as RACKey,
  type ListBoxItemRenderProps as RACListBoxItemRenderProps,
  type ListBoxItemProps as RACListBoxItemProps,
  type ListBoxSectionProps as RACListBoxSectionProps
} from 'react-aria-components';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Flex } from '#components/layout/flex';
import { Text } from '#components/text';
import { Icon } from '#components/icon';
import styles from './index.module.css';
import { cx } from 'cva';

/**
 * Common props shared between label variants, used internally for the discriminated union
 *
 * @typeParam T - Item type in the select list
 */
interface SelectBaseProps<T extends object> {
  /** Focus on mount */
  autoFocus?: boolean;

  /** SelectItem elements or render function */
  children: ReactNode | ((item: T) => ReactNode);

  /** Component CSS class */
  className?: string;

  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;

  /** Initial selected key (uncontrolled) */
  defaultSelectedKey?: RACKey;

  /** Help text below the trigger */
  description?: string;

  /** Error text shown when invalid */
  errorMessage?: string;

  /** Disables interaction */
  isDisabled?: boolean;

  /** Shows error styling and errorMessage */
  isInvalid?: boolean;

  /** Open state (controlled) */
  isOpen?: boolean;

  /** Shows red asterisk, requires value for submission */
  isRequired?: boolean;

  /** Items for dynamic rendering (children must be render function) */
  items?: Iterable<T>;

  /**
   * Label positioning style
   *
   * @default 'default'
   */
  labelStyle?: 'default' | 'float';

  /** Form submission name */
  name?: string;

  /** Called when open state changes */
  onOpenChange?: (isOpen: boolean) => void;

  /** Called when selection changes */
  onSelectionChange?: (key: RACKey | null) => void;

  /** Placeholder text when empty */
  placeholder?: string;

  /** Selected key (controlled) */
  selectedKey?: RACKey | null;

  /**
   * Whether single or multiple selection is enabled
   *
   * @default 'single'
   */
  selectionMode?: 'single' | 'multiple';

  /**
   * Visual size variant
   *
   * @default 'md'
   */
  size?: 'sm' | 'md';
}

/**
 * Props for the Select component
 *
 * @typeParam T - Item type in the select list
 *
 * @remarks
 * Either `label` or `aria-label` must be provided for accessibility.
 * Props from RACSelectProps are re-declared for documentation due to react-docgen-typescript limitations with Omit<>.
 */
export interface SelectProps<T extends object> extends SelectBaseProps<T> {
  /**
   * Visible label above the trigger
   * Required if aria-label is not provided
   */
  label?: string;

  /**
   * Accessible label for screen readers
   * Required if label is not provided
   */
  'aria-label'?: string;
}

/**
 * Antares Select component
 *
 * @param props - {@link SelectProps}
 */
export function Select<T extends object>({
  label,
  description,
  errorMessage,
  children,
  items,
  className,
  size = 'md',
  labelStyle = 'default',
  ...props
}: SelectProps<T>) {
  return (
    <RACSelect
      {...props}
      className={cx(
        styles.select,
        size === 'sm' && styles['select--sm'],
        size === 'md' && styles['select--md'],
        labelStyle === 'float' && styles['select--floatLabel'],
        className
      )}
    >
      {label && (
        <RACLabel className={cx(styles.label, props.isRequired && styles['label--required'])}>{label}</RACLabel>
      )}
      <RACButton className={cx(styles.button, styles[`button--${size}`])}>
        <RACSelectValue className={styles.value} />
        <Icon icon="chevron-down" className={styles.chevron} aria-hidden="true" />
      </RACButton>
      {description && (
        <Text slot="description" className={styles.description}>
          {description}
        </Text>
      )}
      {errorMessage && (
        <Flex as={RACFieldError} className={styles.error}>
          <Flex alignItems="center" gap="sm">
            <Icon icon="alert" className={styles.errorIcon} aria-hidden="true" />
            <span>{errorMessage}</span>
          </Flex>
        </Flex>
      )}
      <RACPopover className={styles.popover}>
        <RACListBox className={styles.listbox} items={items}>
          {children}
        </RACListBox>
      </RACPopover>
    </RACSelect>
  );
}

/**
 * SelectItem for individual options, supports render props for conditional checkbox display
 *
 * @param props - {@link RACListBoxItemProps}
 */
export function SelectItem(props: RACListBoxItemProps) {
  if (typeof props.children === 'function') {
    return (
      <RACListBoxItem {...props} className={cx(styles.item, props.className)}>
        {props.children}
      </RACListBoxItem>
    );
  }

  return (
    <RACListBoxItem
      {...props}
      textValue={props.textValue ?? (typeof props.children === 'string' ? props.children : undefined)}
      className={cx(styles.item, props.className)}
    >
      {function renderItem(renderProps: RACListBoxItemRenderProps) {
        return (
          <>
            {renderProps.selectionMode === 'multiple' && (
              <span className={styles.checkbox} aria-hidden="true">
                {renderProps.isSelected ? '☑' : '☐'}
              </span>
            )}
            {props.children}
          </>
        );
      }}
    </RACListBoxItem>
  );
}

/**
 * SelectSection for grouping options
 *
 * @param props - {@link RACListBoxSectionProps}
 */
export function SelectSection(props: RACListBoxSectionProps<object>) {
  return <RACListBoxSection {...props} className={cx(styles.section, props.className)} />;
}

/**
 * Props for SelectHeader component
 */
export interface SelectHeaderProps extends ComponentPropsWithoutRef<typeof RACHeader> {}

/**
 * SelectHeader for section titles
 *
 * @param props - {@link SelectHeaderProps}
 */
export function SelectHeader(props: SelectHeaderProps) {
  return <RACHeader {...props} className={cx(styles.header, props.className)} />;
}

export type { RACListBoxItemProps as SelectItemProps, RACListBoxSectionProps as SelectSectionProps };
