import{i as e}from"./preload-helper-Cf5dhQLl.js";import{y as t}from"./iframe-41GhdOKN.js";import{S as n,c as r,n as i,s as a,u as o}from"./blocks-BZ7ysuGa.js";import{t as s}from"./mdx-react-shim-tH8KbBPu.js";import{n as c,t as l,useDataAttributesProps as u}from"./data-attributes.stories-Bn-53S0X.js";var d,f=e((()=>{d=`import { useDataAttributes } from '@bento/use-data-attributes';
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
`}));function p(e){let t={code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,...n(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(a,{of:l,name:`Overview`}),`
`,(0,h.jsx)(t.h1,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,h.jsxs)(t.p,{children:[`The `,(0,h.jsx)(t.code,{children:`@bento/use-data-attributes`}),` package provides a hook that automatically
converts a component’s props into `,(0,h.jsx)(t.code,{children:`data-`}),` attributes. This allows components to
expose their internal state to the DOM, making debugging and styling components
easier.`]}),`
`,(0,h.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,h.jsx)(t.pre,{children:(0,h.jsx)(t.code,{className:`language-shell`,children:`npm install --save @bento/use-data-attributes
`})}),`
`,(0,h.jsx)(t.h2,{id:`usedataattributes`,children:`useDataAttributes`}),`
`,(0,h.jsxs)(t.p,{children:[`The `,(0,h.jsx)(t.code,{children:`useDataAttributes`}),` automatically transforms any given `,(0,h.jsx)(t.code,{children:`object`}),` into its
`,(0,h.jsx)(t.code,{children:`data-`}),` attribute equivalent, transforming the values into strings. The resulting
object only contains the `,(0,h.jsx)(t.code,{children:`data-`}),` prefixed attributes.`]}),`
`,(0,h.jsxs)(t.p,{children:[`It's worth noting that this hook does not merge the created `,(0,h.jsx)(t.code,{children:`data-`}),` attributes
with the existing ones. The user is left to decide on the correct merge strategy.`]}),`
`,(0,h.jsxs)(t.p,{children:[`The `,(0,h.jsx)(t.code,{children:`useDataAttributes`}),` hook takes an object with the following arguments:`]}),`
`,(0,h.jsx)(i,{of:u}),`
`,(0,h.jsxs)(t.p,{children:[`As the `,(0,h.jsx)(t.code,{children:`data-`}),` attributes end up in the DOM, their values are automatically
transformed into strings. This is done using the `,(0,h.jsx)(t.code,{children:`@bento/as-value-attribute`}),`
package. The package automatically formats the `,(0,h.jsx)(t.code,{children:`data`}),` based on the type of the
value given.`]}),`
`,(0,h.jsx)(r,{language:`tsx`,code:d})]})}function m(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;e((()=>{h=t(),s(),o(),c(),f()}))();export{m as default};