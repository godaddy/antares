import{j as e}from"./iframe-nLyyj1q5.js";import{useMDXComponents as o}from"./index-DHuAuATD.js";import{M as s}from"./blocks-CfchxA9Q.js";import"./preload-helper-PPVm8Dsz.js";import"./index-oZJ9SRuu.js";import"./index-Dv2WGlPh.js";import"./index-BAZV8ZSs.js";import"./index-DrFu-skq.js";function t(n){const i={code:"code",em:"em",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Architecture/Guides/Primitives"}),`
`,e.jsx(i.h1,{id:"primitives",children:"Primitives"}),`
`,e.jsxs(i.p,{children:["In Bento, ",e.jsx(i.strong,{children:"primitives are reusable pieces of component infrastructure"}),". They are headless, accessible building blocks you use to create your own component library or design system."]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Bento is not a component library."})," Bento is the infrastructure ",e.jsx(i.em,{children:"beneath"})," a component library. It provides accessibility, behavior, and a composition model so you can implement your own design system without solving those problems repeatedly."]}),`
`,e.jsx(i.h2,{id:"what-is-a-primitive",children:"What Is a Primitive?"}),`
`,e.jsx(i.p,{children:"A Bento primitive is a minimal, reusable unit of infrastructure. It can be a React component, a hook, a utility function, or any other low-level building block that makes higher-level components easier to implement consistently."}),`
`,e.jsxs(i.p,{children:["When a primitive ",e.jsx(i.em,{children:"is"})," a UI component, it packages the parts of UI that should be consistent everywhere: accessibility, interaction behavior, and composability. React Aria is our framework of choice for building accessibility-first primitives."]}),`
`,e.jsxs(i.p,{children:["Primitives intentionally do ",e.jsx(i.strong,{children:"not"}),' ship with a "GoDaddy look" or product rules. In Bento, styling and business logic belong to the consuming design system or application.']}),`
`,e.jsx(i.h2,{id:"why-primitives",children:"Why Primitives?"}),`
`,e.jsx(i.p,{children:'Bento aims to be the invisible foundation for many different UI systems. Different teams have different needs: styling stacks, tokens, ergonomics, product constraints. If Bento tried to be "the component library", it would quickly become either too opinionated to be reusable, or so configurable that it becomes unmaintainable.'}),`
`,e.jsx(i.p,{children:"Primitives are the compromise that isn't a compromise: a shared, high-quality accessibility and behavior layer, while consumers build whatever design system they need on top. Primitives intentionally avoid becoming layout utilities, product components, or a forced styling solution. They work equally well with CSS Modules, Tailwind, CSS-in-JS, or anything else."}),`
`,e.jsx(i.h2,{id:"who-are-primitives-for",children:"Who Are Primitives For?"}),`
`,e.jsxs(i.p,{children:["Primitives are primarily for ",e.jsx(i.strong,{children:"component and design system engineers"}),'. Application engineers can use Bento directly, when building custom experiences, but the intended "happy path" is a thin design system layer that wraps primitives and defines the look, tokens, and conventions for a product.']}),`
`,e.jsx(i.h2,{id:"i-want-to-build-a-new-primitive-where-should-it-live",children:"I want to build a new primitive. Where should it live?"}),`
`,e.jsx(i.p,{children:'When building something new, ask "who should own it?" This decision tree helps determine whether something belongs in Bento or in a design system built on top:'}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-mermaid",children:`flowchart TD
  A[New thing] --> Q1{Reusable to compose<br/>another UI component?}
  Q1 -- Yes --> Q3{Business logic?}
  Q1 -- No --> Q2{Would we duplicate<br/>functionality / structure?}
  Q2 -- Yes --> Q3
  Q2 -- No --> DS[Design system]
  Q3 -- Yes --> DS
  Q3 -- No --> BENTO[Bento]
`})})]})}function u(n={}){const{wrapper:i}={...o(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(t,{...n})}):t(n)}export{u as default};
