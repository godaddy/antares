import{j as e}from"./iframe-C3pkDmNe.js";import{useMDXComponents as r}from"./index-UVQaQDuN.js";import{M as o}from"./blocks-Do0aVo1q.js";import{S as a}from"./svg-parser.stories-JL6mN9gU.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Z-QtMzxy.js";import"./index-BgVCNucj.js";import"./index-q9xSD4ii.js";import"./index-DrFu-skq.js";import"./index--fIn9r5g.js";function s(t){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:a,name:"Concepts"}),`
`,e.jsx(n.h1,{id:"svg-parser",children:"SVG Parser"}),`
`,e.jsx(n.p,{children:`The SVG Parser is a specialized utility designed to bridge the gap between static SVG
content and dynamic React components. In modern web applications, SVGs often need to
be more than just static images - they need to be interactive, themeable, and
integrated with application state. This package provides a robust solution for
transforming SVG strings into fully functional React components while maintaining
the flexibility to customize and extend the transformation process.`}),`
`,e.jsx(n.h2,{id:"parser",children:"parser"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"parser"}),` function serves as the entry point for transforming SVG strings
into React components. It takes a raw SVG string and optional transformation
configurations, then returns a React element tree that can be rendered directly
in your application. This abstraction eliminates the need to manually parse SVG
strings or manipulate DOM elements, providing a clean, type-safe interface for
working with SVG content.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { parser } from '@bento/svg-parser';

const svgString = '<svg><rect x="10" y="10" width="100" height="100" /></svg>';
const Component = parser(svgString);
`})}),`
`,e.jsx(n.h2,{id:"transformation-system",children:"Transformation System"}),`
`,e.jsx(n.p,{children:`The transformation system is the heart of the SVG Parser's extensibility. It
provides two distinct layers of transformation that can be composed to handle
complex SVG processing requirements. This design allows engineers to build
reusable transformation logic that can be shared across different SVG processing
scenarios.`}),`
`,e.jsx(n.h3,{id:"node-transformations",children:"Node Transformations"}),`
`,e.jsx(n.p,{children:`Node transformations operate at the element level, allowing you to modify or
replace entire SVG elements during the parsing process. Each transformation
function receives the original DOM element and returns a tuple containing the
new component name and its props. This powerful feature enables structural
changes to the SVG, such as wrapping elements in custom components or replacing
non-standard elements with standard ones.`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`const nodeTransformers = {
  'custom-element': (node) => ['div', { className: 'custom-wrapper' }]
};
`})}),`
`,e.jsx(n.h3,{id:"prop-transformations",children:"Prop Transformations"}),`
`,e.jsx(n.p,{children:`Property transformations focus on the attributes of SVG elements, providing
fine-grained control over how values are processed and normalized. These
transformations are particularly useful for handling design system integration,
where SVG attributes need to be mapped to design tokens or theme values.`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`const propTransformers = {
  fill: (node) => {
    const color = node.getAttribute('fill');
    return ['fill', \`var(--color-\${color})\`];
  }
};
`})}),`
`,e.jsx(n.p,{children:`The transformation system's composable nature means that node and property
transformations can be combined to handle complex scenarios. For example, you
could transform custom elements while simultaneously normalizing their
properties to match your design system's conventions. This flexibility makes
the SVG Parser an ideal tool for building consistent, maintainable SVG-based
components in large-scale applications.`})]})}function x(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{x as default};
