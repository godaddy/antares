import{j as e}from"./iframe-BCszq3eK.js";import{useMDXComponents as s}from"./index-LKpQAWkf.js";import{M as d,S as n,A as l}from"./blocks-D9Q5yeht.js";import{S as a,P as c}from"./divider.stories-mIL6cZFo.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BrwSF4p2.js";import"./index-2m5hP8oV.js";import"./index-D4iQz-eU.js";import"./index-DrFu-skq.js";import"./index-DnuDHN96.js";import"./index-BXcyZY8V.js";import"./mergeProps-uWb1iR1l.js";import"./SSRProvider-DuyXPnH5.js";import"./clsx-B-dksMZM.js";import"./slots-CmkOLRm9.js";import"./index-CLj43KZG.js";import"./index-CWO7E0mG.js";const h=`/* v8 ignore next */
import React from 'react';
import { Divider } from '@bento/divider';

export function Default() {
  return <Divider />;
}
`,p=`/* v8 ignore next */
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
`,m=`/* v8 ignore next */
import React from 'react';
import { Divider } from '@bento/divider';

export function VerticalDiv() {
  return (
    <div style={{ height: '100px', display: 'flex', alignItems: 'center' }}>
      <Divider orientation="vertical" />
    </div>
  );
}
`,o=`/* v8 ignore next */
import React from 'react';
import { Divider } from '@bento/divider';

export function VerticalStyleOverride() {
  return <Divider orientation="vertical" style={{ height: '100px' }} />;
}
`;function r(t){const i={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:a,name:"Overview"}),`
`,e.jsx(i.h1,{id:"divider",children:"Divider"}),`
`,e.jsxs(i.p,{children:["The ",e.jsx(i.code,{children:"@bento/divider"})," package exports the ",e.jsx(i.strong,{children:"Divider"})," component, which provides a stylable and accessible ",e.jsx(i.code,{children:"<hr>"})," element which can be oriented horizontally or vertically to visually and semantically separate content."]}),`
`,e.jsx(i.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-bash",children:`npm install --save @bento/divider
`})}),`
`,e.jsx(i.h2,{id:"props",children:"Props"}),`
`,e.jsxs(i.p,{children:["The ",e.jsx(i.code,{children:"@bento/divider"})," package exports the ",e.jsx(i.code,{children:"Divider"})," component:"]}),`
`,e.jsx(n,{language:"tsx",code:h}),`
`,e.jsxs(i.p,{children:["The following properties are available to be used on the ",e.jsx(i.code,{children:"Divider"})," component:"]}),`
`,e.jsx(l,{of:c}),`
`,e.jsx(i.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(i.h3,{id:"orientation",children:"Orientation"}),`
`,e.jsxs(i.p,{children:["The ",e.jsx(i.code,{children:"orientation"})," prop allows you to specify the orientation of the divider. It can be set to either ",e.jsx(i.code,{children:"horizontal"})," or ",e.jsx(i.code,{children:"vertical"}),". The default value is ",e.jsx(i.code,{children:"horizontal"}),"."]}),`
`,e.jsx(n,{language:"tsx",code:o}),`
`,e.jsx(i.h2,{id:"data-override",children:"Data Override"}),`
`,e.jsxs(i.p,{children:["The ",e.jsx(i.code,{children:"Divider"})," component adds the ",e.jsx(i.code,{children:"data-override"})," data attribute to the rendered element when the component has been overridden by a custom ",e.jsx(i.code,{children:"className"})," or ",e.jsx(i.code,{children:"style"})," respectively. For example, if you override the ",e.jsx(i.code,{children:"Divider"})," component with a custom ",e.jsx(i.code,{children:"className"}),", the rendered element will have a ",e.jsx(i.code,{children:"data-override"})," attribute set to ",e.jsx(i.code,{children:'"classname"'}),". This allows you to easily identify when the component has been overridden and apply custom styles or behavior accordingly."]}),`
`,e.jsx(i.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(i.p,{children:["The ",e.jsx(i.code,{children:"Divider"})," component automatically handles accessibility features:"]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"ARIA Attributes/Screen Reader Support"}),": Automatically applies ",e.jsx(i.code,{children:"aria-orientation"})," to indicate visual orientation to assistive technologies."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Semantic HTML"}),": Uses the ",e.jsx(i.code,{children:"<hr>"})," element to convey the semantic purpose of the rendered element to screen readers."]}),`
`]}),`
`,e.jsx(i.h2,{id:"customization",children:"Customization"}),`
`,e.jsxs(i.p,{children:["You can customize the ",e.jsx(i.code,{children:"Divider"})," component by providing your own class names, ",e.jsx(i.code,{children:"style"}),"s, or by wrapping your ",e.jsx(i.code,{children:"Divider"})," in another styled component."]}),`
`,e.jsxs(i.h3,{id:"add-your-own-styles-with-a-classname",children:["Add your own styles with a ",e.jsx(i.code,{children:"className"})]}),`
`,e.jsxs(i.p,{children:["The best way to style the ",e.jsx(i.code,{children:"Divider"})," component is to add your own ",e.jsx(i.code,{children:"className"})," to the component and then use that class to style the divider. ",e.jsxs(i.strong,{children:["The ",e.jsx(i.code,{children:"Divider"})," component won't automatically merge your class with the default styles. You will need to provide a render function to achieve this, as shown below."]})]}),`
`,e.jsxs(i.p,{children:["This will add a ",e.jsx(i.code,{children:"data-override='classname'"})," attribute to the rendered element."]}),`
`,e.jsx(n,{language:"tsx",code:p}),`
`,e.jsxs(i.h3,{id:"add-your-own-styles-with-the-style-prop",children:["Add your own styles with the ",e.jsx(i.code,{children:"style"})," prop"]}),`
`,e.jsxs(i.p,{children:["You can also add your own styles to the ",e.jsx(i.code,{children:"Divider"})," component by using the ",e.jsx(i.code,{children:"style"})," prop. This allows you to override the default styles of the divider and will add a ",e.jsx(i.code,{children:"data-override='style'"})," attribute to the rendered element."]}),`
`,e.jsx(n,{language:"tsx",code:o}),`
`,e.jsxs(i.h3,{id:"add-your-own-styles-by-wrapping-the-divider-in-another-styled-component",children:["Add your own styles by wrapping the ",e.jsx(i.code,{children:"Divider"})," in another styled component"]}),`
`,e.jsxs(i.p,{children:["You can also wrap the ",e.jsx(i.code,{children:"Divider"})," component in another styled component to apply your own styles. This allows you to have more control over the styling of the divider and will not require you to merge class names or styles."]}),`
`,e.jsx(n,{language:"tsx",code:m})]})}function z(t={}){const{wrapper:i}={...s(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{z as default};
