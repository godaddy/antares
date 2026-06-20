import{i as e}from"./preload-helper-DOdH0sfz.js";import{y as t}from"./iframe-6Sk5eqT4.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-MBNUk1B1.js";import{t as c}from"./mdx-react-shim-JTjH5Fue.js";import{NestedSlots as l,modifiers as u,n as d,t as f,withSlots as p}from"./slots.stories-BqdSBLZs.js";import{i as m,r as h}from"./memo-BRux1qtq.js";var g,_=e((()=>{g=`import { useProps } from '@bento/use-props';
import { withSlots, type Slots } from '@bento/slots';
/* v8 ignore next */
import React from 'react';

export interface ForwardRefExampleProps extends Slots, Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: React.ReactNode;
}

/**
 * Minimal example that demonstrates how refs supplied directly and through slots
 * are merged automatically when using \`withSlots\`.
 *
 * Note: No need to wrap with React.forwardRef - withSlots handles it automatically!
 *
 * @example
 * \`\`\`tsx
 * const outerRef = useRef<HTMLDivElement | null>(null);
 * const slotRef = useRef<HTMLDivElement | null>(null);
 *
 * <ForwardRefExample ref={outerRef} slots={{ panel: { ref: slotRef } }}>
 *   <ForwardRefExample slot="panel">Inner content</ForwardRefExample>
 * </ForwardRefExample>
 * \`\`\`
 */
export const ForwardRefExample = withSlots('SlotsForwardRefExample', function ForwardRefExample(...rest: any[]) {
  const { apply } = useProps(rest);

  return <div {...apply()} />;
});
`}));function v(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(o,{of:d,name:`Overview`}),`
`,(0,b.jsx)(t.h1,{id:`slots`,children:`Slots`}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`@bento/slots`}),` package provides a way to customize components using slots.
Allowing developers full control over every part of the component. It
automatically intercepts the `,(0,b.jsx)(t.code,{children:`slot`}),` and `,(0,b.jsx)(t.code,{children:`slots`}),` props of the components
and introduces the requested changes.`]}),`
`,(0,b.jsxs)(t.p,{children:[`This package should be used in conjunction with the `,(0,b.jsx)(t.code,{children:`@bento/use-props`}),`
package.`]}),`
`,(0,b.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-shell`,children:`npm install --save @bento/slots @bento/use-props
`})}),`
`,(0,b.jsx)(r,{language:`tsx`,code:m}),`
`,(0,b.jsx)(i,{of:l,inline:!0}),`
`,(0,b.jsx)(t.h2,{id:`withslots`,children:`withSlots`}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`withSlots`}),` function is used to create a new component that supports slots.`]}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-javascript`,children:`import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';

export const Button = withSlots('BentoButton', function BentoButton(args) {
  const { props, apply } = useProps(args);

  // Do your magic ✨
});
`})}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`withSlots`}),` function accepts three arguments:`]}),`
`,(0,b.jsx)(a,{of:p}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`name`}),` argument does not need to match the name of under which you export
your component but it is recommended to use the same name to avoid confusion.
The reason why we require the name to be unique is because it's used to identify
the component. This allows the component to be targeted with a global slot
override, but it will also be used as `,(0,b.jsx)(t.code,{children:`displayName`}),` to ensure a readable
component name in the React DevTools.`]}),`
`,(0,b.jsx)(t.h2,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,b.jsxs)(t.p,{children:[`When a `,(0,b.jsx)(t.code,{children:`slot`}),` prop is added to a slottable component, a `,(0,b.jsx)(t.code,{children:`data-slot`}),` attribute is automatically added to the rendered DOM element. This allows developers to target specific slots using CSS selectors or for debugging purposes.`]}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-tsx`,children:`<Button slot="submit">Submit</Button>
// Renders: <button data-slot="submit">Submit</button>
`})}),`
`,(0,b.jsx)(t.p,{children:`This is particularly useful for:`}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.strong,{children:`CSS Targeting`}),`: Style specific slots without additional classes.`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.strong,{children:`Debugging`}),`: Quickly identify which slot a component belongs to in DevTools.`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.strong,{children:`Testing`}),`: Select elements by their slot name in tests.`]}),`
`]}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-css`,children:`/* Target all elements with a slot name "submit" */
[data-slot="submit"] {
  background-color: blue;
}

/* Note: Each component only receives its direct slot prop value as data-slot,
   not a concatenated namespace. For example, if you have nested slots like
   "form.submit", the submit button will have data-slot="submit", not data-slot="form.submit". */

/* Target nested slots using attribute selectors */
[data-slot="form"] [data-slot="submit"] {
  margin-top: 1rem;
}
`})}),`
`,(0,b.jsx)(t.h2,{id:`forwarding-refs`,children:`Forwarding Refs`}),`
`,(0,b.jsxs)(t.p,{children:[`Components created with `,(0,b.jsx)(t.code,{children:`withSlots`}),` automatically support ref forwarding. The `,(0,b.jsx)(t.code,{children:`withSlots`}),` function:`]}),`
`,(0,b.jsxs)(t.ol,{children:[`
`,(0,b.jsx)(t.li,{children:`Detects if your component accepts a ref parameter (by checking if it has 2 parameters)`}),`
`,(0,b.jsxs)(t.li,{children:[`Automatically wraps it with `,(0,b.jsx)(t.code,{children:`React.forwardRef`}),` in React 18 (if not already wrapped)`]}),`
`,(0,b.jsx)(t.li,{children:`In React 19+, it relies on the native ref-as-prop behavior (no wrapping needed)`}),`
`]}),`
`,(0,b.jsxs)(t.p,{children:[`When using `,(0,b.jsx)(t.code,{children:`useProps`}),`, you can access the merged ref that combines:`]}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsx)(t.li,{children:`The ref passed directly to the component`}),`
`,(0,b.jsx)(t.li,{children:`Any refs supplied through slots`}),`
`,(0,b.jsx)(t.li,{children:`The forwarded ref from parent components`}),`
`]}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-javascript`,children:`import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import React from 'react';

