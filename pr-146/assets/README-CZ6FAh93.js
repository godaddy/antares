import{j as t}from"./iframe-mIkG-ia4.js";import{useMDXComponents as o}from"./index-CYbcAVO_.js";import{M as a,A as r,S as i}from"./blocks-H-xBVXSD.js";import{S as c,u as d}from"./data-attributes.stories-CGcrwPns.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C8Gy-4ls.js";import"./index-BA5fCnJS.js";import"./index-qmzokPCi.js";import"./index-DrFu-skq.js";import"./slots-DysxeCnN.js";import"./index-C5i0zoNI.js";import"./index-CLj43KZG.js";import"./index-D5Js5omO.js";import"./mergeProps-VPp-_EQW.js";import"./clsx-CXVhVjWX.js";import"./index-CYB4ICH7.js";const u=`import { useDataAttributes } from '@bento/use-data-attributes';
import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
/* v8 ignore next */
import React, { useState } from 'react';

interface Example {
  [key: string]: any;
}

/**
 * Container component demonstrating data attributes usage.
 *
 * @param {object} args - The component props.
 * @returns {JSX.Element} The rendered div element with data attributes.
 * @public
 */
export const Container: React.FC<Example> = withSlots('MyDataPropsContainer', function Containers(args: object) {
  //
  // Always supply the \`useProps\` hook with the state of your component.
  // This allows the renderProps to refer the state of the component and render
  // the correct content accordingly.
  //
  const [loading] = useState(true);
  const { props } = useProps(args, { loading });

  const dataAttributes = useDataAttributes({
    loading,
    override: ['style', 'className', 'slots']
  });

  const { children, ...rest } = props;

  //
  // This is just to illustrate how props end up in the DOM as data attributes.
  // In a real-world scenario, you would use the \`useDataAttributes\` hook as
  // referenced above with a curated list of attributes to expose.
  //
  const data = useDataAttributes(rest);
  return (
    <div {...dataAttributes} {...data}>
      {children}
    </div>
  );
});
`;function s(n){const e={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...o(),...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(a,{of:c,name:"Overview"}),`
`,t.jsx(e.h1,{id:"data-attributes",children:"Data Attributes"}),`
`,t.jsxs(e.p,{children:["The ",t.jsx(e.code,{children:"@bento/use-data-attributes"}),` package provides a hook that automatically
converts a component’s props into `,t.jsx(e.code,{children:"data-"}),` attributes. This allows components to
expose their internal state to the DOM, making debugging and styling components
easier.`]}),`
`,t.jsx(e.h2,{id:"installation",children:"Installation"}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-shell",children:`npm install --save @bento/use-data-attributes
`})}),`
`,t.jsx(e.h2,{id:"usedataattributes",children:"useDataAttributes"}),`
`,t.jsxs(e.p,{children:["The ",t.jsx(e.code,{children:"useDataAttributes"})," automatically transforms any given ",t.jsx(e.code,{children:"object"}),` into its
`,t.jsx(e.code,{children:"data-"}),` attribute equivalent, transforming the values into strings. The resulting
object only contains the `,t.jsx(e.code,{children:"data-"})," prefixed attributes."]}),`
`,t.jsxs(e.p,{children:["It's worth noting that this hook does not merge the created ",t.jsx(e.code,{children:"data-"}),` attributes
with the existing ones. The user is left to decide on the correct merge strategy.`]}),`
`,t.jsxs(e.p,{children:["The ",t.jsx(e.code,{children:"useDataAttributes"})," hook takes an object with the following arguments:"]}),`
`,t.jsx(r,{of:d}),`
`,t.jsxs(e.p,{children:["As the ",t.jsx(e.code,{children:"data-"}),` attributes end up in the DOM, their values are automatically
transformed into strings. This is done using the `,t.jsx(e.code,{children:"@bento/as-value-attribute"}),`
package. The package automatically formats the `,t.jsx(e.code,{children:"data"}),` based on the type of the
value given.`]}),`
`,t.jsx(i,{language:"tsx",code:u})]})}function M(n={}){const{wrapper:e}={...o(),...n.components};return e?t.jsx(e,{...n,children:t.jsx(s,{...n})}):s(n)}export{M as default};
