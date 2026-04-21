import{j as e}from"./iframe-CeWMyedw.js";import{useMDXComponents as i}from"./index-B5Uf_d-i.js";import{M as s,A as a,S as n}from"./blocks-sR0vlAsr.js";import{S as l,P as d}from"./text.stories-B4HM_-c7.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DE7Rzj2e.js";import"./index-YasxdYFD.js";import"./index-YTKJTFBG.js";import"./index-DrFu-skq.js";import"./index-BH3EkNXZ.js";import"./index-DtPTrcgN.js";import"./clsx-Bo1DvP0h.js";import"./index-v8hEpkKr.js";import"./mergeProps-BMKEr6li.js";import"./useObjectRef-DSAGEI40.js";import"./DOMFunctions-DY9RYDsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useFocusRing-B8mes32Q.js";import"./useFocusWithin-C5DzaGSK.js";import"./platform-BULRNHlZ.js";import"./useFocusable-EFEkgLle.js";import"./Collection-CkxoWm7T.js";import"./keyboard-BlyT3oQC.js";import"./FocusScope-DOmk4P1q.js";import"./context-DGOFiTQb.js";import"./useControlledState-D8fKhBPa.js";import"./useOverlayTriggerState-IIzyQWbR.js";import"./PortalProvider-BbjEUN91.js";import"./usePreventScroll-CjJM4_4w.js";import"./useLabel-D8tf2HH1.js";import"./VisuallyHidden-BypGPA39.js";import"./useField-nwZsQ6Ee.js";import"./useButton-BhlgiA4B.js";import"./index-DHyxQ02-.js";import"./index-DGh3k9vX.js";import"./slots-Bt9Wxc5U.js";import"./index-BstA1gKG.js";import"./index-CLj43KZG.js";import"./index-DdOdtn2a.js";import"./index-DVnRpo7N.js";import"./create-external-store-TtP3UJpK.js";import"./index-3oVGqxZ3.js";import"./client-BMzR7LLv.js";import"./index-BAk7CA0p.js";import"./index-BCOSgJFa.js";const p=`import { Text, type TextProps } from '@godaddy/antares';

export function AsExample(args: TextProps) {
  return (
    <Text {...args} as="marquee">
      A scrolling marquee
    </Text>
  );
}
`,c=`import { Text, type TextProps } from '@godaddy/antares';

export function AlignExample(args: TextProps) {
  return (
    <Text {...args} as="p" align="center">
      Text is aligned to the center
    </Text>
  );
}
`,x=`import { Text, type TextProps } from '@godaddy/antares';

export function MaxLinesExample(args: TextProps) {
  return (
    <div style={{ width: '300px', border: '1px solid red' }}>
      <Text {...args} as="p" maxLines={2}>
        This will have a maximum of two lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>
    </div>
  );
}
`,m=`import { Text, type TextProps } from '@godaddy/antares';

export function WrapExample(args: TextProps) {
  return (
    <div style={{ width: '300px', border: '1px solid red' }}>
      <Text {...args} as="p" wrap="pretty">
        Text is wrapped in a way that best balances the number of characters on each line, enhancing layout quality and
        legibility. Because counting characters and balancing them across multiple lines is computationally expensive,
        this value is only supported for blocks of text spanning a limited number of lines
      </Text>
    </div>
  );
}
`;function r(o){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:l,name:"Overview"}),`
`,e.jsx(t.h1,{id:"text",children:"Text"}),`
`,e.jsx(t.p,{children:"Text component for displaying and formatting text content with alignment and truncation options"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"Text"})," component prepares content with a few properties."]}),`
`,e.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(t.h2,{id:"props",children:"Props"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"Text"})," component accepts the following props:"]}),`
`,e.jsx(a,{of:d}),`
`,e.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(t.h3,{id:"as",children:"As"}),`
`,e.jsxs(t.p,{children:["Setting the ",e.jsx(t.code,{children:"as"})," prop allows you to change the HTML tag of the ",e.jsx(t.code,{children:"Text"})," component."]}),`
`,e.jsx(n,{language:"tsx",code:p}),`
`,e.jsx(t.h3,{id:"align",children:"Align"}),`
`,e.jsxs(t.p,{children:["Setting the ",e.jsx(t.code,{children:"align"})," prop allows you to change the alignment of the text. You can choose from ",e.jsx(t.code,{children:"start"}),", ",e.jsx(t.code,{children:"center"}),", ",e.jsx(t.code,{children:"end"}),", or ",e.jsx(t.code,{children:"justify"}),`.
`,e.jsx(t.code,{children:"start"})," works like ",e.jsx(t.code,{children:"left"})," and ",e.jsx(t.code,{children:"end"})," works like ",e.jsx(t.code,{children:"right"}),". These keywords support RTL languages so you do not need to worry about the language of the text."]}),`
`,e.jsx(n,{language:"tsx",code:c}),`
`,e.jsx(t.h3,{id:"max-lines",children:"Max Lines"}),`
`,e.jsxs(t.p,{children:["Setting the ",e.jsx(t.code,{children:"maxLines"})," prop allows you to limit the number of lines of text that are displayed using an ellipsis. In browsers that don't support multiline text truncation using ",e.jsx(t.code,{children:"line-clamp"}),", the text will be truncated after a single line regardless of the number provided for ",e.jsx(t.code,{children:"maxLines"}),"."]}),`
`,e.jsx(n,{language:"tsx",code:x}),`
`,e.jsx(t.h3,{id:"wrap",children:"Wrap"}),`
`,e.jsxs(t.p,{children:["Setting the ",e.jsx(t.code,{children:"wrap"})," prop allows you to change the wrapping of the text. The values can be ",e.jsx(t.code,{children:"wrap"}),", ",e.jsx(t.code,{children:"nowrap"}),", ",e.jsx(t.code,{children:"balance"}),", ",e.jsx(t.code,{children:"pretty"}),", or ",e.jsx(t.code,{children:"stable"}),"."]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"wrap"})," is the setting that is most commonly used. For most elements you will not to explicitly set this."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"nowrap"})," should be avoided except in cases where it is important to prevent the text from wrapping."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"balance"})," is most commonly used for headlines, titles, and labels."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"pretty"})," is most commonly used for body text."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"stable"})," is commonly used for editable text, such as textareas."]}),`
`]}),`
`,e.jsx(n,{language:"tsx",code:m})]})}function ie(o={}){const{wrapper:t}={...i(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(r,{...o})}):r(o)}export{ie as default};
