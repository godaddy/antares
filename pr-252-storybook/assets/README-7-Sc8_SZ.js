import{i as e}from"./preload-helper-BhBC2KNH.js";import{y as t}from"./iframe-uWep7uYl.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-BIgs6kmL.js";import{t as c}from"./mdx-react-shim-oYYOBCf9.js";import{Default as l,Disabled as u,DropTargetLabel as d,FileUpload as f,Props as p,ReplaceFile as m,n as h,t as g}from"./drop-zone.stories--gLp4ql4.js";var _,v=e((()=>{_=`import { DropZone, isFileDropItem, Text } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <DropZone
      onDrop={function handleDrop(e) {
        const files = e.items.filter(isFileDropItem);
        console.log('Dropped files:', files);
      }}
    >
      <Text slot="label">Drop files to upload.</Text>
    </DropZone>
  );
}
`})),y,b=e((()=>{y=`import { DropZone, Text } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <DropZone isDisabled>
      <Text slot="label">Drop files to upload.</Text>
    </DropZone>
  );
}
`})),x,S=e((()=>{x=`import { useEffect, useState } from 'react';
import { Button, DropZone, FileTrigger, Flex, Icon, isFileDropItem, Text } from '@godaddy/antares';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

type Preview = { name: string; url?: string };

export function FileUploadExample() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<Preview[]>([]);

  useEffect(
    function buildPreviews() {
      const next: Preview[] = files.map(function toPreview(file) {
        return {
          name: file.name,
          url: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
        };
      });
      setPreviews(next);

      return function revoke() {
        for (const preview of next) {
          if (preview.url) URL.revokeObjectURL(preview.url);
        }
      };
    },
    [files]
  );

  function handleFiles(list: FileList | File[] | null) {
    if (!list) return;
    setFiles(Array.from(list));
  }

  return (
    <Flex direction="column" gap="sm">
      <DropZone
        aria-label="Add files or drag them here"
        getDropOperation={function getDropOperation(types) {
          return ACCEPTED_TYPES.some(function matches(type) {
            return types.has(type);
          })
            ? 'copy'
            : 'cancel';
        }}
        onDrop={async function handleDrop(e) {
          const dropped = await Promise.all(
            e.items.filter(isFileDropItem).map(function getFile(item) {
              return item.getFile();
            })
          );
          handleFiles(dropped);
        }}
        gap="sm"
      >
        <FileTrigger acceptedFileTypes={ACCEPTED_TYPES} allowsMultiple onSelect={handleFiles}>
          <Button variant="inline" style={{ fontSize: '0.984rem', fontWeight: 700 }}>
            <Icon icon="add" aria-hidden="true" />
            Add files
          </Button>
        </FileTrigger>
        <Text style={{ fontSize: '0.778rem' }}>The file must be less than 256MB</Text>
      </DropZone>

      <Flex justifyContent="center" gap="xs">
        <Text style={{ fontSize: '0.778rem' }}>Supported formats:</Text>
        <Text as="strong" style={{ fontSize: '0.778rem' }}>
          .pdf, .jpg, .gif, .png
        </Text>
      </Flex>

      {previews.length > 0 ? (
        <Flex gap="sm" wrap="wrap" aria-label="Selected files">
          {previews.map(function renderPreview(preview) {
            return (
              <Flex key={preview.name} direction="column" alignItems="center" gap="xs">
                {preview.url ? (
                  <img
                    src={preview.url}
                    alt={preview.name}
                    style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8 }}
                  />
                ) : (
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    style={{ width: 64, height: 64, borderRadius: 8, background: '#f5f5f5' }}
                  >
                    <Text style={{ textTransform: 'uppercase' }}>{preview.name.split('.').pop()}</Text>
                  </Flex>
                )}
                <Text maxLines={1} style={{ maxWidth: 64 }}>
                  {preview.name}
                </Text>
              </Flex>
            );
          })}
        </Flex>
      ) : null}
    </Flex>
  );
}
`})),C,w=e((()=>{C=`import { DropZone, type DropZoneRenderProps, isFileDropItem, Text } from '@godaddy/antares';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

export function DropTargetLabelExample() {
  return (
    <DropZone
      getDropOperation={function getDropOperation(types) {
        return ACCEPTED_TYPES.some(function matches(type) {
          return types.has(type);
        })
          ? 'copy'
          : 'cancel';
      }}
      onDrop={async function handleDrop(e) {
        const files = await Promise.all(
          e.items.filter(isFileDropItem).map(function getFile(item) {
            return item.getFile();
          })
        );
        console.log(
          'Dropped files:',
          files.map(function getName(f) {
            return f.name;
          })
        );
      }}
    >
      {function renderContent({ isDropTarget }: DropZoneRenderProps) {
        return isDropTarget ? (
          <Text as="strong">Drop files to upload.</Text>
        ) : (
          <Text slot="label">Add files or drag them here.</Text>
        );
      }}
    </DropZone>
  );
}
`})),T,E=e((()=>{T=`import { useEffect, useState } from 'react';
import {
  Button,
  DropZone,
  type DropZoneRenderProps,
  FileTrigger,
  Flex,
  Icon,
  isFileDropItem,
  Text
} from '@godaddy/antares';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

type Preview = { name: string; url?: string };

export function ReplaceFileExample() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<Preview | null>(null);

  useEffect(
    function buildPreview() {
      if (!file) {
        setPreview(null);
        return;
      }
      const url = file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined;
      setPreview({ name: file.name, url });
      return function revoke() {
        if (url) URL.revokeObjectURL(url);
      };
    },
    [file]
  );

  function handleFiles(list: FileList | File[] | null) {
    if (!list) return;
    const f = Array.from(list)[0];
    if (f) setFile(f);
  }

  const isFilled = file !== null;

  return (
    <div style={{ width: 200 }}>
      <DropZone
        aria-label={isFilled ? 'Replace uploaded file' : 'Add a file'}
        getDropOperation={function getDropOperation(types) {
          return ACCEPTED_TYPES.some(function matches(type) {
            return types.has(type);
          })
            ? 'copy'
            : 'cancel';
        }}
        onDrop={async function handleDrop(e) {
          const dropped = await Promise.all(
            e.items.filter(isFileDropItem).map(function getFile(item) {
              return item.getFile();
            })
          );
          handleFiles(dropped);
        }}
        gap="sm"
        style={{ minHeight: 200 }}
      >
        {function renderContent({ isDropTarget }: DropZoneRenderProps) {
          if (isFilled && isDropTarget) {
            return <Text as="strong">Drop to replace</Text>;
          }

          if (isFilled) {
            return (
              <Flex direction="column" alignItems="center" gap="xs">
                {preview?.url ? (
                  <img
                    src={preview.url}
                    alt={preview.name}
                    style={{ width: 64, height: 48, objectFit: 'cover', borderRadius: 4 }}
                  />
                ) : (
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    style={{ width: 64, height: 48, background: '#f5f5f5', borderRadius: 4 }}
                  >
                    <Text style={{ textTransform: 'uppercase' }}>{file?.name.split('.').pop()}</Text>
                  </Flex>
                )}
                <Text maxLines={1} style={{ maxWidth: 96 }}>
                  {file?.name}
                </Text>
                <FileTrigger acceptedFileTypes={ACCEPTED_TYPES} onSelect={handleFiles}>
                  <Button variant="inline">Replace</Button>
                </FileTrigger>
              </Flex>
            );
          }

          return (
            <FileTrigger acceptedFileTypes={ACCEPTED_TYPES} onSelect={handleFiles}>
              <Button
                variant="inline"
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.984rem',
                  fontWeight: 700
                }}
              >
                <Icon icon="add" aria-hidden="true" />
                Add files
              </Button>
            </FileTrigger>
          );
        }}
      </DropZone>
    </div>
  );
}
`}));function D(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(o,{of:g,name:`Overview`}),`
`,(0,k.jsx)(t.h1,{id:`dropzone`,children:`DropZone`}),`
`,(0,k.jsx)(t.p,{children:`A standalone region that accepts drag-and-drop file interactions, rendering a clearly defined target area where users can drop files.`}),`
`,(0,k.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,k.jsx)(t.pre,{children:(0,k.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,k.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,k.jsx)(a,{of:p}),`
`,(0,k.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,k.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,k.jsxs)(t.p,{children:[`A minimal drop zone. The `,(0,k.jsx)(t.code,{children:`onDrop`}),` callback receives the dropped items; use the exported `,(0,k.jsx)(t.code,{children:`isFileDropItem`}),` guard to narrow them to files. Wrap the instructional text in `,(0,k.jsx)(t.code,{children:`<Text slot="label">`}),` so it labels the visually hidden drop button for screen readers.`]}),`
`,(0,k.jsx)(i,{of:l,inline:!0}),`
`,(0,k.jsx)(r,{language:`tsx`,code:_}),`
`,(0,k.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,k.jsxs)(t.p,{children:[`Set `,(0,k.jsx)(t.code,{children:`isDisabled`}),` to prevent the drop zone from accepting interactions. The zone is dimmed and the cursor indicates it is not interactive.`]}),`
`,(0,k.jsx)(i,{of:u,inline:!0}),`
`,(0,k.jsx)(r,{language:`tsx`,code:y}),`
`,(0,k.jsx)(t.h3,{id:`file-upload`,children:`File Upload`}),`
`,(0,k.jsxs)(t.p,{children:[`A reference composition combining `,(0,k.jsx)(t.code,{children:`DropZone`}),` with `,(0,k.jsx)(t.code,{children:`FileTrigger`}),` to support both click-to-browse and drag-and-drop. Use this as a starting point and adapt the accepted formats, size limit, and handlers to your product's requirements.`]}),`
`,(0,k.jsx)(i,{of:f,inline:!0}),`
`,(0,k.jsx)(r,{language:`tsx`,code:x}),`
`,(0,k.jsx)(t.h3,{id:`drop-target-label`,children:`Drop Target Label`}),`
`,(0,k.jsxs)(t.p,{children:[`Pass a render-prop function as `,(0,k.jsx)(t.code,{children:`children`}),` to change the zone's content while a valid drag is active. Branching on `,(0,k.jsx)(t.code,{children:`isDropTarget`}),` requires no extra state. Pair it with `,(0,k.jsx)(t.code,{children:`getDropOperation`}),` to reject unsupported types — the label only appears when the drag is accepted.`]}),`
`,(0,k.jsx)(i,{of:d,inline:!0}),`
`,(0,k.jsx)(r,{language:`tsx`,code:C}),`
`,(0,k.jsx)(t.h3,{id:`replace-existing-file`,children:`Replace Existing File`}),`
`,(0,k.jsxs)(t.p,{children:[`Use `,(0,k.jsx)(t.code,{children:`children`}),` as a render function to show different content based on the current zone state — here, swapping the default label for "Drop to replace" when a file is already selected and a new drag is active. The same `,(0,k.jsx)(t.code,{children:`onDrop`}),` handler services both the drag path and the `,(0,k.jsx)(t.code,{children:`FileTrigger`}),` click path, so either gesture replaces the selection.`]}),`
`,(0,k.jsx)(i,{of:m,inline:!0}),`
`,(0,k.jsx)(r,{language:`tsx`,code:T}),`
`,(0,k.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,k.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,k.jsxs)(t.table,{children:[(0,k.jsx)(t.thead,{children:(0,k.jsxs)(t.tr,{children:[(0,k.jsx)(t.th,{children:`Key`}),(0,k.jsx)(t.th,{children:`Description`})]})}),(0,k.jsxs)(t.tbody,{children:[(0,k.jsxs)(t.tr,{children:[(0,k.jsx)(t.td,{children:(0,k.jsx)(t.code,{children:`Tab`})}),(0,k.jsx)(t.td,{children:`Moves focus to the drop zone`})]}),(0,k.jsxs)(t.tr,{children:[(0,k.jsxs)(t.td,{children:[(0,k.jsx)(t.code,{children:`Enter`}),` / `,(0,k.jsx)(t.code,{children:`Space`})]}),(0,k.jsx)(t.td,{children:`Opens the file picker so files can be selected without a pointer`})]})]})]}),`
`,(0,k.jsx)(t.h3,{id:`screen-readers`,children:`Screen readers`}),`
`,(0,k.jsxs)(t.p,{children:[`The drop zone renders a visually hidden `,(0,k.jsx)(t.code,{children:`<button>`}),` inside the container. Assistive technology discovers and announces this button as an interactive element — activating it opens the native file picker without a pointer.`]}),`
`,(0,k.jsx)(t.p,{children:`The button's accessible name is built from two sources, combined in order:`}),`
`,(0,k.jsxs)(t.ol,{children:[`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:(0,k.jsx)(t.code,{children:`<Text slot="label">`})}),` — any `,(0,k.jsx)(t.code,{children:`Text`}),` child with `,(0,k.jsx)(t.code,{children:`slot="label"`}),` has its `,(0,k.jsx)(t.code,{children:`id`}),` linked to the button via `,(0,k.jsx)(t.code,{children:`aria-labelledby`}),`. This is the recommended way to provide a contextual label that is also visible to sighted users.`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:(0,k.jsx)(t.code,{children:`aria-label`})}),` — pass `,(0,k.jsx)(t.code,{children:`aria-label`}),` on the `,(0,k.jsx)(t.code,{children:`DropZone`}),` component to override or supplement the label (e.g. `,(0,k.jsx)(t.code,{children:`aria-label="Upload profile photo"`}),`). When no `,(0,k.jsx)(t.code,{children:`Text slot="label"`}),` is present and no `,(0,k.jsx)(t.code,{children:`aria-label`}),` is set, the button falls back to the default "DropZone" label provided by React Aria.`]}),`
`]}),`
`,(0,k.jsx)(t.pre,{children:(0,k.jsx)(t.code,{className:`language-tsx`,children:`<DropZone onDrop={handleDrop}>
  <Text slot="label">Drop files to upload.</Text>
</DropZone>
`})}),`
`,(0,k.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,k.jsxs)(t.ul,{children:[`
`,(0,k.jsx)(t.li,{children:`Use the drop zone alongside a button-based file picker — drag-and-drop is a convenience, never the only way to upload.`}),`
`,(0,k.jsxs)(t.li,{children:[`Replace the default text with `,(0,k.jsx)(t.code,{children:`children`}),` to communicate the accepted file types and size limits up front.`]}),`
`,(0,k.jsx)(t.li,{children:`Let the drop zone fill its container; constrain it with the surrounding layout rather than setting a fixed width on the component itself.`}),`
`,(0,k.jsx)(t.li,{children:`Reflect upload state (validating, uploading, error) outside the drop zone so the target area stays clear and predictable.`}),`
`]})]})}function O(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,k.jsx)(t,{...e,children:(0,k.jsx)(D,{...e})}):D(e)}var k;e((()=>{k=t(),c(),s(),h(),v(),b(),S(),w(),E()}))();export{O as default};