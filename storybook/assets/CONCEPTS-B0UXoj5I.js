import{i as e}from"./preload-helper-Cf5dhQLl.js";import{y as t}from"./iframe-Bbn45V8j.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-B3r1oyEE.js";import{t as c}from"./mdx-react-shim-BMnED-6x.js";import{FunctionalSlots as l,MemoSlots as u,PropsSlots as d,SlotsAPI as f,n as p,t as m}from"./slots.stories-C_FqIx6z.js";import{i as h,n as g,r as _,t as v}from"./memo-WaGf3osK.js";var y,b=e((()=>{y=`import { Nested } from './nested.tsx';

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
`})),x,S=e((()=>{x=`import { Nested } from './nested.tsx';

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
`}));function C(e){let t={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,strong:`strong`,...n(),...e.components};return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(o,{of:p,name:`Concepts`}),`
`,(0,T.jsx)(t.h1,{id:`slots`,children:`Slots`}),`
`,(0,T.jsxs)(t.p,{children:[`Slots gives you full control over every part of the component. It's the ultimate
expression of freedom in a component-based architecture. Every component that is
build with the `,(0,T.jsx)(t.code,{children:`@bento/slots`}),` now accepts 2 additional props:`]}),`
`,(0,T.jsx)(a,{of:f}),`
`,(0,T.jsxs)(t.blockquote,{children:[`
`,(0,T.jsx)(t.p,{children:(0,T.jsx)(t.strong,{children:`IMPORTANT`})}),`
`,(0,T.jsxs)(t.p,{children:[`Before you introduce `,(0,T.jsx)(t.code,{children:`slots`}),` to a component reach out to your design system
team. Overrides are an indication that the component you're using is no
longer following the design system guidelines or the design that you're
trying to implement is not covered by the design system.`]}),`
`,(0,T.jsx)(t.p,{children:`Components are used to enforce consistency across the application. Reaching
out to your design system team will help to ensure that the component you're
using is still following the design system guidelines.`}),`
`,(0,T.jsx)(t.p,{children:`If you are fixing a bug, consider contributing the fix back to the design
system. This will help to ensure that the component is fixed for everyone.`}),`
`]}),`
`,(0,T.jsxs)(t.p,{children:[`The `,(0,T.jsx)(t.code,{children:`slots`}),` prop accepts an object as a value. The key of the object should be
the name of the slot that you want to modify. The value of the object should be
an object or function that contains the modifications that you want to make to
the slot.`]}),`
`,(0,T.jsxs)(t.h2,{id:`assigning-slots-to-components`,children:[`Assigning `,(0,T.jsx)(t.code,{children:`slot`}),`'s to components`]}),`
`,(0,T.jsx)(t.p,{children:`Note that this only needed when you are building your own custom components on
top of Bento that should also support slots. If you are developing applications
then this is already done for you in the components that you consume.`}),`
`,(0,T.jsxs)(t.p,{children:[`The slots implementation needs to know which component should receive the
modifications, this is done by assigning the `,(0,T.jsx)(t.code,{children:`slot`}),` prop. The `,(0,T.jsx)(t.code,{children:`slot`}),` prop can be
assigned to any component that is built with the `,(0,T.jsx)(t.code,{children:`@bento/slots`}),` package. The
`,(0,T.jsx)(t.code,{children:`slot`}),` accepts a string as a value that represents the name of the slot.`]}),`
`,(0,T.jsx)(t.p,{children:`The example component below will be used througout the documentation to
illustrate the usage of slots.`}),`
`,(0,T.jsx)(r,{language:`tsx`,code:h}),`
`,(0,T.jsxs)(t.p,{children:[`While it is possible to use assign the same name `,(0,T.jsx)(t.code,{children:`slot`}),` to multiple (different)
components, it is recommended to use unique names to allow individual targeting
of each component. When authoring components the names of the slots should be
documented in the component's documentation so the consumers know which slots
are available.`]}),`
`,(0,T.jsx)(t.h2,{id:`namespace-for-component-composition`,children:`Namespace for component composition`}),`
`,(0,T.jsxs)(t.p,{children:[`A unique feature of our slots implementation is the ability to drill down
components. When a `,(0,T.jsx)(t.code,{children:`slot`}),` is assigned to a component it becomes part of the
namespace of the component. This namespace can be used to drill down the
component tree and access the slots of the children.`]}),`
`,(0,T.jsxs)(t.p,{children:[`The namespace is a dot-separated string that represents the path to the slot.
To illustrate this, consider the following example where we created a fictional
`,(0,T.jsx)(t.code,{children:`Search`}),` component that is composed with an existing `,(0,T.jsx)(t.code,{children:`Button`}),` component. This
`,(0,T.jsx)(t.code,{children:`Button`}),` component has a slot named `,(0,T.jsx)(t.code,{children:`icon`}),` that we want to customize.`]}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-jsx`,children:`// button component
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
`,(0,T.jsxs)(t.p,{children:[`As the namespace is composed of each of the assigned `,(0,T.jsx)(t.code,{children:`slot`}),` name, we can
customize the `,(0,T.jsx)(t.code,{children:`icon`}),` slot of the `,(0,T.jsx)(t.code,{children:`Button`}),` component by targeting the
`,(0,T.jsx)(t.code,{children:`submit.icon`}),` namespace. The namespace should be supplied as key and the
required modifications as value as illustrated below:`]}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-jsx`,children:`<Search slots={{ 'submit.icon': { name: 'search' } }} />
`})}),`
`,(0,T.jsx)(t.h2,{id:`introducing-new-props`,children:`Introducing new props`}),`
`,(0,T.jsx)(t.p,{children:`When an object is supplied as a value to a slot, the object will be merged with
the props of the component. This allows you to introduce or override props of
the component.`}),`
`,(0,T.jsx)(r,{language:`tsx`,code:x}),`
`,(0,T.jsx)(i,{of:d,inline:!0}),`
`,(0,T.jsxs)(t.p,{children:[`This pattern is a lot powerful than it seems at first. There is virtually no
limit to what you can assign with this pattern. To given an example, you can
`,(0,T.jsx)(t.code,{children:`slots`}),` to assign `,(0,T.jsx)(t.code,{children:`refs`}),` to the components, or even assign event handlers to
to the components. You can see this in action in our
`,(0,T.jsx)(t.a,{href:`#best-practices`,children:`Best Practices`}),` example.`]}),`
`,(0,T.jsx)(t.h2,{id:`modify-children`,children:`Modify children`}),`
`,(0,T.jsxs)(t.p,{children:[`When a function (`,(0,T.jsx)(t.code,{children:`renderProp`}),`) is supplied as a value to a slot, the function
can be used to replace or modify the children of a component. This allows you to
affect the structure of the component.`]}),`
`,(0,T.jsxs)(t.p,{children:[`The function will receive the `,(0,T.jsx)(t.code,{children:`props`}),`, `,(0,T.jsx)(t.code,{children:`original`}),` and `,(0,T.jsx)(t.code,{children:`previous`}),` as arguments and should
return the content that should be rendered. The `,(0,T.jsx)(t.code,{children:`props`}),` argument is an object
that contains the original props of the component. The `,(0,T.jsx)(t.code,{children:`original`}),` argument is
the original content of the slot. The `,(0,T.jsx)(t.code,{children:`previous`}),` argument is an array of the previous slots if any.`]}),`
`,(0,T.jsx)(r,{language:`tsx`,code:y}),`
`,(0,T.jsx)(i,{of:l,inline:!0}),`
`,(0,T.jsx)(t.h2,{id:`best-practices`,children:`Best practices`}),`
`,(0,T.jsxs)(t.p,{children:[`As the `,(0,T.jsx)(t.code,{children:`slots`}),` prop accepts an object, it is important to ensure that the
object is memoized to prevent unnecessary re-renders. If the modifications
you are making to the component are static, you can declare the object outside
of the component scope and pass it as a prop. This ensures that the object is
only created once and the prop is not considered a new prop on each render:`]}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-jsx`,children:`const slots = {
  'submit.icon': { id: 'my-custom-id' },
};

function YourExampleComponent() {
  return <Search slots={slots} />;
}
`})}),`
`,(0,T.jsxs)(t.p,{children:[`If your object references variables declared in the component scope you can use
the `,(0,T.jsx)(t.code,{children:`React.useMemo`}),` hook. The `,(0,T.jsx)(t.code,{children:`React.useMemo`}),` hook caches the object between
re-renders. Given that your object references variables declared in the
components function scope you must include them in the dependencies array:`]}),`
`,(0,T.jsx)(r,{language:`tsx`,code:g}),`
`,(0,T.jsx)(t.p,{children:`The above example results in the following output:`}),`
`,(0,T.jsx)(i,{of:u,inline:!0})]})}function w(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,T.jsx)(t,{...e,children:(0,T.jsx)(C,{...e})}):C(e)}var T;e((()=>{T=t(),c(),s(),m(),b(),S(),_(),v()}))();export{w as default};