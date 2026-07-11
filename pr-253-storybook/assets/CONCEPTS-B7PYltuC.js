import{i as e}from"./preload-helper-dt_jKsAq.js";import{y as t}from"./iframe-BrzGYPoD.js";import{S as n,c as r,l as i,s as a,u as o}from"./blocks-Bif5YJY3.js";import{t as s}from"./mdx-react-shim-DBUSodm0.js";import{BasicUsageStory as c,n as l,t as u}from"./svg-sprite.stories-CioOhllr.js";import{n as d,t as f}from"./basic-z7XoLLFg.js";function p(e){let t={code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,...n(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(a,{of:l,name:`Concepts`}),`
`,(0,h.jsx)(t.h1,{id:`svg-sprite-concepts`,children:`SVG Sprite Concepts`}),`
`,(0,h.jsx)(t.p,{children:`SVG sprites are like a collection of icons stored in a single, hidden container.
Instead of loading each icon separately, we keep them all in one place and
reference them when needed. This makes our app faster and easier to maintain.`}),`
`,(0,h.jsx)(t.p,{children:`Think of it like a sticker book: instead of having loose stickers everywhere,
they're all organized in one book, and you can use them whenever you need them.`}),`
`,(0,h.jsx)(t.h2,{id:`using-usesvgsprite`,children:`Using useSVGSprite`}),`
`,(0,h.jsxs)(t.p,{children:[`The `,(0,h.jsx)(t.code,{children:`useSVGSprite`}),` hook simplifies working with SVG sprites in React applications.
It handles all the sprite sheet management for us, making it easy to use icons
throughout your application.`]}),`
`,(0,h.jsx)(t.p,{children:`Here's how to use a single icon:`}),`
`,(0,h.jsx)(r,{language:`tsx`,code:f}),`
`,(0,h.jsx)(i,{of:c}),`
`,(0,h.jsx)(t.p,{children:`The hook automatically creates and manages the sprite sheet, registers the icon
with a unique identifier, and returns a component that references the icon. This
makes it easy to use icons in your components without worrying about the
underlying sprite sheet implementation.`}),`
`,(0,h.jsx)(t.h2,{id:`sprite-sheet-structure`,children:`Sprite Sheet Structure`}),`
`,(0,h.jsx)(t.p,{children:`Let's look at how the sprite sheet and icon usage work together. First, we
define our icons in the sprite sheet:`}),`
`,(0,h.jsx)(t.pre,{children:(0,h.jsx)(t.code,{className:`language-html`,children:`<svg id="bento-svg-spritesheet" style="display: none">
  <symbol id="bento-svg-spritesheet-check" viewBox="0 0 24 24">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" fill="none" />
  </symbol>
  </symbol>
</svg>
`})}),`
`,(0,h.jsx)(t.p,{children:`Then, whenever we need to use an icon, we reference it from the sprite sheet
using its ID. For example, to use the check icon:`}),`
`,(0,h.jsx)(t.pre,{children:(0,h.jsx)(t.code,{className:`language-html`,children:`<svg viewBox="0 0 24 24" width="24" height="24">
  <use xlinkHref="#bento-svg-spritesheet-check" fill="currentColor"/>
</svg>
`})}),`
`,(0,h.jsxs)(t.p,{children:[`The connection between the sprite sheet and icon usage is simple. Each icon in
the sprite sheet has a unique ID, like `,(0,h.jsx)(t.code,{children:`bento-svg-spritesheet-check`}),`. When we
want to use an icon, we reference it using that same ID. The browser then finds
the icon in the sprite sheet and displays it where we want it.`]})]})}function m(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;e((()=>{h=t(),s(),o(),u(),d()}))();export{m as default};