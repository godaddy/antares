import{i as e}from"./preload-helper-CLVkNUVT.js";import{y as t}from"./iframe-Cpk5VEWB.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-Na2NBb_S.js";import{t as c}from"./mdx-react-shim-DZ1hH1z_.js";import{Basic as l,Complex as u,CustomNodes as d,CustomProps as f,n as p,svgParserAPI as m,t as h}from"./svg-parser.stories-DyTS8_YZ.js";var g,_=e((()=>{g=`import { parser } from '@bento/svg-parser';

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
`})),v,y=e((()=>{v=`import { parser } from '@bento/svg-parser';

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
`})),b,x=e((()=>{b=`import { parser } from '@bento/svg-parser';

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
`})),S,C=e((()=>{S=`import { parser } from '@bento/svg-parser';

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
`}));function w(e){let t={code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,...n(),...e.components};return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(o,{of:p,name:`Overview`}),`
`,(0,E.jsx)(t.h1,{id:`svg-parser`,children:`SVG Parser`}),`
`,(0,E.jsx)(t.p,{children:`A utility for transforming SVG strings into React components with support for
custom node and property transformations.`}),`
`,(0,E.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-bash`,children:`npm install @bento/svg-parser
`})}),`
`,(0,E.jsx)(t.h2,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,E.jsxs)(t.p,{children:[`Import the `,(0,E.jsx)(t.code,{children:`parser`}),` function and pass your SVG string as the first argument.
Standard SVG attributes are automatically converted to React-friendly props
(hyphenated attributes become camelCase).`]}),`
`,(0,E.jsx)(r,{language:`tsx`,code:g}),`
`,(0,E.jsx)(i,{of:l}),`
`,(0,E.jsx)(a,{of:m}),`
`,(0,E.jsx)(t.h2,{id:`custom-property-transformations-example`,children:`Custom Property Transformations Example`}),`
`,(0,E.jsxs)(t.p,{children:[`Use property transformations when you need to convert SVG attributes that don't
follow React conventions. Each transformation function receives the DOM element
and returns `,(0,E.jsx)(t.code,{children:`[newPropertyName, newPropertyValue]`}),`. Essential for attributes
like `,(0,E.jsx)(t.code,{children:`class`}),` (becomes `,(0,E.jsx)(t.code,{children:`className`}),`) or `,(0,E.jsx)(t.code,{children:`stroke-width`}),` (becomes `,(0,E.jsx)(t.code,{children:`strokeWidth`}),`).`]}),`
`,(0,E.jsx)(r,{language:`tsx`,code:S}),`
`,(0,E.jsx)(i,{of:f}),`
`,(0,E.jsx)(t.h2,{id:`custom-node-transformations-example`,children:`Custom Node Transformations Example`}),`
`,(0,E.jsxs)(t.p,{children:[`Transform custom SVG elements into standard elements or React components when
you have non-standard elements in your SVG. Each transformation function
receives the DOM element and returns `,(0,E.jsx)(t.code,{children:`[componentName, componentProps]`}),`,
allowing you to extract attributes and create new component properties.`]}),`
`,(0,E.jsx)(r,{language:`tsx`,code:b}),`
`,(0,E.jsx)(i,{of:d}),`
`,(0,E.jsx)(t.h2,{id:`advanced-usage-combining-transformations-example`,children:`Advanced Usage: Combining Transformations Example`}),`
`,(0,E.jsx)(t.p,{children:`Combine both transformations when you need to handle custom elements AND
custom attributes. The parser applies node transformations first, then
processes properties on all elements (including newly transformed ones).`}),`
`,(0,E.jsx)(r,{language:`tsx`,code:v}),`
`,(0,E.jsx)(i,{of:u})]})}function T(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,E.jsx)(t,{...e,children:(0,E.jsx)(w,{...e})}):w(e)}var E;e((()=>{E=t(),c(),s(),h(),_(),y(),x(),C()}))();export{T as default};