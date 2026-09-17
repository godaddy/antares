import { forwardRef, useRef, type MouseEvent as ReactMouseEvent, type MouseEventHandler, type ReactNode } from 'react';
import {
  Provider as RACProvider,
  Link as RACLink,
  type LinkProps as RACLinkProps,
  CheckboxField as RACCheckboxField,
  RadioField as RACRadioField,
  type CheckboxFieldProps as RACCheckboxFieldProps,
  type CheckboxFieldRenderProps,
  type RadioFieldRenderProps
} from 'react-aria-components';
import { Button, type ButtonProps } from '#components/button';
import { Flex, type FlexProps } from '#components/layout/flex';
import { ContentContext, HeaderContext, FooterContext, CornerActionsContext } from '#components/structure';
import { composeClassName } from '#utils/render-props.ts';
import { SelectionProvider } from './card-selection-indicator.tsx';
import styles from './index.module.css';

export {
  CardSelectionIndicator,
  type CardSelectionIndicatorProps
} from './card-selection-indicator.tsx';

export interface CardProps extends Omit<FlexProps, 'as' | 'children' | 'onClick' | 'className' | 'style'> {
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

  /** Observe clicks on the Card surface. Call `preventDefault` to skip the primary action or selection. */
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

  /** Surface classes, optionally derived from native selection state. */
  className?: RACCheckboxFieldProps['className'];

  /** Surface styles, optionally derived from native selection state. */
  style?: RACCheckboxFieldProps['style'];
}

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
  const inputRef = useRef<HTMLInputElement>(null);

  const hasPrimary = href != null || onPress != null;
  const linkRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function handleClick(event: ReactMouseEvent<HTMLDivElement>) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      (event.target instanceof Node && !event.currentTarget.contains(event.target)) ||
      isInteractiveTarget(event.target, event.currentTarget)
    )
      return;
    if (!window.getSelection()?.isCollapsed) return;
    if (!hasPrimary) {
      inputRef.current?.click();
      return;
    }
    if (isDisabled) return;
    (href != null ? linkRef.current : buttonRef.current)?.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey
      })
    );
  }

  function renderSurface(state?: CheckboxFieldRenderProps | RadioFieldRenderProps) {
    const selectionState: CheckboxFieldRenderProps = {
      isSelected: false,
      isDisabled: false,
      isReadOnly: false,
      isIndeterminate: false,
      isRequired: false,
      isInvalid: false,
      ...state
    };
    return (
      <SelectionProvider kind={selection ?? null}>
        <Flex
          padding="lg"
          gap="lg"
          direction="column"
          {...surfaceProps}
          ref={ref}
          className={composeClassName(
            typeof className === 'function' ? className({ ...selectionState, defaultClassName: undefined }) : className,
            styles.card
          )}
          style={typeof style === 'function' ? style({ ...selectionState, defaultStyle: {} }) : style}
          data-card-selected={selectionState.isSelected || undefined}
          data-card-indeterminate={selectionState.isIndeterminate || undefined}
          onClick={handleClick}
          data-card={hasPrimary && !isDisabled ? 'interactive' : 'static'}
        >
          {href != null ? (
            <RACLink
              href={href}
              onPress={onPress}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledBy}
              isDisabled={isDisabled}
              ref={linkRef}
              className={styles.link}
            />
          ) : onPress != null ? (
            <Button
              onPress={onPress}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledBy}
              isDisabled={isDisabled}
              ref={buttonRef}
              className={styles.primary}
            />
          ) : null}
          <RACProvider
            values={[
              [
                ContentContext,
                {
                  as: 'div',
                  padding: '0',
                  inlinePadding: undefined,
                  blockPadding: undefined,
                  gap: 'lg',
                  style: { overflow: 'visible' }
                }
              ],
              [HeaderContext, { padding: '0' }],
              [FooterContext, { padding: '0', inlinePadding: undefined, blockPadding: undefined }],
              [CornerActionsContext, { alignSelf: 'start' }]
            ]}
          >
            {children}
          </RACProvider>
        </Flex>
      </SelectionProvider>
    );
  }

  const fieldProps = {
    inputRef,
    value,
    isDisabled: isSelectionDisabled,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
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
    if (value == null) throw new Error('Card with selection="radio" requires a value.');
    return (
      <RACRadioField {...fieldProps} value={value}>
        {renderSurface}
      </RACRadioField>
    );
  }
  return renderSurface();
});

function isInteractiveTarget(target: EventTarget | null, currentCard: Element) {
  if (!(target instanceof Element)) return false;

  const owner = target.closest('[data-card]');
  if (owner != null && owner !== currentCard) return true;

  return Boolean(
    target.closest(
      'a,button,input,textarea,select,label,summary,audio,video,[tabindex],[role="button"],[role="link"],[contenteditable],[data-card-selection-indicator],[data-card-selection-control],[data-corner-actions]'
    )
  );
}
