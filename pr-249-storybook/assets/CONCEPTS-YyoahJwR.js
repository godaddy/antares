import{i as e}from"./preload-helper-B_l3Wrpe.js";import{y as t}from"./iframe-xovH2s5j.js";import{S as n,s as r,u as i}from"./blocks-DwzMadMw.js";import{t as a}from"./mdx-react-shim-DhahY8QC.js";import{n as o,t as s}from"./svg-parser.stories-BNJyaFuy.js";function c(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(r,{of:o,name:`Concepts`}),`
`,(0,u.jsx)(t.h1,{id:`svg-parser`,children:`SVG Parser`}),`
`,(0,u.jsx)(t.p,{children:`The SVG Parser is a specialized utility designed to bridge the gap between static SVG
content and dynamic React components. In modern web applications, SVGs often need to
be more than just static images - they need to be interactive, themeable, and
integrated with application state. This package provides a robust solution for
transforming SVG strings into fully functional React components while maintaining
the flexibility to customize and extend the transformation process.`}),`
`,(0,u.jsx)(t.h2,{id:`parser`,children:`parser`}),`
`,(0,u.jsxs)(t.p,{children:[`The `,(0,u.jsx)(t.code,{children:`parser`}),` function serves as the entry point for transforming SVG strings
into React components. It takes a raw SVG string and optional transformation
configurations, then returns a React element tree that can be rendered directly
in your application. This abstraction eliminates the need to manually parse SVG
strings or manipulate DOM elements, providing a clean, type-safe interface for
working with SVG content.`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`import { parser } from '@bento/svg-parser';

const svgString = '<svg><rect x="10" y="10" width="100" height="100" /></svg>';
const Component = parser(svgString);
`})}),`
`,(0,u.jsx)(t.h2,{id:`transformation-system`,children:`Transformation System`}),`
`,(0,u.jsx)(t.p,{children:`The transformation system is the heart of the SVG Parser's extensibility. It
provides two distinct layers of transformation that can be composed to handle
complex SVG processing requirements. This design allows engineers to build
reusable transformation logic that can be shared across different SVG processing
scenarios.`}),`
`,(0,u.jsx)(t.h3,{id:`node-transformations`,children:`Node Transformations`}),`
`,(0,u.jsx)(t.p,{children:`Node transformations operate at the element level, allowing you to modify or
replace entire SVG elements during the parsing process. Each transformation
function receives the original DOM element and returns a tuple containing the
new component name and its props. This powerful feature enables structural
changes to the SVG, such as wrapping elements in custom components or replacing
non-standard elements with standard ones.`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`const nodeTransformers = {
  'custom-element': (node) => ['div', { className: 'custom-wrapper' }]
};
`})}),`
`,(0,u.jsx)(t.h3,{id:`prop-transformations`,children:`Prop Transformations`}),`
`,(0,u.jsx)(t.p,{children:`Property transformations focus on the attributes of SVG elements, providing
fine-grained control over how values are processed and normalized. These
transformations are particularly useful for handling design system integration,
where SVG attributes need to be mapped to design tokens or theme values.`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`const propTransformers = {
  fill: (node) => {
    const color = node.getAttribute('fill');
    return ['fill', \`var(--color-\${color})\`];
  }
};
`})}),`
`,(0,u.jsx)(t.p,{children:`The transformation system's composable nature means that node and property
transformations can be combined to handle complex scenarios. For example, you
could transform custom elements while simultaneously normalizing their
properties to match your design system's conventions. This flexibility makes
the SVG Parser an ideal tool for building consistent, maintainable SVG-based
components in large-scale applications.`})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;e((()=>{u=t(),a(),i(),s()}))();export{l as default};