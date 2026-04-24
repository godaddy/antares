import{j as e}from"./iframe-Cf4veHW5.js";import{useMDXComponents as t}from"./index-BtVMlOOr.js";import{M as i,S as o,a as l}from"./blocks-DmuR8dZ_.js";import{S as c,A as d}from"./use-scrollable-xy-chart.stories-BkKsZYdi.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DNjwxWKM.js";import"./index-DToc6jV2.js";import"./index-CuIGtFSl.js";import"./index-DrFu-skq.js";import"./index-BX0Q1-rT.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Text-CjnVDMga.js";import"./mergeProps-B0NeEK8c.js";import"./SSRProvider-BfECjNvX.js";import"./useObjectRef-CnBo3DzL.js";import"./index-KAMCvilu.js";import"./index-uaoe-xIz.js";import"./debounce-HDxrmWFQ.js";const a=`import { Box, Text } from '@godaddy/antares';
import { useScrollableXYChart, UseScrollableXYChartProps } from '../src/index.tsx';

const SVG_NS = 'http://www.w3.org/2000/svg';

export type AutoLayoutExampleOrientation = 'auto' | 'horizontal' | 'vertical';

/**
 * Scroll parent + minimal visx-like axis stubs; \`data-*\` attributes mirror hook state for browser tests.
 */
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
`;function n(r){const s={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...t(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:c,name:"Overview"}),`
`,e.jsx(s.h1,{id:"usescrollablexychart",children:"useScrollableXYChart"}),`
`,e.jsx(s.p,{children:"Layout hook for scrollable two-dimensional charts with X and Y axes—measures axis DOM and supplies margins, content-sized width and height, scroll offsets, and when category-axis ticks should read vertically."}),`
`,e.jsx(s.h2,{id:"for-use-with-chart-components-not-exported",children:"For use with chart components (not exported)"}),`
`,e.jsx(s.h3,{id:"purpose",children:"Purpose"}),`
`,e.jsxs(s.p,{children:["Built for ",e.jsx(s.strong,{children:"2D charts"})," with an ",e.jsx(s.strong,{children:"X axis"})," and a ",e.jsx(s.strong,{children:"Y axis"})," when the data plane can ",e.jsx(s.strong,{children:"overflow"})," inside a scroll container. Hard-coded ",e.jsx(s.code,{children:"margin"}),", ",e.jsx(s.code,{children:"width"}),", and ",e.jsx(s.code,{children:"height"})," mis-size the SVG: ticks and labels need real space, and the value axis often stays visually fixed while the category axis scrolls. This hook ",e.jsx(s.strong,{children:"measures the axis DOM"})," you already render and returns ",e.jsx(s.strong,{children:"layout numbers"})," so the chart body, scales, and any frozen axis chrome stay consistent with what is on screen."]}),`
`,e.jsx(s.h3,{id:"how-it-works",children:"How it works"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"useParentSize"})})," is bound to the scroll container (",e.jsx(s.code,{children:"parentRef"}),") to read the ",e.jsx(s.strong,{children:"visible"})," width and height of the plot slot."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"xAxisRef"})})," and ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"yAxisRef"})})," point at the axis root groups. ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"MutationObserver"})})," and ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"ResizeObserver"})})," on those subtrees recompute ",e.jsx(s.strong,{children:"margins"})," (including overflow from tick labels), ",e.jsx(s.strong,{children:"minimum height"})," from stacked Y labels, and ",e.jsx(s.strong,{children:"minimum category-axis width"})," for horizontal vs vertical tick layouts."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"chartWidth"})})," and ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"chartHeight"})})," combine the visible slot with those minima so the drawable area can grow past the viewport when labels require it. ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"xLabelsVertical"})})," follows from ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"xLabelsOrientation"})})," (see ",e.jsx(s.strong,{children:"Props"}),") and whether horizontal ticks would fit at the current width."]}),`
`,e.jsxs(s.li,{children:["Scroll and pointer handling on the scroll container are described below (",e.jsx(s.strong,{children:"Listeners and observers"}),"); they keep ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"scrollLeft"})})," / ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"scrollTop"})})," accurate and resync pointer-driven overlays after scroll."]}),`
`]}),`
`,e.jsx(s.h3,{id:"listeners-and-observers",children:"Listeners and observers"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Scroll container"})," (the element that receives ",e.jsx(s.code,{children:"parentRef"}),"):"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"ResizeObserver"})})," (via ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"useParentSize"})}),", debounced) — tracks the container’s ",e.jsx(s.strong,{children:"client width and height"})," when the plot slot is resized."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"scroll"})})," (passive listener) — updates ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"scrollLeft"})})," / ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"scrollTop"})})," and may dispatch a ",e.jsxs(s.strong,{children:["synthetic ",e.jsx(s.code,{children:"pointermove"})]})," on the last pointer target so hit-testing stays aligned with the new scroll position."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"pointermove"})})," (passive listener) — records ",e.jsxs(s.strong,{children:[e.jsx(s.code,{children:"clientX"})," / ",e.jsx(s.code,{children:"clientY"})]})," and ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"event.target"})})," for that resync path."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"pointerleave"})})," (passive listener) — clears the stored target when the pointer leaves the container so a stale element is not targeted after scroll."]}),`
`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Y-axis root"})," (",e.jsx(s.code,{children:"yAxisRef"}),"):"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"MutationObserver"})})," (",e.jsx(s.code,{children:"childList"}),", ",e.jsx(s.code,{children:"subtree"}),") — recomputes Y-driven ",e.jsx(s.strong,{children:"margin"})," and ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"minHeight"})})," when tick/label DOM changes."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"ResizeObserver"})})," — picks up layout/size changes on the axis group (e.g. font or tick density) and refreshes ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"yAxisRect"})}),", ",e.jsx(s.strong,{children:"margins"}),", and related layout."]}),`
`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"X-axis root"})," (",e.jsx(s.code,{children:"xAxisRef"}),"):"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"MutationObserver"})})," (",e.jsx(s.code,{children:"childList"}),", ",e.jsx(s.code,{children:"subtree"}),") — recomputes category-axis ",e.jsx(s.strong,{children:"min widths"})," (horizontal vs vertical tick modes) and related ",e.jsx(s.strong,{children:"margin"})," when tick/label DOM changes."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"ResizeObserver"})})," — updates ",e.jsx(s.strong,{children:"bottom/right/left"})," margins from measured overflow on the X-axis subtree."]}),`
`]}),`
`,e.jsx(s.h3,{id:"how-to-implement",children:"How to implement"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:["Call ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"useScrollableXYChart()"})})," at the top of your chart component, or ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"useScrollableXYChart({ xLabelsOrientation })"})})," when you need to override category-axis layout (see ",e.jsx(s.strong,{children:"Props"}),")."]}),`
`,e.jsxs(s.li,{children:["Put ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"parentRef"})})," on the DOM node that scrolls (the one with ",e.jsx(s.code,{children:"overflow: auto"})," / ",e.jsx(s.code,{children:"scroll"})," and the chart body inside it)."]}),`
`,e.jsxs(s.li,{children:["Pass ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"xAxisRef"})})," and ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"yAxisRef"})})," to your X and Y axis components via whatever ref prop they expose (commonly ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"innerRef"})})," on axis primitives)."]}),`
`,e.jsxs(s.li,{children:["After mount, when ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"chartWidth"})})," and ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"chartHeight"})})," are positive, render the SVG (or chart wrapper) using those dimensions and ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"margin"})}),"."]}),`
`,e.jsxs(s.li,{children:["Use ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"xLabelsVertical"})})," to style category-axis labels (rotation, anchors, data attributes)."]}),`
`,e.jsxs(s.li,{children:["Use ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"scrollLeft"})})," / ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"scrollTop"})})," (and optionally ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"yAxisRect"})}),") to position frozen axis backgrounds and translated axis groups so they move with scroll while the plot content moves underneath."]}),`
`]}),`
`,e.jsx(s.h3,{id:"props",children:"Props"}),`
`,e.jsxs(s.p,{children:["The hook accepts an optional ",e.jsx(s.strong,{children:"props"})," object as its first argument (",e.jsx(s.code,{children:"UseScrollableXYChartProps"})," in source). It is separate from the ",e.jsx(s.strong,{children:"return value"})," below."]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"xLabelsOrientation"})})," — Category-axis label layout vs. container width. Values are the chart-level type ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"XLabelsOrientation"})}),": ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"'auto'"})})," (default), ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"'horizontal'"})}),", or ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"'vertical'"})}),". With ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"'auto'"})}),", the hook chooses vertical labels when the visible width is too small for the measured horizontal-tick footprint (including Y-axis width). ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"'horizontal'"})})," and ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"'vertical'"})})," skip that width check and force the corresponding layout, which also feeds ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"chartWidth"})})," minima via the horizontal vs vertical min-width paths."]}),`
`]}),`
`,e.jsx(s.h3,{id:"return-value--what-each-field-is-for",children:"Return value — what each field is for"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"parentRef"})})," — Attach to the ",e.jsx(s.strong,{children:"scroll container"}),". Intention: anchor ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"useParentSize"})}),", the ",e.jsx(s.strong,{children:"scroll"})," / ",e.jsx(s.strong,{children:"pointer"})," listeners, and ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"ResizeObserver"})})," from that hook on the same node users scroll (see ",e.jsx(s.strong,{children:"Listeners and observers"}),")."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsxs(s.strong,{children:[e.jsx(s.code,{children:"xAxisRef"})," / ",e.jsx(s.code,{children:"yAxisRef"})]})," — Attach to the ",e.jsx(s.strong,{children:"axis root groups"})," (via ",e.jsx(s.code,{children:"innerRef"})," or equivalent). Intention: give observers a stable subtree that matches rendered ticks and labels so margins and min sizes stay accurate."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"margin"})})," — ",e.jsx(s.code,{children:"{ top, right, bottom, left }"})," in pixels, updated from measured axis geometry. Intention: pass straight into your chart’s margin model so the plot area clears tick overflow and axis thickness without hand tuning."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"chartWidth"})})," — Width in pixels, at least the visible container width and at least the width implied by category-axis labels (for the current vertical vs horizontal tick mode) plus Y-axis width. Intention: size the chart body so horizontal overflow scrolls instead of clipping ticks."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"minHeight"})})," — Minimum height implied by ",e.jsx(s.strong,{children:"Y-axis label stacking"})," (computed from label boxes and gaps). Intention: expose the ",e.jsx(s.strong,{children:"content-driven floor"})," separately when your layout or tests need it; ",e.jsx(s.strong,{children:e.jsx(s.code,{children:"chartHeight"})})," already applies this floor."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"chartHeight"})})," — Height in pixels, ",e.jsx(s.code,{children:"max(visible height, minHeight)"}),". Intention: size the chart body so stacked Y labels always fit."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"xLabelsVertical"})})," — Boolean: category-axis ticks should read ",e.jsx(s.strong,{children:"vertically"}),". Intention: drive ",e.jsx(s.code,{children:"tickLabelProps"}),", CSS, or ",e.jsx(s.code,{children:"data-*"})," flags so narrow slots rotate labels without a separate breakpoint in the chart."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsxs(s.strong,{children:[e.jsx(s.code,{children:"scrollLeft"})," / ",e.jsx(s.code,{children:"scrollTop"})]})," — Current scroll offsets of the container. Intention: offset ",e.jsx(s.strong,{children:"sticky"})," axis layers (background rects, ",e.jsx(s.code,{children:"transform"}),"s) and any UI that must stay phase-locked with the scrolled data plane; also drives the hook’s post-scroll pointer resync."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"yAxisRect"})})," — ",e.jsx(s.code,{children:"getBBox()"})," of the Y-axis group when available, else ",e.jsx(s.code,{children:"null"}),". Intention: size or place ",e.jsx(s.strong,{children:"frozen Y-axis chrome"})," (e.g. a background band) aligned to the measured axis, independent of arbitrary margin guesses."]}),`
`]}),`
`]}),`
`,e.jsx(s.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(s.h3,{id:"auto-layout",children:"Auto layout"}),`
`,e.jsxs(s.p,{children:["Minimal scroll parent plus stub axis groups: same ref wiring and ",e.jsx(s.code,{children:"data-*"})," surface the browser tests assert on."]}),`
`,e.jsx(o,{language:"tsx",code:a}),`
`,e.jsx(l,{of:d,inline:!0})]})}function O(r={}){const{wrapper:s}={...t(),...r.components};return s?e.jsx(s,{...r,children:e.jsx(n,{...r})}):n(r)}export{O as default};
