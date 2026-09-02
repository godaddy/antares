import{i as e}from"./preload-helper-BT3GefEN.js";import{F as t}from"./iframe-CdbiARft.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-XGtAa86w.js";import{t as c}from"./mdx-react-shim-DzdanjaZ.js";import{t as l}from"./runtime-CCpseHws.js";import{As as u,Default as d,Props as f,n as p,t as m}from"./label.stories-C5ySxGh8.js";function h(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(o,{of:p,name:`Overview`}),`
`,(0,_.jsx)(t.h1,{id:`label`,children:`Label`}),`
`,(0,_.jsx)(t.p,{children:`Names a form field. Field injects label chrome. The required asterisk comes from Field when the field is required.`}),`
`,(0,_.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,_.jsxs)(t.ul,{children:[`
`,(0,_.jsx)(t.li,{children:`Associates the visible name with the field control.`}),`
`,(0,_.jsxs)(t.li,{children:[`Field CSS adds the required asterisk when the field root is `,(0,_.jsx)(t.code,{children:`isRequired`}),`. That is not a Label prop.`]}),`
`]}),`
`,(0,_.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,_.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,_.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,_.jsxs)(t.p,{children:[`Label names a field. The required asterisk comes from Field CSS when the root is `,(0,_.jsx)(t.code,{children:`isRequired`}),`.`]}),`
`,(0,_.jsx)(i,{of:d,inline:!0}),`
`,(0,_.jsx)(r,{code:`import { Group, Input, Label, TextField } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <TextField isRequired>
      <Label>Email</Label>
      <Group>
        <Input placeholder="you@example.com" />
      </Group>
    </TextField>
  );
}`,language:`tsx`}),`
`,(0,_.jsx)(t.h3,{id:`as`,children:`As`}),`
`,(0,_.jsxs)(t.p,{children:[`Setting the `,(0,_.jsx)(t.code,{children:`as`}),` prop changes the HTML tag.`]}),`
`,(0,_.jsx)(i,{of:u,inline:!0}),`
`,(0,_.jsx)(r,{code:`import { Group, Input, Label, TextField } from '@godaddy/antares';

export function AsExample() {
  return (
    <TextField>
      <Label as="span">Email</Label>
      <Group>
        <Input placeholder="you@example.com" />
      </Group>
    </TextField>
  );
}`,language:`tsx`}),`
`,(0,_.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,_.jsx)(a,{of:f})]})}function g(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,_.jsx)(t,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;e((()=>{_=t(),c(),s(),l(),m()}))();export{g as default};