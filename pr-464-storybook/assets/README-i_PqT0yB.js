import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-6whA4zOZ.js";import{a as l,c as u,i as d,n as f,o as p,r as m,s as h,t as g}from"./alert.stories-Bj3u3L0l.js";function _(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(s,{of:h,name:`Overview`}),`
`,(0,y.jsx)(t.h1,{id:`alert`,children:`Alert`}),`
`,(0,y.jsx)(t.p,{children:`Compose an in-page notification from content, optional emphasis icon, actions, and a close button.`}),`
`,(0,y.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsx)(t.li,{children:`Seven emphasis categories with an optional composed icon`}),`
`,(0,y.jsx)(t.li,{children:`Consumer-owned title, body, actions, and dismissal`}),`
`,(0,y.jsx)(t.li,{children:`Native props on the outer surface and overridable presentation defaults for its children`}),`
`,(0,y.jsx)(t.li,{children:`Container-based action reflow with logical layout for RTL`}),`
`]}),`
`,(0,y.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,y.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,y.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,y.jsx)(t.p,{children:`Compose the title and body in Content, and choose the icon explicitly.`}),`
`,(0,y.jsx)(a,{of:f,inline:!0}),`
`,(0,y.jsx)(i,{code:`import { Alert, Icon, Content, Heading, Text, type AlertProps } from '@godaddy/antares';

