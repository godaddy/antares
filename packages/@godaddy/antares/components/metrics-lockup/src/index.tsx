import { forwardRef, useState, type ReactNode } from 'react';
import { Flex, type FlexProps } from '#components/layout/flex';
import { Button } from '#components/button';
import { Text } from '#components/text';
import { Icon } from '#components/icon';
import { Tooltip, TooltipTrigger } from '#components/tooltip';
import styles from './index.module.css';

export interface MetricsLockupProps extends Omit<FlexProps, 'direction' | 'gap'> {
  /** Title text displayed above the metric value. */
  title?: string;

  /** Tooltip content shown when the info icon is focused or hovered alongside the title. Has no effect if `title` is not also provided. */
  titleInfo?: ReactNode;

  /** The metric value to display. Accepts a plain number, a percentage (e.g. "42%"), or a currency amount (e.g. "$1,234.56"). */
  data?: string | number;

  /** Descriptive text displayed below the metric value. */
  description?: string;

  /** When true, renders the metric value and description inline rather than stacked. @default false */
  compact?: boolean;

  /** Indicates the direction of change for the metric. Renders a directional icon to the left of the description. Intended to be used alongside `description` to provide context (e.g. "up 3% vs. last month"). Has no effect if `description` is not provided. */
  trend?: 'positive' | 'negative' | 'neutral';
}

const TREND_ICON: Record<NonNullable<MetricsLockupProps['trend']>, string> = {
  positive: 'arrow-up',
  negative: 'arrow-down',
  neutral: 'minus'
};

/**
 * Displays a single metric with an optional title, info tooltip, trend indicator, and description.
 *
 * @param props - {@link MetricsLockupProps}
 */
export const MetricsLockup = forwardRef<HTMLDivElement, MetricsLockupProps>(function MetricsLockup(props, ref) {
  const { title, titleInfo, data, description, compact = false, trend, className, ...rest } = props;
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <Flex ref={ref} direction="column" gap="sm" className={className} {...rest}>
      {title && (
        <Flex alignItems="center" gap="sm">
          <Text as="span" className={styles.title}>
            {title}
          </Text>
          {titleInfo && (
            <TooltipTrigger isOpen={pinned || hovered} onOpenChange={setHovered}>
              <Button
                variant="minimal"
                size="sm"
                aria-label="More information"
                aria-pressed={pinned}
                className={styles.infoTrigger}
                onPress={() => setPinned((p) => !p)}
              >
                <Icon icon="information" aria-hidden="true" />
              </Button>
              <Tooltip>{titleInfo}</Tooltip>
            </TooltipTrigger>
          )}
        </Flex>
      )}
      {(data != null || description) && (
        <Flex direction={compact ? 'row' : 'column'} gap="sm" alignItems={compact ? 'center' : 'flex-start'}>
          {data != null && (
            <Text as="span" className={styles.data}>
              {data}
            </Text>
          )}
          {description && (
            <Flex alignItems="center" gap="sm">
              {trend && (
                <Icon icon={TREND_ICON[trend]} className={styles.trendIcon} data-trend={trend} aria-hidden="true" />
              )}
              <Text as="span" className={styles.description}>
                {description}
              </Text>
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  );
});
