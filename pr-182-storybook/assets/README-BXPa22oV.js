import{j as e}from"./iframe-D3IkG1Ed.js";import{useMDXComponents as a}from"./index-Ddicd04g.js";import{M as s,S as i,a as n}from"./blocks-FKYUA1FL.js";import{S as l,A as c}from"./use-scrollable-xy-chart.stories-DrsxeMq6.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CSLt56KL.js";import"./index-BSPbgUvt.js";import"./index-DyaOTb0A.js";import"./index-CvWDc_MF.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Text-BC_MRJIf.js";import"./mergeProps-C5YhgRrt.js";import"./SSRProvider-CjQrmtNM.js";import"./useObjectRef-BwsbJwwA.js";import"./index-ytT8Ai6N.js";import"./index-C8_BmHeg.js";import"./debounce-B31OSGfv.js";import"./context-CweBjKN6.js";const h=`import { Box, Text } from '@godaddy/antares';
import { useScrollableXYChart, UseScrollableXYChartProps } from '../src/index.tsx';

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
`;function o(r){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...a(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:l,name:"Overview"}),`
`,e.jsx(t.h1,{id:"usescrollablexychart",children:"useScrollableXYChart"}),`
`,e.jsx(t.p,{children:"A hook for scrollable visx XY charts that measures the rendered axes and returns margins, content-sized width and height, scroll offsets, and a vertical-labels flag, so the chart sizes itself to whatever it actually contains."}),`
`,e.jsx(t.h2,{id:"for-use-with-chart-components-not-exported",children:"For use with chart components (not exported)"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Inputs."})," Wire ",e.jsx(t.code,{children:"parentRef"})," to the scroll container and ",e.jsx(t.code,{children:"xAxisRef"})," / ",e.jsx(t.code,{children:"yAxisRef"})," to the axis groups. Optionally pass ",e.jsx(t.code,{children:"xLabelsOrientation"})," (",e.jsx(t.code,{children:"'auto'"})," | ",e.jsx(t.code,{children:"'horizontal'"})," | ",e.jsx(t.code,{children:"'vertical'"}),", default ",e.jsx(t.code,{children:"'auto'"}),") to force the category-label layout; ",e.jsx(t.code,{children:"'auto'"})," rotates labels vertical when the visible width can't fit the horizontal-tick footprint plus the Y-axis width."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Outputs."})," The hook returns ",e.jsx(t.code,{children:"margin"}),", ",e.jsx(t.code,{children:"chartWidth"}),", ",e.jsx(t.code,{children:"chartHeight"}),", ",e.jsx(t.code,{children:"xLabelsVertical"}),", ",e.jsx(t.code,{children:"scrollLeft"})," / ",e.jsx(t.code,{children:"scrollTop"}),", and ",e.jsx(t.code,{children:"yAxisRect"})," for the chart to consume. Width and height are sized to whichever is larger — the visible slot or the room the rendered labels need — so the chart grows past the viewport and the parent scrolls when labels demand more space."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Behavior."})," Measurement runs through ",e.jsx(t.code,{children:"useParentSize"}),", a ",e.jsx(t.code,{children:"MutationObserver"}),", and a ",e.jsx(t.code,{children:"ResizeObserver"})," on the wired nodes. All axis measurements are batched in one ",e.jsx(t.code,{children:"requestAnimationFrame"})," and bail out when the result hasn't changed, so a burst of observer fires costs at most one reflow and one render per frame."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`const {
  parentRef, xAxisRef, yAxisRef,
  margin, chartWidth, chartHeight,
  xLabelsVertical, scrollLeft, scrollTop, yAxisRect,
} = useScrollableXYChart();
`})}),`
`,e.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(t.h3,{id:"auto-layout",children:"Auto layout"}),`
`,e.jsx(t.p,{children:"Hook wired to a scrolling parent; scroll or resize to watch the returned values update."}),`
`,e.jsx(i,{language:"tsx",code:h}),`
`,e.jsx(n,{of:c,inline:!0})]})}function X(r={}){const{wrapper:t}={...a(),...r.components};return t?e.jsx(t,{...r,children:e.jsx(o,{...r})}):o(r)}export{X as default};
