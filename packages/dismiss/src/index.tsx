import { VisuallyHidden } from '@bento/visually-hidden';
import { withSlots, type Slots } from '@bento/slots';
import React, { type ReactNode } from 'react';
import { Container } from '@bento/container';
import { useProps } from '@bento/use-props';

/**
 * Props for the Dismiss component.
 *
 * @public
 */
export interface DismissProps extends Slots {
  /**
   * Called when the dismiss button is activated.
   */
  onDismiss?: () => void;

  /**
   * Accessible label for the dismiss button. Should be localized.
   *
   * @default 'Dismiss'
   */
  ariaLabel?: string;

  /**
   * The content to render inside the container.
   */
  children?: ReactNode;

  /**
   * Optional slot to customize the VisuallyHidden wrapper.
   */
  slots?: {
    hidden?:
      | ((args: { props: Record<string, unknown>; children: React.ReactNode }) => React.ReactNode)
      | Record<string, unknown>;
  };
}

/**
 * A visually hidden, focusable dismissal control that ensures users (including screen reader users)
 * can reliably dismiss modal or popup content via linear navigation. This control complements ESC
 * and outside-click behavior, and is intended to be placed at the start and end of the focus
 * boundary of dismissible overlays.
 *
 * @component
 * @param {DismissProps} args - The properties passed to the Dismiss component.
 *
 * @example
 * ```tsx
 * <Container slot="content" className="dialog">
 *   <Dismiss onDismiss={() => onOpenChange(false)} />
 *   <Text as="h2">Title</Text>
 *   <Text>Description</Text>
 *   <Dismiss onDismiss={() => onOpenChange(false)} />
 * </Container>
 * ```
 *
 * @public
 */
export const Dismiss = withSlots('BentoDismiss', function Dismiss(args: DismissProps) {
  const { props, apply } = useProps(args);
  const { onDismiss, ariaLabel = 'Dismiss', children } = props;

  /**
   * Handles the click event for the dismiss button.
   *
   * @returns void
   */
  function handleClick() {
    onDismiss?.();
  }

  return (
    <VisuallyHidden slot="hidden">
      <Container
        {...apply(
          {
            as: 'button',
            'aria-label': ariaLabel,
            tabIndex: -1,
            type: 'button',
            // Defensive fallback: width/height set for some SRs while inside VisuallyHidden
            style: { width: 1, height: 1 }
          },
          ['children', 'onDismiss', 'ariaLabel']
        )}
        onClick={handleClick}
      >
        {children ?? ''}
      </Container>
    </VisuallyHidden>
  );
});
