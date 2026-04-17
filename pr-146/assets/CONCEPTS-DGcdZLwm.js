import{j as e}from"./iframe-DHffalfD.js";import{useMDXComponents as a}from"./index-BuiQQoti.js";import{M as o}from"./blocks-DNgE2M3C.js";import{S as i}from"./data-attributes.stories-GWDyumoK.js";import"./preload-helper-PPVm8Dsz.js";import"./index-UG4S2bfa.js";import"./index-BeUQyxqF.js";import"./index-CN278EH3.js";import"./index-DrFu-skq.js";import"./slots-CF4dBuFs.js";import"./index-Bce9k0vK.js";import"./index-CLj43KZG.js";import"./index-DicE9oUm.js";import"./mergeProps-Chh0nC_o.js";import"./clsx-wCA0CoCi.js";import"./index-DO_zVCuj.js";function s(t){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...a(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:i,name:"Concepts"}),`
`,e.jsxs(n.h1,{id:"props-and-state-as-data--attributes",children:["Props and state as ",e.jsx(n.code,{children:"data-"})," attributes"]}),`
`,e.jsxs(n.p,{children:[`Components often have different UI state variations. Bento exposes these
variations as `,e.jsx(n.code,{children:"data-"}),` attributes to allow for dynamic styling and conditional
rendering based on the component's state. When we are talking about UI
states, we are referring to the different visual states that a component can be
in, e.g.:`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Interactive states"}),": User interactions like ",e.jsx(n.code,{children:"hovered"}),", ",e.jsx(n.code,{children:"focused"}),", and ",e.jsx(n.code,{children:"pressed"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Animation states"}),": ",e.jsx(n.code,{children:"entering"})," and ",e.jsx(n.code,{children:"exiting"})," animations."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Internal state"}),": ",e.jsx(n.code,{children:"loading"}),", ",e.jsx(n.code,{children:"disabled"}),", ",e.jsx(n.code,{children:"invalid"}),", and ",e.jsx(n.code,{children:"valid"})," states etc."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Props"}),": Any property indicating a visual difference in the component."]}),`
`]}),`
`,e.jsxs(n.p,{children:["All ",e.jsx(n.code,{children:"data-"}),` attributes supported by each component are listed as part of their
API documentation.`]}),`
`,e.jsx(n.h2,{id:"returning-control",children:"Returning control"}),`
`,e.jsxs(n.p,{children:["By exposing the props, interactions, and state of a component as ",e.jsx(n.code,{children:"data-"}),`
attributes, we can return the styling control to CSS. This allows for
dynamic, conditional layouts and designs to be composed based on attribute
selectors.`]}),`
`,e.jsxs(n.p,{children:["To give an example, let's say we have a button component that has a ",e.jsx(n.code,{children:"variant"}),`
prop. Instead of having the component manage the styles or conditionally render
different classes, we expose the `,e.jsx(n.code,{children:"variant"})," as a ",e.jsx(n.code,{children:"data-"}),` attribute and let CSS
handle the rest.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<ButtonExample className="my-button" variant="primary">Hello World</ButtonExample>
<button class="my-button" data-variant="primary">Hello World</button>
`})}),`
`,e.jsxs(n.p,{children:[`We can target the introduced props using CSS attribute selectors to apply
different styles based on selected `,e.jsx(n.code,{children:"variant"}),` and interaction states. In the
the example below, we are changing the background color of the button to a darker
shade of blue when the button is pressed:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`.my-button[data-variant="primary"] {
  background-color: blue;

  &[data-pressed] {
    background-color: darkblue;
  }
}
`})}),`
`,e.jsx(n.h2,{id:"debugging",children:"Debugging"}),`
`,e.jsx(n.p,{children:`The more information available in the DOM, the easier it will be to
debug your components without needing specialized tools or plugins. The markup
will tell you exactly what state your Component is in.`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<a href="#" class="button_6j83f" data-loading="true" data-disabled="true" data-variant="primary">
  Fetching data...
</a>
`})}),`
`,e.jsx(n.p,{children:`As we can see from the example HTML output above, we're able to deduct the
following:`}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"data-loading"})," - The button is currently in a loading state."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"data-disabled"})," - The button is disabled."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"data-variant"})," - The button has a primary variant."]}),`
`]}),`
`,e.jsx(n.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"useDataAttributes"}),` returns a memorized object. You do not need to wrap
the returned object in a `,e.jsx(n.code,{children:"useMemo"})," hook."]}),`
`,e.jsx(n.h3,{id:"which-props-should-be-exposed",children:"Which props should be exposed?"}),`
`,e.jsxs(n.p,{children:["Not all props should be exposed as ",e.jsx(n.code,{children:"data-"}),` attributes. Only introduce the
`,e.jsx(n.code,{children:"data-"}),` attributes for properties that do not end up in the resulting HTML
of the component. A `,e.jsx(n.code,{children:"class"})," attribute and a ",e.jsx(n.code,{children:"data-class"}),` attribute
would be redundant and confusing.`]}),`
`,e.jsxs(n.p,{children:[`This doesn't just apply to props that are rendered as part of the root element
but also to properties that end up as nested elements. If a property is rendered
there is no need to introduce a `,e.jsx(n.code,{children:"data-"})," attribute in any way, shape, or form."]}),`
`,e.jsxs(n.p,{children:["To give an example of this, our ",e.jsx(n.code,{children:"@bento/illustration"}),` component allows you to
specify the `,e.jsx(n.code,{children:"title"}),` for accessibility purposes. This property is introduced
as part child of the `,e.jsx(n.code,{children:"svg"})," element as the ",e.jsx(n.code,{children:"<title>"}),` element. As the property is
already exposed in the DOM and can be used for targeting using the `,e.jsx(n.code,{children:":has"}),`
CSS selector:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`svg:has(title) {
  border: 1px solid red;
}
`})}),`
`,e.jsxs(n.p,{children:["A good example of a prop that should be exposed as a ",e.jsx(n.code,{children:"data-"}),` attribute is
the `,e.jsx(n.code,{children:"icon"})," prop from ",e.jsx(n.code,{children:"@bento/icon"}),". The ",e.jsx(n.code,{children:"icon"}),` prop is the icon's name
that should be rendered. While it does introduce content as part of its
`,e.jsx(n.code,{children:"children"}),", it's impossible to target using CSS."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<Icon className="my-className-here" icon="close" />
`})}),`
`,e.jsxs(n.p,{children:["By introducing a ",e.jsx(n.code,{children:"data-icon"})," attribute, we can target the icon using CSS:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`.my-className-here[data-icon="close"] {
  /* We can use color because icons use currentColor by default */
  color: red;
}
`})}),`
`,e.jsx(n.h3,{id:"default-to-existing-html-attributes-over-data-attributes",children:"Default to existing HTML attributes over data attributes"}),`
`,e.jsxs(n.p,{children:[`When possible, default to using existing HTML attributes when conveying
state to developers. When working with form components, we might want to convey
the `,e.jsx(n.code,{children:"invalid"})," and ",e.jsx(n.code,{children:"valid"})," states to developers. We can introduce ",e.jsx(n.code,{children:"data-valid"}),`
and `,e.jsx(n.code,{children:"data-invalid"}),` as attributes to the component, but there are dedicated ARIA
attributes for this purpose. In these cases, we would assign `,e.jsx(n.code,{children:"aria-invalid"}),`
and `,e.jsx(n.code,{children:"aria-valid"})," as attributes for the component."]}),`
`,e.jsx(n.h3,{id:"naming-conventions",children:"Naming conventions"}),`
`,e.jsxs(n.p,{children:["To have a consistent naming framework for our ",e.jsx(n.code,{children:"data-"}),` attributes, we
are defaulting to the naming conventions that are used in React ARIA to convey
component states.`]}),`
`,e.jsx(n.p,{children:`When there is no matching state in React ARIA or existing HTML attribute that
can use, we default to the following naming convention:`}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"data-loading={true|undefined}"})," - Indicates that the element is in a loading state."]}),`
`]}),`
`,e.jsx(n.p,{children:`When authoring your custom components, it's recommended that you follow the
Use the same naming convention to ensure consistency across your application.`})]})}function T(t={}){const{wrapper:n}={...a(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{T as default};
