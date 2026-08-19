import{i as e}from"./preload-helper-CUucOUc4.js";import{F as t}from"./iframe-CrH23qhK.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-Dmm9JBId.js";import{t as c}from"./mdx-react-shim-CFygS1JK.js";import{Alignment as l,Controlled as u,Default as d,Props as f,WithActions as p,WithMedia as m,n as h,t as g}from"./modal.stories-BdYChABI.js";function _(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(o,{of:h,name:`Overview`}),`
`,(0,y.jsx)(t.h1,{id:`modal`,children:`Modal`}),`
`,(0,y.jsx)(t.p,{children:`The Modal component presents a dialog window over the page that focuses the user's attention on a single task or piece of information.`}),`
`,(0,y.jsxs)(t.p,{children:[`Use `,(0,y.jsx)(t.code,{children:`ModalTrigger`}),` to wire a trigger element (typically a `,(0,y.jsx)(t.code,{children:`Button`}),`) to a `,(0,y.jsx)(t.code,{children:`Modal`}),`. The `,(0,y.jsx)(t.code,{children:`Modal`}),` exposes high-level slots for `,(0,y.jsx)(t.code,{children:`title`}),`, `,(0,y.jsx)(t.code,{children:`description`}),`, `,(0,y.jsx)(t.code,{children:`actions`}),`, and `,(0,y.jsx)(t.code,{children:`media`}),`, while still accepting arbitrary `,(0,y.jsx)(t.code,{children:`children`}),` for custom content.`]}),`
`,(0,y.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,y.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,y.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,y.jsxs)(t.p,{children:[`The default modal exposes a `,(0,y.jsx)(t.code,{children:`title`}),`, `,(0,y.jsx)(t.code,{children:`description`}),`, and `,(0,y.jsx)(t.code,{children:`children`}),` content area. Open and close state is managed automatically by `,(0,y.jsx)(t.code,{children:`ModalTrigger`}),`.`]}),`
`,(0,y.jsx)(i,{of:d,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { ModalTrigger, Modal, Button, Flex } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Open modal</Button>
      <Modal
        title="Modal title"
        description="She expressed her gratitude again, but as it was too painful a subject to each, to be dwelt on farther."
      >
        <Flex padding="md" elevation="card" justifyContent="center">
          This is the children content
        </Flex>
      </Modal>
    </ModalTrigger>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,y.jsxs)(t.p,{children:[`Pass `,(0,y.jsx)(t.code,{children:`isOpen`}),` and `,(0,y.jsx)(t.code,{children:`onOpenChange`}),` to `,(0,y.jsx)(t.code,{children:`ModalTrigger`}),` to control the open state externally.`]}),`
`,(0,y.jsx)(i,{of:u,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { ModalTrigger, Modal, Button, Flex, Text } from '@godaddy/antares';
import { useState } from 'react';

export function ControlledExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex direction="column" gap="sm" alignItems="start">
      <ModalTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
        <Button variant="primary">Open modal</Button>
        <Modal
          title="Modal title"
          description="She expressed her gratitude again, but as it was too painful a subject to each, to be dwelt on farther."
          actions={[
            <Button key="close" slot="close" variant="primary">
              Close
            </Button>
          ]}
        />
      </ModalTrigger>

      <Text>The modal is currently {isOpen ? 'open' : 'closed'}.</Text>

      <Button variant="secondary" onPress={() => setIsOpen(true)}>
        Open from outside
      </Button>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`with-actions`,children:`With actions`}),`
`,(0,y.jsxs)(t.p,{children:[`Render footer buttons via the `,(0,y.jsx)(t.code,{children:`actions`}),` prop. Use `,(0,y.jsx)(t.code,{children:`slot="close"`}),` on a button to close the modal automatically when pressed.`]}),`
`,(0,y.jsx)(i,{of:p,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { ModalTrigger, Modal, Button } from '@godaddy/antares';

export function WithActionsExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Open modal</Button>
      <Modal
        title="Modal title"
        description="She expressed her gratitude again, but as it was too painful a subject to each, to be dwelt on farther."
        actions={[
          <Button key="cancel" slot="close" variant="secondary">
            Cancel
          </Button>,
          <Button key="confirm" slot="close" variant="primary">
            Confirm
          </Button>
        ]}
      />
    </ModalTrigger>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`alignment`,children:`Alignment`}),`
`,(0,y.jsxs)(t.p,{children:[`Use `,(0,y.jsx)(t.code,{children:`centered`}),` to center the title and description, and `,(0,y.jsx)(t.code,{children:`actionProps`}),` to control the alignment and direction of the action buttons.`]}),`
`,(0,y.jsx)(i,{of:l,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { ModalTrigger, Modal, Button, RadioGroup, Radio, Flex } from '@godaddy/antares';
import { useState } from 'react';

export function AlignmentExample() {
  const [alignment, setAlignment] = useState<string>();
  const [actionsAlignment, setActionsAlignment] = useState<string>();
  const [actionsDirection, setActionsDirection] = useState<string>();

  return (
    <Flex direction="column" gap="sm" alignItems="start">
      <ModalTrigger>
        <Button variant="primary">Open modal</Button>

        <Modal
          title="Modal title"
          description="She expressed her gratitude again, but as it was too painful a subject to each, to be dwelt on farther."
          centered={alignment === 'center'}
          actionProps={{
            ...(actionsAlignment ? { justifyContent: actionsAlignment } : {}),
            ...(actionsDirection ? { direction: actionsDirection as 'row' | 'column' } : {})
          }}
          actions={[
            <Button key="cancel" slot="close" variant="secondary">
              Cancel
            </Button>,
            <Button key="confirm" slot="close" variant="primary">
              Confirm
            </Button>
          ]}
        />
      </ModalTrigger>

      <RadioGroup orientation="horizontal" label="Modal alignment" value={alignment} onChange={setAlignment}>
        <Radio value="">Start (Default)</Radio>
        <Radio value="center">Centered</Radio>
      </RadioGroup>

      <RadioGroup
        orientation="horizontal"
        label="Actions alignment"
        value={actionsAlignment}
        onChange={setActionsAlignment}
      >
        <Radio value="start">Start</Radio>
        <Radio value="center">Centered</Radio>
        <Radio value="">End (Default)</Radio>
      </RadioGroup>

      <RadioGroup
        orientation="horizontal"
        label="Actions direction"
        value={actionsDirection}
        onChange={setActionsDirection}
      >
        <Radio value="row">Row (Default)</Radio>
        <Radio value="column">Column</Radio>
      </RadioGroup>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`with-media`,children:`With Media`}),`
`,(0,y.jsxs)(t.p,{children:[`Pass a `,(0,y.jsx)(t.code,{children:`media`}),` element to display imagery alongside the content. Configure its layout with `,(0,y.jsx)(t.code,{children:`mediaVariant`}),` (`,(0,y.jsx)(t.code,{children:`full`}),` or `,(0,y.jsx)(t.code,{children:`inset`}),`), `,(0,y.jsx)(t.code,{children:`mediaDirection`}),` (`,(0,y.jsx)(t.code,{children:`column`}),` or `,(0,y.jsx)(t.code,{children:`row`}),`), and `,(0,y.jsx)(t.code,{children:`mediaPosition`}),` (`,(0,y.jsx)(t.code,{children:`start`}),` or `,(0,y.jsx)(t.code,{children:`end`}),`).`]}),`
`,(0,y.jsx)(i,{of:m,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { ModalTrigger, Modal, Button, RadioGroup, Radio, Flex } from '@godaddy/antares';
import { useState } from 'react';

export function WithMediaExample() {
  const [mediaVariant, setMediaVariant] = useState<string>();
  const [mediaDirection, setMediaDirection] = useState<string>();
  const [mediaPosition, setMediaPosition] = useState<string>();

  return (
    <Flex direction="column" gap="sm" alignItems="start">
      <ModalTrigger>
        <Button variant="primary">Open modal</Button>
        <Modal
          title="Modal title"
          description="She expressed her gratitude again, but as it was too painful a subject to each, to be dwelt on farther."
          media={
            <Flex style={{ width: '100%', height: '100%', minWidth: 350, minHeight: 200, backgroundColor: 'teal' }} />
          }
          mediaVariant={mediaVariant as 'inset' | 'full' | undefined}
          mediaDirection={mediaDirection as 'column' | 'row' | undefined}
          mediaPosition={mediaPosition as 'start' | 'end' | undefined}
          actions={[
            <Button key="cancel" slot="close" variant="secondary">
              Cancel
            </Button>,
            <Button key="confirm" slot="close" variant="primary">
              Confirm
            </Button>
          ]}
        >
          <Flex padding="md" elevation="card" justifyContent="center">
            This is the children content
          </Flex>
        </Modal>
      </ModalTrigger>

      <RadioGroup orientation="horizontal" label="Variant" value={mediaVariant} onChange={setMediaVariant}>
        <Radio value="inset">Inset</Radio>
        <Radio value="full">Full (Default)</Radio>
      </RadioGroup>

      <RadioGroup orientation="horizontal" label="Direction" value={mediaDirection} onChange={setMediaDirection}>
        <Radio value="row">Row</Radio>
        <Radio value="column">Column (Default)</Radio>
      </RadioGroup>

      <RadioGroup orientation="horizontal" label="Position" value={mediaPosition} onChange={setMediaPosition}>
        <Radio value="start">Start (Default)</Radio>
        <Radio value="end">End</Radio>
      </RadioGroup>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,y.jsx)(t.h3,{id:`keyboard-interaction`,children:`Keyboard interaction`}),`
`,(0,y.jsxs)(t.table,{children:[(0,y.jsx)(t.thead,{children:(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.th,{children:`Key`}),(0,y.jsx)(t.th,{children:`Action`})]})}),(0,y.jsxs)(t.tbody,{children:[(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.td,{children:(0,y.jsx)(t.code,{children:`Tab`})}),(0,y.jsx)(t.td,{children:`Moves focus to the next focusable element inside the modal`})]}),(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.td,{children:(0,y.jsx)(t.code,{children:`Shift + Tab`})}),(0,y.jsx)(t.td,{children:`Moves focus to the previous focusable element inside the modal`})]}),(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.td,{children:(0,y.jsx)(t.code,{children:`Escape`})}),(0,y.jsx)(t.td,{children:`Closes the modal (when dismissable)`})]})]})]}),`
`,(0,y.jsx)(t.h3,{id:`aria`,children:`ARIA`}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`role="dialog"`}),` is applied automatically by the underlying React Aria `,(0,y.jsx)(t.code,{children:`Dialog`})]}),`
`,(0,y.jsxs)(t.li,{children:[`The `,(0,y.jsx)(t.code,{children:`title`}),` is rendered as an `,(0,y.jsx)(t.code,{children:`<h2>`}),` and linked to the dialog via `,(0,y.jsx)(t.code,{children:`aria-labelledby`})]}),`
`,(0,y.jsxs)(t.li,{children:[`The close button is rendered with `,(0,y.jsx)(t.code,{children:`aria-label="Close"`})]}),`
`,(0,y.jsx)(t.li,{children:`Focus is trapped within the modal while open and returned to the trigger on close`}),`
`]}),`
`,(0,y.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsxs)(t.li,{children:[`Always provide a `,(0,y.jsx)(t.code,{children:`title`}),` so the dialog has an accessible name`]}),`
`,(0,y.jsxs)(t.li,{children:[`Pair every footer action with `,(0,y.jsx)(t.code,{children:`slot="close"`}),` when it should dismiss the modal`]}),`
`,(0,y.jsxs)(t.li,{children:[`Set `,(0,y.jsx)(t.code,{children:`isDismissable={false}`}),` for required confirmations the user must explicitly answer`]}),`
`,(0,y.jsxs)(t.li,{children:[`Provide meaningful `,(0,y.jsx)(t.code,{children:`alt`}),` text for image media, or `,(0,y.jsx)(t.code,{children:`alt=""`}),` if it's purely decorative`]}),`
`,(0,y.jsxs)(t.li,{children:[`Prefer the `,(0,y.jsx)(t.code,{children:`actions`}),` prop over manually adding footer buttons in `,(0,y.jsx)(t.code,{children:`children`}),` so they get consistent spacing and alignment`]}),`
`]}),`
`,(0,y.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,y.jsxs)(t.p,{children:[`The `,(0,y.jsx)(t.code,{children:`Modal`}),` component accepts the following props:`]}),`
`,(0,y.jsx)(a,{of:f})]})}function v(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,y.jsx)(t,{...e,children:(0,y.jsx)(_,{...e})}):_(e)}var y;e((()=>{y=t(),c(),s(),g()}))();export{v as default};