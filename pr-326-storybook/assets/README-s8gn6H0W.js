import{i as e}from"./preload-helper-BT3GefEN.js";import{F as t}from"./iframe-DHB-FC_1.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-ffywXU6E.js";import{t as c}from"./mdx-react-shim-BApTFIe4.js";import{t as l}from"./runtime-CCpseHws.js";import{Controlled as u,Default as d,ModalTriggerProps as f,Props as p,Scrollable as m,Triggerless as h,n as g,t as _}from"./modal.stories-CYFBSDOX.js";function v(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(o,{of:g,name:`Overview`}),`
`,(0,b.jsx)(t.h1,{id:`modal`,children:`Modal`}),`
`,(0,b.jsx)(t.p,{children:`The Modal component presents a dialog window over the page that focuses the user's attention on a single task or piece of information.`}),`
`,(0,b.jsxs)(t.p,{children:[(0,b.jsx)(t.code,{children:`ModalTrigger`}),` wraps a trigger button and a `,(0,b.jsx)(t.code,{children:`<Modal>`}),`, handling open state automatically. Based on RAC `,(0,b.jsx)(t.code,{children:`DialogTrigger`}),`.`]}),`
`,(0,b.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,b.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,b.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,b.jsxs)(t.p,{children:[`Compose a Modal from a `,(0,b.jsx)(t.code,{children:`Heading slot="title"`}),`, a `,(0,b.jsx)(t.code,{children:`CloseButton`}),`, `,(0,b.jsx)(t.code,{children:`Content`}),`, and a
`,(0,b.jsx)(t.code,{children:`ButtonGroup`}),`. `,(0,b.jsx)(t.code,{children:`ModalTrigger`}),` opens the Modal and manages its open/close state.`]}),`
`,(0,b.jsx)(i,{of:d,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { ModalTrigger, Modal, Button, CloseButton, Heading, Content, ButtonGroup } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Open modal</Button>
      <Modal>
        <Heading slot="title">Delete file?</Heading>
        <CloseButton />
        <Content>This action cannot be undone. The file will be permanently removed.</Content>
        <ButtonGroup>
          <Button slot="close">Cancel</Button>
          <Button slot="close" variant="critical">
            Delete
          </Button>
        </ButtonGroup>
      </Modal>
    </ModalTrigger>
  );
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,b.jsxs)(t.p,{children:[`Pass `,(0,b.jsx)(t.code,{children:`isOpen`}),` and `,(0,b.jsx)(t.code,{children:`onOpenChange`}),` to `,(0,b.jsx)(t.code,{children:`ModalTrigger`}),` to control the open state externally.`]}),`
`,(0,b.jsx)(i,{of:u,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { ModalTrigger, Modal, Button, CloseButton, Heading, Content, ButtonGroup, Flex, Text } from '@godaddy/antares';
import { useState } from 'react';

export function ControlledExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex direction="column" gap="sm" alignItems="start">
      <ModalTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
        <Button variant="primary">Open modal</Button>
        <Modal>
          <Heading slot="title">Modal title</Heading>
          <CloseButton />
          <Content>
            She expressed her gratitude again, but as it was too painful a subject to each, to be dwelt on farther.
          </Content>
          <ButtonGroup>
            <Button slot="close" variant="primary">
              Close
            </Button>
          </ButtonGroup>
        </Modal>
      </ModalTrigger>

      <Text>The modal is currently {isOpen ? 'open' : 'closed'}.</Text>

      <Button variant="primary" onPress={() => setIsOpen(true)}>
        Open from outside
      </Button>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`scrollable`,children:`Scrollable`}),`
`,(0,b.jsxs)(t.p,{children:[`When the content is taller than the viewport, the `,(0,b.jsx)(t.code,{children:`Content`}),` region scrolls while the title
row and the `,(0,b.jsx)(t.code,{children:`ButtonGroup`}),` stay pinned.`]}),`
`,(0,b.jsx)(i,{of:m,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { ModalTrigger, Modal, Button, CloseButton, Heading, Content, ButtonGroup, Text } from '@godaddy/antares';

export function ScrollableExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Open modal</Button>
      <Modal>
        <Heading slot="title">Terms of service</Heading>
        <CloseButton />
        <Content>
          {Array.from({ length: 24 }, (_, i) => (
            <Text as="p" key={i}>
              She expressed her gratitude again, but as it was too painful a subject to each, to be dwelt on farther.
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
`,(0,b.jsx)(t.h3,{id:`triggerless`,children:`Triggerless`}),`
`,(0,b.jsxs)(t.p,{children:[(0,b.jsx)(t.code,{children:`Modal`}),` accepts `,(0,b.jsx)(t.code,{children:`isOpen`}),` and `,(0,b.jsx)(t.code,{children:`onOpenChange`}),` directly, so it can be controlled without a
`,(0,b.jsx)(t.code,{children:`ModalTrigger`}),`. Useful when the modal is opened from several places at once.`]}),`
`,(0,b.jsx)(i,{of:h,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { useState } from 'react';
import { Button, ButtonGroup, CloseButton, Content, Heading, Modal } from '@godaddy/antares';

export function TriggerlessExample() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal isOpen={isOpen} onOpenChange={setOpen}>
        <Heading slot="title">Triggerless modal</Heading>
        <CloseButton />
        <Content>This is the content of the modal.</Content>
        <ButtonGroup>
          <Button slot="close" variant="primary">
            Done
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  );
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,b.jsx)(t.h3,{id:`keyboard-interaction`,children:`Keyboard interaction`}),`
`,(0,b.jsxs)(t.table,{children:[(0,b.jsx)(t.thead,{children:(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.th,{children:`Key`}),(0,b.jsx)(t.th,{children:`Action`})]})}),(0,b.jsxs)(t.tbody,{children:[(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:(0,b.jsx)(t.code,{children:`Tab`})}),(0,b.jsx)(t.td,{children:`Moves focus to the next focusable element inside the modal`})]}),(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:(0,b.jsx)(t.code,{children:`Escape`})}),(0,b.jsxs)(t.td,{children:[`Closes the modal (unless `,(0,b.jsx)(t.code,{children:`isKeyboardDismissDisabled`}),`)`]})]})]})]}),`
`,(0,b.jsx)(t.h3,{id:`aria`,children:`ARIA`}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.code,{children:`role="dialog"`}),` is applied automatically by the underlying React Aria `,(0,b.jsx)(t.code,{children:`Dialog`})]}),`
`,(0,b.jsx)(t.li,{children:`Focus is trapped within the modal while open and returned to the trigger on close`}),`
`]}),`
`,(0,b.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsxs)(t.li,{children:[`Always include a `,(0,b.jsx)(t.code,{children:`Heading slot="title"`}),` so the dialog has an accessible name; otherwise pass `,(0,b.jsx)(t.code,{children:`aria-label`}),`/`,(0,b.jsx)(t.code,{children:`aria-labelledby`}),` on `,(0,b.jsx)(t.code,{children:`<Modal>`})]}),`
`,(0,b.jsxs)(t.li,{children:[`Pair every action button with `,(0,b.jsx)(t.code,{children:`slot="close"`}),` when it should dismiss the modal`]}),`
`,(0,b.jsxs)(t.li,{children:[`Set `,(0,b.jsx)(t.code,{children:`isDismissable={false}`}),` to prevent outside-click dismissal for required confirmations; to also block `,(0,b.jsx)(t.code,{children:`Escape`}),`, pass `,(0,b.jsx)(t.code,{children:`isKeyboardDismissDisabled`})]}),`
`]}),`
`,(0,b.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-tsx`,children:`<ModalTrigger>
  <Button />
  <Modal>
    <Heading slot="title" />
    <CloseButton />
    <Header />
    <Content />
    <Footer />
    <ButtonGroup />
    {/* ... */}
  </Modal>
</ModalTrigger>
`})}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`Modal`}),` component accepts the following props:`]}),`
`,(0,b.jsx)(a,{of:p}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`ModalTrigger`}),` component accepts the following props:`]}),`
`,(0,b.jsx)(a,{of:f})]})}function y(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,b.jsx)(t,{...e,children:(0,b.jsx)(v,{...e})}):v(e)}var b;e((()=>{b=t(),c(),s(),l(),_()}))();export{y as default};