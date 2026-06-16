import{i as e}from"./preload-helper-CLVkNUVT.js";import{y as t}from"./iframe-Cpk5VEWB.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-Na2NBb_S.js";import{t as c}from"./mdx-react-shim-DZ1hH1z_.js";import{ComplexComponent as l,Demo as u,hook as d,n as f,t as p,useProps as m}from"./props.stories-B_Su1Ypg.js";var h,g=e((()=>{h=`import { useProps } from '@bento/use-props';
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
`})),_,v=e((()=>{_=`import { useProps } from '@bento/use-props';
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
`}));function y(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(o,{of:f,name:`Overview`}),`
`,(0,x.jsx)(t.h1,{id:`props-management`,children:`Props Management`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`@bento/use-props`}),` package provides a hook that unifies the component
and slot based props into a single interface. Both the component and slot-based
props can be specified as a `,(0,x.jsx)(t.code,{children:`renderProp`}),`. A `,(0,x.jsx)(t.code,{children:`renderProp`}),` is a function that
returns the value that should be applied as props to the component.`]}),`
`,(0,x.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-shell`,children:`npm install --save @bento/use-props
`})}),`
`,(0,x.jsx)(t.h2,{id:`useprops`,children:`useProps`}),`
`,(0,x.jsxs)(t.p,{children:[`The package exposes a `,(0,x.jsx)(t.code,{children:`useProps`}),` hook that can be used to apply the
props to the component. The hook is designed to be used in conjunction
with the `,(0,x.jsx)(t.code,{children:`@bento/slots`}),` package as it allows the `,(0,x.jsx)(t.code,{children:`slots`}),` props that are
introduced on the component to override the props that are specified on the
component.`]}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-javascript`,children:`import { useProps } from '@bento/use-props';
import { useState } from 'react';

function Component(args) {
  const [value, setValue] = useState(0);
  const { props, apply } = useProps(args, { value });
}
`})}),`
`,(0,x.jsxs)(t.p,{children:[`As seen from the example above, the `,(0,x.jsx)(t.code,{children:`useProps`}),` hook takes two
arguments:`]}),`
`,(0,x.jsx)(a,{of:m}),`
`,(0,x.jsx)(t.h3,{id:`forward-refs`,children:`Forward Refs`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`useProps`}),` hook also accepts an optional third parameter for forwarded refs. When provided, it merges the forwarded ref with any refs from props and slots:`]}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-javascript`,children:`import { useProps } from '@bento/use-props';
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
`,(0,x.jsxs)(t.p,{children:[`The merged `,(0,x.jsx)(t.code,{children:`ref`}),` combines:`]}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsx)(t.li,{children:`The forwarded ref from the parent component`}),`
`,(0,x.jsx)(t.li,{children:`Any ref passed through props`}),`
`,(0,x.jsx)(t.li,{children:`Any ref supplied via slots`}),`
`]}),`
`,(0,x.jsxs)(t.p,{children:[`All refs are properly merged using `,(0,x.jsx)(t.code,{children:`mergeRefs`}),` from `,(0,x.jsx)(t.code,{children:`@react-aria/utils`}),`, ensuring all refs are called/updated when the element is mounted.`]}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`useProps`}),` hook returns an object with three properties:`]}),`
`,(0,x.jsx)(a,{of:d}),`
`,(0,x.jsx)(t.h3,{id:`props`,children:`props`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`props`}),` property is a `,(0,x.jsx)(t.code,{children:`props`}),`-like object - specifically a `,(0,x.jsx)(t.code,{children:`Proxy`}),` instance. It
provides the familiar `,(0,x.jsx)(t.code,{children:`props`}),` interface for retrieving component props. When props
are modified by slots to add or override values, this Proxy automatically returns
the correct merged value. The Proxy seamlessly handles both component props and
slot-based props.`]}),`
`,(0,x.jsxs)(t.p,{children:[`When the prop that you're trying to access is specified as a `,(0,x.jsx)(t.code,{children:`renderProp`}),`, the
`,(0,x.jsx)(t.code,{children:`Proxy`}),` will automatically call the function and return the value returned by
the function. It's designed to do all the work for you so you can focus on
writing your components.`]}),`
`,(0,x.jsxs)(t.p,{children:[`Just like normal `,(0,x.jsx)(t.code,{children:`props`}),`, you can also use this instance to spread the props
on your components:`]}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-javascript`,children:`import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import { useState } from 'react';

const Anchor = withSlots('Anchor', function AnchorComponent(args) {
  const [value, setValue] = useState(0);
  const { props, apply } = useProps(args, { value });

  return <a {...props} />;
})
`})}),`
`,(0,x.jsxs)(t.p,{children:[`The primary use case for the `,(0,x.jsx)(t.code,{children:`props`}),` item is to interact with properties that
do not have a default value assigned to them or when you need to spread unknown
props to your component. When you interact with a prop that is set as renderProp
it will automatically call the function and return the value that is returned.
Given that no default value is applied, this renderProp will not be called
with the `,(0,x.jsx)(t.code,{children:`original`}),` value assigned.`]}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-javascript`,children:`import { useProps } from '@bento/use-props';
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
`,(0,x.jsx)(t.h3,{id:`apply`,children:`apply`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`apply`}),` function is used to apply props to your component. It takes an
object of props and returns a new object with all the props applied, taking into
account any render props and slot overrides.`]}),`
`,(0,x.jsx)(t.p,{children:`The function accepts an optional second parameter - an array of prop names that
should be omitted from being applied to the component. This is useful when you
want to prevent certain props from being passed down, such as props used only
for internal logic or props that shouldn't be spread onto the underlying
DOM element.`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-javascript`,children:`// Apply all props
const appliedProps = apply({ className: 'my-class', onClick: handleClick });

// Apply props while omitting specific ones
const appliedProps = apply({ className: 'my-class', onClick: handleClick }, ['onClick']);
`})}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`apply`}),` function ensures that all props are properly handled, including:`]}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsx)(t.li,{children:`Regular props`}),`
`,(0,x.jsx)(t.li,{children:`Render props (functions that return prop values)`}),`
`,(0,x.jsx)(t.li,{children:`Props that might be overridden by slots`}),`
`,(0,x.jsx)(t.li,{children:`Props that need to be merged with existing values`}),`
`]}),`
`,(0,x.jsx)(t.p,{children:`This makes it the recommended way to apply any props to your components, as it
handles all the necessary prop management internally.`}),`
`,(0,x.jsx)(r,{language:`tsx`,code:h}),`
`,(0,x.jsx)(i,{of:u}),`
`,(0,x.jsx)(r,{language:`tsx`,code:_}),`
`,(0,x.jsx)(i,{of:l})]})}function b(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,x.jsx)(t,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;e((()=>{x=t(),c(),s(),p(),g(),v()}))();export{b as default};