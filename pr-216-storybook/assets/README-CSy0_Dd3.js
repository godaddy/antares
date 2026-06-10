import{i as e}from"./preload-helper-usAeo7Bx.js";import{y as t}from"./iframe-Il5THdGS.js";import{S as n,c as r,n as i,s as a,u as o}from"./blocks-Dl26SpeW.js";import{t as s}from"./mdx-react-shim-Cn9Z58T1.js";import{Props as c,n as l,t as u}from"./divider.stories-BSNXN86o.js";var d,f=e((()=>{d=`/* v8 ignore next */
import React from 'react';
import { Divider } from '@bento/divider';

export function Default() {
  return <Divider />;
}
`})),p,m=e((()=>{p=`/* v8 ignore next */
import React from 'react';
import { Divider } from '@bento/divider';
import { withSlots } from '@bento/slots';

export const MergeClassName = withSlots('DividerClassNameOverrideExample', function MergeClassName() {
  return (
    <Divider
      orientation="vertical"
      className={function mergeClassNames({ original }: { original: string }) {
        return ['custom-divider-class', original].filter(Boolean).join(' ');
      }}
      style={{ height: '100px' }}
    />
  );
});
`})),h,g=e((()=>{h=`/* v8 ignore next */
import React from 'react';
import { Divider } from '@bento/divider';

export function VerticalDiv() {
  return (
    <div style={{ height: '100px', display: 'flex', alignItems: 'center' }}>
      <Divider orientation="vertical" />
    </div>
  );
}
`})),_,v=e((()=>{_=`/* v8 ignore next */
import React from 'react';
import { Divider } from '@bento/divider';

export function VerticalStyleOverride() {
  return <Divider orientation="vertical" style={{ height: '100px' }} />;
}
`}));function y(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(a,{of:u,name:`Overview`}),`
`,(0,x.jsx)(t.h1,{id:`divider`,children:`Divider`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`@bento/divider`}),` package exports the `,(0,x.jsx)(t.strong,{children:`Divider`}),` component, which provides a stylable and accessible `,(0,x.jsx)(t.code,{children:`<hr>`}),` element which can be oriented horizontally or vertically to visually and semantically separate content.`]}),`
`,(0,x.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-bash`,children:`npm install --save @bento/divider
`})}),`
`,(0,x.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`@bento/divider`}),` package exports the `,(0,x.jsx)(t.code,{children:`Divider`}),` component:`]}),`
`,(0,x.jsx)(r,{language:`tsx`,code:d}),`
`,(0,x.jsxs)(t.p,{children:[`The following properties are available to be used on the `,(0,x.jsx)(t.code,{children:`Divider`}),` component:`]}),`
`,(0,x.jsx)(i,{of:c}),`
`,(0,x.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,x.jsx)(t.h3,{id:`orientation`,children:`Orientation`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`orientation`}),` prop allows you to specify the orientation of the divider. It can be set to either `,(0,x.jsx)(t.code,{children:`horizontal`}),` or `,(0,x.jsx)(t.code,{children:`vertical`}),`. The default value is `,(0,x.jsx)(t.code,{children:`horizontal`}),`.`]}),`
`,(0,x.jsx)(r,{language:`tsx`,code:_}),`
`,(0,x.jsx)(t.h2,{id:`data-override`,children:`Data Override`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`Divider`}),` component adds the `,(0,x.jsx)(t.code,{children:`data-override`}),` data attribute to the rendered element when the component has been overridden by a custom `,(0,x.jsx)(t.code,{children:`className`}),` or `,(0,x.jsx)(t.code,{children:`style`}),` respectively. For example, if you override the `,(0,x.jsx)(t.code,{children:`Divider`}),` component with a custom `,(0,x.jsx)(t.code,{children:`className`}),`, the rendered element will have a `,(0,x.jsx)(t.code,{children:`data-override`}),` attribute set to `,(0,x.jsx)(t.code,{children:`"classname"`}),`. This allows you to easily identify when the component has been overridden and apply custom styles or behavior accordingly.`]}),`
`,(0,x.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`Divider`}),` component automatically handles accessibility features:`]}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`ARIA Attributes/Screen Reader Support`}),`: Automatically applies `,(0,x.jsx)(t.code,{children:`aria-orientation`}),` to indicate visual orientation to assistive technologies.`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`Semantic HTML`}),`: Uses the `,(0,x.jsx)(t.code,{children:`<hr>`}),` element to convey the semantic purpose of the rendered element to screen readers.`]}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,x.jsxs)(t.p,{children:[`You can customize the `,(0,x.jsx)(t.code,{children:`Divider`}),` component by providing your own class names, `,(0,x.jsx)(t.code,{children:`style`}),`s, or by wrapping your `,(0,x.jsx)(t.code,{children:`Divider`}),` in another styled component.`]}),`
`,(0,x.jsxs)(t.h3,{id:`add-your-own-styles-with-a-classname`,children:[`Add your own styles with a `,(0,x.jsx)(t.code,{children:`className`})]}),`
`,(0,x.jsxs)(t.p,{children:[`The best way to style the `,(0,x.jsx)(t.code,{children:`Divider`}),` component is to add your own `,(0,x.jsx)(t.code,{children:`className`}),` to the component and then use that class to style the divider. `,(0,x.jsxs)(t.strong,{children:[`The `,(0,x.jsx)(t.code,{children:`Divider`}),` component won't automatically merge your class with the default styles. You will need to provide a render function to achieve this, as shown below.`]})]}),`
`,(0,x.jsxs)(t.p,{children:[`This will add a `,(0,x.jsx)(t.code,{children:`data-override='classname'`}),` attribute to the rendered element.`]}),`
`,(0,x.jsx)(r,{language:`tsx`,code:p}),`
`,(0,x.jsxs)(t.h3,{id:`add-your-own-styles-with-the-style-prop`,children:[`Add your own styles with the `,(0,x.jsx)(t.code,{children:`style`}),` prop`]}),`
`,(0,x.jsxs)(t.p,{children:[`You can also add your own styles to the `,(0,x.jsx)(t.code,{children:`Divider`}),` component by using the `,(0,x.jsx)(t.code,{children:`style`}),` prop. This allows you to override the default styles of the divider and will add a `,(0,x.jsx)(t.code,{children:`data-override='style'`}),` attribute to the rendered element.`]}),`
`,(0,x.jsx)(r,{language:`tsx`,code:_}),`
`,(0,x.jsxs)(t.h3,{id:`add-your-own-styles-by-wrapping-the-divider-in-another-styled-component`,children:[`Add your own styles by wrapping the `,(0,x.jsx)(t.code,{children:`Divider`}),` in another styled component`]}),`
`,(0,x.jsxs)(t.p,{children:[`You can also wrap the `,(0,x.jsx)(t.code,{children:`Divider`}),` component in another styled component to apply your own styles. This allows you to have more control over the styling of the divider and will not require you to merge class names or styles.`]}),`
`,(0,x.jsx)(r,{language:`tsx`,code:h})]})}function b(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,x.jsx)(t,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;e((()=>{x=t(),s(),o(),l(),f(),m(),g(),v()}))();export{b as default};