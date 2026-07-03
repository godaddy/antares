import{i as e}from"./preload-helper-Cf5dhQLl.js";import{y as t}from"./iframe-DztRp4DG.js";import{S as n,c as r,i,l as a,n as o,s,u as c}from"./blocks-CRmdQ6xa.js";import{t as l}from"./mdx-react-shim-f0W3XfDa.js";import{Demo as u,Props as d,n as f,t as p}from"./illustration.stories-5KEdS6pt.js";var m,h=e((()=>{m=`import { Illustration } from '@bento/illustration';
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
`}));function g(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(s,{of:p,name:`Overview`}),`
`,(0,v.jsx)(t.h1,{id:`illustration`,children:`Illustration`}),`
`,(0,v.jsxs)(t.p,{children:[`The `,(0,v.jsx)(t.code,{children:`@bento/illustration`}),` component allows you to render and manipulate SVG
based illustrations while following the best practices for accessibility. The
component is meant to wrap around your SVG content so it can introduce the
required accessibility standards and provides a way to manipulate the SVG
content using the provided properties.`]}),`
`,(0,v.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,v.jsx)(t.pre,{children:(0,v.jsx)(t.code,{className:`language-shell`,children:`npm install --save @bento/illustration
`})}),`
`,(0,v.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,v.jsxs)(t.p,{children:[`The `,(0,v.jsx)(t.code,{children:`@bento/illustration`}),` exports the `,(0,v.jsx)(t.code,{children:`Illustration`}),` component. When rendering
the component without any supplied properties, the component will automatically
apply the following properties:`]}),`
`,(0,v.jsxs)(t.ul,{children:[`
`,(0,v.jsx)(t.li,{children:(0,v.jsx)(t.code,{children:`focusable=false`})}),`
`,(0,v.jsx)(t.li,{children:(0,v.jsx)(t.code,{children:`role=presentation`})}),`
`]}),`
`,(0,v.jsx)(t.pre,{children:(0,v.jsx)(t.code,{className:`language-jsx`,children:`import { Illustration } from '@bento/illustration';

<Illustration>
  <YourSvg>
</Illustration>
`})}),`
`,(0,v.jsxs)(t.p,{children:[`The following properties are available to be used on the `,(0,v.jsx)(t.code,{children:`Illustration`}),`
component:`]}),`
`,(0,v.jsx)(o,{of:d}),`
`,(0,v.jsxs)(t.p,{children:[`For all other properties specified on the `,(0,v.jsx)(t.code,{children:`Illustration`}),` component, the
component will pass them down to the root SVG element of the component. Which
would be the equivalent of you adding them directly to the child component.`]}),`
`,(0,v.jsx)(t.h3,{id:`example`,children:`Example`}),`
`,(0,v.jsx)(r,{language:`tsx`,code:m}),`
`,(0,v.jsx)(a,{of:u,inline:!0}),`
`,(0,v.jsx)(i,{of:u}),`
`,(0,v.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,v.jsxs)(t.ul,{children:[`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.code,{children:`title`}),`: The `,(0,v.jsx)(t.code,{children:`title`}),` attribute describes the illustration to screen readers.`]}),`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.code,{children:`role`}),`: The `,(0,v.jsx)(t.code,{children:`role`}),` attribute is default set to `,(0,v.jsx)(t.code,{children:`presentation`}),` but is
swapped to `,(0,v.jsx)(t.code,{children:`img`}),` when a `,(0,v.jsx)(t.code,{children:`title`}),` attribute is provided.`]}),`
`]}),`
`,(0,v.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,v.jsxs)(t.p,{children:[`When using the `,(0,v.jsx)(t.code,{children:`flip`}),` or `,(0,v.jsx)(t.code,{children:`rotate`}),` properties, the component will apply the
required transformations inside the SVG element by introducing a wrapping
`,(0,v.jsx)(t.code,{children:`<g>`}),` element.`]}),`
`,(0,v.jsx)(t.p,{children:`The transformations are not applied using CSS because they would affect the
elements around the SVG content.`}),`
`,(0,v.jsx)(t.p,{children:`What's the difference between CSS transformations?`}),`
`,(0,v.jsxs)(t.ul,{children:[`
`,(0,v.jsx)(t.li,{children:`If you rotate an SVG by 90 degrees in CSS, the SVG's bounding box remains the
same. The 16x24 icon still takes space for 16x24, but it might overlap elements
around it.`}),`
`,(0,v.jsx)(t.li,{children:`If you rotate an SVG by 90 degrees in SVG Framework, the SVG's dimensions swap
places. 16x24 icon becomes a 24x16 icon, and it does not affect the elements
around it.`}),`
`]}),`
`,(0,v.jsxs)(t.p,{children:[`By applying the transformations to the SVG element by default, we've given you
the option to choose how you want to apply the transformations. Use the props
provided by the component to apply the transformations directly to the SVG
element or introduce the `,(0,v.jsx)(t.code,{children:`className`}),` property to apply the transformations
yourself using CSS, which is the recommended approach when you want to introduce
animations to the component.`]}),`
`,(0,v.jsx)(t.h3,{id:`slots`,children:`Slots`}),`
`,(0,v.jsxs)(t.p,{children:[`The component is created using our `,(0,v.jsx)(t.code,{children:`@bento/slots`}),` package and allows the
assignment of the custom `,(0,v.jsx)(t.code,{children:`slot`}),` property to be used for overrides.`]}),`
`,(0,v.jsx)(t.pre,{children:(0,v.jsx)(t.code,{className:`language-jsx`,children:`import { useProps } from '@bento/use-props';
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
`,(0,v.jsxs)(t.p,{children:[`See the `,(0,v.jsx)(t.code,{children:`@bento/slots`}),` package for more information on how to use the `,(0,v.jsx)(t.code,{children:`slot`}),` and
`,(0,v.jsx)(t.code,{children:`slots`}),` properties.`]}),`
`,(0,v.jsx)(t.h3,{id:`styling`,children:`Styling`}),`
`,(0,v.jsxs)(t.p,{children:[`Once you assign the `,(0,v.jsx)(t.code,{children:`className`}),` property to the component, you take full
responsibility for the styling of the component, and it will remove any
default styling that might be applied as part of this component.`]}),`
`,(0,v.jsx)(t.pre,{children:(0,v.jsx)(t.code,{className:`language-jsx`,children:`import { Illustration } from '@bento/illustration';

<Illustration className="my-component">
  <YourSvg>
</Illustration>
`})}),`
`,(0,v.jsxs)(t.p,{children:[`The following `,(0,v.jsx)(t.code,{children:`data-`}),` attributes are introduced as part of the component
render state:`]}),`
`,(0,v.jsxs)(t.ul,{children:[`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.code,{children:`data-flip=horizontal|vertical`}),`: The component is flipped horizontally or
vertically using the provided `,(0,v.jsx)(t.code,{children:`flip`}),` property.`]}),`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.code,{children:`data-rotate=90|180|270`}),`: The component is rotated by the provided angle
using the `,(0,v.jsx)(t.code,{children:`rotate`}),` property.`]}),`
`]}),`
`,(0,v.jsxs)(t.p,{children:[`These `,(0,v.jsx)(t.code,{children:`data-`}),` attributes are introduced on the root element of the component
and can be targeted using your previously provided custom `,(0,v.jsx)(t.code,{children:`className`}),`:`]}),`
`,(0,v.jsx)(t.pre,{children:(0,v.jsx)(t.code,{className:`language-css`,children:`.my-component[data-flip] {
  /* The component is flipped */
}

.my-component[data-rotate] {
  /* The component is rotated */
}
`})}),`
`,(0,v.jsxs)(t.p,{children:[`To detect if the component has received a `,(0,v.jsx)(t.code,{children:`title`}),` attribute, you can
use the following CSS selectors:`]}),`
`,(0,v.jsx)(t.pre,{children:(0,v.jsx)(t.code,{className:`language-css`,children:`.my-component:has(title) {
  /* We have a <title> element as part of rendered result */
}
.my-component[role="img"] {
  /* The role is swapped to \`img\` from \`presentation\` when a title is provided */
}
`})})]})}function _(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,v.jsx)(t,{...e,children:(0,v.jsx)(g,{...e})}):g(e)}var v;e((()=>{v=t(),l(),c(),f(),h()}))();export{_ as default};