export const Button = withSlots(
  'BentoButton',
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function BentoButton(args, forwardedRef) {
    const { props, apply, ref } = useProps(args, {}, forwardedRef);

    return <button {...apply({}, ['ref'])} ref={ref}>{ props.children }</button>;
  })
);
`})}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`ForwardRefExample`}),` demonstrates how refs coming from the top-level consumer and from slot overrides are merged into a single handle.`]}),`
`,(0,b.jsx)(r,{language:`tsx`,code:g}),`
`,(0,b.jsx)(t.h3,{id:`react-19-compatibility`,children:`React 19 Compatibility`}),`
`,(0,b.jsx)(t.p,{children:`The ref forwarding implementation is designed to be React 19-compatible:`}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.strong,{children:`React 18`}),`: Components with 2 parameters are automatically wrapped with `,(0,b.jsx)(t.code,{children:`forwardRef`})]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.strong,{children:`React 19`}),`: Components use the native ref-as-prop behavior, no wrapping needed`]}),`
`]}),`
`,(0,b.jsx)(t.p,{children:`This means your components will work seamlessly when upgrading from React 18 to React 19 without any code changes.`}),`
`,(0,b.jsx)(t.h2,{id:`modifiers`,children:`Modifiers`}),`
`,(0,b.jsx)(t.p,{children:`Modifiers are functions that are ran when the supplied component is rendered.
They can be used to modify the component or received props. This allows common
modifications to be shared between components.`}),`
`,(0,b.jsx)(t.p,{children:`Each modifier is a function that takes an object with the following properties:`}),`
`,(0,b.jsx)(a,{of:u}),`
`,(0,b.jsxs)(t.p,{children:[`The modification happen based on the return value of the modifier. If nothing
is returned, the component will be rendered as is. If you want to introduce
a new `,(0,b.jsx)(t.code,{children:`Component`}),` to be rendered, you can return an object with a `,(0,b.jsx)(t.code,{children:`Component`}),`
property. If you want to modify or introduce props that are passed to the
component, you can return an object with a `,(0,b.jsx)(t.code,{children:`props`}),` property. The same applies to
`,(0,b.jsx)(t.code,{children:`context`}),`.`]}),`
`,(0,b.jsxs)(t.p,{children:[`For the `,(0,b.jsx)(t.code,{children:`props`}),` and `,(0,b.jsx)(t.code,{children:`contex`}),` the returned object is merged with the existing
values of their respective properties. So you don't need to merge the existing
values yourself. The `,(0,b.jsx)(t.code,{children:`Component`}),` is always replaced by the returned `,(0,b.jsx)(t.code,{children:`Component`}),`.`]}),`
`,(0,b.jsxs)(t.p,{children:[`In the example below, the `,(0,b.jsx)(t.code,{children:`modifier`}),` function introduces a new prop to the
component:`]}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-javascript`,children:`export function modifier({ Component, context, props }) {
  return {
    props: {
      newProp: 'new value'
    }
  }
}
`})}),`
`,(0,b.jsxs)(t.p,{children:[`This modifier should then be passed in the third argument to `,(0,b.jsx)(t.code,{children:`withSlots`}),`:`]}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-javascript`,children:`import { replaces } from '@bento/slots/modifiers/replaces';
import { override } from '@bento/slots/modifiers/override';
import { withSlots } from '@bento/slots';
import { modifier } from './modifier';

const Button = withSlots('MyButton', function MyButton(props) {
  return <button {...props} />;
}, [override, replaces, modifier]);

// Input: <Button>Hello</Button>
// Output: <button newProp="new value">Hello</button>
`})}),`
`,(0,b.jsxs)(t.p,{children:[`If you don't want any modifiers to be applied to your component, you can supply
an empty array as the third argument to `,(0,b.jsx)(t.code,{children:`withSlots`}),`:`]}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-javascript`,children:`import { withSlots } from '@bento/slots';

export const Example = withSlots('Example', function Example(props) {
  return (
    <div {...props}>
      <Header slot="header" />
      <Body slot="content" />
      <Footer slot="footer" />
    </div>
  );
}, [/* Supply an empty array if you don't want to use the modifers */]);
`})}),`
`,(0,b.jsx)(t.p,{children:`The following modifiers are applied to the created component by default:`}),`
`,(0,b.jsx)(t.h3,{id:`override`,children:`override`}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`override`}),` modifier is used to introduce a `,(0,b.jsx)(t.code,{children:`data-override`}),` prop to the
component when it detects that certain overrides are applied to the component.
This attribute makes it easier to determine where the difference between the
original Component and the current rendered component are originating from.`]}),`
`,(0,b.jsx)(t.p,{children:`For you as a developer, this means you can easily see which components can be
easily upgrade to the new version without any problems, and which components
would require some additional attention and which areas specifically.`}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`data-override`}),` attribute is a space-separated list of the names that
indicates the following modifications:`]}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.code,{children:`style`}),`: Custom styling has been applied to the component using the \`style
prop.`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.code,{children:`className`}),`: Custom className has been applied to the component using the
`,(0,b.jsx)(t.code,{children:`className`}),` prop.`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.code,{children:`slot`}),`: The component has been modified using `,(0,b.jsx)(t.code,{children:`slots`}),`. When the slots
make changes to `,(0,b.jsx)(t.code,{children:`style`}),` or `,(0,b.jsx)(t.code,{children:`className`}),`, these are also included in the
resulting `,(0,b.jsx)(t.code,{children:`data-override`}),` attribute.`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.code,{children:`context`}),`: The whole component or parent component has been modified using
the `,(0,b.jsx)(t.a,{href:`#replaces`,children:`replaces`}),` modifier and a different component has been rendered
in its place.`]}),`
`]}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-javascript`,children:`import { override } from '@bento/slots/modifiers/override';
`})}),`
`,(0,b.jsx)(t.h3,{id:`replaces`,children:`replaces`}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`replaces`}),` modifier is used to introduce "global" override of components
in your application. The slot functionality that this package provides is
great for making small changes to a few components, but there might be use-case
where you need to make changes to every instance of a Component, e.g., in the
case of experimentation.`]}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-javascript`,children:`import { replaces } from '@bento/slots/modifiers/replaces';
`})}),`
`,(0,b.jsx)(t.h2,{id:`slot-merging`,children:`Slot Merging`}),`
`,(0,b.jsx)(t.p,{children:`Slot merging allows slots to be progressively enhanced as they flow through a component tree. When multiple components define slots for the same slot name, these slots are merged together.`}),`
`,(0,b.jsx)(t.h3,{id:`object-slot-merging`,children:`Object Slot Merging`}),`
`,(0,b.jsxs)(t.p,{children:[`When both parent and child define object slots (props), they are merged with `,(0,b.jsx)(t.strong,{children:`parent taking precedence`}),`:`]}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-tsx`,children:`// Child defines props
<Component slots={{ label: { className: 'child', id: 'child-id' } }} />

// Parent adds more props
<Child slots={{ label: { className: 'parent', title: 'parent-title' } }} />

// Result: { className: 'parent', id: 'child-id', title: 'parent-title' }
`})}),`
`,(0,b.jsx)(t.h3,{id:`function-slot-merging`,children:`Function Slot Merging`}),`
`,(0,b.jsxs)(t.p,{children:[`When function slots are merged, the `,(0,b.jsx)(t.strong,{children:`parent function becomes active`}),` but receives access to all previous implementations via the `,(0,b.jsx)(t.code,{children:`previous`}),` parameter:`]}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-tsx`,children:`import { MergedFunction } from './examples/merged-function.tsx';

// Each enhancement level adds its own function
const FirstEnhancement = () => (
  <BaseComponent slots={{
    container: function firstWrapper() {
      return <div>First Enhancement</div>;
    }
  }} />
);

const SecondEnhancement = () => (
  <FirstEnhancement slots={{
    container: function secondWrapper() {
      return <div>Second Enhancement</div>;
    }
  }} />
);

// Final component can access all previous functions
<ThirdEnhancement slots={{
  container: function wrapper({ previous }) {
    return (
      <div>
        {previous[0]()}  {/* First Enhancement */}
        {previous[1]()}  {/* Second Enhancement */}
        {previous[2]()}  {/* Third Enhancement */}
      </div>
    );
  }
}} />
`})}),`
`,(0,b.jsx)(t.h3,{id:`function-slot-parameters`,children:`Function Slot Parameters`}),`
`,(0,b.jsx)(t.p,{children:`Function slots receive an object with:`}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.code,{children:`props`}),`: The component's props`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.code,{children:`original`}),`: The original React element`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.code,{children:`previous`}),`: Array of previous slot implementations (child → parent order)`]}),`
`]}),`
`,(0,b.jsx)(t.h3,{id:`key-rules`,children:`Key Rules`}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.strong,{children:`Object slots`}),`: Parent props override child props for same keys`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.strong,{children:`Function slots`}),`: Parent function is called, previous functions available in `,(0,b.jsx)(t.code,{children:`previous`}),` array`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.strong,{children:`Mixed types`}),`: Function slots take precedence over object slots`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.strong,{children:`Previous array`}),`: Ordered from closest child to furthest ancestor`]}),`
`]}),`
`,(0,b.jsx)(t.h2,{id:`validation`,children:`Validation`}),`
`,(0,b.jsxs)(t.p,{children:[`Compositional components often depend on specific child slots to function
correctly. For example, an `,(0,b.jsx)(t.code,{children:`Overlay`}),` component needs content to display, or a
`,(0,b.jsx)(t.code,{children:`Dialog`}),` component requires both a title and body. Without validation, missing
required slots would cause runtime errors or silent failures that are difficult
to debug.`]}),`
`,(0,b.jsx)(t.h3,{id:`contains`,children:`contains`}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`contains`}),` utility validates that required slot assignments are present in
children. This is useful for compositional components that depend on specific
child slots to function correctly.`]}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-javascript`,children:`import { contains } from '@bento/slots';
import { BentoError } from '@bento/error';
import { Container } from '@bento/container';

