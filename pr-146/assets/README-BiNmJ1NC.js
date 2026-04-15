import{j as e}from"./iframe-CFbvAMt4.js";import{useMDXComponents as i}from"./index-BVZTzHhQ.js";import{M as o,A as l,S as t}from"./blocks-ZM53LnYJ.js";import{S as a,P as d}from"./pressable.stories-4eimKcbH.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C70cCOwD.js";import"./index-Rp5O-AnQ.js";import"./index-CL47zJHF.js";import"./index-DrFu-skq.js";import"./index-D1KAb3an.js";import"./mergeProps-Bka8Jxbh.js";import"./clsx-DMFXSSP5.js";import"./slots-DKU5GXw6.js";import"./index-BotUJ0jx.js";import"./index-CLj43KZG.js";import"./index-B6Ixxdps.js";import"./index-BZk8MZOZ.js";import"./useFocusable-CkVQvVnK.js";import"./useFocusWithin-DwrOTBLN.js";import"./DOMFunctions-DY9RYDsQ.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-ZFzQB34m.js";import"./useObjectRef-C6URdWSn.js";const c=`import { Pressable } from '@bento/pressable';
/* v8 ignore next */
import React from 'react';

export function PressableDivExample() {
  return (
    <Pressable
      onPress={function handlePress() {
        console.log('div pressed!');
      }}
    >
      <div>Pressable Div</div>
    </Pressable>
  );
}
`,h=`import { Pressable } from '@bento/pressable';
/* v8 ignore next */
import React from 'react';

export function PressableLinkExample() {
  return (
    <Pressable
      onPress={function handlePress() {
        console.log('link pressed!');
      }}
    >
      <a href="/">Pressable Link</a>
    </Pressable>
  );
}
`,p=`import { Pressable } from '@bento/pressable';
/* v8 ignore next */
import React from 'react';

//
// to make a custom component pressable, you need to forward the ref to the
// child element and pass the props to the child element
//
const CustomComponent = React.forwardRef<HTMLDivElement>(function CustomComponent(props, ref) {
  return (
    <div {...props} ref={ref}>
      Custom Component
    </div>
  );
});

export function PressableCustomExample() {
  return (
    <Pressable
      onPress={function handlePress() {
        console.log('custom component pressed!');
      }}
    >
      <CustomComponent />
    </Pressable>
  );
}
`;function r(s){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:a,name:"Overview"}),`
`,e.jsx(n.h1,{id:"pressable",children:"Pressable"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/pressable"})," package provides a standardized foundation for interactive elements in the Bento library. It exports the ",e.jsx(n.strong,{children:"Pressable"})," primitive, which provides consistent press interactions and accessibility features for building interactive components."]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install --save @bento/pressable
`})}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/pressable"})," package exports the ",e.jsx(n.code,{children:"Pressable"})," primitive:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { Pressable } from '@bento/pressable';

<Pressable onPress={() => console.log('Div pressed!')}>
  <div>Press me</div>
</Pressable>
`})}),`
`,e.jsxs(n.p,{children:["The following properties are available to be used on the ",e.jsx(n.code,{children:"Pressable"})," primitive:"]}),`
`,e.jsx(l,{of:d}),`
`,e.jsxs(n.p,{children:["For all other properties specified on the ",e.jsx(n.code,{children:"Pressable"})," primitive, the component will pass them down to the direct child element of the component. Which would be the equivalent of you adding them directly to the child element."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Pressable } from '@bento/pressable';

function MyComponent() {
  return (
    <Pressable onPress={() => console.log('Pressed!')}>
      <div>Press me</div>
    </Pressable>
  );
}
`})}),`
`,e.jsx(n.h3,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h4,{id:"basic-div-element",children:"Basic Div Element"}),`
`,e.jsx(n.p,{children:"The simplest way to use Pressable is to wrap a div element. The component will handle all the necessary accessibility features and interaction states."}),`
`,e.jsx(t,{language:"tsx",code:c}),`
`,e.jsx(n.h4,{id:"link-element",children:"Link Element"}),`
`,e.jsx(n.p,{children:"You can also make link elements pressable while maintaining their semantic meaning and default browser behavior."}),`
`,e.jsx(t,{language:"tsx",code:h}),`
`,e.jsx(n.h4,{id:"custom-component",children:"Custom Component"}),`
`,e.jsx(n.p,{children:"For custom components, you need to forward the ref and pass props to the underlying element to ensure proper functionality."}),`
`,e.jsx(t,{language:"tsx",code:p}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(n.p,{children:"The Pressable component automatically handles accessibility features:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Keyboard Navigation"}),": Supports Enter and Space key activation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Focus Management"}),": Proper focus handling and focus-visible states"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ARIA Attributes"}),": Automatically applies appropriate ARIA attributes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Screen Reader Support"}),": Works seamlessly with assistive technologies"]}),`
`]}),`
`,e.jsx(n.h3,{id:"data-attributes",children:"Data Attributes"}),`
`,e.jsx(n.p,{children:"The following data attributes are exposed and can be used for styling:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Attribute"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Example Values"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-pressed"})}),e.jsx(n.td,{children:"Indicates the element is being pressed"}),e.jsx(n.td,{children:'"true"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-hovered"})}),e.jsx(n.td,{children:"Indicates the element is hovered"}),e.jsx(n.td,{children:'"true"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-focused"})}),e.jsx(n.td,{children:"Indicates the element has focus"}),e.jsx(n.td,{children:'"true"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-focus-visible"})}),e.jsx(n.td,{children:"Indicates focus should be visible (keyboard navigation)"}),e.jsx(n.td,{children:'"true"'})]})]})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`[data-pressed='true'] {
  background-color: #ccc;
}

[data-focus-visible='true'] {
  outline: 2px solid blue;
}
`})})]})}function F(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{F as default};