export function DefaultExample(props: Partial<AlertProps> = {}) {
  return (
    <Alert emphasis="info" {...props}>
      <Icon slot="indicator" icon="information" />
      <Content>
        <Heading slot="title">Your domain is ready</Heading>
        <Text>You can now start building your website.</Text>
      </Content>
    </Alert>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`emphasis-variants`,children:`Emphasis Variants`}),`
`,(0,y.jsx)(t.p,{children:`Pair each emphasis accent with an explicit Icon glyph. Include text so color is not the only cue.`}),`
`,(0,y.jsx)(a,{of:d,inline:!0}),`
`,(0,y.jsx)(i,{code:`import { Alert, Icon, Content, Flex, Heading, Text } from '@godaddy/antares';

const emphases = [
  ['critical', 'alert'],
  ['warning', 'alert'],
  ['success', 'checkmark'],
  ['info', 'information'],
  ['highlight', 'star'],
  ['premium', 'diamond'],
  ['internal', 'comment']
] as const;

export function EmphasesExample() {
  return (
    <Flex direction="column" gap="md">
      {emphases.map(([emphasis, icon]) => (
        <Alert key={emphasis} emphasis={emphasis}>
          <Icon slot="indicator" icon={icon} />
          <Content>
            <Heading slot="title">This is a {emphasis} alert</Heading>
            <Text>Description for the {emphasis} emphasis variant.</Text>
          </Content>
        </Alert>
      ))}
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`dismissible`,children:`Dismissible`}),`
`,(0,y.jsx)(t.p,{children:`Compose CloseButton and control visibility in the parent. Set its accessible label directly.`}),`
`,(0,y.jsx)(a,{of:m,inline:!0}),`
`,(0,y.jsx)(i,{code:`import { useState } from 'react';
import { Alert, Icon, Button, CloseButton, Content, Heading, Text } from '@godaddy/antares';

export function DismissibleExample({ closeLabel = 'Close' }: { closeLabel?: string } = {}) {
  const [visible, setVisible] = useState(true);

  if (!visible) return <Button onPress={() => setVisible(true)}>Show alert</Button>;

  return (
    <Alert emphasis="success">
      <Icon slot="indicator" icon="checkmark" />
      <Heading slot="title">Your account's been verified</Heading>
      <Content>
        <Text>We've successfully verified your identity.</Text>
      </Content>
      <CloseButton aria-label={closeLabel} onPress={() => setVisible(false)} />
    </Alert>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`with-action`,children:`With Action`}),`
`,(0,y.jsx)(t.p,{children:`Compose ButtonGroup as the actions region. Button variants and sizes stay explicit and overridable.`}),`
`,(0,y.jsx)(a,{of:p,inline:!0}),`
`,(0,y.jsx)(i,{code:`import { Alert, Icon, Button, ButtonGroup, Content, Heading, Text } from '@godaddy/antares';

export function WithActionExample({ onAction }: { onAction?: () => void } = {}) {
  return (
    <Alert emphasis="warning">
      <Icon slot="indicator" icon="alert" />
      <Content>
        <Heading slot="title">Your payment method is expiring</Heading>
        <Text>Please update your payment method before it expires.</Text>
      </Content>
      <ButtonGroup>
        <Button variant="secondary" size="sm" onPress={onAction}>
          Update Payment Method
        </Button>
      </ButtonGroup>
    </Alert>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`composition`,children:`Composition`}),`
`,(0,y.jsx)(t.p,{children:`Omit unused regions, use rich content, or choose a different glyph directly on Icon.`}),`
`,(0,y.jsx)(a,{of:g,inline:!0}),`
`,(0,y.jsx)(i,{code:`import { Alert, Icon, ButtonGroup, Content, Flex, Heading, LinkButton, Text } from '@godaddy/antares';

export function CompositionExample() {
  return (
    <Flex direction="column" gap="md">
      <Alert aria-label="Message only">
        <Content>
          <Text>Your preferences have been saved.</Text>
        </Content>
      </Alert>
      <Alert aria-label="Title only">
        <Icon slot="indicator" icon="information" />
        <Content>
          <Heading slot="title">Your domain is ready</Heading>
        </Content>
      </Alert>
      <Alert emphasis="warning" aria-label="Documentation notice">
        <Icon slot="indicator" icon="star" />
        <Content>
          <Text>Your payment method needs attention.</Text>
          <Text>
            Visit <strong>Billing</strong> to review your options.
          </Text>
        </Content>
        <ButtonGroup>
          <LinkButton href="#billing" variant="secondary" size="sm">
            Learn more
          </LinkButton>
        </ButtonGroup>
      </Alert>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,y.jsxs)(t.p,{children:[`Alert positions and styles its regions. Compose an optional `,(0,y.jsx)(t.code,{children:`Icon slot="indicator"`}),`, a `,(0,y.jsx)(t.code,{children:`Heading slot="title"`}),`,
`,(0,y.jsx)(t.code,{children:`Content`}),`, an optional `,(0,y.jsx)(t.code,{children:`ButtonGroup`}),`, and an optional `,(0,y.jsx)(t.code,{children:`CloseButton`}),` as direct children.`]}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsxs)(t.li,{children:[`Put the body inside `,(0,y.jsx)(t.code,{children:`Content`}),`. The title and body regions are separated by one grid unit at every width.
A direct `,(0,y.jsx)(t.code,{children:`Heading slot="title"`}),` lets the body extend underneath the close button in narrow containers.
If there is no direct title, `,(0,y.jsx)(t.code,{children:`Content`}),` stays beside the close button. A title inside `,(0,y.jsx)(t.code,{children:`Content`}),` still receives
the title styling.`]}),`
`,(0,y.jsxs)(t.li,{children:[`Choose the glyph on the icon, for example `,(0,y.jsx)(t.code,{children:`<Icon slot="indicator" icon="alert" />`}),`. It is decorative and defaults
to `,(0,y.jsx)(t.code,{children:`1.625rem`}),` for each dimension absent from the SVG (26 px with a 16 px root font size). To size a custom SVG the
same way as a CDN icon, register it with a `,(0,y.jsx)(t.code,{children:`viewBox`}),` and omit its `,(0,y.jsx)(t.code,{children:`width`}),` and `,(0,y.jsx)(t.code,{children:`height`}),` attributes. You can also set
either dimension on `,(0,y.jsx)(t.code,{children:`Icon`}),` or omit the indicator when the message stands alone.`]}),`
`,(0,y.jsxs)(t.li,{children:[`Pass `,(0,y.jsx)(t.code,{children:`onPress`}),` on `,(0,y.jsx)(t.code,{children:`CloseButton`}),` and hide the alert from the parent. Use `,(0,y.jsx)(t.code,{children:`Button slot="close"`}),` for a visible label.`]}),`
`,(0,y.jsxs)(t.li,{children:[`Extract regions into a component by returning them from a fragment. A wrapper element is not placed in the layout
grid, so put custom layout inside `,(0,y.jsx)(t.code,{children:`Content`}),`.`]}),`
`,(0,y.jsx)(t.li,{children:`Props on a child win over Alert's defaults. Classes merge and local style properties win.`}),`
`,(0,y.jsxs)(t.li,{children:[`Put `,(0,y.jsx)(t.code,{children:`className`}),`, `,(0,y.jsx)(t.code,{children:`style`}),`, `,(0,y.jsx)(t.code,{children:`ref`}),`, native attributes, and `,(0,y.jsx)(t.code,{children:`data-emphasis`}),` on Alert for the surface.`]}),`
`,(0,y.jsx)(t.li,{children:`Omitted regions collapse. On wider alerts, the title and body share a column with a gap before the vertically
centered actions. The close button has its own column. In narrow alerts with a message, actions appear under
the message. With no message, actions and the close button share one row. Choose action and dismissal labels
that fit the available space, or set wrapping on those controls.`}),`
`]}),`
`,(0,y.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,y.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,y.jsxs)(t.table,{children:[(0,y.jsx)(t.thead,{children:(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.th,{children:`Key`}),(0,y.jsx)(t.th,{children:`Action`})]})}),(0,y.jsxs)(t.tbody,{children:[(0,y.jsxs)(t.tr,{children:[(0,y.jsxs)(t.td,{children:[(0,y.jsx)(t.code,{children:`Tab`}),` / `,(0,y.jsx)(t.code,{children:`Shift + Tab`})]}),(0,y.jsx)(t.td,{children:`Moves between controls in the consumer's source order`})]}),(0,y.jsxs)(t.tr,{children:[(0,y.jsxs)(t.td,{children:[(0,y.jsx)(t.code,{children:`Enter`}),` / `,(0,y.jsx)(t.code,{children:`Space`})]}),(0,y.jsx)(t.td,{children:`Activates the focused button`})]})]})]}),`
`,(0,y.jsxs)(t.p,{children:[`When using both `,(0,y.jsx)(t.code,{children:`CloseButton`}),` and `,(0,y.jsx)(t.code,{children:`ButtonGroup`}),`, use this source order to keep the same Tab sequence across
container widths.`]}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsxs)(t.li,{children:[`With a direct title, use `,(0,y.jsx)(t.code,{children:`Heading`}),`, `,(0,y.jsx)(t.code,{children:`CloseButton`}),`, `,(0,y.jsx)(t.code,{children:`Content`}),` when present, then `,(0,y.jsx)(t.code,{children:`ButtonGroup`}),`.`]}),`
`,(0,y.jsxs)(t.li,{children:[`With body only, use `,(0,y.jsx)(t.code,{children:`Content`}),`, `,(0,y.jsx)(t.code,{children:`CloseButton`}),`, then `,(0,y.jsx)(t.code,{children:`ButtonGroup`}),`.`]}),`
`,(0,y.jsxs)(t.li,{children:[`With neither title nor body, use `,(0,y.jsx)(t.code,{children:`ButtonGroup`}),` followed by `,(0,y.jsx)(t.code,{children:`CloseButton`}),`.`]}),`
`]}),`
`,(0,y.jsx)(t.h3,{id:`screen-readers`,children:`Screen readers`}),`
`,(0,y.jsxs)(t.p,{children:[`The surface defaults to `,(0,y.jsx)(t.code,{children:`role="alert"`}),`, an assertive live region. Use `,(0,y.jsx)(t.code,{children:`role="status"`}),` for polite updates when appropriate.`]}),`
`,(0,y.jsxs)(t.p,{children:[`Choose the `,(0,y.jsx)(t.code,{children:`Heading`}),` level for the surrounding page. The `,(0,y.jsx)(t.code,{children:`title`}),` slot styles the title but does not set `,(0,y.jsx)(t.code,{children:`aria-labelledby`}),` or `,(0,y.jsx)(t.code,{children:`aria-describedby`}),` on `,(0,y.jsx)(t.code,{children:`Alert`}),`. Add explicit labeling attributes when the surface needs an accessible name. `,(0,y.jsx)(t.code,{children:`CloseButton`}),` defaults to `,(0,y.jsx)(t.code,{children:`aria-label="Close"`}),`; set `,(0,y.jsx)(t.code,{children:`aria-label`}),` directly on that button for localization or more context.`]}),`
`,(0,y.jsx)(t.p,{children:`The parent controls visibility and focus restoration after dismissal.`}),`
`,(0,y.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsx)(t.li,{children:`Explain what happened and how the user can respond.`}),`
`,(0,y.jsx)(t.li,{children:`Reserve critical emphasis and assertive announcements for messages that warrant interruption.`}),`
`,(0,y.jsx)(t.li,{children:`Prefer secondary or tertiary actions inside an alert.`}),`
`,(0,y.jsx)(t.li,{children:`Keep interactive source order aligned with the reading order.`}),`
`,(0,y.jsx)(t.li,{children:`Test long content, RTL, and enlarged text in narrow containers.`}),`
`]}),`
`,(0,y.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-tsx`,children:`<Alert>
  <Icon slot="indicator" icon="information" />
  <Heading slot="title" />
  <CloseButton />
  <Content>
    <Text />
  </Content>
  <ButtonGroup />
  {/* ... */}
</Alert>
`})}),`
`,(0,y.jsx)(t.h3,{id:`alert-1`,children:`Alert`}),`
`,(0,y.jsx)(o,{of:l})]})}function v(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,y.jsx)(t,{...e,children:(0,y.jsx)(_,{...e})}):_(e)}var y;function b(){return(b=e((()=>{y=t(),n(),c(),u()})))()}b();export{v as default};