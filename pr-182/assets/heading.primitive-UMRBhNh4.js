import{j as e}from"./iframe-CZ2Upcg5.js";import{useMDXComponents as r}from"./index-Ci7WSTmi.js";import{M as l}from"./blocks-B6-rmhLZ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DRorPtTE.js";import"./index-B_InqHgS.js";import"./index-BmcmvYic.js";function d(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{title:"Architecture/PDRs/Heading"}),`
`,e.jsx(n.h1,{id:"heading-primitive-pdr",children:"Heading Primitive PDR"}),`
`,e.jsx(n.h2,{id:"purpose",children:"Purpose"}),`
`,e.jsx(n.p,{children:"The Heading Primitive will extend the Text Primitive to provide a more semantic and accessible heading component."}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(n.p,{children:"The API interface for the resource should include the following props, excluding the props from the Text Primitive:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`interface HeadingProps extends TextProps {
    /** @default null */
    level?: 1 | 2 | 3 | 4 | 5 | 6;
}
`})}),`
`,e.jsx(n.h3,{id:"level",children:e.jsx(n.code,{children:"level"})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"level"})," prop is used to specify the level of the heading. If not provided, the heading will automatically determine the level based on the number of nested ",e.jsx(n.code,{children:"Heading.Provider"})," components or render a span element if no ",e.jsx(n.code,{children:"Heading.Provider"})," is found."]}),`
`,e.jsx(n.h2,{id:"code-examples",children:"Code examples"}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic usage"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"level"})," prop is used to specify the level of the heading."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`/* Renders a h1 element with the text "Hello, world!" */
<Heading level={1}>Hello, world!</Heading>
`})}),`
`,e.jsx(n.h3,{id:"auto-level",children:"Auto level"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Heading.Provider"})," component is used to automatically determine the level of the heading based on the number of nested ",e.jsx(n.code,{children:"Heading.Provider"})," components. If ",e.jsx(n.code,{children:"level"})," is provided, it will override the automatic level determination."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`/* Automatically determines the level of the heading based on the number of nested Heading.Scope components */
<Heading.Provider>
  <Heading>This is an h1 heading</Heading>
  <Heading.Provider>
    <Heading>This is an h2 heading</Heading>
    <Heading.Provider>
      <Heading level={2}>This is an h2 heading</Heading>
    </Heading.Provider>
  </Heading.Provider>
</Heading.Provider>
`})}),`
`,e.jsxs(n.p,{children:["If no ",e.jsx(n.code,{children:"level"})," is provided and the ",e.jsx(n.code,{children:"Heading.Provider"})," is not nested, the heading will warn the user that the level is not specified and render a span element. This is to ensure that the heading is always rendered with a valid level. We can consider adding a data attribute to indicate the problem."]}),`
`,e.jsxs(n.p,{children:["We may also consider adding a ",e.jsx(n.code,{children:"level"})," to the ",e.jsx(n.code,{children:"Heading.Provider"})," component override the current level determined by the scope."]}),`
`,e.jsx(n.h2,{id:"appendix",children:"Appendix"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://medium.com/@Heydon/managing-heading-levels-in-design-systems-18be9a746fa3",rel:"nofollow",children:"Managing Heading Levels In Design Systems"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://ariakit.org/components/heading",rel:"nofollow",children:"Ariakit Heading"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/uber/baseweb/tree/main/src/heading",rel:"nofollow",children:"Base Web Heading"})}),`
`]})]})}function g(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(d,{...i})}):d(i)}export{g as default};
