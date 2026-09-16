import { forwardRef, useContext, type MouseEvent, type MouseEventHandler, type ReactNode } from 'react';
import { DEFAULT_SLOT, Provider as RACProvider, TextContext } from 'react-aria-components';
import { Button, type ButtonProps } from '#components/button';
import { Flex, type FlexProps } from '#components/layout/flex';
import type { LinkProps } from '#components/link';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';
import { CardContext } from './card-context.ts';

export { CardContext } from './card-context.ts';
export { CardContent, type CardContentProps } from './card-content.tsx';
export { splitCardLayoutProps } from './card-layout.ts';

export {
  CardSelectionIndicator,
  CardSelectionControlContext,
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
  const inheritedText = useContext(TextContext);
  const inheritedSlots =
    inheritedText && typeof inheritedText === 'object' && 'slots' in inheritedText ? inheritedText.slots : undefined;

  function handleClick(event: MouseEvent<HTMLDivElement>) {
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
    const control = event.currentTarget.querySelector<HTMLElement>('[data-card-primary]');
    control?.click();
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
      {href == null && onPress != null ? (
        <Button
          onPress={onPress}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          isDisabled={isDisabled}
          data-card-primary
          className={styles.primary}
        />
      ) : null}
      <CardContext.Provider value={{ href, onPress, ariaLabel, ariaLabelledBy, isDisabled }}>
        <RACProvider values={[[TextContext, { slots: { ...inheritedSlots, [DEFAULT_SLOT]: {} } }]]}>
          {children}
        </RACProvider>
      </CardContext.Provider>
    </Flex>
  );
});
