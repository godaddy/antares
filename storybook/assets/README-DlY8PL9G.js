import{i as e}from"./preload-helper-B4cZKGJ2.js";import{y as t}from"./iframe-DzleJ5nK.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DjjSfXWS.js";import{t as c}from"./mdx-react-shim-BpPjRzfn.js";import{AcceptedTypes as l,Default as u,Props as d,n as f,t as p}from"./file-trigger.stories-NA-Qir4M.js";var m,h=e((()=>{m=`import { Button, FileTrigger } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <FileTrigger
      onSelect={function handleSelect(files) {
        if (!files) return;
        console.log('Selected files:', Array.from(files));
      }}
    >
      <Button>Select a file</Button>
    </FileTrigger>
  );
}
`})),g,_=e((()=>{g=`import { Button, FileTrigger } from '@godaddy/antares';

export function AcceptedTypesExample() {
  return (
    <FileTrigger
      acceptedFileTypes={['image/jpeg', 'image/png', 'image/gif']}
      allowsMultiple
      onSelect={function handleSelect(files) {
        if (!files) return;
        console.log('Selected images:', Array.from(files));
      }}
    >
      <Button>Select images</Button>
    </FileTrigger>
  );
}
`}));function v(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(o,{of:p,name:`Overview`}),`
`,(0,b.jsx)(t.h1,{id:`filetrigger`,children:`FileTrigger`}),`
`,(0,b.jsx)(t.p,{children:`A style-less primitive that wraps any pressable component and opens the native file picker when it is activated.`}),`
`,(0,b.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsxs)(t.li,{children:[`Turns any pressable component (such as an Antares `,(0,b.jsx)(t.code,{children:`Button`}),`) into a file picker trigger.`]}),`
`,(0,b.jsxs)(t.li,{children:[`Renders a visually hidden `,(0,b.jsx)(t.code,{children:`<input type="file">`}),` — no styling of its own.`]}),`
`,(0,b.jsx)(t.li,{children:`Restricts selection by MIME type, allows multiple files, directory selection, and camera capture.`}),`
`,(0,b.jsxs)(t.li,{children:[`Resets the input value before every open, so re-selecting the same file still fires `,(0,b.jsx)(t.code,{children:`onSelect`}),`.`]}),`
`]}),`
`,(0,b.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,b.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,b.jsx)(a,{of:d}),`
`,(0,b.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,b.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,b.jsxs)(t.p,{children:[`Wrap any pressable component. Activating the child opens the native file picker; the selected files arrive in `,(0,b.jsx)(t.code,{children:`onSelect`}),`.`]}),`
`,(0,b.jsx)(i,{of:u,inline:!0}),`
`,(0,b.jsx)(r,{language:`tsx`,code:m}),`
`,(0,b.jsx)(t.h3,{id:`accepted-types`,children:`Accepted Types`}),`
`,(0,b.jsxs)(t.p,{children:[`Restrict the picker to specific MIME types with `,(0,b.jsx)(t.code,{children:`acceptedFileTypes`}),`, and allow more than one file with `,(0,b.jsx)(t.code,{children:`allowsMultiple`}),`.`]}),`
`,(0,b.jsx)(i,{of:l,inline:!0}),`
`,(0,b.jsx)(r,{language:`tsx`,code:g}),`
`,(0,b.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,b.jsxs)(t.p,{children:[(0,b.jsx)(t.code,{children:`FileTrigger`}),` adds no visuals or ARIA of its own — accessibility comes from the pressable child you provide. Use a component with an accessible name (e.g. an Antares `,(0,b.jsx)(t.code,{children:`Button`}),` with clear label text) so assistive technology announces the action. The underlying `,(0,b.jsx)(t.code,{children:`<input>`}),` is visually hidden but remains operable by keyboard through the child's press behavior.`]}),`
`,(0,b.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.code,{children:`acceptedFileTypes`}),` is a best-effort filter for the OS picker — always validate file type and size again in your `,(0,b.jsx)(t.code,{children:`onSelect`}),` handler, since it can be bypassed.`]}),`
`,(0,b.jsxs)(t.li,{children:[`Pair `,(0,b.jsx)(t.code,{children:`FileTrigger`}),` with `,(0,b.jsx)(t.code,{children:`DropZone`}),` to offer both click-to-browse and drag-and-drop. See the DropZone "File Upload" example.`]}),`
`,(0,b.jsxs)(t.li,{children:[`Keep the child a single pressable element; `,(0,b.jsx)(t.code,{children:`FileTrigger`}),` forwards press behavior to whatever you nest inside it.`]}),`
`]})]})}function y(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,b.jsx)(t,{...e,children:(0,b.jsx)(v,{...e})}):v(e)}var b;e((()=>{b=t(),c(),s(),f(),h(),_()}))();export{y as default};