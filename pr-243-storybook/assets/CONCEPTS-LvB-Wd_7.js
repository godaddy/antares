import{i as e}from"./preload-helper-DOotEt7k.js";import{y as t}from"./iframe-COkTE-an.js";import{S as n,s as r,u as i}from"./blocks-CNosNxO7.js";import{t as a}from"./mdx-react-shim-CHoS5vIf.js";import{n as o,t as s}from"./data-attributes.stories-BrTPCDQp.js";function c(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(r,{of:s,name:`Concepts`}),`
`,(0,u.jsxs)(t.h1,{id:`props-and-state-as-data--attributes`,children:[`Props and state as `,(0,u.jsx)(t.code,{children:`data-`}),` attributes`]}),`
`,(0,u.jsxs)(t.p,{children:[`Components often have different UI state variations. Bento exposes these
variations as `,(0,u.jsx)(t.code,{children:`data-`}),` attributes to allow for dynamic styling and conditional
rendering based on the component's state. When we are talking about UI
states, we are referring to the different visual states that a component can be
in, e.g.:`]}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Interactive states`}),`: User interactions like `,(0,u.jsx)(t.code,{children:`hovered`}),`, `,(0,u.jsx)(t.code,{children:`focused`}),`, and `,(0,u.jsx)(t.code,{children:`pressed`}),`.`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Animation states`}),`: `,(0,u.jsx)(t.code,{children:`entering`}),` and `,(0,u.jsx)(t.code,{children:`exiting`}),` animations.`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Internal state`}),`: `,(0,u.jsx)(t.code,{children:`loading`}),`, `,(0,u.jsx)(t.code,{children:`disabled`}),`, `,(0,u.jsx)(t.code,{children:`invalid`}),`, and `,(0,u.jsx)(t.code,{children:`valid`}),` states etc.`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Props`}),`: Any property indicating a visual difference in the component.`]}),`
`]}),`
`,(0,u.jsxs)(t.p,{children:[`All `,(0,u.jsx)(t.code,{children:`data-`}),` attributes supported by each component are listed as part of their
API documentation.`]}),`
`,(0,u.jsx)(t.h2,{id:`returning-control`,children:`Returning control`}),`
`,(0,u.jsxs)(t.p,{children:[`By exposing the props, interactions, and state of a component as `,(0,u.jsx)(t.code,{children:`data-`}),`
attributes, we can return the styling control to CSS. This allows for
dynamic, conditional layouts and designs to be composed based on attribute
selectors.`]}),`
`,(0,u.jsxs)(t.p,{children:[`To give an example, let's say we have a button component that has a `,(0,u.jsx)(t.code,{children:`variant`}),`
prop. Instead of having the component manage the styles or conditionally render
different classes, we expose the `,(0,u.jsx)(t.code,{children:`variant`}),` as a `,(0,u.jsx)(t.code,{children:`data-`}),` attribute and let CSS
handle the rest.`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-jsx`,children:`<ButtonExample className="my-button" variant="primary">Hello World</ButtonExample>
<button class="my-button" data-variant="primary">Hello World</button>
`})}),`
`,(0,u.jsxs)(t.p,{children:[`We can target the introduced props using CSS attribute selectors to apply
different styles based on selected `,(0,u.jsx)(t.code,{children:`variant`}),` and interaction states. In the
the example below, we are changing the background color of the button to a darker
shade of blue when the button is pressed:`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-css`,children:`.my-button[data-variant="primary"] {
  background-color: blue;

  &[data-pressed] {
    background-color: darkblue;
  }
}
`})}),`
`,(0,u.jsx)(t.h2,{id:`debugging`,children:`Debugging`}),`
`,(0,u.jsx)(t.p,{children:`The more information available in the DOM, the easier it will be to
debug your components without needing specialized tools or plugins. The markup
will tell you exactly what state your Component is in.`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<a href="#" class="button_6j83f" data-loading="true" data-disabled="true" data-variant="primary">
  Fetching data...
</a>
`})}),`
`,(0,u.jsx)(t.p,{children:`As we can see from the example HTML output above, we're able to deduct the
following:`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`data-loading`}),` - The button is currently in a loading state.`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`data-disabled`}),` - The button is disabled.`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`data-variant`}),` - The button has a primary variant.`]}),`
`]}),`
`,(0,u.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,u.jsxs)(t.p,{children:[`The `,(0,u.jsx)(t.code,{children:`useDataAttributes`}),` returns a memorized object. You do not need to wrap
the returned object in a `,(0,u.jsx)(t.code,{children:`useMemo`}),` hook.`]}),`
`,(0,u.jsx)(t.h3,{id:`which-props-should-be-exposed`,children:`Which props should be exposed?`}),`
`,(0,u.jsxs)(t.p,{children:[`Not all props should be exposed as `,(0,u.jsx)(t.code,{children:`data-`}),` attributes. Only introduce the
`,(0,u.jsx)(t.code,{children:`data-`}),` attributes for properties that do not end up in the resulting HTML
of the component. A `,(0,u.jsx)(t.code,{children:`class`}),` attribute and a `,(0,u.jsx)(t.code,{children:`data-class`}),` attribute
would be redundant and confusing.`]}),`
`,(0,u.jsxs)(t.p,{children:[`This doesn't just apply to props that are rendered as part of the root element
but also to properties that end up as nested elements. If a property is rendered
there is no need to introduce a `,(0,u.jsx)(t.code,{children:`data-`}),` attribute in any way, shape, or form.`]}),`
`,(0,u.jsxs)(t.p,{children:[`To give an example of this, our `,(0,u.jsx)(t.code,{children:`@bento/illustration`}),` component allows you to
specify the `,(0,u.jsx)(t.code,{children:`title`}),` for accessibility purposes. This property is introduced
as part child of the `,(0,u.jsx)(t.code,{children:`svg`}),` element as the `,(0,u.jsx)(t.code,{children:`<title>`}),` element. As the property is
already exposed in the DOM and can be used for targeting using the `,(0,u.jsx)(t.code,{children:`:has`}),`
CSS selector:`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-css`,children:`svg:has(title) {
  border: 1px solid red;
}
`})}),`
`,(0,u.jsxs)(t.p,{children:[`A good example of a prop that should be exposed as a `,(0,u.jsx)(t.code,{children:`data-`}),` attribute is
the `,(0,u.jsx)(t.code,{children:`icon`}),` prop from `,(0,u.jsx)(t.code,{children:`@bento/icon`}),`. The `,(0,u.jsx)(t.code,{children:`icon`}),` prop is the icon's name
that should be rendered. While it does introduce content as part of its
`,(0,u.jsx)(t.code,{children:`children`}),`, it's impossible to target using CSS.`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-jsx`,children:`<Icon className="my-className-here" icon="close" />
`})}),`
`,(0,u.jsxs)(t.p,{children:[`By introducing a `,(0,u.jsx)(t.code,{children:`data-icon`}),` attribute, we can target the icon using CSS:`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-css`,children:`.my-className-here[data-icon="close"] {
  /* We can use color because icons use currentColor by default */
  color: red;
}
`})}),`
`,(0,u.jsx)(t.h3,{id:`default-to-existing-html-attributes-over-data-attributes`,children:`Default to existing HTML attributes over data attributes`}),`
`,(0,u.jsxs)(t.p,{children:[`When possible, default to using existing HTML attributes when conveying
state to developers. When working with form components, we might want to convey
the `,(0,u.jsx)(t.code,{children:`invalid`}),` and `,(0,u.jsx)(t.code,{children:`valid`}),` states to developers. We can introduce `,(0,u.jsx)(t.code,{children:`data-valid`}),`
and `,(0,u.jsx)(t.code,{children:`data-invalid`}),` as attributes to the component, but there are dedicated ARIA
attributes for this purpose. In these cases, we would assign `,(0,u.jsx)(t.code,{children:`aria-invalid`}),`
and `,(0,u.jsx)(t.code,{children:`aria-valid`}),` as attributes for the component.`]}),`
`,(0,u.jsx)(t.h3,{id:`naming-conventions`,children:`Naming conventions`}),`
`,(0,u.jsxs)(t.p,{children:[`To have a consistent naming framework for our `,(0,u.jsx)(t.code,{children:`data-`}),` attributes, we
are defaulting to the naming conventions that are used in React ARIA to convey
component states.`]}),`
`,(0,u.jsx)(t.p,{children:`When there is no matching state in React ARIA or existing HTML attribute that
can use, we default to the following naming convention:`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`data-loading={true|undefined}`}),` - Indicates that the element is in a loading state.`]}),`
`]}),`
`,(0,u.jsx)(t.p,{children:`When authoring your custom components, it's recommended that you follow the
Use the same naming convention to ensure consistency across your application.`})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;e((()=>{u=t(),a(),i(),o()}))();export{l as default};