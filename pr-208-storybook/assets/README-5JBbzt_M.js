import{i as e}from"./preload-helper-usAeo7Bx.js";import{y as t}from"./iframe-BkrCR3JY.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DKMuXsLb.js";import{t as c}from"./mdx-react-shim-C9bG_Ok_.js";import{BasicUsageStory as l,MultipleIconStory as u,n as d,t as f,useSVGSpriteMeta as p}from"./svg-sprite.stories-biTUtPoV.js";import{n as m,t as h}from"./basic-BzunwKfF.js";var g,_=e((()=>{g=`import { useSVGSprite } from '@bento/use-svg-sprite';
/* v8 ignore next */
import React from 'react';

export function MultipleIcons() {
  const Check = useSVGSprite(
    'check',
    <svg viewBox="0 0 24 24" width={24} height={24}>
      <path d="M5 13l4 4L19 7" stroke="green" strokeWidth="2" fill="none" />
    </svg>
  );

  const Alert = useSVGSprite(
    'alert',
    <svg viewBox="0 0 24 24" width={24} height={24}>
      <circle cx="12" cy="12" r="10" stroke="red" strokeWidth="2" fill="none" />
      <line x1="12" y1="8" x2="12" y2="12" stroke="red" strokeWidth="2" />
      <circle cx="12" cy="16" r="1" fill="red" />
    </svg>
  );

  return (
    <div>
      {Check}
      {Alert}
    </div>
  );
}
`}));function v(e){let t={blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(o,{of:d,name:`Overview`}),`
`,(0,b.jsx)(t.h1,{id:`use-svg-sprite`,children:`use-svg-sprite`}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`@bento/use-svg-sprite`}),` package provides a hook that registers inline
SVG illustrations into a shared sprite sheet and returns a reusable component.
This makes it easy to keep your icons consistent and efficient across the app.`]}),`
`,(0,b.jsxs)(t.blockquote,{children:[`
`,(0,b.jsx)(t.p,{children:`This approach ensures your icons are only defined once in the DOM and reused
efficiently across your app, improving performance and maintainability.`}),`
`]}),`
`,(0,b.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-shell`,children:`npm install --save @bento/use-svg-sprite
`})}),`
`,(0,b.jsx)(t.h2,{id:`usesvgsprite`,children:`useSVGSprite`}),`
`,(0,b.jsxs)(t.p,{children:[`The package exposes a `,(0,b.jsx)(t.code,{children:`useSVGSprite`}),` hook that creates a new symbol element
for the provided illustration and adds it to the sprite sheet.
The hook returns a React element that references the newly added symbol.`]}),`
`,(0,b.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,b.jsx)(r,{language:`tsx`,code:h}),`
`,(0,b.jsx)(i,{of:l}),`
`,(0,b.jsxs)(t.p,{children:[`As seen from the example above, the `,(0,b.jsx)(t.code,{children:`useSVGSprite`}),` hook takes two arguments:`]}),`
`,(0,b.jsx)(a,{of:p}),`
`,(0,b.jsxs)(t.p,{children:[`It returns a React element that renders an `,(0,b.jsx)(t.code,{children:`<svg>`}),` with a `,(0,b.jsx)(t.code,{children:`<use>`}),`
that references a symbol injected into a shared sprite sheet.`]}),`
`,(0,b.jsx)(t.h3,{id:`multiple-icons-example`,children:`Multiple Icons Example`}),`
`,(0,b.jsx)(t.p,{children:`You can define and render multiple icons with different names.`}),`
`,(0,b.jsx)(r,{language:`tsx`,code:g}),`
`,(0,b.jsx)(i,{of:u}),`
`,(0,b.jsxs)(t.p,{children:[`When using SVG icons with `,(0,b.jsx)(t.code,{children:`useSVGSprite`}),`, three attributes are crucial for optimal
performance and visual consistency:`]}),`
`,(0,b.jsxs)(t.p,{children:[(0,b.jsx)(t.code,{children:`viewBox`}),`: This attribute defines the coordinate system and aspect ratio of your
SVG. It ensures your icon scales correctly and maintains its proportions when
resized. Without a proper `,(0,b.jsx)(t.code,{children:`viewBox`}),`, icons might appear distorted or incorrectly
positioned.`]}),`
`,(0,b.jsxs)(t.p,{children:[(0,b.jsx)(t.code,{children:`width`}),` and `,(0,b.jsx)(t.code,{children:`height`}),`: These attributes are essential for preventing layout shifts
during page load. By specifying these dimensions, the browser can reserve the
correct amount of space for the icon before it's fully rendered. This improves
the Cumulative Layout Shift (CLS) metric and overall user experience.`]})]})}function y(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,b.jsx)(t,{...e,children:(0,b.jsx)(v,{...e})}):v(e)}var b;e((()=>{b=t(),c(),s(),f(),m(),_()}))();export{y as default};