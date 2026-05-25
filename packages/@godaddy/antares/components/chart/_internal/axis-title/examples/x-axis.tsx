import { AxisTitle, type AxisTitleProps } from '../src/index.tsx';

export function XAxisExample(props: Partial<AxisTitleProps>) {
  return <AxisTitle title={'Month'} axis={'x'} {...props} />;
}
