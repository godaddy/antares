import{i as e}from"./preload-helper-dt_jKsAq.js";import{y as t}from"./iframe-BbzAushP.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DjDLgxav.js";import{t as c}from"./mdx-react-shim-B79PQd2E.js";import{Namespace as l,env as u,n as d,slots as f,t as p}from"./box.stories-DZRbuXlB.js";var m,h=e((()=>{m=`/* v8 ignore next */
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
`})),g,_=e((()=>{g=`import { Slot, Box } from '@bento/box';

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
`}));function v(e){let t={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(o,{of:p,name:`Overview`}),`
`,(0,b.jsx)(t.h1,{id:`box`,children:`Box`}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`@bento/box`}),` package provides the shared React context that is used throughout
the Bento component ecosystem. It includes the `,(0,b.jsx)(t.code,{children:`Box`}),` context for managing component
environment and slots, and the `,(0,b.jsx)(t.code,{children:`Slot`}),` component for easily passing slot props to children.`]}),`
`,(0,b.jsxs)(t.blockquote,{children:[`
`,(0,b.jsx)(t.p,{children:`[!DANGER]`}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`Box`}),` context is not meant to be used directly in your application. It is
used internally by the Bento component ecosystem to manage the component environment
and slots.`]}),`
`]}),`
`,(0,b.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,b.jsx)(t.p,{children:`To install the package, use the following command:`}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-shell`,children:`npm install --save @bento/box
`})}),`
`,(0,b.jsx)(t.h2,{id:`slot-component`,children:`Slot Component`}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`Slot`}),` component is a convenience wrapper that simplifies passing slot props to
children via the Box context. This is particularly useful when building coordinator
components that need to distribute props to multiple children through the slot system
and does not introduce children as part of it's composition.`]}),`
`,(0,b.jsxs)(t.blockquote,{children:[`
`,(0,b.jsx)(t.p,{children:`[!DANGER]`}),`
`,(0,b.jsxs)(t.p,{children:[`You should be using the `,(0,b.jsx)(t.code,{children:`slots`}),` props instead of the `,(0,b.jsx)(t.code,{children:`Slot`}),` component. This
component is only meant to be used when composing components that do not
introduce their own children as part of it's composition.`]}),`
`]}),`
`,(0,b.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-tsx`,children:`import { Slot } from '@bento/box';

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
`,(0,b.jsx)(r,{language:`tsx`,code:g}),`
`,(0,b.jsx)(t.h3,{id:`how-it-works`,children:`How It Works`}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`Slot`}),` component:`]}),`
`,(0,b.jsxs)(t.ol,{children:[`
`,(0,b.jsxs)(t.li,{children:[`Receives a `,(0,b.jsx)(t.code,{children:`slots`}),` prop containing slot assignments`]}),`
`,(0,b.jsx)(t.li,{children:`Merges these slots with any existing slots from parent Box context`}),`
`,(0,b.jsxs)(t.li,{children:[`Provides the merged context to children via `,(0,b.jsx)(t.code,{children:`Box.Provider`})]}),`
`,(0,b.jsx)(t.li,{children:`Preserves all other Box context properties (env, namespace, override flags)`}),`
`]}),`
`,(0,b.jsxs)(t.p,{children:[`Children that use the `,(0,b.jsx)(t.code,{children:`slot`}),` prop (via `,(0,b.jsx)(t.code,{children:`@bento/slots`}),`) or `,(0,b.jsx)(t.code,{children:`useProps`}),` hook will
automatically receive the appropriate slot props.`]}),`
`,(0,b.jsx)(t.h3,{id:`use-cases`,children:`Use Cases`}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`Slot`}),` component is ideal for:`]}),`
`,(0,b.jsxs)(t.p,{children:[(0,b.jsx)(t.strong,{children:`Coordinator Components`}),`: Components that manage state and pass handlers to children`]}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-tsx`,children:`const Example = withSlots('Example', function Overlay(args) {
  const { props } = useProps(args);

  const slots = {
    trigger: { onClick: () => props.onOpenChange(true) },
    backdrop: { onClick: () => props.onOpenChange(false) },
    content: { role: 'dialog', 'aria-modal': true }
  };

  return <Slot slots={slots}>{props.children}</Slot>;
});
`})}),`
`,(0,b.jsxs)(t.p,{children:[(0,b.jsx)(t.strong,{children:`Compound Components`}),`: Components that need to distribute props across
multiple child types`]}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-tsx`,children:`const Example = withSlots('Example', function Tabs(args) {
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
`,(0,b.jsx)(t.h3,{id:`slot-merging-behavior`,children:`Slot Merging Behavior`}),`
`,(0,b.jsxs)(t.p,{children:[`When multiple `,(0,b.jsx)(t.code,{children:`Slot`}),` components are nested, slots are merged with child values
taking precedence over parent values:`]}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-tsx`,children:`<Slot slots={{ trigger: { value: 'parent' } }}>
  <Slot slots={{ trigger: { value: 'child' } }}>
    {/* trigger slot will have value: 'child' */}
  </Slot>
</Slot>
`})}),`
`,(0,b.jsx)(t.p,{children:`New slots from children are added to existing parent slots:`}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-tsx`,children:`<Slot slots={{ trigger: { onClick: handler1 } }}>
  <Slot slots={{ content: { role: 'dialog' } }}>
    {/* Both trigger and content slots are available */}
  </Slot>
</Slot>
`})}),`
`,(0,b.jsx)(t.h2,{id:`context`,children:`Context`}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-javascript`,children:`import { Box } from '@bento/box';
`})}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`Box`}),` context is a React context that provides Bento-specific configuration
to child components. It is typically used internally and does not require direct
interaction in most cases.`]}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.strong,{children:(0,b.jsx)(t.a,{href:`#slots`,children:`slots`})}),`: An object used by the `,(0,b.jsx)(t.code,{children:`@bento/slots`}),` and `,(0,b.jsx)(t.code,{children:`@bento/use-props`}),` packages.`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.strong,{children:(0,b.jsx)(t.a,{href:`#env`,children:`env`})}),`: An object used by the `,(0,b.jsx)(t.code,{children:`@bento/environment`}),` component.`]}),`
`]}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`Box`}),` context is used to pass down the Bento specific configuration down to
the child components. This is done automatically for you, for the majority of
the cases you don't need to interact or use this context directly in your
application.`]}),`
`,(0,b.jsx)(r,{language:`tsx`,code:m}),`
`,(0,b.jsx)(t.p,{children:`The above example would output the following:`}),`
`,(0,b.jsx)(i,{of:l,inline:!0}),`
`,(0,b.jsx)(t.h3,{id:`defaults`,children:`defaults`}),`
`,(0,b.jsxs)(t.p,{children:[`The package exposes a `,(0,b.jsx)(t.code,{children:`defaults`}),` function that will return the default assigned
values for the `,(0,b.jsx)(t.code,{children:`Box`}),` context. You can use this if you need to provide your
components with a custom `,(0,b.jsx)(t.code,{children:`Box.Provider`})]}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-javascript`,children:`import { Box, defaults } from '@bento/box';
import { useContext } from 'react';

function MyComponent() {
  return (
    <Box.Provider value={defaults()}>
      <MyChildComponent />
    </Box.Provider>
  );
};
`})}),`
`,(0,b.jsx)(t.h3,{id:`slots`,children:`Slots`}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`Box`}),` context contains a `,(0,b.jsx)(t.code,{children:`slots`}),` object which is consumed by the
`,(0,b.jsx)(t.code,{children:`@bento/slots`}),` and `,(0,b.jsx)(t.code,{children:`@bento/use-props`}),` packages. This object
contains the following properties:`]}),`
`,(0,b.jsx)(a,{of:f}),`
`,(0,b.jsx)(t.h3,{id:`env`,children:`Env`}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`env`}),` object contains `,(0,b.jsx)(t.code,{children:`@bento/environment`}),` specific configuration. The
object contains the following properties:`]}),`
`,(0,b.jsx)(a,{of:u})]})}function y(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,b.jsx)(t,{...e,children:(0,b.jsx)(v,{...e})}):v(e)}var b;e((()=>{b=t(),c(),s(),d(),h(),_()}))();export{y as default};