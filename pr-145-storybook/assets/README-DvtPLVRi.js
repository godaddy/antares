import{j as e}from"./iframe-Cobng3kW.js";import{u as i,M as r,A as o}from"./blocks-BEuLoQbf.js";import{S as a,s as l,o as c}from"./to-attribute-value.stories-B2vz3bje.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Do2wpqFt.js";import"./index-DCuVUat6.js";import"./index-CkzLLGzI.js";import"./slots-BlFL7XUI.js";import"./index-CxaQNeJr.js";import"./index-CLj43KZG.js";import"./index-awrPXsZT.js";import"./mergeProps-CqlBgEfY.js";import"./SSRProvider-CRxxJPAA.js";import"./clsx-B-dksMZM.js";function s(n){const t={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:a,name:"Overview"}),`
`,e.jsx(t.h1,{id:"attribute-value",children:"Attribute Value"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"@bento/to-attribute-value"}),` package is a formatter that converts any given
value into a string that can be used as an HTML attribute value.`]}),`
`,e.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-shell",children:`npm install --save @bento/to-attribute-value
`})}),`
`,e.jsx(t.h2,{id:"stringify",children:"stringify"}),`
`,e.jsxs(t.p,{children:["The package exposes the ",e.jsx(t.code,{children:"stringify"}),` function as the default export. The sole
purpose of this function is to format any given value into a `,e.jsx(t.code,{children:"string"}),` that
closely resembles the value as if it was formatted as an HTML attribute value.`]}),`
`,e.jsx(t.p,{children:"The function accepts the following arguments:"}),`
`,e.jsx(o,{of:l}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-jsx",children:`import { stringify } from '@bento/to-attribute-value';

console.log(stringify({ hello: 'world'}));        // hello(world)
`})}),`
`,e.jsxs(t.p,{children:["We automatically format the ",e.jsx(t.code,{children:"data"})," based on the type of the value given:"]}),`
`,e.jsx(o,{of:c}),`
`,e.jsxs(t.p,{children:["Any unknown object is converted using ",e.jsx(t.code,{children:"JSON.stringify"}),`. In order for these
custom objects to be converted, they must have a `,e.jsx(t.code,{children:"toJSON"}),` method that returns a
serializable object.`]}),`
`,e.jsxs(t.p,{children:["The value ",e.jsx(t.code,{children:"false"})," is automatically converted to ",e.jsx(t.code,{children:"undefined"}),` to signal React that
the resulting attribute should not end up in the DOM.`]})]})}function w(n={}){const{wrapper:t}={...i(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(s,{...n})}):s(n)}export{w as default};
