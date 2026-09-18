import {
  forwardRef,
  useCallback,
  useRef,
  type CSSProperties,
  type MouseEventHandler,
  type ReactNode,
  type Ref,
  type RefObject
} from 'react';
import {
  Provider as RACProvider,
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

  /** Whether checkbox selection is read-only. */
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

export interface CardProps extends CardLayoutProps {
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

  /** Native selection behavior. Radio cards belong inside a RadioGroup. */
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

  /** Disable selection while keeping primary and child actions independent. */
  isSelectionDisabled?: boolean;

  /** Make checkbox selection read-only. For radio cards, set this on RadioGroup. */
  isReadOnly?: boolean;

  /** Show a mixed selection state on a checkbox card. */
  isIndeterminate?: boolean;

  /** Require a standalone checkbox card to be selected for form submission. */
  isRequired?: boolean;

  /** Selection validation state. */
  isInvalid?: boolean;

  /** Labels the selection control when it should not share the primary action's name. */
  selectionProps?: Pick<RACCheckboxFieldProps, 'aria-label' | 'aria-labelledby' | 'aria-describedby'>;

  /** Surface classes. Strings match Flex; functions receive native selection state. */
  className?: ClassNameProp<CardRenderProps>;

  /** Surface styles. Objects match Flex; functions receive native selection state. */
  style?:
    | CSSProperties
    | ((renderProps: CardRenderProps & { defaultStyle: CSSProperties }) => CSSProperties | undefined);
}

interface CardSurfaceProps {
  selection: 'checkbox' | 'radio' | null;
  state?: Partial<CardRenderProps>;
  className?: CardProps['className'];
  style?: CardProps['style'];
  surfaceProps: CardLayoutProps;
  children?: ReactNode;
  forwardedClick: ReturnType<typeof useForwardedClick>;
  isInteractive: boolean;
  href?: RACLinkProps['href'];
  onPress?: ButtonProps['onPress'];
  isDisabled?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  primaryRef: RefObject<HTMLElement | null>;
}

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

const CardSurface = forwardRef<HTMLDivElement, CardSurfaceProps>(function CardSurface(
  {
    selection,
    state,
    className,
    style,
    surfaceProps,
    children,
    forwardedClick,
    isInteractive,
    href,
    onPress,
    isDisabled,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    primaryRef
  },
  ref
) {
  const selectionState = { ...IDLE_RENDER_PROPS, ...state };

  return (
    <SelectionProvider kind={selection}>
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
        {...forwardedClick}
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
        <RACProvider values={[[ButtonGroupContext, {}]]}>{children}</RACProvider>
      </Flex>
    </SelectionProvider>
  );
});

/** A composed surface with optional primary action and native selection. */
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
  const forwardsPrimary = hasPrimary && !isDisabled;
  const forwardsSelection = selection != null && !hasPrimary && !isSelectionDisabled && !isReadOnly;
  const isInteractive = forwardsPrimary || forwardsSelection;
  const forwardsSurface = (forwardsPrimary && href == null) || forwardsSelection;

  const resolveForwardTarget = useCallback(
    function resolveForwardTarget(card: HTMLDivElement) {
      if (forwardsPrimary) return primaryRef.current;
      return card.querySelector<HTMLElement>('[data-card-selection-control] input');
    },
    [forwardsPrimary]
  );

  const forwardedClick = useForwardedClick(forwardsSurface, resolveForwardTarget, {
    onClick,
    onPointerDown: surfaceProps.onPointerDown,
    onPointerMove: surfaceProps.onPointerMove,
    onPointerUp: surfaceProps.onPointerUp,
    onPointerCancel: surfaceProps.onPointerCancel
  });

  const surface = (state?: Partial<CardRenderProps>) => (
    <CardSurface
      ref={ref}
      selection={selection ?? null}
      state={state}
      className={className}
      style={style}
      surfaceProps={surfaceProps}
      forwardedClick={forwardedClick}
      isInteractive={isInteractive}
      href={href}
      onPress={onPress}
      isDisabled={isDisabled}
      ariaLabel={ariaLabel}
      ariaLabelledBy={ariaLabelledBy}
      ariaDescribedBy={ariaDescribedBy}
      primaryRef={primaryRef}
    >
      {children}
    </CardSurface>
  );

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
        {surface}
      </RACCheckboxField>
    );
  }

  if (selection === 'radio') {
    return (
      <RACRadioField {...fieldProps} value={requireRadioValue(value)}>
        {surface}
      </RACRadioField>
    );
  }

  return surface();
});
