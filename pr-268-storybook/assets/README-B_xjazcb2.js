import{i as e}from"./preload-helper-wmPULyNY.js";import{y as t}from"./iframe-JMlAENME.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DyCMrQ-g.js";import{t as c}from"./mdx-react-shim-DfGSkg9D.js";import{Controlled as l,Default as u,Disabled as d,LabelPosition as f,NoLabel as p,Props as m,Selected as h,Sizes as g,n as _,t as v}from"./switch.stories-Ct0WbGnA.js";var y,b=e((()=>{y=`import { Switch } from '@godaddy/antares';
import { useState } from 'react';

export function SwitchControlled() {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Switch isSelected={isSelected} onChange={setIsSelected}>
      {isSelected ? 'On' : 'Off'}
    </Switch>
  );
}
`})),x,S=e((()=>{x=`import { Switch } from '@godaddy/antares';

export function SwitchDefault() {
  return <Switch>Wi-Fi</Switch>;
}
`})),C,w=e((()=>{C=`import { Flex, Switch } from '@godaddy/antares';

export function SwitchDisabled() {
  return (
    <Flex direction="column" gap="md">
      <Switch isDisabled>Disabled off</Switch>
      <Switch isDisabled defaultSelected>
        Disabled on
      </Switch>
    </Flex>
  );
}
`})),T,E=e((()=>{T=`import { Flex, Switch } from '@godaddy/antares';

export function SwitchLabelPosition() {
  return (
    <Flex direction="column" gap="md">
      <Switch labelPosition="start" defaultSelected>
        Label on the start
      </Switch>
      <Switch labelPosition="end" defaultSelected>
        Label on the end
      </Switch>
    </Flex>
  );
}
`})),D,O=e((()=>{D=`import { Switch } from '@godaddy/antares';

export function SwitchNoLabel() {
  return <Switch aria-label="Wi-Fi" />;
}
`})),k,A=e((()=>{k=`import { Switch } from '@godaddy/antares';

export function SwitchSelected() {
  return <Switch defaultSelected>Wi-Fi</Switch>;
}
`})),j,M=e((()=>{j=`import { Flex, Switch } from '@godaddy/antares';

export function SwitchSizes() {
  return (
    <Flex direction="column" gap="md">
      <Switch size="md" defaultSelected>
        Medium
      </Switch>
      <Switch size="sm" defaultSelected>
        Small
      </Switch>
    </Flex>
  );
}
`}));function N(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(o,{of:_,name:`Overview`}),`
`,(0,F.jsx)(t.h1,{id:`switch`,children:`Switch`}),`
`,(0,F.jsx)(t.p,{children:`A binary toggle control that switches a setting between on and off states, communicated via the WAI-ARIA switch role.`}),`
`,(0,F.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,F.jsxs)(t.ul,{children:[`
`,(0,F.jsx)(t.li,{children:`Renders a horizontal toggle with a sliding thumb inside a pill-shaped track`}),`
`,(0,F.jsxs)(t.li,{children:[`Communicates state to assistive technologies via the WAI-ARIA `,(0,F.jsx)(t.code,{children:`switch`}),` role`]}),`
`,(0,F.jsx)(t.li,{children:`Toggles on click or tap anywhere in the control — track, thumb, or label`}),`
`,(0,F.jsxs)(t.li,{children:[`Toggles with the `,(0,F.jsx)(t.code,{children:`Space`}),` key when focused`]}),`
`,(0,F.jsxs)(t.li,{children:[`Optional label, positioned at the `,(0,F.jsx)(t.code,{children:`start`}),` or `,(0,F.jsx)(t.code,{children:`end`}),` of the track, or omitted entirely`]}),`
`,(0,F.jsxs)(t.li,{children:[`Two sizes: `,(0,F.jsx)(t.code,{children:`md`}),` (default) and `,(0,F.jsx)(t.code,{children:`sm`})]}),`
`,(0,F.jsxs)(t.li,{children:[`Supports controlled (`,(0,F.jsx)(t.code,{children:`isSelected`}),` + `,(0,F.jsx)(t.code,{children:`onChange`}),`) and uncontrolled (`,(0,F.jsx)(t.code,{children:`defaultSelected`}),`) usage`]}),`
`,(0,F.jsx)(t.li,{children:`Takes effect immediately — no form submission required`}),`
`]}),`
`,(0,F.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,F.jsx)(t.pre,{children:(0,F.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,F.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,F.jsxs)(t.p,{children:[`The `,(0,F.jsx)(t.code,{children:`Switch`}),` component has the following props:`]}),`
`,(0,F.jsx)(a,{of:m}),`
`,(0,F.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,F.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,F.jsx)(t.p,{children:`An uncontrolled switch, off by default, with the label at the start.`}),`
`,(0,F.jsx)(i,{of:u,inline:!0}),`
`,(0,F.jsx)(r,{language:`tsx`,code:x}),`
`,(0,F.jsx)(t.h3,{id:`selected`,children:`Selected`}),`
`,(0,F.jsxs)(t.p,{children:[`A switch that starts in the on state via `,(0,F.jsx)(t.code,{children:`defaultSelected`}),`.`]}),`
`,(0,F.jsx)(i,{of:h,inline:!0}),`
`,(0,F.jsx)(r,{language:`tsx`,code:k}),`
`,(0,F.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,F.jsxs)(t.p,{children:[`The `,(0,F.jsx)(t.code,{children:`size`}),` prop accepts `,(0,F.jsx)(t.code,{children:`'md'`}),` (default) or `,(0,F.jsx)(t.code,{children:`'sm'`}),`.`]}),`
`,(0,F.jsx)(i,{of:g,inline:!0}),`
`,(0,F.jsx)(r,{language:`tsx`,code:j}),`
`,(0,F.jsx)(t.h3,{id:`label-position`,children:`Label Position`}),`
`,(0,F.jsxs)(t.p,{children:[`The `,(0,F.jsx)(t.code,{children:`labelPosition`}),` prop places the label at the `,(0,F.jsx)(t.code,{children:`start`}),` (default) or `,(0,F.jsx)(t.code,{children:`end`}),` of the track.`]}),`
`,(0,F.jsx)(i,{of:f,inline:!0}),`
`,(0,F.jsx)(r,{language:`tsx`,code:T}),`
`,(0,F.jsx)(t.h3,{id:`no-label`,children:`No Label`}),`
`,(0,F.jsxs)(t.p,{children:[`When no label is provided, pass `,(0,F.jsx)(t.code,{children:`aria-label`}),` so the switch has an accessible name.`]}),`
`,(0,F.jsx)(i,{of:p,inline:!0}),`
`,(0,F.jsx)(r,{language:`tsx`,code:D}),`
`,(0,F.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,F.jsx)(t.p,{children:`A disabled switch prevents interaction and renders at reduced opacity, whether off or on.`}),`
`,(0,F.jsx)(i,{of:d,inline:!0}),`
`,(0,F.jsx)(r,{language:`tsx`,code:C}),`
`,(0,F.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,F.jsxs)(t.p,{children:[`Manage switch state programmatically with `,(0,F.jsx)(t.code,{children:`isSelected`}),` and `,(0,F.jsx)(t.code,{children:`onChange`}),`.`]}),`
`,(0,F.jsx)(i,{of:l,inline:!0}),`
`,(0,F.jsx)(r,{language:`tsx`,code:y}),`
`,(0,F.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,F.jsx)(t.h3,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,F.jsxs)(t.p,{children:[`The `,(0,F.jsx)(t.code,{children:`Switch`}),` root exposes data attributes for styling different states:`]}),`
`,(0,F.jsxs)(t.p,{children:[(0,F.jsx)(t.code,{children:`data-selected`}),`, `,(0,F.jsx)(t.code,{children:`data-hovered`}),`, `,(0,F.jsx)(t.code,{children:`data-pressed`}),`, `,(0,F.jsx)(t.code,{children:`data-focused`}),`, `,(0,F.jsx)(t.code,{children:`data-focus-visible`}),`, `,(0,F.jsx)(t.code,{children:`data-disabled`}),`, `,(0,F.jsx)(t.code,{children:`data-readonly`}),`, `,(0,F.jsx)(t.code,{children:`data-size`})]}),`
`,(0,F.jsx)(t.pre,{children:(0,F.jsx)(t.code,{className:`language-css`,children:`.my-switch[data-selected] .my-track {
  background-color: #00a4a6;
}

.my-switch[data-focused] {
  outline: 2px solid Highlight;
}

.my-switch[data-disabled] {
  opacity: 0.4;
  cursor: not-allowed;
}
`})}),`
`,(0,F.jsx)(t.h3,{id:`design-tokens`,children:`Design Tokens`}),`
`,(0,F.jsxs)(t.p,{children:[`The track and thumb read from Antares curated tokens, falling back to legacy `,(0,F.jsx)(t.code,{children:`--ux-*`}),` custom properties:`]}),`
`,(0,F.jsxs)(t.table,{children:[(0,F.jsx)(t.thead,{children:(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.th,{children:`Element`}),(0,F.jsx)(t.th,{children:`Token`}),(0,F.jsx)(t.th,{children:`Legacy fallback`})]})}),(0,F.jsxs)(t.tbody,{children:[(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.td,{children:`Track (off)`}),(0,F.jsx)(t.td,{children:`—`}),(0,F.jsx)(t.td,{children:(0,F.jsx)(t.code,{children:`--ux-1m9ys0v`})})]}),(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.td,{children:`Track (on)`}),(0,F.jsx)(t.td,{children:(0,F.jsx)(t.code,{children:`--color-input-background-selected`})}),(0,F.jsx)(t.td,{children:(0,F.jsx)(t.code,{children:`--ux-sywk25`})})]}),(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.td,{children:`Thumb`}),(0,F.jsx)(t.td,{children:(0,F.jsx)(t.code,{children:`--color-surface-background-card`})}),(0,F.jsx)(t.td,{children:(0,F.jsx)(t.code,{children:`--ux-cao06b`})})]}),(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.td,{children:`Thumb inset`}),(0,F.jsx)(t.td,{children:`—`}),(0,F.jsx)(t.td,{children:(0,F.jsx)(t.code,{children:`--ux-1sbfig8`})})]}),(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.td,{children:`Label`}),(0,F.jsx)(t.td,{children:(0,F.jsx)(t.code,{children:`--color-input-text-default`})}),(0,F.jsx)(t.td,{children:(0,F.jsx)(t.code,{children:`--ux-1glcx6s`})})]}),(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.td,{children:`Focus ring radius`}),(0,F.jsx)(t.td,{children:`—`}),(0,F.jsx)(t.td,{children:(0,F.jsx)(t.code,{children:`--ux-zvaw3s`})})]})]})]}),`
`,(0,F.jsx)(t.h3,{id:`component-customization`,children:`Component Customization`}),`
`,(0,F.jsxs)(t.p,{children:[`Pass a `,(0,F.jsx)(t.code,{children:`className`}),` to style the root element:`]}),`
`,(0,F.jsx)(t.pre,{children:(0,F.jsx)(t.code,{className:`language-jsx`,children:`<Switch className="custom-switch">Wi-Fi</Switch>
`})}),`
`,(0,F.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,F.jsxs)(t.ul,{children:[`
`,(0,F.jsxs)(t.li,{children:[`Renders with the WAI-ARIA `,(0,F.jsx)(t.code,{children:`switch`}),` role via the native `,(0,F.jsx)(t.code,{children:`<input type="checkbox" role="switch">`})]}),`
`,(0,F.jsxs)(t.li,{children:[(0,F.jsx)(t.code,{children:`Space`}),` toggles the switch when it has focus`]}),`
`,(0,F.jsxs)(t.li,{children:[`Displays a visible focus ring (`,(0,F.jsx)(t.code,{children:`outline: 2px solid Highlight`}),`) when focused`]}),`
`,(0,F.jsxs)(t.li,{children:[`Disabled switches render at `,(0,F.jsx)(t.code,{children:`40%`}),` opacity and are excluded from tab order`]}),`
`,(0,F.jsxs)(t.li,{children:[`When `,(0,F.jsx)(t.code,{children:`children`}),` is omitted, provide `,(0,F.jsx)(t.code,{children:`aria-label`}),` or `,(0,F.jsx)(t.code,{children:`aria-labelledby`}),` so the switch has an accessible name`]}),`
`]}),`
`,(0,F.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,F.jsx)(t.h3,{id:`when-to-use-switch`,children:`When to Use Switch`}),`
`,(0,F.jsxs)(t.ul,{children:[`
`,(0,F.jsx)(t.li,{children:`✅ For settings that take effect immediately, without a form submission`}),`
`,(0,F.jsx)(t.li,{children:`✅ For binary on/off preferences (e.g. Wi-Fi, notifications, dark mode)`}),`
`,(0,F.jsxs)(t.li,{children:[`❌ For selections that require a "Save" or "Submit" action (use `,(0,F.jsx)(t.code,{children:`Checkbox`}),` instead)`]}),`
`,(0,F.jsxs)(t.li,{children:[`❌ For choosing one of several mutually exclusive options (use `,(0,F.jsx)(t.code,{children:`Radio`}),` or `,(0,F.jsx)(t.code,{children:`SegmentedController`}),` instead)`]}),`
`]}),`
`,(0,F.jsx)(t.h3,{id:`labeling`,children:`Labeling`}),`
`,(0,F.jsxs)(t.ul,{children:[`
`,(0,F.jsx)(t.li,{children:`Prefer a visible label that names the setting being toggled (e.g. "Wi-Fi", not "On/Off")`}),`
`,(0,F.jsxs)(t.li,{children:[`If the label is omitted, always provide `,(0,F.jsx)(t.code,{children:`aria-label`})]}),`
`,(0,F.jsx)(t.li,{children:`Keep labels short and describe the setting, not its current state`}),`
`]}),`
`,(0,F.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,F.jsx)(t.h3,{id:`controlled-state-not-updating`,children:`Controlled State Not Updating`}),`
`,(0,F.jsx)(t.pre,{children:(0,F.jsx)(t.code,{className:`language-jsx`,children:`// ❌ Wrong: isSelected without onChange leaves the switch stuck
<Switch isSelected={isOn}>Wi-Fi</Switch>

// ✅ Controlled mode
<Switch isSelected={isOn} onChange={setIsOn}>Wi-Fi</Switch>

// ✅ Uncontrolled mode
<Switch defaultSelected>Wi-Fi</Switch>
`})}),`
`,(0,F.jsx)(t.h3,{id:`missing-accessible-name`,children:`Missing Accessible Name`}),`
`,(0,F.jsx)(t.pre,{children:(0,F.jsx)(t.code,{className:`language-jsx`,children:`// ❌ No children and no aria-label — screen readers announce nothing useful
<Switch />

// ✅ Provide a label
<Switch>Wi-Fi</Switch>

// ✅ Or an aria-label when the label is visual-only elsewhere
<Switch aria-label="Wi-Fi" />
`})})]})}function P(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,F.jsx)(t,{...e,children:(0,F.jsx)(N,{...e})}):N(e)}var F;e((()=>{F=t(),c(),s(),b(),S(),w(),E(),O(),A(),M(),v()}))();export{P as default};