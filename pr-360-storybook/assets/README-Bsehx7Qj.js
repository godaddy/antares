import{i as e}from"./preload-helper-BbaScr5H.js";import{F as t}from"./iframe-DdHOhve4.js";import{S as n,c as r,l as i,s as a,u as o}from"./blocks-LMlYyUq3.js";import{t as s}from"./mdx-react-shim-CfROE8ZZ.js";import{t as c}from"./runtime-BXfE7Pk1.js";import{Breakpoints as l,ContainerLayout as u,Default as d,Form as f,ViewportLayout as p,n as m,t as h}from"./responsive.stories-CykHqGAL.js";function g(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(a,{of:m,name:`Overview`}),`
`,(0,v.jsx)(t.h1,{id:`responsive`,children:`Responsive`}),`
`,(0,v.jsx)(t.p,{children:`Shared viewport breakpoints, native CSS patterns, and a media-query hook for responsive behavior.`}),`
`,(0,v.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,v.jsxs)(t.ul,{children:[`
`,(0,v.jsx)(t.li,{children:`Shared, mobile-first viewport widths and query strings.`}),`
`,(0,v.jsx)(t.li,{children:`Native CSS media and container queries for styling.`}),`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.code,{children:`useMediaQuery`}),` for media-dependent React behavior, with an explicit server fallback.`]}),`
`]}),`
`,(0,v.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,v.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,v.jsxs)(t.p,{children:[`Resize the viewport across `,(0,v.jsx)(t.code,{children:`lg`}),` to see the query change. Use this hook for behavior that
needs JavaScript; ordinary responsive styles belong in CSS.`]}),`
`,(0,v.jsx)(i,{of:d,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { Text, useMediaQuery, viewportQueries } from '@godaddy/antares';

interface DefaultExampleProps {
  query?: string;
  ssrMatch?: boolean;
}

export function DefaultExample({ query = viewportQueries.lg, ssrMatch = false }: DefaultExampleProps) {
  const matches = useMediaQuery(query, { ssrMatch });
  return <Text role="status">{matches ? 'Matches' : 'Does not match'}</Text>;
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h3,{id:`breakpoints`,children:`Breakpoints`}),`
`,(0,v.jsx)(t.p,{children:`Widths and inclusive minimum-width query strings come from the same definitions.`}),`
`,(0,v.jsx)(i,{of:l,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { Fragment } from 'react';
import { viewportBreakpoints, viewportQueries, type ViewportBreakpoint } from '@godaddy/antares';

export function BreakpointsExample() {
  return (
    <dl>
      {Object.entries(viewportBreakpoints).map(function breakpoint([name, width]) {
        return (
          <Fragment key={name}>
            <dt>{name}</dt>
            <dd>
              {width}: <code>{viewportQueries[name as ViewportBreakpoint]}</code>
            </dd>
          </Fragment>
        );
      })}
    </dl>
  );
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h3,{id:`viewport-layout`,children:`Viewport Layout`}),`
`,(0,v.jsxs)(t.p,{children:[`CSS changes this layout from one column to two at the shared `,(0,v.jsx)(t.code,{children:`lg`}),` viewport threshold.
Leave `,(0,v.jsx)(t.code,{children:`columns`}),` unset so it does not place a competing value in inline styles.`]}),`
`,(0,v.jsx)(i,{of:p,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { Box, Grid, Text } from '@godaddy/antares';

export function ViewportLayoutExample() {
  return (
    <>
      <style>{\`
        .responsive-viewport-example {
          grid-template-columns: minmax(0, 1fr);
        }

        @media (min-width: 64rem) {
          .responsive-viewport-example {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      \`}</style>
      <Grid as="section" aria-label="Viewport layout" gap="md" className="responsive-viewport-example">
        <Box padding="md" elevation="card">
          <Text>Account settings</Text>
        </Box>
        <Box padding="md" elevation="card">
          <Text>Billing settings</Text>
        </Box>
      </Grid>
    </>
  );
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h3,{id:`container-layout`,children:`Container Layout`}),`
`,(0,v.jsx)(t.p,{children:`The cards respond to their named container, independently of the viewport. The local
30rem threshold belongs to this layout, not the shared viewport scale.`}),`
`,(0,v.jsx)(i,{of:u,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { Box, Grid, Text } from '@godaddy/antares';

interface ContainerLayoutExampleProps {
  width?: number;
}

export function ContainerLayoutExample({ width = 640 }: ContainerLayoutExampleProps) {
  return (
    <>
      <style>{\`
        .responsive-container-example {
          container: responsive-example / inline-size;
          inline-size: 100%;
        }

        .responsive-container-example-grid {
          grid-template-columns: minmax(0, 1fr);
        }

        @container responsive-example (min-width: 30rem) {
          .responsive-container-example-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      \`}</style>
      <Box className="responsive-container-example" style={{ maxInlineSize: width }}>
        <Grid as="section" aria-label="Container layout" gap="md" className="responsive-container-example-grid">
          <Box padding="md" elevation="card">
            <Text>Account settings</Text>
          </Box>
          <Box padding="md" elevation="card">
            <Text>Billing settings</Text>
          </Box>
        </Grid>
      </Box>
    </>
  );
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h3,{id:`form`,children:`Form`}),`
`,(0,v.jsxs)(t.p,{children:[`Type into a field and resize across `,(0,v.jsx)(t.code,{children:`lg`}),`. CSS reflows the same inputs, preserving their
values, focus, and selection. Let CSS own columns and allow long descriptions to wrap.`]}),`
`,(0,v.jsx)(i,{of:f,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { Grid, Input, Label, Text, TextField } from '@godaddy/antares';

interface FormExampleProps {
  /** Help text that can wrap onto multiple lines. */
  description?: string;

  /** Reading direction of the form. */
  dir?: 'ltr' | 'rtl';
}

export function FormExample({
  description = 'Use the name customers recognize on invoices and receipts.',
  dir
}: FormExampleProps) {
  return (
    <>
      <style>{\`
        .responsive-form-example {
          grid-template-columns: minmax(0, 1fr);
        }

        .responsive-form-example-field {
          min-inline-size: 0;
          overflow-wrap: anywhere;
        }

        @media (min-width: 64rem) {
          .responsive-form-example {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      \`}</style>
      <Grid as="form" aria-label="Account details" dir={dir} gap="md" className="responsive-form-example">
        <TextField name="displayName" className="responsive-form-example-field">
          <Label>Account display name</Label>
          <Input />
          <Text slot="description">{description}</Text>
        </TextField>
        <TextField name="email" type="email" className="responsive-form-example-field">
          <Label>Email</Label>
          <Input />
        </TextField>
      </Grid>
    </>
  );
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,v.jsxs)(t.p,{children:[`Exports are available from `,(0,v.jsx)(t.code,{children:`@godaddy/antares`}),` and `,(0,v.jsx)(t.code,{children:`@godaddy/antares/Responsive`}),`. Pass any valid
media-query string to `,(0,v.jsx)(t.code,{children:`useMediaQuery`}),`, including device preferences such as reduced motion.
Viewport widths describe available space; each component chooses the thresholds it needs.
In media queries, `,(0,v.jsx)(t.code,{children:`rem`}),` uses the browser's initial font size.`]}),`
`,(0,v.jsxs)(t.p,{children:[`The examples include their CSS in `,(0,v.jsx)(t.code,{children:`<style>`}),` blocks so the complete code is visible. Applications can
place those rules in their own stylesheets. Let responsive CSS own both the base and query values
for a property; leave its corresponding layout prop and inline `,(0,v.jsx)(t.code,{children:`style`}),` unset. Normal cascade rules
still apply. A named container controls its descendants; portaled content needs a suitable
container in its own DOM ancestry. A container can't take its width from its content, so give it one
from its parent, as the container example does with `,(0,v.jsx)(t.code,{children:`inline-size: 100%`}),`. Otherwise it collapses in flex
rows and other shrink-to-fit layouts.`]}),`
`,(0,v.jsx)(t.h2,{id:`server-rendering`,children:`Server rendering`}),`
`,(0,v.jsxs)(t.p,{children:[`Use the same `,(0,v.jsx)(t.code,{children:`ssrMatch`}),` value on the server and client. It is returned on the server, during initial
hydration, and when `,(0,v.jsx)(t.code,{children:`matchMedia`}),` is unavailable. After hydration the hook adopts the browser result;
client-only rendering uses it immediately. Changing the query replaces the subscription, and
unmounting removes it.`]}),`
`,(0,v.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,v.jsx)(t.p,{children:`Preserve reading order, keyboard focus, and entered values as layouts change. If a component swaps
React trees, it must manage state and focus across that transition. Validate its chosen behavior
with long text, RTL, narrow widths, text enlargement, and browser zoom. Resizing the viewport alone
does not test every effect of zoom. Use pointer and hover media features to detect input capabilities.`}),`
`,(0,v.jsx)(t.h2,{id:`api`,children:`API`}),`
`,(0,v.jsx)(t.pre,{children:(0,v.jsx)(t.code,{className:`language-ts`,children:`useMediaQuery(query: string, options: { ssrMatch: boolean }): boolean
`})}),`
`,(0,v.jsxs)(t.p,{children:[`Breakpoint values are listed in the Breakpoints example above. Types: `,(0,v.jsx)(t.code,{children:`ViewportBreakpoint`}),` and `,(0,v.jsx)(t.code,{children:`UseMediaQueryOptions`}),`.`]})]})}function _(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,v.jsx)(t,{...e,children:(0,v.jsx)(g,{...e})}):g(e)}var v;e((()=>{v=t(),s(),o(),c(),h()}))();export{_ as default};