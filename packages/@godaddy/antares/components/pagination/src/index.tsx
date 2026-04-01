import { type RefObject, useCallback, useState } from 'react';
import { Button, type ButtonProps } from '#components/button';
import { Flex, type FlexProps } from '#components/layout/flex';
import { Box } from '#components/layout/box';
import { Icon } from '#components/icon';
import { cx } from 'cva';
import styles from './index.module.css';

export interface PaginationProps extends Omit<FlexProps, 'onChange'> {
  /** Total number of items. */
  total: number;

  /** The active page index (0-based). When provided, the component is controlled. */
  activeIndex?: number;

  /** The initial active page index for uncontrolled mode. @default 0 */
  defaultActiveIndex?: number;

  /** Number of items shown per page. Dots are derived from Math.ceil(total / limit). @default 1 */
  limit?: number;

  /** The variant of the pagination. @default 'dots' */
  variant?: 'dots' | null;

  /** Whether to hide the navigation controls. */
  hideControls?: boolean;

  /** Called when the active page changes. */
  onChange?: (index: number) => void;

  /** Props forwarded to the previous button. */
  prevButtonProps?: ButtonProps;

  /** Props forwarded to the next button. */
  nextButtonProps?: ButtonProps;

  /** Props forwarded to the pagination dots. */
  dotsProps?: FlexProps;

  /** Ref for the previous button. */
  prevButtonRef?: RefObject<HTMLButtonElement | null>;

  /** Ref for the next button. */
  nextButtonRef?: RefObject<HTMLButtonElement | null>;
}

/**
 * Pagination bar with prev/next buttons and pagination dot indicators.
 * Supports controlled (activeIndex) and uncontrolled (defaultActiveIndex) modes.
 * Dots are derived from total and limit: Math.ceil(total / limit).
 * When there is only one page (or fewer), dots are not rendered.
 *
 * @param props - {@link PaginationProps}
 */
export function Pagination(props: PaginationProps) {
  const {
    activeIndex: controlledIndex,
    total,
    limit = 1,
    defaultActiveIndex = 0,
    variant = 'dots',
    onChange,
    prevButtonProps,
    nextButtonProps,
    hideControls,
    dotsProps,
    prevButtonRef,
    nextButtonRef,
    ...rest
  } = props;

  const [uncontrolledIndex, setUncontrolledIndex] = useState(defaultActiveIndex);
  const currentIndex = controlledIndex ?? uncontrolledIndex;
  const pageCount = Math.ceil(total / limit);

  const navigate = useCallback(
    function navigate(index: number) {
      if (controlledIndex === undefined) setUncontrolledIndex(index);
      onChange?.(index);
    },
    [controlledIndex, onChange, setUncontrolledIndex]
  );

  const handlePrev = useCallback(
    function handlePrev() {
      navigate(Math.max(0, currentIndex - 1));
    },
    [currentIndex]
  );

  const handleNext = useCallback(
    function handleNext() {
      navigate(Math.min(pageCount - 1, currentIndex + 1));
    },
    [currentIndex, pageCount]
  );

  return (
    <Flex alignItems="center" justifyContent="space-between" {...rest}>
      {hideControls ? null : (
        <Button
          ref={prevButtonRef}
          variant="secondary"
          size="md"
          aria-label="Go to previous page"
          isDisabled={currentIndex === 0}
          onPress={handlePrev}
          {...prevButtonProps}
        >
          <Icon icon="chevron-left" />
        </Button>
      )}

      {pageCount === 0 || variant !== 'dots' ? null : (
        <Flex gap="sm" role="group" justifyContent="center" flex={1} aria-label="Dots" {...dotsProps}>
          {Array.from({ length: pageCount }, function getDot(_, index) {
            return <Box key={index} className={cx(styles.dot, index === currentIndex && styles.selected)} />;
          })}
        </Flex>
      )}

      {hideControls ? null : (
        <Button
          ref={nextButtonRef}
          variant="secondary"
          size="md"
          aria-label="Go to next page"
          isDisabled={currentIndex === pageCount - 1}
          onPress={handleNext}
          {...nextButtonProps}
        >
          <Icon icon="chevron-right" />
        </Button>
      )}
    </Flex>
  );
}
