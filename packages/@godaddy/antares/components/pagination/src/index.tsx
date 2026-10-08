import {
  createContext,
  forwardRef,
  type CSSProperties,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import { DEFAULT_SLOT, Provider as RACProvider } from 'react-aria-components';
import { ButtonContext, type ButtonProps } from '#components/button';
import { Box } from '#components/layout/box';
import { Flex, type FlexProps } from '#components/layout/flex';
import { Icon } from '#components/icon';
import { InputContext } from '#components/input';
import { SizeProvider } from '#components/size-provider';
import { useTypographyClassName } from '#components/_internal/typography';
import { composeClassName, composeStyle } from '#utils/render-props.ts';
import styles from './index.module.css';

type PaginationSize = 'sm' | 'md';

interface PaginationContextValue {
  /** The current 1-based page; 0 represents an empty known page set. */
  value: number;

  /** The known page count, when available. */
  pageCount?: number;

  /** The visual size inherited by Pagination parts. */
  size: PaginationSize;
}

const PaginationContext = createContext<PaginationContextValue | null>(null);

export interface PaginationProps extends Omit<FlexProps<'nav'>, 'as' | 'children' | 'onChange'> {
  /**
   * The total number of pages. Omit it when the data source does not expose a known page count.
   */
  pageCount?: number;

  /** The current page, using a 1-based value. */
  value?: number;

  /** The initial page for uncontrolled usage, using a 1-based value. @default 1 */
  defaultValue?: number;

  /** Called with the next 1-based page when navigation changes the current page. */
  onChange?: (value: number) => void;

  /**
   * Provides a default disabled state for controls and page input provided through Pagination contexts.
   * Explicit child props may override this value.
   */
  isDisabled?: boolean;

  /** The visual size of the composed controls. @default 'md' */
  size?: PaginationSize;

  /** The composed Pagination interior. Pass exactly the controls and content to render. */
  children: ReactNode;
}

/** Props for the passive visual dots region. */
export interface PaginationDotsProps extends Omit<FlexProps<'div'>, 'as' | 'children'> {}

/**
 * Normalizes an optional page count to a non-negative integer.
 * `undefined` represents an unknown page count.
 */
function normalizePageCount(pageCount?: number) {
  if (pageCount == null || !Number.isFinite(pageCount)) return undefined;

  return Math.max(0, Math.floor(pageCount));
}

/**
 * Clamps a 1-based page value to the available page range when known.
 */
function clampValue(value: number, pageCount?: number) {
  if (pageCount === 0) return 0;

  const normalized = Number.isFinite(value) ? Math.max(1, Math.floor(value)) : 1;

  return pageCount == null ? normalized : Math.min(normalized, pageCount);
}

/**
 * Coordinates controlled and uncontrolled page navigation for a composed Pagination.
 * The root owns state and context defaults while the consumer owns the rendered anatomy.
 *
 * @param props - {@link PaginationProps}
 * @returns A navigation region containing exactly the supplied children.
 */
export function Pagination(props: PaginationProps) {
  const {
    children,
    className,
    defaultValue = 1,
    isDisabled = false,
    onChange,
    pageCount,
    size = 'md',
    style,
    value: controlledValue,
    ...rest
  } = props;
  const resolvedPageCount = normalizePageCount(pageCount);
  const [uncontrolledValue, setUncontrolledValue] = useState(function getInitialValue() {
    return clampValue(defaultValue, resolvedPageCount);
  });
  const rawValue = controlledValue ?? uncontrolledValue;
  const value = clampValue(rawValue, resolvedPageCount);
  const canGoPrevious = resolvedPageCount !== 0 && value > 1;
  const canGoNext = resolvedPageCount == null ? true : resolvedPageCount > 0 && value < resolvedPageCount;
  const inputTypography = useTypographyClassName('label', { size: 'md' });
  const inputDigits = String(resolvedPageCount ?? value).length;

  useEffect(
    function syncUncontrolledValue() {
      if (controlledValue === undefined && uncontrolledValue !== value) {
        setUncontrolledValue(value);
      }
    },
    [controlledValue, uncontrolledValue, value]
  );

  const goTo = useCallback(
    function goTo(nextValue: number) {
      const next = clampValue(nextValue, resolvedPageCount);

      if (controlledValue === undefined) setUncontrolledValue(next);
      onChange?.(next);
    },
    [controlledValue, onChange, resolvedPageCount]
  );

  const isEmpty = resolvedPageCount === 0;

  return (
    <RACProvider
      values={[
        [
          ButtonContext,
          {
            slots: {
              [DEFAULT_SLOT]: {},
              previous: {
                variant: 'tertiary',
                size,
                className: styles.previous,
                isDisabled: isDisabled || !canGoPrevious,
                onPress: function handlePreviousPress() {
                  goTo(value - 1);
                },
                children: <Icon icon="chevron-left" />
              } as ButtonProps,
              next: {
                variant: 'tertiary',
                size,
                className: styles.next,
                isDisabled: isDisabled || !canGoNext,
                onPress: function handleNextPress() {
                  goTo(value + 1);
                },
                children: <Icon icon="chevron-right" />
              } as ButtonProps
            }
          }
        ],
        [
          InputContext,
          {
            type: 'number',
            value: isEmpty ? '' : String(value),
            min: isEmpty ? undefined : 1,
            max: isEmpty ? undefined : resolvedPageCount,
            disabled: isDisabled || isEmpty,
            className: composeClassName(styles.input, inputTypography),
            onChange: function handleInputChange(event) {
              const next = Number(event.target.value);

              if (!isEmpty && Number.isInteger(next) && next > 0) goTo(next);
            }
          }
        ],
        [PaginationContext, { pageCount: resolvedPageCount, size, value }]
      ]}
    >
      <SizeProvider size={size}>
        <Flex
          {...rest}
          as="nav"
          alignItems="center"
          className={composeClassName(className, styles.pagination)}
          data-size={size}
          style={composeStyle(style, {
            '--_pagination-input-digits': `${inputDigits}ch`
          } as CSSProperties)}
        >
          {children}
        </Flex>
      </SizeProvider>
    </RACProvider>
  );
}

/**
 * Renders a passive visual indicator for the current page.
 *
 * `PaginationDots` does not create page buttons. Compose explicit `Button` or `LinkButton` children
 * when page indicators must be interactive.
 *
 * @param props - {@link PaginationDotsProps}
 * @returns The dots region, or `null` when `pageCount` is unavailable.
 */
export const PaginationDots = forwardRef<HTMLDivElement, PaginationDotsProps>(function PaginationDots(
  { className, ...rest },
  ref
) {
  const context = useContext(PaginationContext);

  if (context?.pageCount == null || context.pageCount < 1) return null;

  return (
    <Flex
      {...rest}
      ref={ref}
      aria-hidden="true"
      className={composeClassName(className, styles.dots)}
      data-size={context.size}
    >
      {Array.from({ length: context.pageCount }, function getDot(_, index) {
        const page = index + 1;

        return <Box key={page} data-active={page === context.value ? 'true' : 'false'} data-pagination-dot />;
      })}
    </Flex>
  );
});
