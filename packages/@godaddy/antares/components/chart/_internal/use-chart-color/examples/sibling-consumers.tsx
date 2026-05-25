import { ChartColorProvider, useChartColor } from '../src/index.tsx';

function Consumer() {
  const color = useChartColor();
  return <span data-color={color} />;
}

/**
 * Example: multiple sibling consumers under ChartColorProvider, each
 * receiving a distinct chart color variable.
 */
export function SiblingConsumersExample() {
  return (
    <ChartColorProvider>
      <Consumer />
      <Consumer />
      <Consumer />
    </ChartColorProvider>
  );
}
