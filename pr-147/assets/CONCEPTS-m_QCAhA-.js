import{j as e}from"./iframe-DJ60jm-Y.js";import{useMDXComponents as i}from"./index-HeHejDaM.js";import{M as o,S as r,a as h}from"./blocks-133quRs-.js";import{S as a,B as c}from"./svg-sprite.stories-DTRMWGHh.js";import{S as p}from"./basic-DZdRVFAh.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D_ua2sNt.js";import"./index-pn1VKk7h.js";import"./index-DJH_JplX.js";import"./index-DrFu-skq.js";import"./index-o9YusXH0.js";import"./index-BPClX71o.js";import"./client-QgVLDxS3.js";function s(t){const n={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:a,name:"Concepts"}),`
`,e.jsx(n.h1,{id:"svg-sprite-concepts",children:"SVG Sprite Concepts"}),`
`,e.jsx(n.p,{children:`SVG sprites are like a collection of icons stored in a single, hidden container.
Instead of loading each icon separately, we keep them all in one place and
reference them when needed. This makes our app faster and easier to maintain.`}),`
`,e.jsx(n.p,{children:`Think of it like a sticker book: instead of having loose stickers everywhere,
they're all organized in one book, and you can use them whenever you need them.`}),`
`,e.jsx(n.h2,{id:"using-usesvgsprite",children:"Using useSVGSprite"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"useSVGSprite"}),` hook simplifies working with SVG sprites in React applications.
It handles all the sprite sheet management for us, making it easy to use icons
throughout your application.`]}),`
`,e.jsx(n.p,{children:"Here's how to use a single icon:"}),`
`,e.jsx(r,{language:"tsx",code:p}),`
`,e.jsx(h,{of:c}),`
`,e.jsx(n.p,{children:`The hook automatically creates and manages the sprite sheet, registers the icon
with a unique identifier, and returns a component that references the icon. This
makes it easy to use icons in your components without worrying about the
underlying sprite sheet implementation.`}),`
`,e.jsx(n.h2,{id:"sprite-sheet-structure",children:"Sprite Sheet Structure"}),`
`,e.jsx(n.p,{children:`Let's look at how the sprite sheet and icon usage work together. First, we
define our icons in the sprite sheet:`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<svg id="bento-svg-spritesheet" style="display: none">
  <symbol id="bento-svg-spritesheet-check" viewBox="0 0 24 24">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" fill="none" />
  </symbol>
  </symbol>
</svg>
`})}),`
`,e.jsx(n.p,{children:`Then, whenever we need to use an icon, we reference it from the sprite sheet
using its ID. For example, to use the check icon:`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<svg viewBox="0 0 24 24" width="24" height="24">
  <use xlinkHref="#bento-svg-spritesheet-check" fill="currentColor"/>
</svg>
`})}),`
`,e.jsxs(n.p,{children:[`The connection between the sprite sheet and icon usage is simple. Each icon in
the sprite sheet has a unique ID, like `,e.jsx(n.code,{children:"bento-svg-spritesheet-check"}),`. When we
want to use an icon, we reference it using that same ID. The browser then finds
the icon in the sprite sheet and displays it where we want it.`]})]})}function b(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{b as default};
