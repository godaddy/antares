import{j as e}from"./iframe-D3fDdFQ4.js";import{useMDXComponents as a}from"./index-CDw2r1IX.js";import{M as i,A as s,S as r,a as t}from"./blocks-BrIIOujR.js";import{S as l,u as c,h as d,D as h,C as u}from"./props.stories-rJB4x6dI.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CjMbWoRR.js";import"./index-CBLRfpgE.js";import"./index-CXl02FME.js";import"./index-DrFu-skq.js";import"./index-DiIDxzfx.js";import"./index-CtH9LRLB.js";import"./mergeProps-Bjkc4qZd.js";import"./clsx-GL2hOUZf.js";import"./slots-pCifWtge.js";import"./index-CLj43KZG.js";import"./index-DtJToyYB.js";const m=`import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
/* v8 ignore next */

/**
 * Button component demonstrating render props usage.
 *
 * @param {Record<string, unknown>} args - The component props.
 * @returns {JSX.Element} The rendered button or anchor element.
 * @public
 */
export const Button = withSlots('RenderPropsButton', function BentoButton(args: Record<string, unknown>) {
  const { props, apply } = useProps(args);

  if (props.as) {
    return <a {...apply({ className: 'xyz-hashed-class' }, ['as'])}>{props.children}</a>;
  }

  return <button {...props}>{props.children}</button>;
});
`,f=`import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import { type UnknownObject } from '@bento/types';
import { Button } from './button.tsx';
/* v8 ignore next */
import { useId } from 'react';

/**
 * Example component demonstrating container usage.
 *
 * @param {UnknownObject} args - The component props.
 * @returns {JSX.Element} The rendered div element.
 * @public
 */
const Example = withSlots('RenderPropsExample', function ExampleComponent(args: UnknownObject) {
  const { props, apply } = useProps(args);

  return <div {...apply({ className: 'example' })}>{props.children}</div>;
});

/**
 * Label component for form elements.
 *
 * @param {UnknownObject} args - The component props.
 * @returns {JSX.Element} The rendered label element.
 * @public
 */
const Label = withSlots('RenderPropsLabel', function LabelComponent(args: UnknownObject) {
  const { props } = useProps(args);

  return <label {...props}>{props.children}</label>;
});

/**
 * Nested component demonstrating component composition.
 *
 * @returns {JSX.Element} The rendered nested component structure.
 * @public
 */
export const Nested = withSlots('RenderPropsNested', function NestedComponent() {
  const id = useId();

  return (
    <Example slot="example-container">
      <Label slot="label" htmlFor={id}>
        Hello World
      </Label>
      <Button slot="button" id={id}>
        Click Me
      </Button>
    </Example>
  );
});
`;function p(o){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...a(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:l,name:"Overview"}),`
`,e.jsx(n.h1,{id:"props-management",children:"Props Management"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/use-props"}),` package provides a hook that unifies the component
and slot based props into a single interface. Both the component and slot-based
props can be specified as a `,e.jsx(n.code,{children:"renderProp"}),". A ",e.jsx(n.code,{children:"renderProp"}),` is a function that
returns the value that should be applied as props to the component.`]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-shell",children:`npm install --save @bento/use-props
`})}),`
`,e.jsx(n.h2,{id:"useprops",children:"useProps"}),`
`,e.jsxs(n.p,{children:["The package exposes a ",e.jsx(n.code,{children:"useProps"}),` hook that can be used to apply the
props to the component. The hook is designed to be used in conjunction
with the `,e.jsx(n.code,{children:"@bento/slots"})," package as it allows the ",e.jsx(n.code,{children:"slots"}),` props that are
introduced on the component to override the props that are specified on the
component.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { useProps } from '@bento/use-props';
import { useState } from 'react';

function Component(args) {
  const [value, setValue] = useState(0);
  const { props, apply } = useProps(args, { value });
}
`})}),`
`,e.jsxs(n.p,{children:["As seen from the example above, the ",e.jsx(n.code,{children:"useProps"}),` hook takes two
arguments:`]}),`
`,e.jsx(s,{of:c}),`
`,e.jsx(n.h3,{id:"forward-refs",children:"Forward Refs"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"useProps"})," hook also accepts an optional third parameter for forwarded refs. When provided, it merges the forwarded ref with any refs from props and slots:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import React from 'react';

const Button = withSlots(
  'Button',
  React.forwardRef(function ButtonComponent(args, forwardedRef) {
    const { props, apply, ref } = useProps(args, {}, forwardedRef);

    // ref contains the merged reference from forwardedRef, props.ref, and slots
    return <button {...apply({}, ['ref'])} ref={ref}>{props.children}</button>;
  })
);
`})}),`
`,e.jsxs(n.p,{children:["The merged ",e.jsx(n.code,{children:"ref"})," combines:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The forwarded ref from the parent component"}),`
`,e.jsx(n.li,{children:"Any ref passed through props"}),`
`,e.jsx(n.li,{children:"Any ref supplied via slots"}),`
`]}),`
`,e.jsxs(n.p,{children:["All refs are properly merged using ",e.jsx(n.code,{children:"mergeRefs"})," from ",e.jsx(n.code,{children:"@react-aria/utils"}),", ensuring all refs are called/updated when the element is mounted."]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"useProps"})," hook returns an object with three properties:"]}),`
`,e.jsx(s,{of:d}),`
`,e.jsx(n.h3,{id:"props",children:"props"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"props"})," property is a ",e.jsx(n.code,{children:"props"}),"-like object - specifically a ",e.jsx(n.code,{children:"Proxy"}),` instance. It
provides the familiar `,e.jsx(n.code,{children:"props"}),` interface for retrieving component props. When props
are modified by slots to add or override values, this Proxy automatically returns
the correct merged value. The Proxy seamlessly handles both component props and
slot-based props.`]}),`
`,e.jsxs(n.p,{children:["When the prop that you're trying to access is specified as a ",e.jsx(n.code,{children:"renderProp"}),`, the
`,e.jsx(n.code,{children:"Proxy"}),` will automatically call the function and return the value returned by
the function. It's designed to do all the work for you so you can focus on
writing your components.`]}),`
`,e.jsxs(n.p,{children:["Just like normal ",e.jsx(n.code,{children:"props"}),`, you can also use this instance to spread the props
on your components:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import { useState } from 'react';

const Anchor = withSlots('Anchor', function AnchorComponent(args) {
  const [value, setValue] = useState(0);
  const { props, apply } = useProps(args, { value });

  return <a {...props} />;
})
`})}),`
`,e.jsxs(n.p,{children:["The primary use case for the ",e.jsx(n.code,{children:"props"}),` item is to interact with properties that
do not have a default value assigned to them or when you need to spread unknown
props to your component. When you interact with a prop that is set as renderProp
it will automatically call the function and return the value that is returned.
Given that no default value is applied, this renderProp will not be called
with the `,e.jsx(n.code,{children:"original"})," value assigned."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';

const Anchor = withSlots('Anchor', function AnchorComponent(args) {
  const { props, apply } = useProps(args);
  const { design, ...rest } = props;

  const className = design === 'foo' ? 'foo' : 'bar';
  return <a {...props} {...apply({ className })} />;
}

// Illustrative purposes only, useCallback is required in a real application
<Anchor design={function renderProp({ original, state }) {
  console.log(original);  // undefined - Design prop was only used to lookup values
  console.log(state);     // {} - No state was specified in the useProps

  return 'foo';
}} />
`})}),`
`,e.jsx(n.h3,{id:"apply",children:"apply"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"apply"}),` function is used to apply props to your component. It takes an
object of props and returns a new object with all the props applied, taking into
account any render props and slot overrides.`]}),`
`,e.jsx(n.p,{children:`The function accepts an optional second parameter - an array of prop names that
should be omitted from being applied to the component. This is useful when you
want to prevent certain props from being passed down, such as props used only
for internal logic or props that shouldn't be spread onto the underlying
DOM element.`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`// Apply all props
const appliedProps = apply({ className: 'my-class', onClick: handleClick });

// Apply props while omitting specific ones
const appliedProps = apply({ className: 'my-class', onClick: handleClick }, ['onClick']);
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"apply"})," function ensures that all props are properly handled, including:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Regular props"}),`
`,e.jsx(n.li,{children:"Render props (functions that return prop values)"}),`
`,e.jsx(n.li,{children:"Props that might be overridden by slots"}),`
`,e.jsx(n.li,{children:"Props that need to be merged with existing values"}),`
`]}),`
`,e.jsx(n.p,{children:`This makes it the recommended way to apply any props to your components, as it
handles all the necessary prop management internally.`}),`
`,e.jsx(r,{language:"tsx",code:m}),`
`,e.jsx(t,{of:h}),`
`,e.jsx(r,{language:"tsx",code:f}),`
`,e.jsx(t,{of:u})]})}function E(o={}){const{wrapper:n}={...a(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(p,{...o})}):p(o)}export{E as default};