export const Dialog = withSlots('Dialog', function Dialog(args) {
  const { children } = args;

  // Validate required slots are present
  if (!contains(['title', 'content'], children)) {
    throw new BentoError({
      name: 'dialog',
      method: 'Dialog',
      message: 'Dialog requires children with slot="title" and slot="content"'
    });
  }

  return <Container>{children}</Container>;
});
`})}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`contains`}),` function recursively searches through React children to find
components with matching `,(0,b.jsx)(t.code,{children:`slot`}),` props. It only validates components wrapped with
`,(0,b.jsx)(t.code,{children:`withSlots()`}),` - raw HTML elements with slot props are ignored since they are not
part of the Bento slot system.`]}),`
`,(0,b.jsx)(t.h4,{id:`namespaced-slot-validation`,children:`Namespaced Slot Validation`}),`
`,(0,b.jsxs)(t.p,{children:[`You can validate deeply nested slot structures using dot notation. When
searching for `,(0,b.jsx)(t.code,{children:`'submit.icon'`}),`, `,(0,b.jsx)(t.code,{children:`contains`}),` will look for a component with
`,(0,b.jsx)(t.code,{children:`slot="submit"`}),` that has a child component with `,(0,b.jsx)(t.code,{children:`slot="icon"`}),`:`]}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-javascript`,children:`import { Button } from '@bento/button';
import { Icon } from '@bento/icon';
import { BentoError } from '@bento/error';

// Check for a nested slot path
if (!contains(['submit.icon'], children)) {
  throw new BentoError({
    name: 'form',
    method: 'Form',
    message: 'Submit button must have an icon'
  });
}

// This will find:
// <Button slot="submit">
//   <Icon slot="icon">→</Icon>
// </Button>
`})})]})}function y(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,b.jsx)(t,{...e,children:(0,b.jsx)(v,{...e})}):v(e)}var b;e((()=>{b=t(),c(),s(),f(),h(),_()}))();export{y as default};