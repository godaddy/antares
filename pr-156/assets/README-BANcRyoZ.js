import{j as e}from"./iframe-N2a__K7H.js";import{useMDXComponents as l}from"./index-DsyEXuvE.js";import{M as i,S as t,a as c,A as s}from"./blocks-B_t92u7b.js";import{S as a,N as d,s as p,e as h}from"./box.stories-Drk8ai_b.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B3GBmEju.js";import"./index-64geXzHS.js";import"./index-B2krvM71.js";import"./index-DrFu-skq.js";import"./index-BfLUNoHt.js";const x=`/* v8 ignore next */
import { type ReactNode, useContext } from 'react';
import { Box, defaults } from '@bento/box';

/**
 * Example component demonstrating slot namespace usage.
 * Manually updates the Box context namespace to simulate what withSlots does,
 * since withSlots lives in @bento/slots and may resolve to a separate React instance
 * when used as a cross-package dependency in browser tests.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.slot] - The slot name to add to the namespace.
 * @param {ReactNode} [props.children] - Optional children elements.
 * @returns {JSX.Element} The rendered example component.
 * @public
 */
function Example(props: { slot?: string; children?: ReactNode }) {
  const ctx = useContext(Box);
  const namespace = [...ctx.slots.namespace, props.slot].filter(Boolean) as string[];

  const updatedContext = {
    ...ctx,
    slots: {
      ...ctx.slots,
      namespace
    }
  };

  return (
    <Box.Provider value={updatedContext}>
      <p>Slot namespace: {namespace.join(' > ')}</p>
      {props.children}
    </Box.Provider>
  );
}

//
// We are declaring our default context state outside of our component scope
// to ensure that the values that are passed to the context provider are not
// re-created on each render as that causes the context to be re-created.
//
const context = defaults();

/**
 * Example component demonstrating context usage.
 *
 * @returns {JSX.Element} The rendered context example component.
 * @public
 */
export function ContextExample() {
  return (
    <Box.Provider value={context}>
      <Example slot="level 1">
        <Example slot="level 2">
          <Example slot="level 3" />
        </Example>
      </Example>
    </Box.Provider>
  );
}
`,m=`import { Slot, Box } from '@bento/box';

/**
 * Simple example showing how Slot merges slots into Box context.
 * This demonstrates the concept - in real usage, child components would
 * use @bento/slots and @bento/use-props to consume these slot props.
 */
export function SlotExample() {
  // Define slots that will be passed to children via Box context
  const slots = {
    trigger: {
      onClick: 'handler',
      'aria-label': 'Example trigger'
    },
    content: {
      role: 'dialog',
      'aria-modal': true
    }
  };

  return (
    <Slot slots={slots}>
      {/*
        Any child component that uses withSlots and useProps can now
        access these slots via the Box context.

        For example:
        - A component with slot="trigger" would receive the trigger props
        - A component with slot="content" would receive the content props
      */}
      <Box.Consumer>
        {function render(ctx) {
          return (
            <div>
              <h3>Slots in Box Context:</h3>
              <pre>{JSON.stringify(ctx.slots.assigned, null, 2)}</pre>
            </div>
          );
        }}
      </Box.Consumer>
    </Slot>
  );
}
`;function r(o){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...l(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:a,name:"Overview"}),`
`,e.jsx(n.h1,{id:"box",children:"Box"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/box"}),` package provides the shared React context that is used throughout
the Bento component ecosystem. It includes the `,e.jsx(n.code,{children:"Box"}),` context for managing component
environment and slots, and the `,e.jsx(n.code,{children:"Slot"})," component for easily passing slot props to children."]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"[!DANGER]"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Box"}),` context is not meant to be used directly in your application. It is
used internally by the Bento component ecosystem to manage the component environment
and slots.`]}),`
`]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.p,{children:"To install the package, use the following command:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-shell",children:`npm install --save @bento/box
`})}),`
`,e.jsx(n.h2,{id:"slot-component",children:"Slot Component"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Slot"}),` component is a convenience wrapper that simplifies passing slot props to
children via the Box context. This is particularly useful when building coordinator
components that need to distribute props to multiple children through the slot system
and does not introduce children as part of it's composition.`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"[!DANGER]"}),`
`,e.jsxs(n.p,{children:["You should be using the ",e.jsx(n.code,{children:"slots"})," props instead of the ",e.jsx(n.code,{children:"Slot"}),` component. This
component is only meant to be used when composing components that do not
introduce their own children as part of it's composition.`]}),`
`]}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Slot } from '@bento/box';

const Example = withSlots('Example', function MyComponent(args) {
  const { props } = useProps(args);
  const slots = {
    trigger: { onClick: handleClick },
    content: { role: 'dialog' }
  };

  return (
    <Slot slots={slots}>
      {props.children}
    </Slot>
  );
}
`})}),`
`,e.jsx(t,{language:"tsx",code:m}),`
`,e.jsx(n.h3,{id:"how-it-works",children:"How It Works"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Slot"})," component:"]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Receives a ",e.jsx(n.code,{children:"slots"})," prop containing slot assignments"]}),`
`,e.jsx(n.li,{children:"Merges these slots with any existing slots from parent Box context"}),`
`,e.jsxs(n.li,{children:["Provides the merged context to children via ",e.jsx(n.code,{children:"Box.Provider"})]}),`
`,e.jsx(n.li,{children:"Preserves all other Box context properties (env, namespace, override flags)"}),`
`]}),`
`,e.jsxs(n.p,{children:["Children that use the ",e.jsx(n.code,{children:"slot"})," prop (via ",e.jsx(n.code,{children:"@bento/slots"}),") or ",e.jsx(n.code,{children:"useProps"}),` hook will
automatically receive the appropriate slot props.`]}),`
`,e.jsx(n.h3,{id:"use-cases",children:"Use Cases"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Slot"})," component is ideal for:"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Coordinator Components"}),": Components that manage state and pass handlers to children"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`const Example = withSlots('Example', function Overlay(args) {
  const { props } = useProps(args);

  const slots = {
    trigger: { onClick: () => props.onOpenChange(true) },
    backdrop: { onClick: () => props.onOpenChange(false) },
    content: { role: 'dialog', 'aria-modal': true }
  };

  return <Slot slots={slots}>{props.children}</Slot>;
});
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Compound Components"}),`: Components that need to distribute props across
multiple child types`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`const Example = withSlots('Example', function Tabs(args) {
  const { props } = useProps(args);

  const slots = {
    tab: {
      'aria-selected': (tab) => tab === props.activeTab,
      onClick: (tab) => props.onChange(tab)
    },
    panel: {
      hidden: (panel) => panel !== props.activeTab
    }
  };

  return <Slot slots={slots}>{props.children}</Slot>;
});
`})}),`
`,e.jsx(n.h3,{id:"slot-merging-behavior",children:"Slot Merging Behavior"}),`
`,e.jsxs(n.p,{children:["When multiple ",e.jsx(n.code,{children:"Slot"}),` components are nested, slots are merged with child values
taking precedence over parent values:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Slot slots={{ trigger: { value: 'parent' } }}>
  <Slot slots={{ trigger: { value: 'child' } }}>
    {/* trigger slot will have value: 'child' */}
  </Slot>
