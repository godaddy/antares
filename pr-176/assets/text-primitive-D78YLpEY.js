import{j as e}from"./iframe-DCWZK8FF.js";import{u as s,M as o}from"./blocks-CwTu0JBB.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BTiZjbIC.js";import"./index-ns8GPaeO.js";import"./index-C1EBQYjH.js";import"./index-DrFu-skq.js";function i(n){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Bento/Architecture/PDRs/Text"}),`
`,e.jsx(t.h1,{id:"text-primitive-pdr",children:"Text Primitive PDR"}),`
`,e.jsx(t.h2,{id:"purpose",children:"Purpose"}),`
`,e.jsx(t.p,{children:"The Text Primitive will be the host for the lowest level text content within the component library, supporting many of the compositions expecting to display text content. This expects to include buttons, headlines, list items, among other elements."}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(t.p,{children:"The API interface for the resource should include the following props:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`interface Text {
    /** @default null */
    align?: 'start' | 'center' | 'end' | 'justify';
    /** @default 'span' */
    as?: String;
    /** @default null */
    children?:  ReactNode;
    /** @default null */
    maxLines?: Number;
    /** @default false */
    visuallyHidden?: Boolean;
    /** @default null */
    wrap?: Boolean | 'balance' | 'pretty' | 'stable';
}
`})}),`
`,e.jsx(t.h3,{id:"align",children:e.jsx(t.code,{children:"align"})}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"align"})," prop is an analog to the CSS ",e.jsx(t.code,{children:"text-align"})," property. When not provided, the alignment will inherit from ancestors eventually provided from the page level which typically defaults to ",e.jsx(t.code,{children:"start"}),"."]}),`
`,e.jsx(t.h3,{id:"as",children:e.jsx(t.code,{children:"as"})}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"as"})," prop determines the HTML element to render. If not provided, the default value will be ",e.jsx(t.code,{children:"span"})," to represent the least semantic element. We may consider a dev warning message to consider something more semantic when a value is not provided. We also do not expect to provide strict HTML tag validation here, such that new HTML tags added over time will be immediately supported. The validity of the tag will be the responsibility of the author. Incoming ",e.jsx(t.code,{children:"<Text as='marquee'/>"}),"."]}),`
`,e.jsxs(t.p,{children:["Some ",e.jsx(t.code,{children:"as"})," props will produce ",e.jsx(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/u#other_elements_to_consider_using",rel:"nofollow",children:"different but expected presentations"})," such as ",e.jsx(t.code,{children:"<Text as='em/>"})," and ",e.jsx(t.code,{children:"<Text as='code'/>"}),"."]}),`
`,e.jsx(t.h3,{id:"children",children:e.jsx(t.code,{children:"children"})}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"children"})," prop places the content provided within the HTML element tags. While we expect this to primarily provided as a ",e.jsx(t.code,{children:"String"}),", we allow a ",e.jsx(t.code,{children:"ReactNode"})," for flexibility in use. This allows the component to be used to inherit font properties to larger compositions where appropriate. If ",e.jsx(t.code,{children:"null"})," is provided, the component will not render. This helps with larger compositional layout needs, so phantom gaps do not appear when content is missing."]}),`
`,e.jsx(t.h3,{id:"maxlines",children:e.jsx(t.code,{children:"maxLines"})}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"maxLines"})," prop would provide truncation to the text through additional CSS properties. Based on browser support, truncating by line using ",e.jsx(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/line-clamp",rel:"nofollow",children:e.jsx(t.code,{children:"line-clamp"})})," may not be supported and will instead use ",e.jsx(t.a,{href:"https://css-tricks.com/snippets/css/truncate-string-with-ellipsis/",rel:"nofollow",children:"traditional CSS truncation techniques"}),"."]}),`
`,e.jsx(t.h3,{id:"visuallyhidden",children:e.jsx(t.code,{children:"visuallyHidden"})}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"visuallyHidden"})," prop is a flag that indicates if the content is only meant to be discoverable by assistive technologies, specifically screen readers. This is provided as a configuration on the text component because content which is meant to be read only by a screen reader is most commonly text content. This also avoids the necessity to require a utility that adds this functionality to elements that are inappropriate. We can expect to use ",e.jsx(t.a,{href:"https://github.com/WickyNilliams/cally/blob/main/src/utils/styles.ts#L18-L23",rel:"nofollow",children:"modern visually hidden styles"})," to support this functionality. However, we should also include the ",e.jsxs(t.a,{href:"https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html",rel:"nofollow",children:[e.jsx(t.code,{children:":not(:focus):not(:active)"})," recommendation"]})," to ensure the content is not visible when the user is expected to find the text within the page."]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:"[!NOTE]"}),`
`,e.jsxs(t.p,{children:["I'm open to the possibility of avoiding this in favor of ",e.jsxs(t.a,{href:"https://github.com/adobe/react-spectrum/tree/main/packages/%40react-aria/visually-hidden",rel:"nofollow",children:["the ",e.jsx(t.code,{children:"<VisuallyHidden/>"})," component found within React Aria"]})," and can be later used to wrap ",e.jsx(t.code,{children:"<Text/>"})," or for this to turn on its usage from within (less likely). My opinion is the implementation of this component is more complex that could otherwise be handled by CSS alone. Thouugh I do recognize the use of wrapping non-text elements in this, as is the case for ",e.jsxs(t.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/src/Checkbox.tsx#L250-L252",rel:"nofollow",children:["React Aria's ",e.jsx(t.code,{children:"<Checkbox/>"})," component"]}),"."]}),`
`]}),`
`,e.jsx(t.h3,{id:"wrap",children:e.jsx(t.code,{children:"wrap"})}),`
`,e.jsxs(t.p,{children:["Based on several hours of ",e.jsx(t.a,{href:"https://blog.damato.design/posts/antidatalossconfigurationism/",rel:"nofollow",children:"research and exploration"}),", my recommendation is to include a ",e.jsx(t.code,{children:"wrap"})," prop that aligns to the options provided by ",e.jsx(t.code,{children:"text-wrap"})," in CSS. This will support most use cases for wrapping. Except in the case where ",e.jsx(t.code,{children:"white-space"})," is meant to be ",e.jsx(t.code,{children:"pre"}),", specifically for ",e.jsx(t.code,{children:"<pre/>"})," and ",e.jsx(t.code,{children:"<kbd/>"})," elements. For these, if ",e.jsx(t.code,{children:"wrap=true"})," is explicitly provided, we'll update the ",e.jsx(t.code,{children:"white-space"})," to ",e.jsx(t.code,{children:"pre-wrap"})," to support the use case. Additionally, we will default all text components to include ",e.jsx(t.code,{children:"overflow-wrap: break-word"})," to support long words and URLs as a baseline."]}),`
`,e.jsx(t.h2,{id:"react-ariaspectrum",children:"React Aria/Spectrum"}),`
`,e.jsxs(t.p,{children:["React Aria does not have a Text primitive. The component within React Spectrum offers very little in terms of ",e.jsx(t.a,{href:"https://github.com/adobe/react-spectrum/tree/main/packages/%40react-types/text/src",rel:"nofollow",children:"their API"}),". It seems they expose ",e.jsx(t.code,{children:"children"})," and ",e.jsx(t.code,{children:"slot"})," as props for most variations of the component. A slightly unique variation is ",e.jsx(t.code,{children:"Heading"})," which can also accept a ",e.jsx(t.code,{children:"level"})," prop. The expectation is to leverage the current infrastructure of Bento to introduce ",e.jsx(t.code,{children:"slots"})," along with other overrides available in the Bento project."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.a,{href:"https://react-spectrum.adobe.com/react-spectrum/Text.html#text",rel:"nofollow",children:"The docs page"})," presents additional configuration options for the component which seem to be more layout related than text related. These are most likely inherited from a base component as we expect to inherit from our own ",e.jsx(t.code,{children:"useRenderProps"})," from within Bento."]}),`
`,e.jsx(t.h2,{id:"code-examples",children:"Code examples"}),`
`,e.jsx(t.h3,{id:"basic-usage",children:"Basic usage"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`/* Renders a span element with the text "Hello, world!" */
<Text>Hello, world!</Text>
`})}),`
`,e.jsx(t.h3,{id:"no-children",children:"No children"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`/* Renders nothing */
<Text></Text>
`})}),`
`,e.jsx(t.h3,{id:"truncation",children:"Truncation"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`/* Renders a p element with the text "This is a long text that will be truncated after two lines." */
<Text as="p" maxLines={2}>This is a long text that will be truncated after two lines.</Text>
`})}),`
`,e.jsx(t.h3,{id:"visually-hidden",children:"Visually hidden"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`/* Renders a span element with the text "This content is only visible to screen readers." */
<Text visuallyHidden>This content is only visible to screen readers.</Text>
`})}),`
`,e.jsx(t.h3,{id:"text-alignment",children:"Text alignment"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`/* Renders a h1 element with the text "This text will be centered." */
<Text as="h1" align="center">This text will be centered.</Text>
`})}),`
`,e.jsx(t.h3,{id:"text-wrapping",children:"Text wrapping"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`/* Renders a h2 element with the text "This text will wrap with character balance to the next line." */
<Text as="h2" wrap="balance">This text will wrap with character balance to the next line.</Text>
`})}),`
`,e.jsx(t.h2,{id:"appendix",children:"Appendix"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"https://react-spectrum.adobe.com/react-spectrum/Text.html",rel:"nofollow",children:"Adobe Spectrum Text"})}),`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"https://polaris-react.shopify.com/components/typography/text",rel:"nofollow",children:"Shopify Polaris Text"})}),`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"https://www.newskit.co.uk/components/text-block/",rel:"nofollow",children:"NewsKit UK Text"})}),`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"https://vercel.com/geist/text",rel:"nofollow",children:"Vercel Geist Text"})}),`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"https://cedar.rei.com/components/text",rel:"nofollow",children:"REI Cedar Text"})}),`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"https://primer.style/product/components/text/",rel:"nofollow",children:"Github Primer Text"})}),`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"https://canvas.workday.com/components/text/text",rel:"nofollow",children:"Workday Canvas Text"})}),`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"https://atlassian.design/components/primitives/text/examples",rel:"nofollow",children:"Atlassian Design Text"})}),`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"https://design-system.w3.org/components/text.html",rel:"nofollow",children:"W3C Text"})}),`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"https://paste.twilio.design/primitives/text",rel:"nofollow",children:"Twilio Paste Text"})}),`
`]})]})}function x(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{x as default};
