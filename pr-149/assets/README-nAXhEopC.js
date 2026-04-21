import{j as e}from"./iframe-DsdbgEAN.js";import{useMDXComponents as i}from"./index-D4CwabMa.js";import{M as r,A as l,S as a,a as c,f as d}from"./blocks-B4KeIAem.js";import{S as h,P as p,D as o}from"./illustration.stories-nYB6y5oL.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CWBbxuIh.js";import"./index-CkUPM2qk.js";import"./index-uRl_K3Uj.js";import"./index-DrFu-skq.js";import"./index-KVrGFib_.js";import"./slots-CxH4QBkg.js";import"./index-D1Ks4gGt.js";import"./index-CLj43KZG.js";import"./index-C19r2fWI.js";import"./mergeProps-C60AXrlQ.js";import"./clsx-W8eOZR1m.js";import"./index-LF6fHeKE.js";const m=`import { Illustration } from '@bento/illustration';
import { type UnknownObject } from '@bento/types';
/* v8 ignore next */

/**
 * Example component demonstrating SVG rendering with Illustration.
 *
 * @param {UnknownObject} args - The component props.
 * @returns {JSX.Element} The rendered component with SVG illustration.
 * @public
 */
export function RenderingSvg(args: UnknownObject) {
  return (
    <Illustration {...args}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"
        />
      </svg>
    </Illustration>
  );
}
`;function s(t){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:h,name:"Overview"}),`
`,e.jsx(n.h1,{id:"illustration",children:"Illustration"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/illustration"}),` component allows you to render and manipulate SVG
based illustrations while following the best practices for accessibility. The
component is meant to wrap around your SVG content so it can introduce the
required accessibility standards and provides a way to manipulate the SVG
content using the provided properties.`]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-shell",children:`npm install --save @bento/illustration
`})}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/illustration"})," exports the ",e.jsx(n.code,{children:"Illustration"}),` component. When rendering
the component without any supplied properties, the component will automatically
apply the following properties:`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"focusable=false"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"role=presentation"})}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { Illustration } from '@bento/illustration';

<Illustration>
  <YourSvg>
</Illustration>
`})}),`
`,e.jsxs(n.p,{children:["The following properties are available to be used on the ",e.jsx(n.code,{children:"Illustration"}),`
component:`]}),`
`,e.jsx(l,{of:p}),`
`,e.jsxs(n.p,{children:["For all other properties specified on the ",e.jsx(n.code,{children:"Illustration"}),` component, the
component will pass them down to the root SVG element of the component. Which
would be the equivalent of you adding them directly to the child component.`]}),`
`,e.jsx(n.h3,{id:"example",children:"Example"}),`
`,e.jsx(a,{language:"tsx",code:m}),`
`,e.jsx(c,{of:o,inline:!0}),`
`,e.jsx(d,{of:o}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"title"}),": The ",e.jsx(n.code,{children:"title"})," attribute describes the illustration to screen readers."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"role"}),": The ",e.jsx(n.code,{children:"role"})," attribute is default set to ",e.jsx(n.code,{children:"presentation"}),` but is
swapped to `,e.jsx(n.code,{children:"img"})," when a ",e.jsx(n.code,{children:"title"})," attribute is provided."]}),`
`]}),`
`,e.jsx(n.h2,{id:"customization",children:"Customization"}),`
`,e.jsxs(n.p,{children:["When using the ",e.jsx(n.code,{children:"flip"})," or ",e.jsx(n.code,{children:"rotate"}),` properties, the component will apply the
required transformations inside the SVG element by introducing a wrapping
`,e.jsx(n.code,{children:"<g>"})," element."]}),`
`,e.jsx(n.p,{children:`The transformations are not applied using CSS because they would affect the
elements around the SVG content.`}),`
`,e.jsx(n.p,{children:"What's the difference between CSS transformations?"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:`If you rotate an SVG by 90 degrees in CSS, the SVG's bounding box remains the
same. The 16x24 icon still takes space for 16x24, but it might overlap elements
around it.`}),`
`,e.jsx(n.li,{children:`If you rotate an SVG by 90 degrees in SVG Framework, the SVG's dimensions swap
places. 16x24 icon becomes a 24x16 icon, and it does not affect the elements
around it.`}),`
`]}),`
`,e.jsxs(n.p,{children:[`By applying the transformations to the SVG element by default, we've given you
the option to choose how you want to apply the transformations. Use the props
provided by the component to apply the transformations directly to the SVG
element or introduce the `,e.jsx(n.code,{children:"className"}),` property to apply the transformations
yourself using CSS, which is the recommended approach when you want to introduce
animations to the component.`]}),`
`,e.jsx(n.h3,{id:"slots",children:"Slots"}),`
`,e.jsxs(n.p,{children:["The component is created using our ",e.jsx(n.code,{children:"@bento/slots"}),` package and allows the
assignment of the custom `,e.jsx(n.code,{children:"slot"})," property to be used for overrides."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { useProps } from '@bento/use-props';
import { Illustration } from '@bento/illustration';
import { withSlots } from '@bento/slots';

const MyCustomComponent = withSlots('MyCustomComponent', function Custom(args) {
  const { props } = useProps(args);

  return (
    <Illustration {...props} slot="illustration">
      <ContentsHere />
    </Illustration>
  )
});
`})}),`
`,e.jsxs(n.p,{children:["See the ",e.jsx(n.code,{children:"@bento/slots"})," package for more information on how to use the ",e.jsx(n.code,{children:"slot"}),` and
`,e.jsx(n.code,{children:"slots"})," properties."]}),`
`,e.jsx(n.h3,{id:"styling",children:"Styling"}),`
`,e.jsxs(n.p,{children:["Once you assign the ",e.jsx(n.code,{children:"className"}),` property to the component, you take full
responsibility for the styling of the component, and it will remove any
default styling that might be applied as part of this component.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { Illustration } from '@bento/illustration';

<Illustration className="my-component">
  <YourSvg>
</Illustration>
`})}),`
`,e.jsxs(n.p,{children:["The following ",e.jsx(n.code,{children:"data-"}),` attributes are introduced as part of the component
render state:`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"data-flip=horizontal|vertical"}),`: The component is flipped horizontally or
vertically using the provided `,e.jsx(n.code,{children:"flip"})," property."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"data-rotate=90|180|270"}),`: The component is rotated by the provided angle
using the `,e.jsx(n.code,{children:"rotate"})," property."]}),`
`]}),`
`,e.jsxs(n.p,{children:["These ",e.jsx(n.code,{children:"data-"}),` attributes are introduced on the root element of the component
and can be targeted using your previously provided custom `,e.jsx(n.code,{children:"className"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`.my-component[data-flip] {
  /* The component is flipped */
}

.my-component[data-rotate] {
  /* The component is rotated */
}
`})}),`
`,e.jsxs(n.p,{children:["To detect if the component has received a ",e.jsx(n.code,{children:"title"}),` attribute, you can
use the following CSS selectors:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`.my-component:has(title) {
  /* We have a <title> element as part of rendered result */
}
.my-component[role="img"] {
  /* The role is swapped to \`img\` from \`presentation\` when a title is provided */
}
`})})]})}function k(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{k as default};
