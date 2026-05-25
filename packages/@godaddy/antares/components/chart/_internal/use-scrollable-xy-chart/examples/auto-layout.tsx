import { Box, Text } from '@godaddy/antares';
import { useScrollableXYChart, type UseScrollableXYChartProps } from '../src/index.tsx';

const SVG_NS = 'http://www.w3.org/2000/svg';

export type AutoLayoutExampleOrientation = 'auto' | 'horizontal' | 'vertical';

export function AutoLayoutExample({ xLabelsOrientation }: UseScrollableXYChartProps) {
  const {
    parentRef,
    chartWidth,
    chartHeight,
    margin,
    scrollLeft,
    scrollTop,
    xAxisRef,
    yAxisRef,
    xLabelsVertical,
    minHeight
  } = useScrollableXYChart({ xLabelsOrientation });

  return (
    <Box
      ref={parentRef}
      style={{ width: 520, height: 400, overflow: 'auto', border: '1px solid #ccc', boxSizing: 'border-box' }}
      data-testid="scroll-parent"
      data-chart-width={String(chartWidth)}
      data-chart-height={String(chartHeight)}
      data-scroll-left={String(scrollLeft)}
      data-scroll-top={String(scrollTop)}
      data-x-labels-vertical={xLabelsVertical ? 'true' : 'false'}
      data-margin-top={String(margin.top)}
      data-margin-left={String(margin.left)}
      data-min-height={String(minHeight)}
    >
      <Box padding="md" style={{ position: 'absolute' }}>
        <Text as="div">chartWidth: {chartWidth}</Text>
        <Text as="div">chartHeight: {chartHeight}</Text>
        <Text as="div">minHeight: {minHeight}</Text>
        <Text as="div">
          margin: {margin.top}/{margin.right}/{margin.bottom}/{margin.left}
        </Text>
        <Text as="div">scrollLeft: {scrollLeft}</Text>
        <Text as="div">scrollTop: {scrollTop}</Text>
        <Text as="div">xLabelsVertical: {String(xLabelsVertical)}</Text>
      </Box>
      <svg width={2000} height={1500} xmlns={SVG_NS}>
        <g ref={yAxisRef}>
          <g className="visx-group">
            <text>0</text>
          </g>
        </g>
        <g ref={xAxisRef}>
          <g className="visx-group">
            <text>Jan</text>
          </g>
        </g>
      </svg>
    </Box>
  );
}
