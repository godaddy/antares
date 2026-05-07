import{j as e}from"./iframe-D_jocO6H.js";import{useMDXComponents as i}from"./index-JHdL4YUy.js";import{S as r,s as a,o as l}from"./to-attribute-value.stories-D-VVB1Pv.js";import{M as c,A as o}from"./blocks-sBZ0BOgP.js";import"./preload-helper-PPVm8Dsz.js";import"./slots-CPwhE5Zi.js";import"./index-CGfw3iQa.js";import"./index-CLj43KZG.js";import"./index-BUUwA7VU.js";import"./mergeProps-Cxs9KK_K.js";import"./SSRProvider-CH2btpiR.js";import"./clsx-B-dksMZM.js";import"./index-9c__PXmS.js";import"./index-rzNIXIpQ.js";import"./index-CGaP8dqt.js";function s(n){const t={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{of:r,name:"Overview"}),`
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
`,e.jsx(o,{of:a}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-jsx",children:`import { stringify } from '@bento/to-attribute-value';

console.log(stringify({ hello: 'world'}));        // hello(world)
`})}),`
`,e.jsxs(t.p,{children:["We automatically format the ",e.jsx(t.code,{children:"data"})," based on the type of the value given:"]}),`
`,e.jsx(o,{of:l}),`
`,e.jsxs(t.p,{children:["Any unknown object is converted using ",e.jsx(t.code,{children:"JSON.stringify"}),`. In order for these
custom objects to be converted, they must have a `,e.jsx(t.code,{children:"toJSON"}),` method that returns a
serializable object.`]}),`
`,e.jsxs(t.p,{children:["The value ",e.jsx(t.code,{children:"false"})," is automatically converted to ",e.jsx(t.code,{children:"undefined"}),` to signal React that
the resulting attribute should not end up in the DOM.`]})]})}function A(n={}){const{wrapper:t}={...i(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(s,{...n})}):s(n)}export{A as default};
