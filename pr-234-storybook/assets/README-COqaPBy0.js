import{i as e}from"./preload-helper-DOdH0sfz.js";import{y as t}from"./iframe-6Sk5eqT4.js";import{S as n,c as r,l as i,s as a,u as o}from"./blocks-MBNUk1B1.js";import{t as s}from"./mdx-react-shim-JTjH5Fue.js";import{AutoLayout as c,n as l,t as u}from"./use-scrollable-xy-chart.stories-CXbo6Qut.js";var d,f=e((()=>{d=`import { Box, Text } from '@godaddy/antares';
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
`}));function p(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,...n(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(a,{of:l,name:`Overview`}),`
`,(0,h.jsx)(t.h1,{id:`usescrollablexychart`,children:`useScrollableXYChart`}),`
`,(0,h.jsx)(t.p,{children:`A hook for scrollable visx XY charts that measures the rendered axes and returns margins, content-sized width and height, scroll offsets, and a vertical-labels flag, so the chart sizes itself to whatever it actually contains.`}),`
`,(0,h.jsx)(t.h2,{id:`for-use-with-chart-components-not-exported`,children:`For use with chart components (not exported)`}),`
`,(0,h.jsxs)(t.p,{children:[(0,h.jsx)(t.strong,{children:`Inputs.`}),` Wire `,(0,h.jsx)(t.code,{children:`parentRef`}),` to the scroll container and `,(0,h.jsx)(t.code,{children:`xAxisRef`}),` / `,(0,h.jsx)(t.code,{children:`yAxisRef`}),` to the axis groups. Optionally pass `,(0,h.jsx)(t.code,{children:`xLabelsOrientation`}),` (`,(0,h.jsx)(t.code,{children:`'auto'`}),` | `,(0,h.jsx)(t.code,{children:`'horizontal'`}),` | `,(0,h.jsx)(t.code,{children:`'vertical'`}),`, default `,(0,h.jsx)(t.code,{children:`'auto'`}),`) to force the category-label layout; `,(0,h.jsx)(t.code,{children:`'auto'`}),` rotates labels vertical when the visible width can't fit the horizontal-tick footprint plus the Y-axis width.`]}),`
`,(0,h.jsxs)(t.p,{children:[(0,h.jsx)(t.strong,{children:`Outputs.`}),` The hook returns `,(0,h.jsx)(t.code,{children:`margin`}),`, `,(0,h.jsx)(t.code,{children:`chartWidth`}),`, `,(0,h.jsx)(t.code,{children:`chartHeight`}),`, `,(0,h.jsx)(t.code,{children:`xLabelsVertical`}),`, `,(0,h.jsx)(t.code,{children:`scrollLeft`}),` / `,(0,h.jsx)(t.code,{children:`scrollTop`}),`, and `,(0,h.jsx)(t.code,{children:`yAxisRect`}),` for the chart to consume. Width and height are sized to whichever is larger — the visible slot or the room the rendered labels need — so the chart grows past the viewport and the parent scrolls when labels demand more space.`]}),`
`,(0,h.jsxs)(t.p,{children:[(0,h.jsx)(t.strong,{children:`Behavior.`}),` Measurement runs through `,(0,h.jsx)(t.code,{children:`useParentSize`}),`, a `,(0,h.jsx)(t.code,{children:`MutationObserver`}),`, and a `,(0,h.jsx)(t.code,{children:`ResizeObserver`}),` on the wired nodes. All axis measurements are batched in one `,(0,h.jsx)(t.code,{children:`requestAnimationFrame`}),` and bail out when the result hasn't changed, so a burst of observer fires costs at most one reflow and one render per frame.`]}),`
`,(0,h.jsx)(t.pre,{children:(0,h.jsx)(t.code,{className:`language-tsx`,children:`const {
  parentRef, xAxisRef, yAxisRef,
  margin, chartWidth, chartHeight,
  xLabelsVertical, scrollLeft, scrollTop, yAxisRect,
} = useScrollableXYChart();
`})}),`
`,(0,h.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,h.jsx)(t.h3,{id:`auto-layout`,children:`Auto layout`}),`
`,(0,h.jsx)(t.p,{children:`Hook wired to a scrolling parent; scroll or resize to watch the returned values update.`}),`
`,(0,h.jsx)(r,{language:`tsx`,code:d}),`
`,(0,h.jsx)(i,{of:c,inline:!0})]})}function m(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;e((()=>{h=t(),s(),o(),u(),f()}))();export{m as default};