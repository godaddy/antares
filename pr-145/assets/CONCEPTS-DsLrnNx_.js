import{j as e}from"./iframe-Bb1NQHs5.js";import{useMDXComponents as r}from"./index-D4oHENfc.js";import{M as c,A as a,S as t,a as s}from"./blocks-DWBbPI5V.js";import{S as l,a as h,P as d,F as p,M as u}from"./slots.stories-CxEIWzba.js";import{S as m}from"./nested-B0fLa76z.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DFII15ob.js";import"./index-DinWVzWV.js";import"./index-C2u_IMHF.js";import"./index-DrFu-skq.js";import"./index-DoPK94KX.js";import"./index-KH84-3i8.js";import"./mergeProps-B-RIf00_.js";import"./SSRProvider-Bk6RcCZ6.js";import"./clsx-B-dksMZM.js";import"./slots-DAzkOPzB.js";import"./index-CLj43KZG.js";import"./index-BRlsuRZ3.js";const f=`import { Nested } from './nested.tsx';

//
// We define the slots object outside of the component scope to avoid
// introducing a new object reference on each render which would cause
// the Nested component to re-render unnecessarily.
//
const slots = {
  'example-container.label': function example({ props }: { props: Record<string, any> }) {
    return (
      <label {...props}>
        <strong>{props.children}</strong>
      </label>
    );
  }
};

/**
 * SlotFunction component demonstrating how to pass a slot as a function.
 *
 * @returns {JSX.Element} The rendered Nested component with a slot function.
 * @public
 */
export function SlotFunction() {
  return <Nested slots={slots} />;
}
`,x=`import { Nested } from './nested.tsx';

//
// We define the slots object outside of the component scope to avoid
// introducing a new object reference on each render which would cause
// the Nested component to re-render unnecessarily.
//
const slots = {
  'example-container.button': {
    style: {
      background: 'red',
      border: '2px solid black'
    },
    onClick: () => console.log('Button clicked!')
  }
};

/**
 * SlotProps component demonstrating how to pass slot-specific props.
 *
 * @returns {JSX.Element} The rendered Nested component with slot props.
 * @public
 */
export function SlotProps() {
  return <Nested slots={slots} />;
}
`,j=`/* v8 ignore next */
import { useId, useMemo, useRef } from 'react';
import { Nested } from './nested.tsx';

/**
 * Memo component demonstrating memoization of slot props and refs.
 *
 * @returns {JSX.Element} The rendered Nested component with memoized slots.
 * @public
 */
export function Memo() {
  const ref = useRef<HTMLButtonElement>(null);
  const id = useId();

  //
  // Always use React.useMemo to memoize when you pass an object to a prop
  // in order to prevent unnecessary re-renders as each object is considered
  // a new object on each render, even if the values are the same.
  //
  // NOTE: This only applies when you're not using the new React compiler as
  //       it will automatically memoize objects for you.
  //
  // Learn more at: https://react.dev/learn/react-compiler
  //
  const slots = useMemo(
    () => ({
      'example-container': {
        // This is where you would put your slot props
        id
      },
      'example-container.button': {
        // Slots can also be used to add refs to elements
        ref: ref,
        onClick: function handleClick() {
          console.log('Button ref:', ref.current);
        }
      }
    }),
    [id]
  );

  return <Nested slots={slots} />;
}
`;function i(o){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{of:l,name:"Concepts"}),`
`,e.jsx(n.h1,{id:"slots",children:"Slots"}),`
`,e.jsxs(n.p,{children:[`Slots gives you full control over every part of the component. It's the ultimate
expression of freedom in a component-based architecture. Every component that is
build with the `,e.jsx(n.code,{children:"@bento/slots"})," now accepts 2 additional props:"]}),`
`,e.jsx(a,{of:h}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"IMPORTANT"})}),`
`,e.jsxs(n.p,{children:["Before you introduce ",e.jsx(n.code,{children:"slots"}),` to a component reach out to your design system
team. Overrides are an indication that the component you're using is no
longer following the design system guidelines or the design that you're
trying to implement is not covered by the design system.`]}),`
`,e.jsx(n.p,{children:`Components are used to enforce consistency across the application. Reaching
out to your design system team will help to ensure that the component you're
using is still following the design system guidelines.`}),`
`,e.jsx(n.p,{children:`If you are fixing a bug, consider contributing the fix back to the design
system. This will help to ensure that the component is fixed for everyone.`}),`
`]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"slots"}),` prop accepts an object as a value. The key of the object should be
the name of the slot that you want to modify. The value of the object should be
an object or function that contains the modifications that you want to make to
the slot.`]}),`
`,e.jsxs(n.h2,{id:"assigning-slots-to-components",children:["Assigning ",e.jsx(n.code,{children:"slot"}),"'s to components"]}),`
`,e.jsx(n.p,{children:`Note that this only needed when you are building your own custom components on
top of Bento that should also support slots. If you are developing applications
then this is already done for you in the components that you consume.`}),`
`,e.jsxs(n.p,{children:[`The slots implementation needs to know which component should receive the
modifications, this is done by assigning the `,e.jsx(n.code,{children:"slot"})," prop. The ",e.jsx(n.code,{children:"slot"}),` prop can be
assigned to any component that is built with the `,e.jsx(n.code,{children:"@bento/slots"}),` package. The
`,e.jsx(n.code,{children:"slot"})," accepts a string as a value that represents the name of the slot."]}),`
`,e.jsx(n.p,{children:`The example component below will be used througout the documentation to
illustrate the usage of slots.`}),`
`,e.jsx(t,{language:"tsx",code:m}),`
`,e.jsxs(n.p,{children:["While it is possible to use assign the same name ",e.jsx(n.code,{children:"slot"}),` to multiple (different)
components, it is recommended to use unique names to allow individual targeting
of each component. When authoring components the names of the slots should be
documented in the component's documentation so the consumers know which slots
are available.`]}),`
`,e.jsx(n.h2,{id:"namespace-for-component-composition",children:"Namespace for component composition"}),`
`,e.jsxs(n.p,{children:[`A unique feature of our slots implementation is the ability to drill down
components. When a `,e.jsx(n.code,{children:"slot"}),` is assigned to a component it becomes part of the
namespace of the component. This namespace can be used to drill down the
component tree and access the slots of the children.`]}),`
`,e.jsxs(n.p,{children:[`The namespace is a dot-separated string that represents the path to the slot.
To illustrate this, consider the following example where we created a fictional
`,e.jsx(n.code,{children:"Search"})," component that is composed with an existing ",e.jsx(n.code,{children:"Button"}),` component. This
`,e.jsx(n.code,{children:"Button"})," component has a slot named ",e.jsx(n.code,{children:"icon"})," that we want to customize."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`// button component
<Button>
   <Text slot="label">{ children }</Text>
   <Icon slot="icon" name="arrow-right" />
</Button>

// search component
<Search>
   <Label slot="label">
      Search
      <Icon slot="icon" name="search" />
   </Label>
   <Input slot="search" />
   <Button slot="submit">Submit</Button>
</Search>
`})}),`
`,e.jsxs(n.p,{children:["As the namespace is composed of each of the assigned ",e.jsx(n.code,{children:"slot"}),` name, we can
customize the `,e.jsx(n.code,{children:"icon"})," slot of the ",e.jsx(n.code,{children:"Button"}),` component by targeting the
`,e.jsx(n.code,{children:"submit.icon"}),` namespace. The namespace should be supplied as key and the
required modifications as value as illustrated below:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<Search slots={{ 'submit.icon': { name: 'search' } }} />
`})}),`
`,e.jsx(n.h2,{id:"introducing-new-props",children:"Introducing new props"}),`
`,e.jsx(n.p,{children:`When an object is supplied as a value to a slot, the object will be merged with
the props of the component. This allows you to introduce or override props of
the component.`}),`
`,e.jsx(t,{language:"tsx",code:x}),`
`,e.jsx(s,{of:d,inline:!0}),`
`,e.jsxs(n.p,{children:[`This pattern is a lot powerful than it seems at first. There is virtually no
limit to what you can assign with this pattern. To given an example, you can
`,e.jsx(n.code,{children:"slots"})," to assign ",e.jsx(n.code,{children:"refs"}),` to the components, or even assign event handlers to
to the components. You can see this in action in our
`,e.jsx(n.a,{href:"#best-practices",children:"Best Practices"})," example."]}),`
`,e.jsx(n.h2,{id:"modify-children",children:"Modify children"}),`
`,e.jsxs(n.p,{children:["When a function (",e.jsx(n.code,{children:"renderProp"}),`) is supplied as a value to a slot, the function
can be used to replace or modify the children of a component. This allows you to
affect the structure of the component.`]}),`
`,e.jsxs(n.p,{children:["The function will receive the ",e.jsx(n.code,{children:"props"}),", ",e.jsx(n.code,{children:"original"})," and ",e.jsx(n.code,{children:"previous"}),` as arguments and should
return the content that should be rendered. The `,e.jsx(n.code,{children:"props"}),` argument is an object
that contains the original props of the component. The `,e.jsx(n.code,{children:"original"}),` argument is
the original content of the slot. The `,e.jsx(n.code,{children:"previous"})," argument is an array of the previous slots if any."]}),`
`,e.jsx(t,{language:"tsx",code:f}),`
`,e.jsx(s,{of:p,inline:!0}),`
`,e.jsx(n.h2,{id:"best-practices",children:"Best practices"}),`
`,e.jsxs(n.p,{children:["As the ",e.jsx(n.code,{children:"slots"}),` prop accepts an object, it is important to ensure that the
object is memoized to prevent unnecessary re-renders. If the modifications
you are making to the component are static, you can declare the object outside
of the component scope and pass it as a prop. This ensures that the object is
only created once and the prop is not considered a new prop on each render:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`const slots = {
  'submit.icon': { id: 'my-custom-id' },
};

function YourExampleComponent() {
  return <Search slots={slots} />;
}
`})}),`
`,e.jsxs(n.p,{children:[`If your object references variables declared in the component scope you can use
the `,e.jsx(n.code,{children:"React.useMemo"})," hook. The ",e.jsx(n.code,{children:"React.useMemo"}),` hook caches the object between
re-renders. Given that your object references variables declared in the
components function scope you must include them in the dependencies array:`]}),`
`,e.jsx(t,{language:"tsx",code:j}),`
`,e.jsx(n.p,{children:"The above example results in the following output:"}),`
`,e.jsx(s,{of:u,inline:!0})]})}function W(o={}){const{wrapper:n}={...r(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(i,{...o})}):i(o)}export{W as default};
