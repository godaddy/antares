import{j as e}from"./iframe-COOHz61S.js";import{useMDXComponents as i}from"./index-DSxwjQyk.js";import{M as a,S as o,a as l,A as s}from"./blocks-ORDlmF0q.js";import{S as c,N as d,w as h,m as p}from"./slots.stories-DhVBsNdE.js";import{S as m}from"./nested-B0fLa76z.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C8-rjpp1.js";import"./index-CL8R-hp8.js";import"./index-BgZMnLcl.js";import"./index-DrFu-skq.js";import"./index-BCkOfvL8.js";import"./index-DQ7w3rrP.js";import"./mergeProps-CvD8Zx5n.js";import"./SSRProvider-jcR4Waq-.js";import"./clsx-B-dksMZM.js";import"./slots-CENhnci_.js";import"./index-CLj43KZG.js";import"./index-C2EW5X_P.js";const u=`import { useProps } from '@bento/use-props';
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
`;function r(t){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:c,name:"Overview"}),`
`,e.jsx(n.h1,{id:"slots",children:"Slots"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/slots"}),` package provides a way to customize components using slots.
Allowing developers full control over every part of the component. It
automatically intercepts the `,e.jsx(n.code,{children:"slot"})," and ",e.jsx(n.code,{children:"slots"}),` props of the components
and introduces the requested changes.`]}),`
`,e.jsxs(n.p,{children:["This package should be used in conjunction with the ",e.jsx(n.code,{children:"@bento/use-props"}),`
package.`]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-shell",children:`npm install --save @bento/slots @bento/use-props
`})}),`
`,e.jsx(o,{language:"tsx",code:m}),`
`,e.jsx(l,{of:d,inline:!0}),`
`,e.jsx(n.h2,{id:"withslots",children:"withSlots"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"withSlots"})," function is used to create a new component that supports slots."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';

export const Button = withSlots('BentoButton', function BentoButton(args) {
  const { props, apply } = useProps(args);

  // Do your magic ✨
});
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"withSlots"})," function accepts three arguments:"]}),`
`,e.jsx(s,{of:h}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"name"}),` argument does not need to match the name of under which you export
your component but it is recommended to use the same name to avoid confusion.
The reason why we require the name to be unique is because it's used to identify
the component. This allows the component to be targeted with a global slot
override, but it will also be used as `,e.jsx(n.code,{children:"displayName"}),` to ensure a readable
component name in the React DevTools.`]}),`
`,e.jsx(n.h2,{id:"data-attributes",children:"Data Attributes"}),`
`,e.jsxs(n.p,{children:["When a ",e.jsx(n.code,{children:"slot"})," prop is added to a slottable component, a ",e.jsx(n.code,{children:"data-slot"})," attribute is automatically added to the rendered DOM element. This allows developers to target specific slots using CSS selectors or for debugging purposes."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Button slot="submit">Submit</Button>
// Renders: <button data-slot="submit">Submit</button>
`})}),`
`,e.jsx(n.p,{children:"This is particularly useful for:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"CSS Targeting"}),": Style specific slots without additional classes."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Debugging"}),": Quickly identify which slot a component belongs to in DevTools."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Testing"}),": Select elements by their slot name in tests."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`/* Target all elements with a slot name "submit" */
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
`,e.jsx(n.h2,{id:"forwarding-refs",children:"Forwarding Refs"}),`
`,e.jsxs(n.p,{children:["Components created with ",e.jsx(n.code,{children:"withSlots"})," automatically support ref forwarding. The ",e.jsx(n.code,{children:"withSlots"})," function:"]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Detects if your component accepts a ref parameter (by checking if it has 2 parameters)"}),`
`,e.jsxs(n.li,{children:["Automatically wraps it with ",e.jsx(n.code,{children:"React.forwardRef"})," in React 18 (if not already wrapped)"]}),`
`,e.jsx(n.li,{children:"In React 19+, it relies on the native ref-as-prop behavior (no wrapping needed)"}),`
`]}),`
`,e.jsxs(n.p,{children:["When using ",e.jsx(n.code,{children:"useProps"}),", you can access the merged ref that combines:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The ref passed directly to the component"}),`
`,e.jsx(n.li,{children:"Any refs supplied through slots"}),`
`,e.jsx(n.li,{children:"The forwarded ref from parent components"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { useProps } from '@bento/use-props';
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
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"ForwardRefExample"})," demonstrates how refs coming from the top-level consumer and from slot overrides are merged into a single handle."]}),`
`,e.jsx(o,{language:"tsx",code:u}),`
`,e.jsx(n.h3,{id:"react-19-compatibility",children:"React 19 Compatibility"}),`
`,e.jsx(n.p,{children:"The ref forwarding implementation is designed to be React 19-compatible:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"React 18"}),": Components with 2 parameters are automatically wrapped with ",e.jsx(n.code,{children:"forwardRef"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"React 19"}),": Components use the native ref-as-prop behavior, no wrapping needed"]}),`
`]}),`
`,e.jsx(n.p,{children:"This means your components will work seamlessly when upgrading from React 18 to React 19 without any code changes."}),`
`,e.jsx(n.h2,{id:"modifiers",children:"Modifiers"}),`
`,e.jsx(n.p,{children:`Modifiers are functions that are ran when the supplied component is rendered.
They can be used to modify the component or received props. This allows common
modifications to be shared between components.`}),`
`,e.jsx(n.p,{children:"Each modifier is a function that takes an object with the following properties:"}),`
`,e.jsx(s,{of:p}),`
`,e.jsxs(n.p,{children:[`The modification happen based on the return value of the modifier. If nothing
is returned, the component will be rendered as is. If you want to introduce
a new `,e.jsx(n.code,{children:"Component"})," to be rendered, you can return an object with a ",e.jsx(n.code,{children:"Component"}),`
property. If you want to modify or introduce props that are passed to the
component, you can return an object with a `,e.jsx(n.code,{children:"props"}),` property. The same applies to
`,e.jsx(n.code,{children:"context"}),"."]}),`
`,e.jsxs(n.p,{children:["For the ",e.jsx(n.code,{children:"props"})," and ",e.jsx(n.code,{children:"contex"}),` the returned object is merged with the existing
values of their respective properties. So you don't need to merge the existing
values yourself. The `,e.jsx(n.code,{children:"Component"})," is always replaced by the returned ",e.jsx(n.code,{children:"Component"}),"."]}),`
`,e.jsxs(n.p,{children:["In the example below, the ",e.jsx(n.code,{children:"modifier"}),` function introduces a new prop to the
component:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`export function modifier({ Component, context, props }) {
  return {
    props: {
      newProp: 'new value'
    }
  }
}
`})}),`
`,e.jsxs(n.p,{children:["This modifier should then be passed in the third argument to ",e.jsx(n.code,{children:"withSlots"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { replaces } from '@bento/slots/modifiers/replaces';
import { override } from '@bento/slots/modifiers/override';
import { withSlots } from '@bento/slots';
import { modifier } from './modifier';

const Button = withSlots('MyButton', function MyButton(props) {
  return <button {...props} />;
}, [override, replaces, modifier]);

// Input: <Button>Hello</Button>
// Output: <button newProp="new value">Hello</button>
`})}),`
`,e.jsxs(n.p,{children:[`If you don't want any modifiers to be applied to your component, you can supply
an empty array as the third argument to `,e.jsx(n.code,{children:"withSlots"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { withSlots } from '@bento/slots';

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
`,e.jsx(n.p,{children:"The following modifiers are applied to the created component by default:"}),`
`,e.jsx(n.h3,{id:"override",children:"override"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"override"})," modifier is used to introduce a ",e.jsx(n.code,{children:"data-override"}),` prop to the
component when it detects that certain overrides are applied to the component.
This attribute makes it easier to determine where the difference between the
original Component and the current rendered component are originating from.`]}),`
`,e.jsx(n.p,{children:`For you as a developer, this means you can easily see which components can be
easily upgrade to the new version without any problems, and which components
would require some additional attention and which areas specifically.`}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"data-override"}),` attribute is a space-separated list of the names that
indicates the following modifications:`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"style"}),": Custom styling has been applied to the component using the `style\nprop."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"className"}),`: Custom className has been applied to the component using the
`,e.jsx(n.code,{children:"className"})," prop."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"slot"}),": The component has been modified using ",e.jsx(n.code,{children:"slots"}),`. When the slots
make changes to `,e.jsx(n.code,{children:"style"})," or ",e.jsx(n.code,{children:"className"}),`, these are also included in the
resulting `,e.jsx(n.code,{children:"data-override"})," attribute."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"context"}),`: The whole component or parent component has been modified using
the `,e.jsx(n.a,{href:"#replaces",children:"replaces"}),` modifier and a different component has been rendered
in its place.`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { override } from '@bento/slots/modifiers/override';
`})}),`
`,e.jsx(n.h3,{id:"replaces",children:"replaces"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"replaces"}),` modifier is used to introduce "global" override of components
in your application. The slot functionality that this package provides is
great for making small changes to a few components, but there might be use-case
where you need to make changes to every instance of a Component, e.g., in the
case of experimentation.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { replaces } from '@bento/slots/modifiers/replaces';
`})}),`
`,e.jsx(n.h2,{id:"slot-merging",children:"Slot Merging"}),`
`,e.jsx(n.p,{children:"Slot merging allows slots to be progressively enhanced as they flow through a component tree. When multiple components define slots for the same slot name, these slots are merged together."}),`
`,e.jsx(n.h3,{id:"object-slot-merging",children:"Object Slot Merging"}),`
`,e.jsxs(n.p,{children:["When both parent and child define object slots (props), they are merged with ",e.jsx(n.strong,{children:"parent taking precedence"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// Child defines props
<Component slots={{ label: { className: 'child', id: 'child-id' } }} />

// Parent adds more props
<Child slots={{ label: { className: 'parent', title: 'parent-title' } }} />

// Result: { className: 'parent', id: 'child-id', title: 'parent-title' }
`})}),`
`,e.jsx(n.h3,{id:"function-slot-merging",children:"Function Slot Merging"}),`
`,e.jsxs(n.p,{children:["When function slots are merged, the ",e.jsx(n.strong,{children:"parent function becomes active"})," but receives access to all previous implementations via the ",e.jsx(n.code,{children:"previous"})," parameter:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { MergedFunction } from './examples/merged-function.tsx';

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
`,e.jsx(n.h3,{id:"function-slot-parameters",children:"Function Slot Parameters"}),`
`,e.jsx(n.p,{children:"Function slots receive an object with:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"props"}),": The component's props"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"original"}),": The original React element"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"previous"}),": Array of previous slot implementations (child → parent order)"]}),`
`]}),`
`,e.jsx(n.h3,{id:"key-rules",children:"Key Rules"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Object slots"}),": Parent props override child props for same keys"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Function slots"}),": Parent function is called, previous functions available in ",e.jsx(n.code,{children:"previous"})," array"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Mixed types"}),": Function slots take precedence over object slots"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Previous array"}),": Ordered from closest child to furthest ancestor"]}),`
`]}),`
`,e.jsx(n.h2,{id:"validation",children:"Validation"}),`
`,e.jsxs(n.p,{children:[`Compositional components often depend on specific child slots to function
correctly. For example, an `,e.jsx(n.code,{children:"Overlay"}),` component needs content to display, or a
`,e.jsx(n.code,{children:"Dialog"}),` component requires both a title and body. Without validation, missing
required slots would cause runtime errors or silent failures that are difficult
to debug.`]}),`
`,e.jsx(n.h3,{id:"contains",children:"contains"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"contains"}),` utility validates that required slot assignments are present in
children. This is useful for compositional components that depend on specific
child slots to function correctly.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { contains } from '@bento/slots';
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
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"contains"}),` function recursively searches through React children to find
components with matching `,e.jsx(n.code,{children:"slot"}),` props. It only validates components wrapped with
`,e.jsx(n.code,{children:"withSlots()"}),` - raw HTML elements with slot props are ignored since they are not
part of the Bento slot system.`]}),`
`,e.jsx(n.h4,{id:"namespaced-slot-validation",children:"Namespaced Slot Validation"}),`
`,e.jsxs(n.p,{children:[`You can validate deeply nested slot structures using dot notation. When
searching for `,e.jsx(n.code,{children:"'submit.icon'"}),", ",e.jsx(n.code,{children:"contains"}),` will look for a component with
`,e.jsx(n.code,{children:'slot="submit"'})," that has a child component with ",e.jsx(n.code,{children:'slot="icon"'}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { Button } from '@bento/button';
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
`})})]})}function k(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{k as default};
