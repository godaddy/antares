import { forwardRef, useRef, useState, type ReactNode, type Ref } from 'react';
import { mergeProps, useFocusVisible, useHover } from 'react-aria';
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
  Link as RACLink,
  type LinkProps as RACLinkProps,
  CheckboxButton as RACCheckboxButton,
  CheckboxField as RACCheckboxField,
  RadioButton as RACRadioButton,
  RadioField as RACRadioField,
  type CheckboxFieldProps as RACCheckboxFieldProps
} from 'react-aria-components';
import { Flex, type FlexProps } from '#components/layout/flex';
import { composeClassName } from '#utils/render-props.ts';
import { SelectionProvider } from './card-selection-indicator.tsx';
import { useSurfacePress } from './use-surface-press.ts';
import styles from './index.module.css';

/**
 * Props for Card. A Card has a primary action (`href` or `onPress`) or `selection`, not both.
 * When both are set, `selection` wins.
 */
export interface CardProps extends Omit<FlexProps, 'as' | 'children' | 'onClick'> {
  /** Card contents. */
  children?: ReactNode;

  /** Accessible name for the primary action or selection, else the surface. */
  'aria-label'?: string;

  /** Accessible labelled-by reference for the primary action or selection, else the surface. */
  'aria-labelledby'?: string;

  /** Disable the Card, including its primary action or selection. */
  isDisabled?: boolean;

  /** Primary navigation destination. The Card itself renders as the native link. */
  href?: RACLinkProps['href'];

  /** Primary action callback. */
  onPress?: RACButtonProps['onPress'];

  /** Native selection. Radio cards go inside a `RadioGroup`. */
  selection?: 'checkbox' | 'radio';

  /** Selection value submitted by a form or group. Required for radio cards. */
  value?: string;

  /** Form field name for a standalone checkbox card. Groups own their field name. */
  name?: string;

  /** Controlled standalone checkbox selection. Groups own grouped selection. */
  isSelected?: boolean;

  /** Initial selection for an uncontrolled standalone checkbox card. */
  defaultSelected?: boolean;

  /** Called when standalone checkbox selection changes. Groups own grouped changes. */
  onSelectionChange?: RACCheckboxFieldProps['onChange'];

  /** Make checkbox selection read-only. For radio cards, set this on `RadioGroup`. */
  isReadOnly?: boolean;
}

/**
 * A composed surface with optional primary action and native selection.
 *
 * @param props - {@link CardProps}
 */
export const Card = forwardRef<HTMLElement, CardProps>(function Card(props, ref) {
  const {
    selection,
    value,
    name,
    isSelected,
    defaultSelected,
    onSelectionChange,
    isReadOnly,
    className,
    children,
    href,
    onPress,
    isDisabled,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    ...surfaceProps
  } = props;

  const hasPrimary = selection == null && (href != null || onPress != null);
  const isLink = hasPrimary && href != null;
  const SelectionButton = selection === 'radio' ? RACRadioButton : RACCheckboxButton;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const ariaProps = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy
  };

  const surfacePress = useSurfacePress(selection == null ? buttonRef : inputRef);
  const hover = useHover({});
  const [isSelectionFocused, setSelectionFocused] = useState(false);
  const focusVisible = useFocusVisible();
  const surface = {
    padding: 'lg',
    gap: 'lg',
    direction: 'column',
    ...surfaceProps,
    className: composeClassName(className, styles.card)
  } satisfies FlexProps;

  if (isLink) {
    return (
      <Flex
        {...(surface as FlexProps<typeof RACLink>)}
        {...ariaProps}
        as={RACLink}
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        onPress={onPress}
        isDisabled={isDisabled}
        data-card={isDisabled ? 'static' : 'interactive'}
      >
        {children}
      </Flex>
    );
  }

  function renderSurface(state = { isSelected: false, isDisabled: false, isReadOnly: false }) {
    const canSelect = selection != null && !state.isDisabled && !state.isReadOnly;
    const isInteractive = (hasPrimary && !isDisabled) || canSelect;
    const isHovered = isInteractive && hover.isHovered;
    const isPressed = isInteractive && surfacePress.isPressed;

    return (
      <SelectionProvider
        isSelected={state.isSelected}
        isDisabled={state.isDisabled}
        isReadOnly={state.isReadOnly}
        isFocusVisible={isSelectionFocused && focusVisible.isFocusVisible}
        isHovered={isHovered}
        isPressed={isPressed}
      >
        <Flex
          {...mergeProps(surface, hover.hoverProps, isInteractive ? surfacePress.pressProps : null)}
          {...(hasPrimary || selection != null ? undefined : ariaProps)}
          ref={ref as Ref<HTMLDivElement>}
          data-card-selected={state.isSelected || undefined}
          data-disabled={isDisabled || state.isDisabled || undefined}
          data-hovered={isHovered || undefined}
          data-pressed={isPressed || undefined}
          data-card={isInteractive ? 'interactive' : 'static'}
        >
          {selection != null ? (
            <SelectionButton className={styles.selection} />
          ) : hasPrimary ? (
            <RACButton
              ref={buttonRef}
              onPress={onPress}
              {...ariaProps}
              isDisabled={isDisabled}
              className={styles.primary}
            />
          ) : null}
          {children}
        </Flex>
      </SelectionProvider>
    );
  }

  const fieldProps = {
    value,
    isDisabled,
    ...ariaProps,
    onFocusChange: setSelectionFocused,
    inputRef,
    style: { display: 'contents' }
  };

  if (selection === 'checkbox') {
    return (
      <RACCheckboxField
        {...fieldProps}
        name={name}
        isSelected={isSelected}
        defaultSelected={defaultSelected}
        onChange={onSelectionChange}
        isReadOnly={isReadOnly}
      >
        {renderSurface}
      </RACCheckboxField>
    );
  }

  if (selection === 'radio') {
    return (
      <RACRadioField {...fieldProps} value={value ?? ''}>
        {renderSurface}
      </RACRadioField>
    );
  }

  return renderSurface();
});
