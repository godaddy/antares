import{j as n}from"./iframe-BrDvb0KO.js";import{useMDXComponents as r}from"./index-Dl1B0LWp.js";import{M as i}from"./blocks-DaEqNk0K.js";import{S as s}from"./container.stories-H7ySihQ4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BhHHr7wl.js";import"./index-CMH10zni.js";import"./index-C0W-uqxL.js";import"./index-DR42ajSJ.js";import"./slots-CaC-nOBL.js";import"./index-HgWDdH4n.js";import"./index-CLj43KZG.js";import"./index-DTaq1tt5.js";import"./mergeProps-D20zvsO2.js";import"./SSRProvider-BM5avgrS.js";import"./clsx-B-dksMZM.js";import"./index-6Zga7PKS.js";function t(o){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...r(),...o.components};return n.jsxs(n.Fragment,{children:[n.jsx(i,{of:s,name:"Concepts"}),`
`,n.jsx(e.h1,{id:"container-concepts",children:"Container Concepts"}),`
`,n.jsx(e.p,{children:"Container is an infrastructure primitive for building component libraries. This guide covers the problems it solves, when to use it, and how it enables customization."}),`
`,n.jsx(e.h2,{id:"why-container",children:"Why Container?"}),`
`,n.jsx(e.p,{children:"Container solves three fundamental problems when building component libraries:"}),`
`,n.jsxs(e.h3,{id:"1-polymorphic-rendering",children:["1. ",n.jsx(e.strong,{children:"Polymorphic Rendering"})]}),`
`,n.jsxs(e.p,{children:["Components need to render as different HTML elements while maintaining the same API and behavior. Container provides type-safe polymorphism through the ",n.jsx(e.code,{children:"as"})," prop."]}),`
`,n.jsxs(e.h3,{id:"2-slot-composition",children:["2. ",n.jsx(e.strong,{children:"Slot Composition"})]}),`
`,n.jsxs(e.p,{children:["Design systems need to allow consumers to customize internal component structure without exposing implementation details. Container integrates with ",n.jsx(e.code,{children:"@bento/slots"})," to enable deep customization."]}),`
`,n.jsxs(e.h3,{id:"3-prop-spreading",children:["3. ",n.jsx(e.strong,{children:"Prop Spreading"})]}),`
`,n.jsxs(e.p,{children:["Components need to accept arbitrary HTML attributes and pass them through safely. Container uses ",n.jsx(e.code,{children:"@bento/use-props"})," to handle props merging, render props, and filtering."]}),`
`,n.jsx(e.h2,{id:"when-to-use-container",children:"When to Use Container"}),`
`,n.jsxs(e.p,{children:["Container is an ",n.jsx(e.strong,{children:"infrastructure primitive"})," for building component libraries, not a replacement for HTML in application code."]}),`
`,n.jsx(e.p,{children:"Use Container when you need to expose customization APIs to consumers. The trade-off is abstraction overhead for flexibility. If your component's internal structure won't be customized, or element semantics won't vary, raw HTML may be more appropriate."}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Key considerations:"})}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Polymorphism"}),": Does the component need to render as different semantic elements while maintaining behavior? (e.g., a Button that can render as ",n.jsx(e.code,{children:"<button>"})," or ",n.jsx(e.code,{children:"<a>"}),")"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Composition"}),": Will consumers need to override internal elements without forking your implementation? Container + slots scale better than exposing individual props per customization point."]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Prop forwarding"}),": Does the component accept arbitrary HTML attributes? Container handles prop merging, render props, and filtering automatically."]}),`
`,n.jsx(e.h3,{id:"examples-when-to-use-each-approach",children:"Examples: When to Use Each Approach"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Use HTML directly"})," when the component is simple with no customization needs:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`// Divider - Always renders <hr>, no internal structure to customize
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
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Use Container"})," when consumers need to customize internal elements:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`// ControlGroup - Multiple internal elements consumers might want to style/replace
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
`,n.jsx(e.h2,{id:"how-slots-enable-customization",children:"How Slots Enable Customization"}),`
`,n.jsxs(e.p,{children:["Container integrates with ",n.jsx(e.code,{children:"@bento/slots"})," to enable infinite customization through a clean API."]}),`
`,n.jsx(e.h3,{id:"example-building-a-customizable-card",children:"Example: Building a Customizable Card"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`// card.tsx - Building a Card component
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
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Why this matters"}),": Without slots, you'd need separate props for every customization point (headerClassName, headerStyle, renderHeader, etc.). The ",n.jsx(e.code,{children:"slots"})," prop scales infinitely while keeping the API clean."]})]})}function z(o={}){const{wrapper:e}={...r(),...o.components};return e?n.jsx(e,{...o,children:n.jsx(t,{...o})}):t(o)}export{z as default};
