import { forwardRef, useRef, type MouseEventHandler, type ReactNode, type Ref } from 'react';
import {
  Link as RACLink,
  type LinkProps as RACLinkProps,
  CheckboxField as RACCheckboxField,
  RadioField as RACRadioField,
  type CheckboxFieldProps as RACCheckboxFieldProps
} from 'react-aria-components';
import { Button, type ButtonProps } from '#components/button';
import { Flex, type FlexProps } from '#components/layout/flex';
import { ButtonGroupContext } from '#components/structure';
import { composeClassName } from '#utils/render-props.ts';
import { SelectionProvider } from './card-selection-indicator.tsx';
import { useForwardedClick } from './use-forwarded-click.ts';
import styles from './index.module.css';

interface CardBaseProps extends Omit<FlexProps, 'as' | 'children' | 'onClick'> {
  /** Card contents. */
  children?: ReactNode;

  /** Accessible name for the primary action or selection, else the surface. */
  'aria-label'?: string;

  /** Accessible labelled-by reference for the primary action or selection, else the surface. */
  'aria-labelledby'?: string;

  /** Disable the Card, including its primary action or selection. */
  isDisabled?: boolean;

  /** Observe clicks on the Card surface. Call `preventDefault` to skip native link navigation. */
  onClick?: MouseEventHandler<HTMLDivElement>;
}

interface PrimaryProps {
  /** Primary navigation destination. */
  href?: RACLinkProps['href'];

  /** Primary action callback. */
  onPress?: ButtonProps['onPress'];
}

interface SelectionProps {
  /** Selection value submitted by a form or group. Required for radio cards. */
  value?: string;
}

interface CheckboxSelectionProps {
  /** Form field name for a standalone checkbox card. Groups own their field name. */
  name?: string;

  /** Controlled standalone checkbox selection. Groups own grouped selection. */
  isSelected?: boolean;

  /** Initial selection for an uncontrolled standalone checkbox card. */
  defaultSelected?: boolean;

  /** Called when standalone checkbox selection changes. Groups own grouped changes. */
  onSelectionChange?: RACCheckboxFieldProps['onChange'];

  /** Make checkbox selection read-only. For radio cards, set this on RadioGroup. */
  isReadOnly?: boolean;
}

type Never<T> = { [Key in keyof T]?: never };

interface CheckboxCardProps extends CardBaseProps, Never<PrimaryProps>, SelectionProps, CheckboxSelectionProps {
  /** Enable native checkbox selection. */
  selection: 'checkbox';
}

interface RadioCardProps extends CardBaseProps, Never<PrimaryProps>, SelectionProps, Never<CheckboxSelectionProps> {
  /** Enable native radio selection inside a RadioGroup. */
  selection: 'radio';

  /** Selection value submitted by the RadioGroup. */
  value: string;
}

interface NonSelectableCardProps extends CardBaseProps, PrimaryProps, Never<SelectionProps & CheckboxSelectionProps> {
  /** Omit for no selection. */
  selection?: never;
}

/**
 * Props for Card. A Card has a primary action or selection, not both. Only standalone checkbox
 * cards accept local selection state; groups own the rest.
 */
export type CardProps = CheckboxCardProps | RadioCardProps | NonSelectableCardProps;

interface SurfaceState {
  isSelected?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
}

/**
 * A composed surface with optional primary action and native selection.
 *
 * @param props - {@link CardProps}
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(props, ref) {
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
    onClick,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    ...surfaceProps
  } = props;

  const hasPrimary = href != null || onPress != null;
  const primaryRef = useRef<HTMLElement>(null);
  const canActivatePrimary = hasPrimary && !isDisabled;
  const ariaProps = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy
  };

  const forwardedClick = useForwardedClick(function resolveTarget(card) {
    if (hasPrimary) return primaryRef.current;
    for (const input of card.querySelectorAll<HTMLInputElement>('[data-card-selection-control] input')) {
      if (input.closest('[data-card]') === card) return input;
    }
    return null;
  }, onClick);

  function renderSurface(state: SurfaceState = {}) {
    const canSelect = selection != null && !state.isDisabled && !state.isReadOnly;
    const isInteractive = canActivatePrimary || canSelect;
    const shouldForwardClick = (canActivatePrimary && href == null) || canSelect;

    return (
      <SelectionProvider kind={selection ?? null}>
        <Flex
          padding="lg"
          gap="lg"
          direction="column"
          {...surfaceProps}
          {...(hasPrimary || selection != null ? undefined : ariaProps)}
          ref={ref}
          className={composeClassName(className, styles.card)}
          data-card-selected={state.isSelected || undefined}
          data-disabled={isDisabled || state.isDisabled || undefined}
          onClick={shouldForwardClick ? forwardedClick : onClick}
          data-card={isInteractive ? 'interactive' : 'static'}
        >
          {href != null ? (
            <RACLink
              ref={primaryRef as Ref<HTMLAnchorElement>}
              href={href}
              onPress={onPress}
              {...ariaProps}
              isDisabled={isDisabled}
              className={styles.link}
            />
          ) : onPress != null ? (
            <Button
              ref={primaryRef as Ref<HTMLButtonElement>}
              onPress={onPress}
              {...ariaProps}
              isDisabled={isDisabled}
              className={styles.primary}
            />
          ) : null}
          <ButtonGroupContext.Provider value={null}>{children}</ButtonGroupContext.Provider>
        </Flex>
      </SelectionProvider>
    );
  }

  const fieldProps = { value, isDisabled, ...ariaProps, style: { display: 'contents' } };

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
      <RACRadioField {...fieldProps} value={value}>
        {renderSurface}
      </RACRadioField>
    );
  }

  return renderSurface();
});
