import{i as e}from"./preload-helper-wAYLiFQb.js";import{F as t}from"./iframe-CGuQUH2M.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-Bp_ZeC-W.js";import{t as c}from"./mdx-react-shim-1ARxdPU6.js";import{t as l}from"./runtime-DqHkGQqO.js";import{Composition as u,Default as d,Indeterminate as f,Props as p,Sizes as m,Statuses as h,TrackProps as g,ValueDisplay as _,ValueOnly as v,ValueProps as y,WithoutLabel as b,WithoutValueLabel as x,n as S,t as C}from"./progress-bar.stories--ECs6Ooa.js";function w(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(o,{of:S,name:`Overview`}),`
`,(0,E.jsx)(t.h1,{id:`progressbar`,children:`ProgressBar`}),`
`,(0,E.jsx)(t.p,{children:`Composable determinate or indeterminate progress with optional label, value, and description`}),`
`,(0,E.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,E.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,E.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,E.jsx)(t.p,{children:`Compose a label, formatted value, track, and description.`}),`
`,(0,E.jsx)(i,{of:d,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Label, ProgressBar, ProgressBarTrack, ProgressBarValue, Text, type ProgressBarProps } from '@godaddy/antares';

export function DefaultExample(props: ProgressBarProps) {
  return (
    <ProgressBar value={60} {...props}>
      <Label>Loading…</Label>
      <ProgressBarValue />
      <ProgressBarTrack />
      <Text slot="description">Please wait while we process your request</Text>
    </ProgressBar>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,E.jsxs)(t.p,{children:[`Three track heights are available: `,(0,E.jsx)(t.code,{children:`xs`}),` (6px), `,(0,E.jsx)(t.code,{children:`sm`}),` (12px), and `,(0,E.jsx)(t.code,{children:`md`}),` (24px).`]}),`
`,(0,E.jsx)(i,{of:m,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Flex, Label, ProgressBar, ProgressBarTrack, ProgressBarValue } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar size="xs" value={40}>
        <Label>Extra Small</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
      </ProgressBar>
      <ProgressBar size="sm" value={60}>
        <Label>Small</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
      </ProgressBar>
      <ProgressBar size="md" value={80}>
        <Label>Medium</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
      </ProgressBar>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`statuses`,children:`Statuses`}),`
`,(0,E.jsxs)(t.p,{children:[`Use `,(0,E.jsx)(t.code,{children:`status`}),` to communicate intent and a description for additional context.`]}),`
`,(0,E.jsx)(i,{of:h,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Flex, Label, ProgressBar, ProgressBarTrack, ProgressBarValue, Text } from '@godaddy/antares';

export function StatusesExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar status="default" value={50}>
        <Label>Default</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
        <Text slot="description">In progress</Text>
      </ProgressBar>
      <ProgressBar status="success" value={100}>
        <Label>Success</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
        <Text slot="description">Complete</Text>
      </ProgressBar>
      <ProgressBar status="warning" value={70}>
        <Label>Warning</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
        <Text slot="description">Storage almost full</Text>
      </ProgressBar>
      <ProgressBar status="critical" value={30}>
        <Label>Critical</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
        <Text slot="description">Action required</Text>
      </ProgressBar>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`indeterminate`,children:`Indeterminate`}),`
`,(0,E.jsx)(t.p,{children:`Use indeterminate progress while the total is unknown. Value output is hidden automatically.`}),`
`,(0,E.jsx)(i,{of:f,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Label, ProgressBar, ProgressBarTrack, ProgressBarValue, Text, type ProgressBarProps } from '@godaddy/antares';

export function IndeterminateExample(props: ProgressBarProps) {
  return (
    <ProgressBar isIndeterminate {...props}>
      <Label>Preparing upload…</Label>
      <ProgressBarValue />
      <ProgressBarTrack />
      <Text slot="description">Calculating the total size</Text>
    </ProgressBar>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`without-value-label`,children:`Without Value Label`}),`
`,(0,E.jsx)(t.p,{children:`Omit ProgressBarValue to hide visible value output. Accessible progress is preserved.`}),`
`,(0,E.jsx)(i,{of:x,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Label, ProgressBar, ProgressBarTrack, type ProgressBarProps } from '@godaddy/antares';

export function WithoutValueLabelExample(props: ProgressBarProps) {
  return (
    <ProgressBar value={60} {...props}>
      <Label>Uploading files</Label>
      <ProgressBarTrack />
    </ProgressBar>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`without-label`,children:`Without Label`}),`
`,(0,E.jsx)(t.p,{children:`Compose only the track for progress in a table or fixed position. Supply an accessible name.`}),`
`,(0,E.jsx)(i,{of:b,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { ProgressBar, ProgressBarTrack, type ProgressBarProps } from '@godaddy/antares';

export function WithoutLabelExample(props: ProgressBarProps) {
  return <ProgressBar aria-label="Upload progress" value={60} size="sm" children={<ProgressBarTrack />} {...props} />;
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`value-display`,children:`Value Display`}),`
`,(0,E.jsx)(t.p,{children:`ProgressBarValue shows the formatted value by default and accepts static or state-based content.
Static content does not change the accessible value; set the root's valueLabel when needed.`}),`
`,(0,E.jsx)(i,{of:_,inline:!0}),`
`,(0,E.jsx)(r,{code:`import {
  Flex,
  Label,
  ProgressBar,
  ProgressBarTrack,
  ProgressBarValue,
  type ProgressBarProps,
  type ProgressBarValueProps
} from '@godaddy/antares';

interface ValueDisplayExampleProps extends ProgressBarProps {
  /** Content of the state-based value. */
  valueContent?: ProgressBarValueProps['children'];
}

export function ValueDisplayExample({ valueContent, ...props }: ValueDisplayExampleProps) {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar value={60} {...props}>
        <Label>Upload progress</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
      </ProgressBar>
      <ProgressBar value={60} {...props}>
        <Label>Files uploaded</Label>
        <ProgressBarValue>
          <span>3 of 5 files</span>
        </ProgressBarValue>
        <ProgressBarTrack />
      </ProgressBar>
      <ProgressBar value={60} {...props}>
        <Label>Processing progress</Label>
        <ProgressBarValue>
          {valueContent === undefined
            ? function renderValue({ percentage }) {
                return \`Current: \${percentage}%\`;
              }
            : valueContent}
        </ProgressBarValue>
        <ProgressBarTrack />
      </ProgressBar>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`composition`,children:`Composition`}),`
`,(0,E.jsx)(t.p,{children:`Parts keep their association through wrappers and fragments. Named areas allow a different source order.
The description can appear or disappear independently of the root.`}),`
`,(0,E.jsx)(i,{of:u,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { useState, type RefAttributes } from 'react';
import {
  Button,
  Label,
  ProgressBar,
  ProgressBarTrack,
  ProgressBarValue,
  Text,
  type ProgressBarProps,
  type ProgressBarTrackProps,
  type ProgressBarValueProps
} from '@godaddy/antares';

interface CompositionExampleProps extends ProgressBarProps, RefAttributes<HTMLDivElement> {
  /** Props for the track. */
  trackProps?: ProgressBarTrackProps & RefAttributes<HTMLDivElement>;

  /** Props for the visible value. */
  valueProps?: ProgressBarValueProps & RefAttributes<HTMLElement>;
}

export function CompositionExample({ trackProps, valueProps, ...props }: CompositionExampleProps) {
  const [showDescription, setShowDescription] = useState(true);
  const [descriptionId, setDescriptionId] = useState('upload-description');
  return (
    <>
      <Text id="external-description">Keep this window open.</Text>
      <ProgressBar value={60} aria-describedby="external-description" {...props}>
        {function renderParts({ valueText }) {
          return (
            <>
              <ProgressBarTrack {...trackProps} />
              <div style={{ display: 'contents' }}>
                <Text slot={null}>Additional content</Text>
                {showDescription ? (
                  <Text id={descriptionId} slot="description">
                    {valueText} uploaded
                  </Text>
                ) : null}
                <ProgressBarValue {...valueProps} />
                <Label>Uploading</Label>
              </div>
            </>
          );
        }}
      </ProgressBar>
      <Button
        onPress={function toggleDescription() {
          setShowDescription(!showDescription);
        }}
      >
        Toggle description
      </Button>
      <Button
        onPress={function changeDescriptionId() {
          setDescriptionId('renamed-description');
        }}
      >
        Change description ID
      </Button>
    </>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`value-only`,children:`Value Only`}),`
`,(0,E.jsx)(t.p,{children:`Compose a value without a visible label, using aria-label for the accessible name.`}),`
`,(0,E.jsx)(i,{of:v,inline:!0}),`
`,(0,E.jsx)(r,{code:`import {
  ProgressBar,
  ProgressBarTrack,
  ProgressBarValue,
  type ProgressBarProps,
  type ProgressBarValueProps
} from '@godaddy/antares';

interface ValueOnlyExampleProps extends ProgressBarProps {
  /** Visible value content, or undefined for the formatted value. */
  valueContent?: ProgressBarValueProps['children'];
}

export function ValueOnlyExample({ valueContent, ...props }: ValueOnlyExampleProps) {
  return (
    <ProgressBar aria-label="Upload progress" value={60} {...props}>
      <ProgressBarValue>{valueContent}</ProgressBarValue>
      <ProgressBarTrack />
    </ProgressBar>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,E.jsx)(t.p,{children:`Compose only the parts you need:`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.code,{children:`Label`}),` provides a visible, associated name.`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.code,{children:`ProgressBarValue`}),` shows the formatted value by default. Its children accept static content or a render function receiving `,(0,E.jsx)(t.code,{children:`percentage`}),`, `,(0,E.jsx)(t.code,{children:`valueText`}),`, and `,(0,E.jsx)(t.code,{children:`isIndeterminate`}),`.`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.code,{children:`ProgressBarTrack`}),` renders the fill and inherits the root's size and status.`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.code,{children:`Text slot="description"`}),` provides helper text with an automatic accessible association.`]}),`
`]}),`
`,(0,E.jsxs)(t.p,{children:[`Omitting `,(0,E.jsx)(t.code,{children:`ProgressBarValue`}),` hides visible value output while preserving accessible progress. Omit both label and value for a compact track-only layout. Parts use named grid areas, so direct children and fragments can be written in any order. Use `,(0,E.jsx)(t.code,{children:`display: contents`}),` on a wrapper when its parts should participate in the root's grid, or override the root's Grid layout props for custom placement.`]}),`
`,(0,E.jsxs)(t.p,{children:[`Custom visual value content does not change `,(0,E.jsx)(t.code,{children:`aria-valuetext`}),`. The root's `,(0,E.jsx)(t.code,{children:`valueLabel`}),` accepts a string for accessible value text and the default output of `,(0,E.jsx)(t.code,{children:`ProgressBarValue`}),`; it does not add a visible value by itself.`]}),`
`,(0,E.jsx)(t.h3,{id:`migration`,children:`Migration`}),`
`,(0,E.jsxs)(t.p,{children:[`Replace root `,(0,E.jsx)(t.code,{children:`label`}),` with `,(0,E.jsx)(t.code,{children:`Label`}),` and `,(0,E.jsx)(t.code,{children:`helperText`}),` with `,(0,E.jsx)(t.code,{children:`Text slot="description"`}),`. Add `,(0,E.jsx)(t.code,{children:`ProgressBarTrack`}),` explicitly, and add `,(0,E.jsx)(t.code,{children:`ProgressBarValue`}),` to retain visible percentage text:`]}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-tsx`,children:`<ProgressBar value={60}>
  <Label>Uploading</Label>
  <ProgressBarValue />
  <ProgressBarTrack />
  <Text slot="description">3 of 5 files uploaded</Text>
</ProgressBar>
`})}),`
`,(0,E.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsxs)(t.li,{children:[`The root has `,(0,E.jsx)(t.code,{children:`role="progressbar"`}),` and a range defined by `,(0,E.jsx)(t.code,{children:`minValue`}),` and `,(0,E.jsx)(t.code,{children:`maxValue`}),`, defaulting to 0 and 100.`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.code,{children:`Label`}),` supplies the accessible name. When omitted, provide `,(0,E.jsx)(t.code,{children:`aria-label`}),` or `,(0,E.jsx)(t.code,{children:`aria-labelledby`}),`.`]}),`
`,(0,E.jsxs)(t.li,{children:[`Determinate progress exposes `,(0,E.jsx)(t.code,{children:`aria-valuenow`}),` and formatted `,(0,E.jsx)(t.code,{children:`aria-valuetext`}),`, even without `,(0,E.jsx)(t.code,{children:`ProgressBarValue`}),`.`]}),`
`,(0,E.jsxs)(t.li,{children:[`Indeterminate progress omits `,(0,E.jsx)(t.code,{children:`aria-valuenow`}),`, `,(0,E.jsx)(t.code,{children:`aria-valuetext`}),`, and visible value output.`]}),`
`,(0,E.jsxs)(t.li,{children:[`Mounted descriptions are associated automatically, including custom IDs. External `,(0,E.jsx)(t.code,{children:`aria-describedby`}),` references are preserved.`]}),`
`,(0,E.jsx)(t.li,{children:`Description association is established on mounting. Server-rendered descriptions are associated when the component hydrates.`}),`
`,(0,E.jsx)(t.li,{children:`Reduced motion stops the indeterminate sweep while retaining a visible indicator. RTL and forced colors are supported.`}),`
`]}),`
`,(0,E.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-tsx`,children:`<ProgressBar>
  <Label />
  <ProgressBarValue />
  <ProgressBarTrack />
  <Text slot="description" />
  {/* ... */}
</ProgressBar>
`})}),`
`,(0,E.jsx)(t.h3,{id:`progressbar-1`,children:`ProgressBar`}),`
`,(0,E.jsx)(a,{of:p}),`
`,(0,E.jsx)(t.h3,{id:`progressbartrack`,children:`ProgressBarTrack`}),`
`,(0,E.jsx)(a,{of:g}),`
`,(0,E.jsx)(t.h3,{id:`progressbarvalue`,children:`ProgressBarValue`}),`
`,(0,E.jsx)(a,{of:y})]})}function T(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,E.jsx)(t,{...e,children:(0,E.jsx)(w,{...e})}):w(e)}var E;e((()=>{E=t(),c(),s(),l(),C()}))();export{T as default};