import{j as e}from"./iframe-DTALigXZ.js";import{useMDXComponents as a}from"./index-DRsmTLPg.js";import{M as i,S as o,a as n,A as c}from"./blocks-BZIvt908.js";import{S as m,B as p,s as l,C as d,a as h,b as u}from"./svg-parser.stories-CE8GLSWm.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CBWsPa5X.js";import"./index-D0CmnqIM.js";import"./index-mIY3p9VN.js";import"./index-BeqZXJfo.js";const g=`import { parser } from '@bento/svg-parser';

/**
 * Basic SVG parsing example
 *
 * This example demonstrates the simplest usage of the svg-parser.
 * It takes a basic SVG string and converts it to a React element.
 *
 * Usage:
 * \`\`\`tsx
 * import { BasicExample } from './examples/basic';
 *
 * function App() {
 *   return <BasicExample />;
 * }
 * \`\`\`
 */
const basicSvg = \`
<svg width="100" height="100">
  <rect x="10" y="10" width="80" height="80" fill="blue" />
</svg>
\`;

export function BasicExample() {
  const parsedSvg = parser(basicSvg);
  return parsedSvg;
}
`,x=`import { parser } from '@bento/svg-parser';

/**
 * Complex SVG Parser Example
 *
 * This example demonstrates a more complex usage of the SVG parser with
 * both custom node transformations and custom props transformations.
 * It shows how to:
 * - Transform custom elements into standard SVG elements
 * - Transform custom attributes into React props
 * - Apply both transformations simultaneously
 */
const svgWithComplexFeatures = \`
<svg width="200" height="200">
  <custom-shape x="50" y="50" size="100" stroke-width="2" class="purple-box" />
  <special-element type="circle" radius="40" stroke-width="3" class="orange-circle" />
  <rect x="10" y="10" width="50" height="50" stroke-width="1" class="blue-box" />
</svg>
\`;

export function ComplexExample() {
  const parsedSvg = parser(svgWithComplexFeatures, {
    // Custom node transformations
    nodes: {
      'custom-shape': (node) => [
        'rect',
        {
          x: node.getAttribute('x'),
          y: node.getAttribute('y'),
          width: node.getAttribute('size'),
          height: node.getAttribute('size'),
          fill: 'purple',
          rx: '8',
          strokeWidth: node.getAttribute('stroke-width'),
          className: node.getAttribute('class')
        }
      ],
      'special-element': (node) => [
        'circle',
        {
          cx: '100',
          cy: '100',
          r: node.getAttribute('radius'),
          fill: 'orange',
          strokeWidth: node.getAttribute('stroke-width'),
          className: node.getAttribute('class')
        }
      ]
    },
    // Custom props transformations
    props: {
      'stroke-width': (node) => ['strokeWidth', node.getAttribute('stroke-width')!],
      class: (node) => ['className', node.getAttribute('class')!]
    }
  });
  return parsedSvg;
}
`,f=`import { parser } from '@bento/svg-parser';

/**
 * Custom Nodes Transformation Example
 *
 * This example demonstrates how to transform custom SVG elements into React components.
 * It shows how to:
 * - Transform a custom-shape into a rectangle with specific styling
 * - Transform a special-element into a circle with dynamic properties
 */
const svgWithCustomNodes = \`
<svg width="200" height="200">
  <custom-shape x="50" y="50" size="100" />
  <special-element type="circle" radius="40" />
</svg>
\`;

export function CustomNodesExample() {
  const parsedSvg = parser(svgWithCustomNodes, {
    nodes: {
      // Transform custom-shape to a rectangle with specific styling
      'custom-shape': (node) => [
        'rect',
        {
          x: node.getAttribute('x'),
          y: node.getAttribute('y'),
          width: node.getAttribute('size'),
          height: node.getAttribute('size'),
          fill: 'purple',
          rx: '8'
        }
      ],
      // Transform special-element to a circle with dynamic properties
      'special-element': (node) => [
        'circle',
        {
          cx: '100',
          cy: '100',
          r: node.getAttribute('radius'),
          fill: 'orange'
        }
      ]
    }
  });
  return parsedSvg;
}
`,b=`import { parser } from '@bento/svg-parser';

/**
 * Custom Props Transformation Example
 *
 * This example demonstrates how to transform SVG attributes using custom prop transformations.
 * It shows how to:
 * - Convert 'class' to 'className'
 * - Convert 'stroke-width' to 'strokeWidth'
 */
const svgWithCustomProps = \`
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke-width="2" class="custom-circle" />
</svg>
\`;

export function CustomPropsExample() {
  const parsedSvg = parser(svgWithCustomProps, {
    props: {
      // Transform 'class' attribute to 'className'
      class: (node) => ['className', node.getAttribute('class')!],
      // Transform 'stroke-width' to 'strokeWidth'
      'stroke-width': (node) => ['strokeWidth', node.getAttribute('stroke-width')!]
    }
  });
  return parsedSvg;
}
`;function r(s){const t={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...a(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:m,name:"Overview"}),`
`,e.jsx(t.h1,{id:"svg-parser",children:"SVG Parser"}),`
`,e.jsx(t.p,{children:`A utility for transforming SVG strings into React components with support for
custom node and property transformations.`}),`
`,e.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`npm install @bento/svg-parser
`})}),`
`,e.jsx(t.h2,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsxs(t.p,{children:["Import the ",e.jsx(t.code,{children:"parser"}),` function and pass your SVG string as the first argument.
Standard SVG attributes are automatically converted to React-friendly props
(hyphenated attributes become camelCase).`]}),`
`,e.jsx(o,{language:"tsx",code:g}),`
`,e.jsx(n,{of:p}),`
`,e.jsx(c,{of:l}),`
`,e.jsx(t.h2,{id:"custom-property-transformations-example",children:"Custom Property Transformations Example"}),`
`,e.jsxs(t.p,{children:[`Use property transformations when you need to convert SVG attributes that don't
follow React conventions. Each transformation function receives the DOM element
and returns `,e.jsx(t.code,{children:"[newPropertyName, newPropertyValue]"}),`. Essential for attributes
like `,e.jsx(t.code,{children:"class"})," (becomes ",e.jsx(t.code,{children:"className"}),") or ",e.jsx(t.code,{children:"stroke-width"})," (becomes ",e.jsx(t.code,{children:"strokeWidth"}),")."]}),`
`,e.jsx(o,{language:"tsx",code:b}),`
`,e.jsx(n,{of:d}),`
`,e.jsx(t.h2,{id:"custom-node-transformations-example",children:"Custom Node Transformations Example"}),`
`,e.jsxs(t.p,{children:[`Transform custom SVG elements into standard elements or React components when
you have non-standard elements in your SVG. Each transformation function
receives the DOM element and returns `,e.jsx(t.code,{children:"[componentName, componentProps]"}),`,
allowing you to extract attributes and create new component properties.`]}),`
`,e.jsx(o,{language:"tsx",code:f}),`
`,e.jsx(n,{of:h}),`
`,e.jsx(t.h2,{id:"advanced-usage-combining-transformations-example",children:"Advanced Usage: Combining Transformations Example"}),`
`,e.jsx(t.p,{children:`Combine both transformations when you need to handle custom elements AND
custom attributes. The parser applies node transformations first, then
processes properties on all elements (including newly transformed ones).`}),`
`,e.jsx(o,{language:"tsx",code:x}),`
`,e.jsx(n,{of:u})]})}function T(s={}){const{wrapper:t}={...a(),...s.components};return t?e.jsx(t,{...s,children:e.jsx(r,{...s})}):r(s)}export{T as default};
