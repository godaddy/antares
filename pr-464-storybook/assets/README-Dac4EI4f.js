import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-DYVlSjI-.js";import{a as l,c as u,i as d,l as f,n as p,o as m,r as h,s as g,t as _,u as v}from"./alert.stories-B6pRnz4C.js";function y(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s,{of:f,name:`Overview`}),`
`,(0,x.jsx)(t.h1,{id:`alert`,children:`Alert`}),`
`,(0,x.jsx)(t.p,{children:`Compose an in-page notification from content, optional emphasis icon, actions, and a close button.`}),`
`,(0,x.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsx)(t.li,{children:`Seven emphasis categories with an optional composed icon`}),`
`,(0,x.jsx)(t.li,{children:`Consumer-owned title, body, actions, and dismissal`}),`
`,(0,x.jsx)(t.li,{children:`Native props on the outer surface and overridable presentation defaults for its children`}),`
`,(0,x.jsx)(t.li,{children:`Container-based action reflow with logical layout for RTL`}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,x.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,x.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,x.jsx)(t.p,{children:`Compose the title and body in Content, and choose the icon explicitly.`}),`
`,(0,x.jsx)(a,{of:h,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { Alert, Icon, Content, Heading, Text, type AlertProps } from '@godaddy/antares';

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
`,(0,x.jsx)(t.h3,{id:`emphasis-variants`,children:`Emphasis Variants`}),`
`,(0,x.jsx)(t.p,{children:`Pair each emphasis accent with an explicit Icon glyph. Include text so color is not the only cue.`}),`
`,(0,x.jsx)(a,{of:l,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { Alert, Icon, Content, Flex, Heading, Text } from '@godaddy/antares';

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
`,(0,x.jsx)(t.h3,{id:`dismissible`,children:`Dismissible`}),`
`,(0,x.jsx)(t.p,{children:`Compose CloseButton and control visibility in the parent. Set its accessible label directly.`}),`
`,(0,x.jsx)(a,{of:d,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { useState } from 'react';
import { Alert, Icon, Button, CloseButton, Content, Heading, Text } from '@godaddy/antares';

export function DismissibleExample({ closeLabel = 'Close' }: { closeLabel?: string } = {}) {
  const [visible, setVisible] = useState(true);

  if (!visible) return <Button onPress={() => setVisible(true)}>Show alert</Button>;

  return (
    <Alert emphasis="success">
      <Icon slot="indicator" icon="checkmark" />
      <Content>
        <Heading slot="title">Your account's been verified</Heading>
        <Text>We've successfully verified your identity.</Text>
      </Content>
      <CloseButton aria-label={closeLabel} onPress={() => setVisible(false)} />
    </Alert>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`with-action`,children:`With Action`}),`
`,(0,x.jsx)(t.p,{children:`Compose ButtonGroup as the actions region. Button variants and sizes stay explicit and overridable.`}),`
`,(0,x.jsx)(a,{of:u,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { Alert, Icon, Button, ButtonGroup, Content, Heading, Text } from '@godaddy/antares';

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
`,(0,x.jsx)(t.h3,{id:`composition`,children:`Composition`}),`
`,(0,x.jsx)(t.p,{children:`Omit unused regions, use rich content, or choose a different glyph directly on Icon.`}),`
`,(0,x.jsx)(a,{of:_,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { Alert, Icon, ButtonGroup, Content, Flex, Heading, LinkButton, Text } from '@godaddy/antares';

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
      <Alert aria-label="Text title">
        <Content>
          <Text slot="title">Plain title</Text>
          <Text>A title does not require heading semantics.</Text>
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
`,(0,x.jsx)(t.h3,{id:`inside-a-modal`,children:`Inside a Modal`}),`
`,(0,x.jsx)(t.p,{children:`Dismissing a composed Alert preserves the enclosing dialog and its accessible title.`}),`
`,(0,x.jsx)(a,{of:m,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { useRef, useState } from 'react';
import {
  Alert,
  Icon,
  Button,
  ButtonGroup,
  CloseButton,
  Content,
  Heading,
  Modal,
  ModalTrigger,
  Text
} from '@godaddy/antares';

export function InModalExample() {
  const [visible, setVisible] = useState(true);
  const continueRef = useRef<HTMLButtonElement>(null);

  return (
    <ModalTrigger>
      <Button>Open alert dialog</Button>
      <Modal>
        <Heading slot="title">Account settings</Heading>
        <CloseButton aria-label="Close dialog" />
        <Content>
          {visible ? (
            <Alert emphasis="warning">
              <Icon slot="indicator" icon="alert" />
              <Content>
                <Heading slot="title">Payment method expiring</Heading>
                <Text>Review your payment method.</Text>
              </Content>
              <CloseButton
                aria-label="Dismiss warning"
                onPress={function dismissWarning() {
                  continueRef.current?.focus({ preventScroll: true });
                  setVisible(false);
                }}
              />
            </Alert>
          ) : (
            <Text>Alert dismissed.</Text>
          )}
        </Content>
        <ButtonGroup>
          <Button ref={continueRef}>Continue</Button>
          <Button slot="close">Done</Button>
        </ButtonGroup>
      </Modal>
    </ModalTrigger>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`custom-regions`,children:`Custom Regions`}),`
`,(0,x.jsx)(t.p,{children:`Extract regions into ordinary components, including fragments and conditional controls.
Toggle the close control to see the content column use the available space.`}),`
`,(0,x.jsx)(a,{of:p,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { memo, useState } from 'react';
import { Alert, Button, ButtonGroup, CloseButton, Content, Flex, Heading, Icon, Text } from '@godaddy/antares';

interface CustomRegionsExampleProps {
  /** Initially include the close control. */
  initiallyDismissible?: boolean;

  /** Include the emphasis icon. */
  showIcon?: boolean;

  /** Container content width for responsive comparisons. */
  width?: number;
}

const PaymentActions = memo(function PaymentActions() {
  return (
    <ButtonGroup>
      <Button variant="secondary" size="sm">
        Update payment
      </Button>
    </ButtonGroup>
  );
});

function PaymentDismiss({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
  return visible ? <CloseButton aria-label="Dismiss payment warning" onPress={onDismiss} /> : null;
}

function PaymentRegions({
  showIcon,
  dismissible,
  onDismiss
}: {
  showIcon: boolean;
  dismissible: boolean;
  onDismiss: () => void;
}) {
  return (
    <>
      {showIcon && <Icon slot="indicator" icon="alert" />}
      <Content>
        <Heading slot="title">Payment method expiring</Heading>
        <Text>Update your payment method to keep your domain and services running.</Text>
      </Content>
      <PaymentActions />
      <PaymentDismiss visible={dismissible} onDismiss={onDismiss} />
    </>
  );
}

export function CustomRegionsExample({
  initiallyDismissible = true,
  showIcon = true,
  width
}: CustomRegionsExampleProps = {}) {
  const [visible, setVisible] = useState(true);
  const [dismissible, setDismissible] = useState(initiallyDismissible);

  if (!visible) return <Button onPress={() => setVisible(true)}>Show warning</Button>;

  return (
    <Flex direction="column" gap="md">
      <Alert
        emphasis="warning"
        style={{ width, maxWidth: width === undefined ? undefined : 'none', boxSizing: 'content-box' }}
      >
        <PaymentRegions showIcon={showIcon} dismissible={dismissible} onDismiss={() => setVisible(false)} />
      </Alert>
      <Button style={{ alignSelf: 'start' }} onPress={() => setDismissible((value) => !value)}>
        Toggle close control
      </Button>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,x.jsx)(t.p,{children:`Alert positions and styles its regions. You supply the regions.`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`Compose siblings inside Alert`}),`: optional `,(0,x.jsx)(t.code,{children:`Icon slot="indicator"`}),`, `,(0,x.jsx)(t.code,{children:`Content`}),` for the title and body, optional `,(0,x.jsx)(t.code,{children:`ButtonGroup`}),`, and optional `,(0,x.jsx)(t.code,{children:`CloseButton`}),`. Use `,(0,x.jsx)(t.code,{children:`Button slot="close"`}),` when the dismiss control needs a visible label. Pass `,(0,x.jsx)(t.code,{children:`onPress`}),` on the close control and hide the alert from the parent.`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`Name the title with a slot`}),`: `,(0,x.jsx)(t.code,{children:`Heading slot="title"`}),`, or `,(0,x.jsx)(t.code,{children:`Text slot="title"`}),` when heading semantics do not fit. Body copy is an unslotted `,(0,x.jsx)(t.code,{children:`Text`}),` inside `,(0,x.jsx)(t.code,{children:`Content`}),`.`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`Choose the glyph on Icon`}),`: for example `,(0,x.jsx)(t.code,{children:`<Icon slot="indicator" icon="alert" />`}),`. The indicator is decorative. Omit it when the message stands alone. Override its size with `,(0,x.jsx)(t.code,{children:`style`}),` when you need a different dimension than Alert's default.`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`Keep region roots as direct children of Alert.`}),` Return several regions from a fragment when you extract them. An extra DOM wrapper is not placed in the layout grid. Put custom layout inside `,(0,x.jsx)(t.code,{children:`Content`}),` instead.`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`Child props win`}),` over Alert's context defaults. Classes merge. Local style properties win over context styles.`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsxs)(t.strong,{children:[(0,x.jsx)(t.code,{children:`Content`}),` has no inset inside Alert.`]}),` The surface owns padding. Override `,(0,x.jsx)(t.code,{children:`Content`}),` spacing only when a custom interior needs it.`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`Surface props stay on Alert`}),`: `,(0,x.jsx)(t.code,{children:`className`}),`, `,(0,x.jsx)(t.code,{children:`style`}),`, `,(0,x.jsx)(t.code,{children:`ref`}),`, native attributes, and `,(0,x.jsx)(t.code,{children:`data-emphasis`}),` for theming.`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`Narrow containers stack actions`}),` under the content and keep the close control in its own column. Empty icon and close columns collapse. Source order remains the keyboard order.`]}),`
`]}),`
`,(0,x.jsxs)(t.p,{children:[`Alert owns region contexts the way overlay shells do, so a nested Alert does not pick up a parent Modal or Card `,(0,x.jsx)(t.code,{children:`Content`}),` padding. Only `,(0,x.jsx)(t.code,{children:`IconContext`}),` is merged from outside, so ambient icons and `,(0,x.jsx)(t.code,{children:`CloseButton`}),` keep parent icon customization. Unslotted icons do not receive the indicator defaults.`]}),`
`,(0,x.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,x.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,x.jsxs)(t.table,{children:[(0,x.jsx)(t.thead,{children:(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.th,{children:`Key`}),(0,x.jsx)(t.th,{children:`Description`})]})}),(0,x.jsxs)(t.tbody,{children:[(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:`Tab / Shift+Tab`}),(0,x.jsx)(t.td,{children:`Moves between controls in the consumer's source order`})]}),(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:`Enter / Space`}),(0,x.jsx)(t.td,{children:`Activates the focused button`})]})]})]}),`
`,(0,x.jsx)(t.h3,{id:`screen-readers`,children:`Screen readers`}),`
`,(0,x.jsxs)(t.p,{children:[`The surface defaults to `,(0,x.jsx)(t.code,{children:`role="alert"`}),`, an assertive live region. Use `,(0,x.jsx)(t.code,{children:`role="status"`}),` for polite updates when appropriate. Screen reader announcements depend on how content enters or updates the live region; rendering an SSR snapshot does not verify an announcement.`]}),`
`,(0,x.jsxs)(t.p,{children:[`Choose the `,(0,x.jsx)(t.code,{children:`Heading`}),` level for the surrounding page. The `,(0,x.jsx)(t.code,{children:`title`}),` slot styles the title but does not set `,(0,x.jsx)(t.code,{children:`aria-labelledby`}),` or `,(0,x.jsx)(t.code,{children:`aria-describedby`}),` on `,(0,x.jsx)(t.code,{children:`Alert`}),`. Add explicit labeling attributes when the surface needs an accessible name. `,(0,x.jsx)(t.code,{children:`CloseButton`}),` defaults to `,(0,x.jsx)(t.code,{children:`aria-label="Close"`}),`; set `,(0,x.jsx)(t.code,{children:`aria-label`}),` directly on that button for localization or more context.`]}),`
`,(0,x.jsxs)(t.p,{children:[`The parent controls visibility and focus restoration after dismissal. An `,(0,x.jsx)(t.code,{children:`Alert`}),` inside a `,(0,x.jsx)(t.code,{children:`Modal`}),` owns a separate close slot, so its close button does not inherit the `,(0,x.jsx)(t.code,{children:`Modal`}),`'s dismiss handler. The enclosing dialog keeps its own title.`]}),`
`,(0,x.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsx)(t.li,{children:`Explain what happened and how the user can respond.`}),`
`,(0,x.jsx)(t.li,{children:`Reserve critical emphasis and assertive announcements for messages that warrant interruption.`}),`
`,(0,x.jsx)(t.li,{children:`Prefer secondary or tertiary actions inside an alert.`}),`
`,(0,x.jsx)(t.li,{children:`Keep interactive source order aligned with the reading order.`}),`
`,(0,x.jsx)(t.li,{children:`Test long content, RTL, and enlarged text in narrow containers.`}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-tsx`,children:`<Alert>
  <Icon slot="indicator" icon="information" />
  <Content>
    <Heading slot="title" />
    <Text />
  </Content>
  <ButtonGroup />
  <CloseButton />
  {/* ... */}
</Alert>
`})}),`
`,(0,x.jsx)(t.h3,{id:`alert-1`,children:`Alert`}),`
`,(0,x.jsx)(o,{of:g})]})}function b(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,x.jsx)(t,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;function S(){return(S=e((()=>{x=t(),n(),c(),v()})))()}S();export{b as default};