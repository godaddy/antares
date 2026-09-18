import{i as e}from"./preload-helper-C0wvdM37.js";import{F as t}from"./iframe-CGoVW9BK.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-Drngl9sn.js";import{t as c}from"./mdx-react-shim-Bl9Gsb4H.js";import{t as l}from"./runtime-BXZUr_13.js";import{Default as u,Pilot as d,Props as f,Themes as p,n as m,t as h}from"./size-provider.stories-Djc4hfgr.js";function g(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,ul:`ul`,...n(),...e.components};return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(o,{of:m,name:`Overview`}),`
`,(0,v.jsx)(t.h1,{id:`sizeprovider`,children:`SizeProvider`}),`
`,(0,v.jsx)(t.p,{children:`Wrapperless size defaults for participating typography and controls.`}),`
`,(0,v.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,v.jsxs)(t.ul,{children:[`
`,(0,v.jsxs)(t.li,{children:[`Provides `,(0,v.jsx)(t.code,{children:`sm`}),`, `,(0,v.jsx)(t.code,{children:`md`}),`, or `,(0,v.jsx)(t.code,{children:`lg`}),` through React context, including portals.`]}),`
`,(0,v.jsx)(t.li,{children:`Explicit child sizes win. Nested providers inherit when size is omitted.`}),`
`,(0,v.jsx)(t.li,{children:`Adds no DOM wrapper and cannot style bare text.`}),`
`,(0,v.jsx)(t.li,{children:`Participating components: Text, Detail, Heading, Label, Button and its presets,
TextField, TextLockup, and Modal. Other components have not adopted coordinated sizing.`}),`
`,(0,v.jsxs)(t.li,{children:[`Modal starts its own `,(0,v.jsx)(t.code,{children:`md`}),` scope. TextLockup coordinates named text without resizing controls.`]}),`
`,(0,v.jsx)(t.li,{children:`Box, Flex, and Grid pass context through; their explicit spacing keeps its usual meaning.`}),`
`]}),`
`,(0,v.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,v.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,v.jsx)(t.p,{children:`A wrapperless scope coordinates participating text and controls.`}),`
`,(0,v.jsx)(i,{of:u,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { Button, Detail, Flex, Heading, SizeProvider, Text } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <SizeProvider size="sm">
      <Flex direction="column" gap="md">
        <Heading level={2}>Account settings</Heading>
        <Text>Manage the details of your account.</Text>
        <Detail>Supporting copy inherits the same color.</Detail>
        <Button>Save changes</Button>
      </Flex>
    </SizeProvider>
  );
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h3,{id:`pilot`,children:`Pilot`}),`
`,(0,v.jsx)(t.p,{children:`Compare the provisional pilot mappings and their explicit overrides.`}),`
`,(0,v.jsx)(i,{of:d,inline:!0}),`
`,(0,v.jsx)(r,{code:`import {
  Button,
  Detail,
  FieldError,
  Flex,
  Group,
  Heading,
  Input,
  Label,
  SizeProvider,
  Tag,
  Text,
  TextField,
  TextLockup
} from '@godaddy/antares';

export function PilotExample() {
  return (
    <Flex gap="xl" wrap="wrap">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <section key={size} data-scope={size} style={{ flex: '1 1 18rem', minWidth: 0 }}>
          <SizeProvider size={size}>
            <Flex direction="column" gap="md" data-spacing="explicit">
              <Heading level={2}>{size} section</Heading>
              <Heading level={4}>{size} subsection</Heading>
              <Text>Body {size}</Text>
              <Detail>Detail {size}</Detail>
              <Label>Standalone label {size}</Label>
              <Flex gap="sm" wrap="wrap">
                <Button>Direct {size}</Button>
                <Button>
                  <Text>Wrapped {size}</Text>
                </Button>
                <Button>
                  <Text emphasis="critical" maxLines={1}>
                    Color {size}
                  </Text>
                </Button>
                <Button>
                  <Text size="xl">Large label {size}</Text>
                </Button>
                <Button size="lg">Explicit {size}</Button>
              </Flex>
              <SizeProvider>
                <SizeProvider size={size}>
                  <Button>Nested {size}</Button>
                </SizeProvider>
              </SizeProvider>
              <TextField isInvalid defaultValue="hello@example.com">
                <Label>Email {size}</Label>
                <Group>
                  <Input />
                  <Button slot="control">Clear {size}</Button>
                </Group>
                <Detail slot="description">Receipts {size}</Detail>
                <FieldError>Invalid email {size}</FieldError>
              </TextField>
              <TextLockup size="xl">
                <Tag slot="eyebrow">New {size}</Tag>
                <Heading slot="title">Lockup {size}</Heading>
                <Text slot="body">Lockup body {size}</Text>
                <Text>Unslotted {size}</Text>
                <Button>Lockup action {size}</Button>
                <TextLockup>
                  <Heading slot="title">Nested lockup {size}</Heading>
                </TextLockup>
              </TextLockup>
            </Flex>
          </SizeProvider>
        </section>
      ))}
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h3,{id:`themes`,children:`Themes`}),`
`,(0,v.jsx)(t.p,{children:`Token and legacy themes keep their font settings through composed labels.`}),`
`,(0,v.jsx)(i,{of:p,inline:!0}),`
`,(0,v.jsx)(r,{code:`import type { CSSProperties } from 'react';
import { Avatar, Button, Detail, Flex, Heading, Label, SizeProvider, Text } from '@godaddy/antares';

export function ThemesExample() {
  const themes = {
    tokens: {
      '--font-body-family': 'monospace',
      '--font-body-size-sm': '17px',
      '--font-body-variation': '"wght" 450',
      '--ux-j40yyd': '600',
      '--ux-jw5s9j': '1.75',
      '--font-size-020': '15px',
      '--color-feedback-critical-text': 'rgb(100, 20, 30)'
    },
    legacy: {
      '--ux-117cu43': 'monospace',
      '--ux-gfnupv': 'monospace',
      '--ux-ndnsbo': '"wght" 475',
      '--ux-j40yyd': '600',
      '--ux-jw5s9j': '1.75',
      '--ux-1fhc073': 'rgb(110, 20, 30)'
    }
  };
  return (
    <Flex direction="column" gap="lg">
      {Object.entries(themes).map(([name, style]) => (
        <section key={name} data-theme={name} style={style as CSSProperties}>
          <SizeProvider size="sm">
            <Heading>{name} theme</Heading>
            <Text>Body {name}</Text>
            <Detail>Supporting {name}</Detail>
            <Label>Label {name}</Label>
            <Button>
              <Text emphasis="critical">Themed {name}</Text>
            </Button>
            <Avatar size="lg">
              <Text>JR</Text>
            </Avatar>
          </SizeProvider>
        </section>
      ))}
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,v.jsx)(a,{of:f})]})}function _(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,v.jsx)(t,{...e,children:(0,v.jsx)(g,{...e})}):g(e)}var v;e((()=>{v=t(),c(),s(),l(),h()}))();export{_ as default};