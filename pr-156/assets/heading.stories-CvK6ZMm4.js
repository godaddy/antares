import{j as e}from"./iframe-N2a__K7H.js";import{H as r,a as d}from"./index-CKh7vatK.js";function c(n){return e.jsx(r,{...n,children:"Hello, world!"})}function l(n){return e.jsx(r,{...n,level:1,children:"Hello, world!"})}function p(n){return e.jsxs(d,{children:[e.jsx(r,{children:"Level 1"}),e.jsxs(d,{children:[e.jsx(r,{children:"Level 2"}),e.jsx(d,{children:e.jsx(r,{children:"Level 3"})})]})]})}function m(n){return e.jsxs(d,{children:[e.jsx(r,{children:"Level 1"}),e.jsxs(d,{children:[e.jsx(r,{children:"Level 2"}),e.jsx(r,{level:1,children:"Level 1 (overridden)"})]})]})}const u={title:"components/Heading",component:()=>null},s={tags:["!dev","stable"],argTypes:{level:{description:"The level of the heading.",type:"number",control:{type:"number"}},children:{description:"The content to display inside the text.",type:"ReactNode",control:{type:"text"}}}},t={render:c},o={render:l},a={render:p},i={render:m};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  tags: ['!dev', 'stable'],
  argTypes: {
    level: {
      description: 'The level of the heading.',
      type: 'number',
      control: {
        type: 'number'
      }
    },
    children: {
      description: 'The content to display inside the text.',
      type: 'ReactNode',
      control: {
        type: 'text'
      }
    }
  }
} satisfies Story`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: HeadingExample
} satisfies Story`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: LevelExample
} satisfies Story`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: HeadingProviderExample
} satisfies Story`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: HeadingOverrideExample
} satisfies Story`,...i.parameters?.docs?.source}}};const v=["Props","Heading","Level","Provider","Override"],h=Object.freeze(Object.defineProperty({__proto__:null,Heading:t,Level:o,Override:i,Props:s,Provider:a,__namedExportsOrder:v,default:u},Symbol.toStringTag,{value:"Module"}));export{s as P,h as S};
