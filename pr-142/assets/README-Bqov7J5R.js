import{j as e}from"./iframe-DsWwth5y.js";import{useMDXComponents as o}from"./index-CPSspYlh.js";import{M as a,S as n,a as r,A as c}from"./blocks-BVRlntSN.js";import{S as d,B as h,u as l,M as p}from"./svg-sprite.stories-Ced1Q0Lh.js";import{S as u}from"./basic-DZdRVFAh.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CJzQXarO.js";import"./index-Cca3xErQ.js";import"./index-Co8wA_Ee.js";import"./index-DrFu-skq.js";import"./index-C_GcJTwd.js";import"./index-BY2PCn27.js";import"./client-BIirFuTS.js";const m=`import { useSVGSprite } from '@bento/use-svg-sprite';
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
`;function i(t){const s={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:d,name:"Overview"}),`
`,e.jsx(s.h1,{id:"use-svg-sprite",children:"use-svg-sprite"}),`
`,e.jsxs(s.p,{children:["The ",e.jsx(s.code,{children:"@bento/use-svg-sprite"}),` package provides a hook that registers inline
SVG illustrations into a shared sprite sheet and returns a reusable component.
This makes it easy to keep your icons consistent and efficient across the app.`]}),`
`,e.jsxs(s.blockquote,{children:[`
`,e.jsx(s.p,{children:`This approach ensures your icons are only defined once in the DOM and reused
efficiently across your app, improving performance and maintainability.`}),`
`]}),`
`,e.jsx(s.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-shell",children:`npm install --save @bento/use-svg-sprite
`})}),`
`,e.jsx(s.h2,{id:"usesvgsprite",children:"useSVGSprite"}),`
`,e.jsxs(s.p,{children:["The package exposes a ",e.jsx(s.code,{children:"useSVGSprite"}),` hook that creates a new symbol element
for the provided illustration and adds it to the sprite sheet.
The hook returns a React element that references the newly added symbol.`]}),`
`,e.jsx(s.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n,{language:"tsx",code:u}),`
`,e.jsx(r,{of:h}),`
`,e.jsxs(s.p,{children:["As seen from the example above, the ",e.jsx(s.code,{children:"useSVGSprite"})," hook takes two arguments:"]}),`
`,e.jsx(c,{of:l}),`
`,e.jsxs(s.p,{children:["It returns a React element that renders an ",e.jsx(s.code,{children:"<svg>"})," with a ",e.jsx(s.code,{children:"<use>"}),`
that references a symbol injected into a shared sprite sheet.`]}),`
`,e.jsx(s.h3,{id:"multiple-icons-example",children:"Multiple Icons Example"}),`
`,e.jsx(s.p,{children:"You can define and render multiple icons with different names."}),`
`,e.jsx(n,{language:"tsx",code:m}),`
`,e.jsx(r,{of:p}),`
`,e.jsxs(s.p,{children:["When using SVG icons with ",e.jsx(s.code,{children:"useSVGSprite"}),`, three attributes are crucial for optimal
performance and visual consistency:`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"viewBox"}),`: This attribute defines the coordinate system and aspect ratio of your
SVG. It ensures your icon scales correctly and maintains its proportions when
resized. Without a proper `,e.jsx(s.code,{children:"viewBox"}),`, icons might appear distorted or incorrectly
positioned.`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"width"})," and ",e.jsx(s.code,{children:"height"}),`: These attributes are essential for preventing layout shifts
during page load. By specifying these dimensions, the browser can reserve the
correct amount of space for the icon before it's fully rendered. This improves
the Cumulative Layout Shift (CLS) metric and overall user experience.`]})]})}function B(t={}){const{wrapper:s}={...o(),...t.components};return s?e.jsx(s,{...t,children:e.jsx(i,{...t})}):i(t)}export{B as default};