</Slot>
`})}),`
`,e.jsx(n.p,{children:"New slots from children are added to existing parent slots:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Slot slots={{ trigger: { onClick: handler1 } }}>
  <Slot slots={{ content: { role: 'dialog' } }}>
    {/* Both trigger and content slots are available */}
  </Slot>
</Slot>
`})}),`
`,e.jsx(n.h2,{id:"context",children:"Context"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { Box } from '@bento/box';
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Box"}),` context is a React context that provides Bento-specific configuration
to child components. It is typically used internally and does not require direct
interaction in most cases.`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.a,{href:"#slots",children:"slots"})}),": An object used by the ",e.jsx(n.code,{children:"@bento/slots"})," and ",e.jsx(n.code,{children:"@bento/use-props"})," packages."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.a,{href:"#env",children:"env"})}),": An object used by the ",e.jsx(n.code,{children:"@bento/environment"})," component."]}),`
`]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Box"}),` context is used to pass down the Bento specific configuration down to
the child components. This is done automatically for you, for the majority of
the cases you don't need to interact or use this context directly in your
application.`]}),`
`,e.jsx(t,{language:"tsx",code:x}),`
`,e.jsx(n.p,{children:"The above example would output the following:"}),`
`,e.jsx(c,{of:d,inline:!0}),`
`,e.jsx(n.h3,{id:"defaults",children:"defaults"}),`
`,e.jsxs(n.p,{children:["The package exposes a ",e.jsx(n.code,{children:"defaults"}),` function that will return the default assigned
values for the `,e.jsx(n.code,{children:"Box"}),` context. You can use this if you need to provide your
components with a custom `,e.jsx(n.code,{children:"Box.Provider"})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { Box, defaults } from '@bento/box';
import { useContext } from 'react';

function MyComponent() {
  return (
    <Box.Provider value={defaults()}>
      <MyChildComponent />
    </Box.Provider>
  );
};
`})}),`
`,e.jsx(n.h3,{id:"slots",children:"Slots"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Box"})," context contains a ",e.jsx(n.code,{children:"slots"}),` object which is consumed by the
`,e.jsx(n.code,{children:"@bento/slots"})," and ",e.jsx(n.code,{children:"@bento/use-props"}),` packages. This object
contains the following properties:`]}),`
`,e.jsx(s,{of:p}),`
`,e.jsx(n.h3,{id:"env",children:"Env"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"env"})," object contains ",e.jsx(n.code,{children:"@bento/environment"}),` specific configuration. The
object contains the following properties:`]}),`
`,e.jsx(s,{of:h})]})}function C(o={}){const{wrapper:n}={...l(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(r,{...o})}):r(o)}export{C as default};
