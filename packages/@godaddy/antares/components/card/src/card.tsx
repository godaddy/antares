import { forwardRef, useRef, type CSSProperties, type MouseEventHandler, type ReactNode, type Ref } from 'react';
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
import { composeClassName, type ClassNameProp } from '#utils/render-props.ts';
import { SelectionProvider } from './card-selection-indicator.tsx';
import { useForwardedClick } from './use-forwarded-click.ts';
import styles from './index.module.css';

/** Selection state available to `className` and `style` render props. */
export interface CardRenderProps {
  /** Whether the card is selected. */
  isSelected: boolean;

  /** Whether a checkbox card is in a mixed state. */
  isIndeterminate: boolean;

  /** Whether selection is disabled. */
  isDisabled: boolean;

  /** Whether selection is read-only. */
  isReadOnly: boolean;

  /** Whether the card is required. */
  isRequired: boolean;

  /** Whether the card is invalid. */
  isInvalid: boolean;
}

const IDLE_RENDER_PROPS: CardRenderProps = {
  isSelected: false,
  isIndeterminate: false,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
  isInvalid: false
};

type CardLayoutProps = Omit<FlexProps, 'as' | 'children' | 'onClick' | 'className' | 'style'>;

interface CardBaseProps extends CardLayoutProps {
  /** Card contents. */
  children?: ReactNode;

  /** Primary navigation destination. */
  href?: RACLinkProps['href'];

  /** Primary action callback. */
  onPress?: ButtonProps['onPress'];

  /** Accessible name for the primary action. */
  'aria-label'?: string;

  /** Accessible labelled-by reference for the primary action. */
  'aria-labelledby'?: string;

  /** Whether the primary action is disabled. */
  isDisabled?: boolean;

  /** Observe clicks on the Card surface. Call `preventDefault` to skip native link navigation. */
  onClick?: MouseEventHandler<HTMLDivElement>;

  /** Selection value submitted by a form or group. Required for radio cards. */
  value?: string;

  /** Disable selection while keeping primary and child actions independent. */
  isSelectionDisabled?: boolean;

  /** Labels the selection control when it should not share the primary action's name. */
  selectionProps?: Pick<RACCheckboxFieldProps, 'aria-label' | 'aria-labelledby' | 'aria-describedby'>;

  /** Surface classes. Strings match Flex; functions receive native selection state. */
  className?: ClassNameProp<CardRenderProps>;

  /** Surface styles. Objects match Flex; functions receive native selection state. */
  style?:
    | CSSProperties
    | ((renderProps: CardRenderProps & { defaultStyle: CSSProperties }) => CSSProperties | undefined);
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

  /** Show a mixed selection state on a checkbox card. */
  isIndeterminate?: boolean;

  /** Require a standalone checkbox card to be selected for form submission. */
  isRequired?: boolean;

  /** Checkbox selection validation state. */
  isInvalid?: boolean;
}

type WithoutCheckboxSelectionProps = { [Key in keyof CheckboxSelectionProps]?: never };

interface CheckboxCardProps extends CardBaseProps, CheckboxSelectionProps {
  /** Enable native checkbox selection. */
  selection: 'checkbox';
}

interface RadioCardProps extends CardBaseProps, WithoutCheckboxSelectionProps {
  /** Enable native radio selection inside a RadioGroup. */
  selection: 'radio';

  /** Selection value submitted by the RadioGroup. */
  value: string;
}

interface NonSelectableCardProps extends CardBaseProps, WithoutCheckboxSelectionProps {
  /** Omit for no selection. */
  selection?: never;
}

/** Props for Card. Only checkbox selection accepts local selection and validation state. */
export type CardProps = CheckboxCardProps | RadioCardProps | NonSelectableCardProps;

function requireRadioValue(value: string | undefined) {
  if (value == null) throw new Error('Card with selection="radio" requires a value.');
  return value;
}

function resolveClassName(className: CardProps['className'], state: CardRenderProps) {
  return typeof className === 'function' ? className({ ...state, defaultClassName: undefined }) : className;
}

function resolveStyle(style: CardProps['style'], state: CardRenderProps) {
  return typeof style === 'function' ? style({ ...state, defaultStyle: {} }) : style;
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
    isSelectionDisabled,
    isReadOnly,
    isIndeterminate,
    isRequired,
    isInvalid,
    selectionProps,
    className,
    style,
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

  function resolveForwardTarget(card: HTMLDivElement) {
    if (hasPrimary) return primaryRef.current;
    for (const input of card.querySelectorAll<HTMLInputElement>('[data-card-selection-control] input')) {
      if (input.closest('[data-card]') === card) return input;
    }
    return null;
  }

  const forwardedClick = useForwardedClick(resolveForwardTarget, onClick);

  function renderSurface(state?: Partial<CardRenderProps>) {
    const selectionState = { ...IDLE_RENDER_PROPS, ...state };
    const canSelect = selection != null && !hasPrimary && !selectionState.isDisabled && !selectionState.isReadOnly;
    const isInteractive = canActivatePrimary || canSelect;
    const shouldForwardClick = (canActivatePrimary && href == null) || canSelect;

    return (
      <SelectionProvider kind={selection ?? null}>
        <Flex
          padding="lg"
          gap="lg"
          direction="column"
          {...surfaceProps}
          ref={ref}
          className={composeClassName(resolveClassName(className, selectionState), styles.card)}
          style={resolveStyle(style, selectionState)}
          data-card-selected={selectionState.isSelected || undefined}
          data-card-indeterminate={selectionState.isIndeterminate || undefined}
          onClick={shouldForwardClick ? forwardedClick : onClick}
          data-card={isInteractive ? 'interactive' : 'static'}
        >
          {href != null ? (
            <RACLink
              ref={primaryRef as Ref<HTMLAnchorElement>}
              href={href}
              onPress={onPress}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledBy}
              aria-describedby={ariaDescribedBy}
              isDisabled={isDisabled}
              className={styles.link}
            />
          ) : onPress != null ? (
            <Button
              ref={primaryRef as Ref<HTMLButtonElement>}
              onPress={onPress}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledBy}
              aria-describedby={ariaDescribedBy}
              isDisabled={isDisabled}
              className={styles.primary}
            />
          ) : null}
          <ButtonGroupContext.Provider value={null}>{children}</ButtonGroupContext.Provider>
        </Flex>
      </SelectionProvider>
    );
  }

  const hasSelectionName = selectionProps?.['aria-label'] != null || selectionProps?.['aria-labelledby'] != null;
  const fieldProps = {
    value,
    isDisabled: isSelectionDisabled,
    'aria-label': hasSelectionName ? undefined : ariaLabel,
    'aria-labelledby': hasSelectionName ? undefined : ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    ...selectionProps,
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
        isIndeterminate={isIndeterminate}
        isRequired={isRequired}
        isInvalid={isInvalid}
      >
        {renderSurface}
      </RACCheckboxField>
    );
  }

  if (selection === 'radio') {
    return (
      <RACRadioField {...fieldProps} value={requireRadioValue(value)}>
        {renderSurface}
      </RACRadioField>
    );
  }

  return renderSurface();
});
