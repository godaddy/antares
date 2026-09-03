import{i as e}from"./preload-helper-XlZ5Wlzt.js";import{F as t}from"./iframe-CA_nbWt1.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DJ6Exhbz.js";import{t as c}from"./mdx-react-shim-BMgBWKYJ.js";import{t as l}from"./runtime-Blu9oTta.js";import{Default as u,Props as d,n as f,t as p}from"./pressable.stories-DkAwKKwu.js";function m(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(o,{of:f,name:`Overview`}),`
`,(0,g.jsx)(t.h1,{id:`pressable`,children:`Pressable`}),`
`,(0,g.jsx)(t.p,{children:`A wrapperless interaction primitive that adds accessible press behavior to a single child element.`}),`
`,(0,g.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,g.jsxs)(t.ul,{children:[`
`,(0,g.jsx)(t.li,{children:`Adds accessible press behavior to an existing visual component.`}),`
`,(0,g.jsx)(t.li,{children:`Applies interaction states directly to the child without adding a wrapper element.`}),`
`,(0,g.jsx)(t.li,{children:`Supports pointer, touch, and keyboard interactions through React Aria.`}),`
`,(0,g.jsx)(t.li,{children:`Preserves the child's layout, shape, and base visual styling while adding state feedback.`}),`
`]}),`
`,(0,g.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,g.jsx)(t.pre,{children:(0,g.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,g.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,g.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,g.jsx)(t.p,{children:`Add accessible press behavior to an existing visual component without adding a wrapper element.
The surface supports pointer, touch, and keyboard activation.`}),`
`,(0,g.jsx)(i,{of:u,inline:!0}),`
`,(0,g.jsx)(r,{code:`import { Box, Flex, Pressable, Text } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <Pressable aria-label="View account summary">
      <Box role="button" padding="md" rounding="md" elevation="card">
        <Flex direction="column" gap="xs">
          <Text>Account summary</Text>
          <Text>View your account details</Text>
        </Flex>
      </Box>
    </Pressable>
  );
}`,language:`tsx`}),`
`,(0,g.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,g.jsxs)(t.p,{children:[`Use `,(0,g.jsx)(t.code,{children:`Pressable`}),` when an existing visual component or layout surface needs press behavior while keeping its own DOM element, layout, and styles. The child must be a single element that forwards its ref and accepts the DOM, ARIA, and event props supplied by React Aria.`]}),`
`,(0,g.jsxs)(t.p,{children:[`Use `,(0,g.jsx)(t.code,{children:`Button`}),` when you need a standard button control with button-specific sizing, layout, and visual variants.`]}),`
`,(0,g.jsxs)(t.p,{children:[`Pass `,(0,g.jsx)(t.code,{children:`onPress`}),` for the action instead of wiring separate pointer and keyboard handlers:`]}),`
`,(0,g.jsx)(t.pre,{children:(0,g.jsx)(t.code,{className:`language-tsx`,children:`<Pressable aria-label="View account summary" onPress={handlePress}>
  <Box role="button" padding="md" rounding="md" elevation="card">
    Account summary
  </Box>
</Pressable>
`})}),`
`,(0,g.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,g.jsxs)(t.p,{children:[(0,g.jsx)(t.code,{children:`Pressable`}),` accepts the React Aria press props, including `,(0,g.jsx)(t.code,{children:`onPress`}),`, `,(0,g.jsx)(t.code,{children:`onPressStart`}),`, `,(0,g.jsx)(t.code,{children:`onPressEnd`}),`, `,(0,g.jsx)(t.code,{children:`onPressUp`}),`, and `,(0,g.jsx)(t.code,{children:`onPressChange`}),`.`]}),`
`,(0,g.jsxs)(t.p,{children:[`Use a semantic interactive element when possible. For a non-semantic child such as `,(0,g.jsx)(t.code,{children:`Avatar`}),` or `,(0,g.jsx)(t.code,{children:`Box`}),`, provide an appropriate interactive role and an accessible name. Pressable makes the child focusable when the required props are forwarded.`]}),`
`,(0,g.jsxs)(t.p,{children:[`Do not add `,(0,g.jsx)(t.code,{children:`role="button"`}),` to a native `,(0,g.jsx)(t.code,{children:`<button>`}),` or `,(0,g.jsx)(t.code,{children:`<a>`}),` unless you intentionally need to change its semantics. Use a dedicated semantic component such as `,(0,g.jsx)(t.code,{children:`Button`}),`, `,(0,g.jsx)(t.code,{children:`LinkButton`}),`, `,(0,g.jsx)(t.code,{children:`Menu`}),`, or `,(0,g.jsx)(t.code,{children:`ToggleButton`}),` when that control's meaning is known.`]}),`
`,(0,g.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,g.jsxs)(t.ul,{children:[`
`,(0,g.jsx)(t.li,{children:`Prefer a native interactive element or a semantic Antares component when the interaction meaning is known.`}),`
`,(0,g.jsxs)(t.li,{children:[`Avoid nesting interactive elements inside the child passed to `,(0,g.jsx)(t.code,{children:`Pressable`}),`.`]}),`
`,(0,g.jsxs)(t.li,{children:[(0,g.jsx)(t.code,{children:`Pressable`}),` automatically applies React Aria state attributes such as `,(0,g.jsx)(t.code,{children:`[data-hovered]`}),`, `,(0,g.jsx)(t.code,{children:`[data-pressed]`}),`, `,(0,g.jsx)(t.code,{children:`[data-focus-visible]`}),`, and `,(0,g.jsx)(t.code,{children:`[data-disabled]`}),` to the child. Ensure the child component styles these states appropriately if it overrides the default `,(0,g.jsx)(t.code,{children:`Pressable`}),` styles.`]}),`
`]}),`
`,(0,g.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,g.jsxs)(t.ul,{children:[`
`,(0,g.jsxs)(t.li,{children:[`If React Aria warns that the child must be focusable, ensure it is a single element that forwards its ref, `,(0,g.jsx)(t.code,{children:`tabIndex`}),`, DOM props, and ARIA attributes.`]}),`
`,(0,g.jsxs)(t.li,{children:[`If `,(0,g.jsx)(t.code,{children:`onPress`}),` does not fire, confirm that the child forwards event handlers and is not disabled by another component.`]}),`
`]}),`
`,(0,g.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,g.jsx)(t.pre,{children:(0,g.jsx)(t.code,{className:`language-tsx`,children:`<Pressable>
  <Box />
</Pressable>
`})}),`
`,(0,g.jsx)(a,{of:d})]})}function h(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,g.jsx)(t,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;e((()=>{g=t(),c(),s(),l(),p()}))();export{h as default};