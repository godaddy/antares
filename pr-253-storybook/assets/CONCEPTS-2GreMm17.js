import{i as e}from"./preload-helper-dt_jKsAq.js";import{y as t}from"./iframe-BrzGYPoD.js";import{S as n,s as r,u as i}from"./blocks-Bif5YJY3.js";import{t as a}from"./mdx-react-shim-DBUSodm0.js";import{n as o,t as s}from"./container.stories-B28ZJLZ9.js";function c(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,...n(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(r,{of:s,name:`Concepts`}),`
`,(0,u.jsx)(t.h1,{id:`container-concepts`,children:`Container Concepts`}),`
`,(0,u.jsx)(t.p,{children:`Container is an infrastructure primitive for building component libraries. This guide covers the problems it solves, when to use it, and how it enables customization.`}),`
`,(0,u.jsx)(t.h2,{id:`why-container`,children:`Why Container?`}),`
`,(0,u.jsx)(t.p,{children:`Container solves three fundamental problems when building component libraries:`}),`
`,(0,u.jsxs)(t.h3,{id:`1-polymorphic-rendering`,children:[`1. `,(0,u.jsx)(t.strong,{children:`Polymorphic Rendering`})]}),`
`,(0,u.jsxs)(t.p,{children:[`Components need to render as different HTML elements while maintaining the same API and behavior. Container provides type-safe polymorphism through the `,(0,u.jsx)(t.code,{children:`as`}),` prop.`]}),`
`,(0,u.jsxs)(t.h3,{id:`2-slot-composition`,children:[`2. `,(0,u.jsx)(t.strong,{children:`Slot Composition`})]}),`
`,(0,u.jsxs)(t.p,{children:[`Design systems need to allow consumers to customize internal component structure without exposing implementation details. Container integrates with `,(0,u.jsx)(t.code,{children:`@bento/slots`}),` to enable deep customization.`]}),`
`,(0,u.jsxs)(t.h3,{id:`3-prop-spreading`,children:[`3. `,(0,u.jsx)(t.strong,{children:`Prop Spreading`})]}),`
`,(0,u.jsxs)(t.p,{children:[`Components need to accept arbitrary HTML attributes and pass them through safely. Container uses `,(0,u.jsx)(t.code,{children:`@bento/use-props`}),` to handle props merging, render props, and filtering.`]}),`
`,(0,u.jsx)(t.h2,{id:`when-to-use-container`,children:`When to Use Container`}),`
`,(0,u.jsxs)(t.p,{children:[`Container is an `,(0,u.jsx)(t.strong,{children:`infrastructure primitive`}),` for building component libraries, not a replacement for HTML in application code.`]}),`
`,(0,u.jsx)(t.p,{children:`Use Container when you need to expose customization APIs to consumers. The trade-off is abstraction overhead for flexibility. If your component's internal structure won't be customized, or element semantics won't vary, raw HTML may be more appropriate.`}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`Key considerations:`})}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`Polymorphism`}),`: Does the component need to render as different semantic elements while maintaining behavior? (e.g., a Button that can render as `,(0,u.jsx)(t.code,{children:`<button>`}),` or `,(0,u.jsx)(t.code,{children:`<a>`}),`)`]}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`Composition`}),`: Will consumers need to override internal elements without forking your implementation? Container + slots scale better than exposing individual props per customization point.`]}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`Prop forwarding`}),`: Does the component accept arbitrary HTML attributes? Container handles prop merging, render props, and filtering automatically.`]}),`
`,(0,u.jsx)(t.h3,{id:`examples-when-to-use-each-approach`,children:`Examples: When to Use Each Approach`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`Use HTML directly`}),` when the component is simple with no customization needs:`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`// Divider - Always renders <hr>, no internal structure to customize
export const Divider = withSlots('BentoDivider', function Divider(args: DividerProps) {
  const { props, apply } = useProps(args);
  const { orientation = 'horizontal' } = props;

  return (
    <hr
      {...apply(
        { 'aria-orientation': orientation },
        ['orientation']
      )}
    />
  );
});
`})}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`Use Container`}),` when consumers need to customize internal elements:`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`// ControlGroup - Multiple internal elements consumers might want to style/replace
export const ControlGroup = withSlots('BentoControlGroup', function ControlGroup(args) {
  const { props } = useProps(args);
  const { children, label, description } = props;

  return (
    <Container {...props}>
      <Container slot="label" as="label">
        {label}
      </Container>

      <Container slot="content">
        {children}
      </Container>

      {description && (
        <Container slot="description">
          {description}
        </Container>
      )}
    </Container>
  );
});

// Now consumers can customize any internal element:
<ControlGroup slots={{
  label: { className: 'custom-label' },
  content: { style: { gap: '1rem' } }
}}>
  <Input />
</ControlGroup>
`})}),`
`,(0,u.jsx)(t.h2,{id:`how-slots-enable-customization`,children:`How Slots Enable Customization`}),`
`,(0,u.jsxs)(t.p,{children:[`Container integrates with `,(0,u.jsx)(t.code,{children:`@bento/slots`}),` to enable infinite customization through a clean API.`]}),`
`,(0,u.jsx)(t.h3,{id:`example-building-a-customizable-card`,children:`Example: Building a Customizable Card`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`// card.tsx - Building a Card component
import { Container } from '@bento/container';
import { withSlots } from '@bento/slots';

export const Card = withSlots('Card', function Card(props) {
  return (
    <Container {...props} className="card">
      <Container slot="header" className="card-header">
        {props.title}
      </Container>
      <Container slot="body" className="card-body">
        {props.children}
      </Container>
      <Container slot="footer" className="card-footer">
        {props.actions}
      </Container>
    </Container>
  );
});

// Consumers can now customize any internal element:

// Override header styling
<Card slots={{ header: { className: 'custom-header' } }}>
  Content
</Card>

// Replace header entirely
<Card slots={{ header: <CustomHeader /> }}>
  Content
</Card>

// Use render prop for advanced control
<Card slots={{
  header: ({ original, props }) => (
    <div className="enhanced-header">
      {original}
      <Icon name="star" />
    </div>
  )
}}>
  Content
</Card>
`})}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`Why this matters`}),`: Without slots, you'd need separate props for every customization point (headerClassName, headerStyle, renderHeader, etc.). The `,(0,u.jsx)(t.code,{children:`slots`}),` prop scales infinitely while keeping the API clean.`]})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;e((()=>{u=t(),a(),i(),o()}))();export{l as default};