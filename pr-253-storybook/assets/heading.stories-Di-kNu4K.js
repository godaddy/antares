import{a as e,i as t}from"./preload-helper-dt_jKsAq.js";import{V as n,y as r}from"./iframe-B43ena-z.js";import{n as i,r as a,t as o}from"./src-DA8D5kLL.js";function s(e){return(0,c.jsx)(o,{...e,children:`Hello, world!`})}var c,l=t((()=>{a(),n(),c=r()}));function u(e){return(0,d.jsx)(o,{...e,level:1,children:`Hello, world!`})}var d,f=t((()=>{a(),n(),d=r()}));function p(e){return(0,m.jsxs)(i,{children:[(0,m.jsx)(o,{children:`Level 1`}),(0,m.jsxs)(i,{children:[(0,m.jsx)(o,{children:`Level 2`}),(0,m.jsx)(i,{children:(0,m.jsx)(o,{children:`Level 3`})})]})]})}var m,h=t((()=>{a(),n(),m=r()}));function g(e){return(0,_.jsxs)(i,{children:[(0,_.jsx)(o,{children:`Level 1`}),(0,_.jsxs)(i,{children:[(0,_.jsx)(o,{children:`Level 2`}),(0,_.jsx)(o,{level:1,children:`Level 1 (overridden)`})]})]})}var _,v=t((()=>{a(),n(),_=r()})),y=e({Heading:()=>S,Level:()=>C,Override:()=>T,Props:()=>x,Provider:()=>w,__namedExportsOrder:()=>E,default:()=>b}),b,x,S,C,w,T,E,D=t((()=>{l(),f(),h(),v(),b={title:`Bento/components/Heading`,component:()=>null},x={tags:[`!dev`,`stable`],argTypes:{level:{description:`The level of the heading.`,type:`number`,control:{type:`number`}},children:{description:`The content to display inside the text.`,type:`ReactNode`,control:{type:`text`}}}},S={render:s},C={render:u},w={render:p},T={render:g},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
} satisfies Story`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: HeadingExample
} satisfies Story`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: LevelExample
} satisfies Story`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: HeadingProviderExample
} satisfies Story`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: HeadingOverrideExample
} satisfies Story`,...T.parameters?.docs?.source}}},E=[`Props`,`Heading`,`Level`,`Provider`,`Override`]}));D();export{S as Heading,C as Level,T as Override,x as Props,w as Provider,E as __namedExportsOrder,b as default,D as n,y as t};