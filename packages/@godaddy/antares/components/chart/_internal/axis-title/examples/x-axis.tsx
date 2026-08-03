import { AxisTitle, type AxisTitleProps } from '../src/index.tsx';

/**
 * X-axis title with default orientation.
 * @title X-Axis Title
 * @order 1
 */
export function XAxisExample(props: Partial<AxisTitleProps>) {
  return <AxisTitle title={'Month'} axis={'x'} {...props} />;
}
