import{i as e}from"./preload-helper-usAeo7Bx.js";import{y as t}from"./iframe-Il5THdGS.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-Dl26SpeW.js";import{t as c}from"./mdx-react-shim-Cn9Z58T1.js";import{CustomContent as l,Default as u,Disabled as d,Props as f,n as p,t as m}from"./drop-zone.stories-CJ42VIrT.js";var h,g=e((()=>{h=`import { DropZone, type DropZoneProps, isFileDropItem } from '@godaddy/antares';

export function DefaultExample(props?: Partial<DropZoneProps>) {
  return (
    <DropZone
      onDrop={function handleDrop(e) {
        const files = e.items.filter(isFileDropItem);
        console.log('Dropped files:', files);
      }}
      {...props}
    />
  );
}
`})),_,v=e((()=>{_=`import { DropZone, isFileDropItem, Flex, Text } from '@godaddy/antares';

export function CustomContentExample() {
  return (
    <DropZone
      onDrop={function handleDrop(e) {
        const files = e.items.filter(isFileDropItem);
        console.log('Dropped files:', files);
      }}
    >
      <Flex direction="column" alignItems="center" gap="xs">
        <Text>Drag your images here</Text>
        <Text>PNG, JPG, or GIF up to 10MB</Text>
      </Flex>
    </DropZone>
  );
}
`})),y,b=e((()=>{y=`import { DropZone } from '@godaddy/antares';

export function DisabledExample() {
  return <DropZone isDisabled />;
}
`}));function x(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(o,{of:m,name:`Overview`}),`
`,(0,C.jsx)(t.h1,{id:`dropzone`,children:`DropZone`}),`
`,(0,C.jsx)(t.p,{children:`A standalone region that accepts drag-and-drop file interactions, rendering a clearly defined target area where users can drop files.`}),`
`,(0,C.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,C.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,C.jsx)(a,{of:f}),`
`,(0,C.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,C.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,C.jsxs)(t.p,{children:[`A minimal drop zone with the default instructional text. The `,(0,C.jsx)(t.code,{children:`onDrop`}),` callback receives the dropped items; use the exported `,(0,C.jsx)(t.code,{children:`isFileDropItem`}),` guard to narrow them to files.`]}),`
`,(0,C.jsx)(i,{of:u,inline:!0}),`
`,(0,C.jsx)(r,{language:`tsx`,code:h}),`
`,(0,C.jsx)(t.h3,{id:`custom-content`,children:`Custom Content`}),`
`,(0,C.jsxs)(t.p,{children:[`Pass any React node as `,(0,C.jsx)(t.code,{children:`children`}),` to replace the default instructional text — for example, to describe the accepted file types and size limits.`]}),`
`,(0,C.jsx)(i,{of:l,inline:!0}),`
`,(0,C.jsx)(r,{language:`tsx`,code:_}),`
`,(0,C.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,C.jsxs)(t.p,{children:[`Set `,(0,C.jsx)(t.code,{children:`isDisabled`}),` to prevent the drop zone from accepting interactions. The zone is dimmed and the cursor indicates it is not interactive.`]}),`
`,(0,C.jsx)(i,{of:d,inline:!0}),`
`,(0,C.jsx)(r,{language:`tsx`,code:y}),`
`,(0,C.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,C.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,C.jsxs)(t.table,{children:[(0,C.jsx)(t.thead,{children:(0,C.jsxs)(t.tr,{children:[(0,C.jsx)(t.th,{children:`Key`}),(0,C.jsx)(t.th,{children:`Description`})]})}),(0,C.jsxs)(t.tbody,{children:[(0,C.jsxs)(t.tr,{children:[(0,C.jsx)(t.td,{children:(0,C.jsx)(t.code,{children:`Tab`})}),(0,C.jsx)(t.td,{children:`Moves focus to the drop zone`})]}),(0,C.jsxs)(t.tr,{children:[(0,C.jsxs)(t.td,{children:[(0,C.jsx)(t.code,{children:`Enter`}),` / `,(0,C.jsx)(t.code,{children:`Space`})]}),(0,C.jsx)(t.td,{children:`Opens the file picker so files can be selected without a pointer`})]})]})]}),`
`,(0,C.jsx)(t.h3,{id:`screen-readers`,children:`Screen readers`}),`
`,(0,C.jsxs)(t.p,{children:[`The drop zone renders a visually hidden `,(0,C.jsx)(t.code,{children:`<button>`}),` inside the container. Assistive technology discovers and announces this button as an interactive element — activating it opens the native file picker without a pointer. The button's accessible name defaults to "DropZone"; override it with `,(0,C.jsx)(t.code,{children:`aria-label`}),` on the `,(0,C.jsx)(t.code,{children:`DropZone`}),` component to provide more specific context (e.g. `,(0,C.jsx)(t.code,{children:`aria-label="Upload profile photo"`}),`).`]}),`
`,(0,C.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsx)(t.li,{children:`Use the drop zone alongside a button-based file picker — drag-and-drop is a convenience, never the only way to upload.`}),`
`,(0,C.jsxs)(t.li,{children:[`Replace the default text with `,(0,C.jsx)(t.code,{children:`children`}),` to communicate the accepted file types and size limits up front.`]}),`
`,(0,C.jsx)(t.li,{children:`Let the drop zone fill its container; constrain it with the surrounding layout rather than setting a fixed width on the component itself.`}),`
`,(0,C.jsx)(t.li,{children:`Reflect upload state (validating, uploading, error) outside the drop zone so the target area stays clear and predictable.`}),`
`]})]})}function S(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,C.jsx)(t,{...e,children:(0,C.jsx)(x,{...e})}):x(e)}var C;e((()=>{C=t(),c(),s(),p(),g(),v(),b()}))();export{S as default};