import{i as e}from"./preload-helper-D_yoP-vb.js";import{y as t}from"./iframe-DFJFfto3.js";import{S as n,c as r,n as i,s as a,u as o}from"./blocks-C6715OeW.js";import{t as s}from"./mdx-react-shim-CirHBfrt.js";import{Props as c,n as l,t as u}from"./pressable.stories-Cj_KDrw-.js";var d,f=e((()=>{d=`import { Pressable } from '@bento/pressable';
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
`})),p,m=e((()=>{p=`import { Pressable } from '@bento/pressable';
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
`})),h,g=e((()=>{h=`import { Pressable } from '@bento/pressable';
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
`}));function _(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(a,{of:l,name:`Overview`}),`
`,(0,y.jsx)(t.h1,{id:`pressable`,children:`Pressable`}),`
`,(0,y.jsxs)(t.p,{children:[`The `,(0,y.jsx)(t.code,{children:`@bento/pressable`}),` package provides a standardized foundation for interactive elements in the Bento library. It exports the `,(0,y.jsx)(t.strong,{children:`Pressable`}),` primitive, which provides consistent press interactions and accessibility features for building interactive components.`]}),`
`,(0,y.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-bash`,children:`npm install --save @bento/pressable
`})}),`
`,(0,y.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,y.jsxs)(t.p,{children:[`The `,(0,y.jsx)(t.code,{children:`@bento/pressable`}),` package exports the `,(0,y.jsx)(t.code,{children:`Pressable`}),` primitive:`]}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-jsx`,children:`import { Pressable } from '@bento/pressable';

<Pressable onPress={() => console.log('Div pressed!')}>
  <div>Press me</div>
</Pressable>
`})}),`
`,(0,y.jsxs)(t.p,{children:[`The following properties are available to be used on the `,(0,y.jsx)(t.code,{children:`Pressable`}),` primitive:`]}),`
`,(0,y.jsx)(i,{of:c}),`
`,(0,y.jsxs)(t.p,{children:[`For all other properties specified on the `,(0,y.jsx)(t.code,{children:`Pressable`}),` primitive, the component will pass them down to the direct child element of the component. Which would be the equivalent of you adding them directly to the child element.`]}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-tsx`,children:`import { Pressable } from '@bento/pressable';

function MyComponent() {
  return (
    <Pressable onPress={() => console.log('Pressed!')}>
      <div>Press me</div>
    </Pressable>
  );
}
`})}),`
`,(0,y.jsx)(t.h3,{id:`examples`,children:`Examples`}),`
`,(0,y.jsx)(t.h4,{id:`basic-div-element`,children:`Basic Div Element`}),`
`,(0,y.jsx)(t.p,{children:`The simplest way to use Pressable is to wrap a div element. The component will handle all the necessary accessibility features and interaction states.`}),`
`,(0,y.jsx)(r,{language:`tsx`,code:d}),`
`,(0,y.jsx)(t.h4,{id:`link-element`,children:`Link Element`}),`
`,(0,y.jsx)(t.p,{children:`You can also make link elements pressable while maintaining their semantic meaning and default browser behavior.`}),`
`,(0,y.jsx)(r,{language:`tsx`,code:p}),`
`,(0,y.jsx)(t.h4,{id:`custom-component`,children:`Custom Component`}),`
`,(0,y.jsx)(t.p,{children:`For custom components, you need to forward the ref and pass props to the underlying element to ensure proper functionality.`}),`
`,(0,y.jsx)(r,{language:`tsx`,code:h}),`
`,(0,y.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,y.jsx)(t.p,{children:`The Pressable component automatically handles accessibility features:`}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:`Keyboard Navigation`}),`: Supports Enter and Space key activation`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:`Focus Management`}),`: Proper focus handling and focus-visible states`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:`ARIA Attributes`}),`: Automatically applies appropriate ARIA attributes`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:`Screen Reader Support`}),`: Works seamlessly with assistive technologies`]}),`
`]}),`
`,(0,y.jsx)(t.h3,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,y.jsx)(t.p,{children:`The following data attributes are exposed and can be used for styling:`}),`
`,(0,y.jsxs)(t.table,{children:[(0,y.jsx)(t.thead,{children:(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.th,{children:`Attribute`}),(0,y.jsx)(t.th,{children:`Description`}),(0,y.jsx)(t.th,{children:`Example Values`})]})}),(0,y.jsxs)(t.tbody,{children:[(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.td,{children:(0,y.jsx)(t.code,{children:`data-pressed`})}),(0,y.jsx)(t.td,{children:`Indicates the element is being pressed`}),(0,y.jsx)(t.td,{children:`"true"`})]}),(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.td,{children:(0,y.jsx)(t.code,{children:`data-hovered`})}),(0,y.jsx)(t.td,{children:`Indicates the element is hovered`}),(0,y.jsx)(t.td,{children:`"true"`})]}),(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.td,{children:(0,y.jsx)(t.code,{children:`data-focused`})}),(0,y.jsx)(t.td,{children:`Indicates the element has focus`}),(0,y.jsx)(t.td,{children:`"true"`})]}),(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.td,{children:(0,y.jsx)(t.code,{children:`data-focus-visible`})}),(0,y.jsx)(t.td,{children:`Indicates focus should be visible (keyboard navigation)`}),(0,y.jsx)(t.td,{children:`"true"`})]})]})]}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-css`,children:`[data-pressed='true'] {
  background-color: #ccc;
}

[data-focus-visible='true'] {
  outline: 2px solid blue;
}
`})})]})}function v(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,y.jsx)(t,{...e,children:(0,y.jsx)(_,{...e})}):_(e)}var y;e((()=>{y=t(),s(),o(),u(),f(),m(),g()}))();export{v as default};