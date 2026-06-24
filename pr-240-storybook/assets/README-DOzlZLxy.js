import{i as e}from"./preload-helper-MxSc4jeG.js";import{y as t}from"./iframe-al-oUo7K.js";import{S as n,n as r,s as i,u as a}from"./blocks-Df5e6VHw.js";import{t as o}from"./mdx-react-shim-5PBXP8Kk.js";import{n as s,output as c,stringify as l,t as u}from"./to-attribute-value.stories-dOaPss48.js";function d(e){let t={code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,...n(),...e.components};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(i,{of:s,name:`Overview`}),`
`,(0,p.jsx)(t.h1,{id:`attribute-value`,children:`Attribute Value`}),`
`,(0,p.jsxs)(t.p,{children:[`The `,(0,p.jsx)(t.code,{children:`@bento/to-attribute-value`}),` package is a formatter that converts any given
value into a string that can be used as an HTML attribute value.`]}),`
`,(0,p.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,p.jsx)(t.pre,{children:(0,p.jsx)(t.code,{className:`language-shell`,children:`npm install --save @bento/to-attribute-value
`})}),`
`,(0,p.jsx)(t.h2,{id:`stringify`,children:`stringify`}),`
`,(0,p.jsxs)(t.p,{children:[`The package exposes the `,(0,p.jsx)(t.code,{children:`stringify`}),` function as the default export. The sole
purpose of this function is to format any given value into a `,(0,p.jsx)(t.code,{children:`string`}),` that
closely resembles the value as if it was formatted as an HTML attribute value.`]}),`
`,(0,p.jsx)(t.p,{children:`The function accepts the following arguments:`}),`
`,(0,p.jsx)(r,{of:l}),`
`,(0,p.jsx)(t.pre,{children:(0,p.jsx)(t.code,{className:`language-jsx`,children:`import { stringify } from '@bento/to-attribute-value';

console.log(stringify({ hello: 'world'}));        // hello(world)
`})}),`
`,(0,p.jsxs)(t.p,{children:[`We automatically format the `,(0,p.jsx)(t.code,{children:`data`}),` based on the type of the value given:`]}),`
`,(0,p.jsx)(r,{of:c}),`
`,(0,p.jsxs)(t.p,{children:[`Any unknown object is converted using `,(0,p.jsx)(t.code,{children:`JSON.stringify`}),`. In order for these
custom objects to be converted, they must have a `,(0,p.jsx)(t.code,{children:`toJSON`}),` method that returns a
serializable object.`]}),`
`,(0,p.jsxs)(t.p,{children:[`The value `,(0,p.jsx)(t.code,{children:`false`}),` is automatically converted to `,(0,p.jsx)(t.code,{children:`undefined`}),` to signal React that
the resulting attribute should not end up in the DOM.`]})]})}function f(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,p.jsx)(t,{...e,children:(0,p.jsx)(d,{...e})}):d(e)}var p;e((()=>{p=t(),o(),u(),a()}))();export{f as default};