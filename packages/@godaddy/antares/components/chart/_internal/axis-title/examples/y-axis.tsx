import { AxisTitle, type AxisTitleProps } from '../src/index.tsx';

/**
 * Y-axis title with default orientation.
 * @title Y-Axis Title
 * @order 2
 */
export function YAxisExample(props: Partial<AxisTitleProps>) {
  return <AxisTitle title="Temperature (°F)" axis="y" {...props} />;
}
