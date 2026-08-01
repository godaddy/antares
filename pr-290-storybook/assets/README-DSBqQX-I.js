import{i as e}from"./preload-helper-Bb7i_SVf.js";import{y as t}from"./iframe-FVTxn8-X.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-Bt-hbdFc.js";import{t as c}from"./mdx-react-shim-Cu4nx0Ae.js";import{Controlled as l,Default as u,Props as d,Scrollable as f,n as p,t as m}from"./modal.stories-BT7q0bCi.js";function h(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(o,{of:p,name:`Overview`}),`
`,(0,_.jsx)(t.h1,{id:`modal`,children:`Modal`}),`
`,(0,_.jsx)(t.p,{children:`The Modal component presents a dialog window over the page that focuses the user's attention on a single task or piece of information.`}),`
`,(0,_.jsxs)(t.p,{children:[`Use `,(0,_.jsx)(t.code,{children:`ModalTrigger`}),` to wire a trigger element (typically a `,(0,_.jsx)(t.code,{children:`Button`}),`) to a `,(0,_.jsx)(t.code,{children:`Modal`}),`. Compose the interior:`]}),`
`,(0,_.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,_.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,_.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,_.jsxs)(t.p,{children:[`Compose a Modal from `,(0,_.jsx)(t.code,{children:`Header`}),`, `,(0,_.jsx)(t.code,{children:`Content`}),`, and `,(0,_.jsx)(t.code,{children:`ButtonGroup`}),`. `,(0,_.jsx)(t.code,{children:`ModalTrigger`}),` opens the Modal
and manages its open/close state.`]}),`
`,(0,_.jsx)(i,{of:u,inline:!0}),`
`,(0,_.jsx)(r,{code:`import {
  ModalTrigger,
  Modal,
  Button,
  CloseButton,
  Header,
  Heading,
  Content,
  ButtonGroup,
  Text
} from '@godaddy/antares';

export function DefaultExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Open modal</Button>
      <Modal>
        <Header>
          <Heading slot="title">Delete file?</Heading>
          <CloseButton />
        </Header>
        <Content>
          <Text as="p">This action cannot be undone. The file will be permanently removed.</Text>
        </Content>
        <ButtonGroup>
          <Button slot="close" variant="secondary">
            Cancel
          </Button>
          <Button slot="close" variant="critical">
            Delete
          </Button>
        </ButtonGroup>
      </Modal>
    </ModalTrigger>
  );
}`,language:`tsx`}),`
`,(0,_.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,_.jsxs)(t.p,{children:[`Pass `,(0,_.jsx)(t.code,{children:`isOpen`}),` and `,(0,_.jsx)(t.code,{children:`onOpenChange`}),` to `,(0,_.jsx)(t.code,{children:`ModalTrigger`}),` to control the open state externally.`]}),`
`,(0,_.jsx)(i,{of:l,inline:!0}),`
`,(0,_.jsx)(r,{code:`import {
  ModalTrigger,
  Modal,
  Button,
  CloseButton,
  Header,
  Heading,
  Content,
  ButtonGroup,
  Flex,
  Text
} from '@godaddy/antares';
import { useState } from 'react';

export function ControlledExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex direction="column" gap="sm" alignItems="start">
      <ModalTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
        <Button variant="primary">Open modal</Button>
        <Modal>
          <Header>
            <Heading slot="title">Modal title</Heading>
            <CloseButton />
          </Header>
          <Content>
            <Text as="p">
              She expressed her gratitude again, but as it was too painful a subject to each, to be dwelt on farther.
            </Text>
          </Content>
          <ButtonGroup>
            <Button slot="close" variant="primary">
              Close
            </Button>
          </ButtonGroup>
        </Modal>
      </ModalTrigger>

      <Text>The modal is currently {isOpen ? 'open' : 'closed'}.</Text>

      <Button variant="secondary" onPress={() => setIsOpen(true)}>
        Open from outside
      </Button>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,_.jsx)(t.h3,{id:`scrollable-content`,children:`Scrollable content`}),`
`,(0,_.jsxs)(t.p,{children:[`When the content is taller than the viewport, the `,(0,_.jsx)(t.code,{children:`Content`}),` region scrolls while the
`,(0,_.jsx)(t.code,{children:`Header`}),` and `,(0,_.jsx)(t.code,{children:`ButtonGroup`}),` stay pinned.`]}),`
`,(0,_.jsx)(i,{of:f,inline:!0}),`
`,(0,_.jsx)(r,{code:`import {
  ModalTrigger,
  Modal,
  Button,
  CloseButton,
  Header,
  Heading,
  Content,
  ButtonGroup,
  Text
} from '@godaddy/antares';

const PARAGRAPH =
  'She expressed her gratitude again, but as it was too painful a subject to each, to be dwelt on farther. She had never fancied him so little disposed to converse. She had never seen him so desirous to please.';

export function ScrollableExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Open modal</Button>
      <Modal>
        <Header>
          <Heading slot="title">Terms of service</Heading>
          <CloseButton />
        </Header>
        <Content>
          {Array.from({ length: 12 }, (_, i) => (
            <Text as="p" key={i}>
              {PARAGRAPH}
            </Text>
          ))}
        </Content>
        <ButtonGroup>
          <Button slot="close" variant="secondary">
            Decline
          </Button>
          <Button slot="close" variant="primary">
            Accept
          </Button>
        </ButtonGroup>
      </Modal>
    </ModalTrigger>
  );
}`,language:`tsx`}),`
`,(0,_.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,_.jsx)(t.h3,{id:`keyboard-interaction`,children:`Keyboard interaction`}),`
`,(0,_.jsxs)(t.table,{children:[(0,_.jsx)(t.thead,{children:(0,_.jsxs)(t.tr,{children:[(0,_.jsx)(t.th,{children:`Key`}),(0,_.jsx)(t.th,{children:`Action`})]})}),(0,_.jsxs)(t.tbody,{children:[(0,_.jsxs)(t.tr,{children:[(0,_.jsx)(t.td,{children:(0,_.jsx)(t.code,{children:`Tab`})}),(0,_.jsx)(t.td,{children:`Moves focus to the next focusable element inside the modal`})]}),(0,_.jsxs)(t.tr,{children:[(0,_.jsx)(t.td,{children:(0,_.jsx)(t.code,{children:`Shift + Tab`})}),(0,_.jsx)(t.td,{children:`Moves focus to the previous focusable element inside the modal`})]}),(0,_.jsxs)(t.tr,{children:[(0,_.jsx)(t.td,{children:(0,_.jsx)(t.code,{children:`Escape`})}),(0,_.jsxs)(t.td,{children:[`Closes the modal (unless `,(0,_.jsx)(t.code,{children:`overlayProps.isKeyboardDismissDisabled`}),`)`]})]})]})]}),`
`,(0,_.jsx)(t.h3,{id:`aria`,children:`ARIA`}),`
`,(0,_.jsxs)(t.ul,{children:[`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.code,{children:`role="dialog"`}),` is applied automatically by the underlying React Aria `,(0,_.jsx)(t.code,{children:`Dialog`})]}),`
`,(0,_.jsxs)(t.li,{children:[`A `,(0,_.jsx)(t.code,{children:`Heading slot="title"`}),` is rendered as a heading and linked to the dialog via `,(0,_.jsx)(t.code,{children:`aria-labelledby`})]}),`
`,(0,_.jsxs)(t.li,{children:[`The `,(0,_.jsx)(t.code,{children:`CloseButton`}),` is rendered with `,(0,_.jsx)(t.code,{children:`aria-label="Close"`}),` and picks up the close behavior via `,(0,_.jsx)(t.code,{children:`slot="close"`})]}),`
`,(0,_.jsx)(t.li,{children:`Focus is trapped within the modal while open and returned to the trigger on close`}),`
`]}),`
`,(0,_.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,_.jsxs)(t.ul,{children:[`
`,(0,_.jsxs)(t.li,{children:[`Always include a `,(0,_.jsx)(t.code,{children:`Heading slot="title"`}),` so the dialog has an accessible name; otherwise pass `,(0,_.jsx)(t.code,{children:`aria-label`}),`/`,(0,_.jsx)(t.code,{children:`aria-labelledby`}),` on `,(0,_.jsx)(t.code,{children:`<Modal>`})]}),`
`,(0,_.jsxs)(t.li,{children:[`Pair every action button with `,(0,_.jsx)(t.code,{children:`slot="close"`}),` when it should dismiss the modal`]}),`
`,(0,_.jsxs)(t.li,{children:[`Set `,(0,_.jsx)(t.code,{children:`isDismissable={false}`}),` to prevent outside-click dismissal for required confirmations; to also block `,(0,_.jsx)(t.code,{children:`Escape`}),`, pass `,(0,_.jsx)(t.code,{children:`overlayProps={{ isKeyboardDismissDisabled: true }}`})]}),`
`]}),`
`,(0,_.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-tsx`,children:`<Modal>
  <Header>
    <Heading slot="title" />
    <CloseButton />
  </Header>
  <Button slot="close" />
  <Content />
  <ButtonGroup />
  <Footer />
</Modal>
`})}),`
`,(0,_.jsxs)(t.p,{children:[`The `,(0,_.jsx)(t.code,{children:`Modal`}),` component accepts the following props:`]}),`
`,(0,_.jsx)(a,{of:d})]})}function g(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,_.jsx)(t,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;e((()=>{_=t(),c(),s(),m()}))();export{g as default};