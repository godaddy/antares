import { forwardRef, useRef, type MouseEvent as ReactMouseEvent, type MouseEventHandler, type ReactNode } from 'react';
import { Provider as RACProvider } from 'react-aria-components';
import { Button, type ButtonProps } from '#components/button';
import { Flex, type FlexProps } from '#components/layout/flex';
import { Link, type LinkProps } from '#components/link';
import { ContentContext, HeaderContext, FooterContext, CornerActionsContext } from '#components/structure';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

export {
  CardSelectionIndicator,
  SelectionProvider,
  type CardSelectionIndicatorProps
} from './card-selection-indicator.tsx';

export interface CardProps extends Omit<FlexProps, 'as' | 'children' | 'onClick'> {
  /** Card contents. */
  children?: ReactNode;

  /** Primary navigation destination. */
  href?: LinkProps['href'];

  /** Primary action callback. */
  onPress?: ButtonProps['onPress'];

  /** Accessible name for the primary action. */
  'aria-label'?: string;

  /** Accessible labelled-by reference for the primary action. */
  'aria-labelledby'?: string;

  /** Whether the primary action is disabled. */
  isDisabled?: boolean;

  /** Observe clicks on the Card surface. */
  onClick?: MouseEventHandler<HTMLDivElement>;
}

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

/** A padded surface for composing media, content, and actions. */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(props, ref) {
  const {
    children,
    href,
    onPress,
    isDisabled,
    className,
    onClick,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...rest
  } = props;
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
    if (typeof window !== 'undefined' && !window.getSelection()?.isCollapsed) return;
    if (!hasPrimary) {
      const input = Array.from(
        event.currentTarget.querySelectorAll<HTMLInputElement>('[data-card-selection-control] input')
      ).find((candidate) => candidate.closest('[data-card]') === event.currentTarget);
      input?.click();
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

  return (
    <Flex
      padding="lg"
      gap="lg"
      direction="column"
      {...rest}
      ref={ref}
      className={composeClassName(className, styles.card)}
      onClick={handleClick}
      data-card={hasPrimary ? 'interactive' : 'static'}
    >
      {href != null ? (
        <Link
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
  );
});
