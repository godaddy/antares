import { cx } from 'cva';
import { useLocale } from 'react-aria-components';
import { Flex } from '#components/layout/flex';
import styles from './index.module.css';

export interface AxisTitleProps {
  /** Axis title text */
  title: string;

  /** Which axis the title belongs to: 'x' or 'y'. */
  axis: 'x' | 'y';

  /** Additional class name */
  className?: string;
}

/**
 * AxisTitle component for displaying axis titles
 *
 * Renders axis title for X or Y axis; orientation is determined by the axis prop.
 *
 * @param props - {@link AxisTitleProps}
 * @returns JSX element rendering the axis title
 *
 * @example
 * ```tsx
 * <AxisTitle title="Month" axis="x" />
 * <AxisTitle title="Temperature (°F)" axis="y" />
 * ```
 */
export function AxisTitle(props: AxisTitleProps) {
  const { title, axis, className } = props;
  const { direction } = useLocale();
  const axisClassName = axis === 'x' ? styles.xAxis : styles.yAxis;

  return (
    <Flex
      role="group"
      aria-label={`${axis} axis title`}
      justifyContent="center"
      alignItems="center"
      className={cx(styles.axis, axisClassName, className)}
      dir={direction}
    >
      {title}
    </Flex>
  );
}
