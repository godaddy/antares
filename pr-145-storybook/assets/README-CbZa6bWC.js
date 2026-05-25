import{j as e}from"./iframe-DViU4vTT.js";import{u as r,M as s,A as d,a as o,S as n}from"./blocks-BQ8w0JfY.js";import{S as l,P as c,D as h,C as m,W as p,A as u,a as x}from"./modal.stories-CTJfkgp0.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DikCmdmJ.js";import"./index-B7qGxfzd.js";import"./index-Cvi2XI0M.js";import"./index-Cbu2r9mg.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-CoXDLf7g.js";import"./Text-D8yA8HIA.js";import"./mergeProps-CCdVsh7A.js";import"./SSRProvider-CymdbxNh.js";import"./useObjectRef-B0Qr798B.js";import"./Hidden-B69lYQl9.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-Qxn7U6zp.js";import"./usePress-Dme-vfMm.js";import"./utils-C61XlCUT.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-BlhaBrP8.js";import"./useHover-no6BlnLt.js";import"./platform-D4ZP5NBb.js";import"./useFocusRing-DsusUEVi.js";import"./useFocusWithin-DwH7tXPO.js";import"./index-mnn9O8Si.js";import"./index-DSoGsPrt.js";import"./index-BTZLZrqQ.js";import"./slots-B1yn7vZl.js";import"./index-CuLwFv6H.js";import"./index-CLj43KZG.js";import"./index-DaZr2phs.js";import"./index-Dcz_ebIg.js";import"./create-external-store-TtP3UJpK.js";import"./index-CblRztvU.js";import"./client-DIMh9otw.js";import"./index-B45Ba_cW.js";import"./index-CRS-bnx5.js";import"./index-D42rG82q.js";import"./Dialog-CrAfutK9.js";import"./RSPContexts-BQsPKkoU.js";import"./OverlayArrow-C0M8lFej.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-kI7cCud8.js";import"./useControlledState-jkL595lr.js";import"./context-vbi_vjpi.js";import"./SelectionManager-CPY1AaQu.js";import"./keyboard-CzKtmrYs.js";import"./useEvent-CP1cJcAX.js";import"./FocusScope-BL582Srt.js";import"./SelectionIndicator-Dk7AJnOa.js";import"./Overlay-Mj3Fgdgs.js";import"./PortalProvider-gzOUtSuE.js";import"./useLocalizedStringFormatter-BooDndqW.js";import"./usePreventScroll-CaFHaWR_.js";import"./useLabels-CogZxtme.js";import"./VisuallyHidden-DrUkMCod.js";import"./useModalOverlay-BezjBjWE.js";import"./index-CMn6WbG_.js";import"./index-DS7Bh8Cr.js";import"./FieldError-CtSmPYGR.js";import"./Form-XZAUjGT2.js";import"./useRadioGroupState-DU9r96x8.js";import"./useFormValidation-CtOfx849.js";import"./useLabel-AN1M6_Zy.js";const g=`import { ModalTrigger, Modal, Button, Flex } from '@godaddy/antares';

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
}
`,j=`import { ModalTrigger, Modal, Button, Flex, Text } from '@godaddy/antares';
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
}
`,f=`import { ModalTrigger, Modal, Button } from '@godaddy/antares';

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
}
`,y=`import { ModalTrigger, Modal, Button, RadioGroup, Radio, Flex } from '@godaddy/antares';
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
}
`,M=`import { ModalTrigger, Modal, Button, RadioGroup, Radio, Flex } from '@godaddy/antares';
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
}
`;function a(i){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:l,name:"Overview"}),`
`,e.jsx(t.h1,{id:"modal",children:"Modal"}),`
`,e.jsx(t.p,{children:"The Modal component presents a dialog window over the page that focuses the user's attention on a single task or piece of information."}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:"ModalTrigger"})," to wire a trigger element (typically a ",e.jsx(t.code,{children:"Button"}),") to a ",e.jsx(t.code,{children:"Modal"}),". The ",e.jsx(t.code,{children:"Modal"})," exposes high-level slots for ",e.jsx(t.code,{children:"title"}),", ",e.jsx(t.code,{children:"description"}),", ",e.jsx(t.code,{children:"actions"}),", and ",e.jsx(t.code,{children:"media"}),", while still accepting arbitrary ",e.jsx(t.code,{children:"children"})," for custom content."]}),`
`,e.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(t.h2,{id:"props",children:"Props"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"Modal"})," component accepts the following props:"]}),`
`,e.jsx(d,{of:c}),`
`,e.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(t.h3,{id:"basic-usage",children:"Basic usage"}),`
`,e.jsxs(t.p,{children:["The default modal exposes a ",e.jsx(t.code,{children:"title"}),", ",e.jsx(t.code,{children:"description"}),", and ",e.jsx(t.code,{children:"children"})," content area. Open and close state is managed automatically by ",e.jsx(t.code,{children:"ModalTrigger"}),"."]}),`
`,e.jsx(o,{of:h,inline:!0}),`
`,e.jsx(n,{language:"tsx",code:g}),`
`,e.jsx(t.h3,{id:"controlled",children:"Controlled"}),`
`,e.jsxs(t.p,{children:["Pass ",e.jsx(t.code,{children:"isOpen"})," and ",e.jsx(t.code,{children:"onOpenChange"})," to ",e.jsx(t.code,{children:"ModalTrigger"})," to control the open state externally."]}),`
`,e.jsx(o,{of:m,inline:!0}),`
`,e.jsx(n,{language:"tsx",code:j}),`
`,e.jsx(t.h3,{id:"with-actions",children:"With actions"}),`
`,e.jsxs(t.p,{children:["Render footer buttons via the ",e.jsx(t.code,{children:"actions"})," prop. Use ",e.jsx(t.code,{children:'slot="close"'})," on a button to close the modal automatically when pressed."]}),`
`,e.jsx(o,{of:p,inline:!0}),`
`,e.jsx(n,{language:"tsx",code:f}),`
`,e.jsx(t.h3,{id:"alignment",children:"Alignment"}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:"centered"})," to center the title and description, and ",e.jsx(t.code,{children:"actionProps"})," to control the alignment and direction of the action buttons."]}),`
`,e.jsx(o,{of:u,inline:!0}),`
`,e.jsx(n,{language:"tsx",code:y}),`
`,e.jsx(t.h3,{id:"with-media",children:"With media"}),`
`,e.jsxs(t.p,{children:["Pass a ",e.jsx(t.code,{children:"media"})," element to display imagery alongside the content. Configure its layout with ",e.jsx(t.code,{children:"mediaVariant"})," (",e.jsx(t.code,{children:"full"})," or ",e.jsx(t.code,{children:"inset"}),"), ",e.jsx(t.code,{children:"mediaDirection"})," (",e.jsx(t.code,{children:"column"})," or ",e.jsx(t.code,{children:"row"}),"), and ",e.jsx(t.code,{children:"mediaPosition"})," (",e.jsx(t.code,{children:"start"})," or ",e.jsx(t.code,{children:"end"}),")."]}),`
`,e.jsx(o,{of:x,inline:!0}),`
`,e.jsx(n,{language:"tsx",code:M}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(t.h3,{id:"keyboard-interaction",children:"Keyboard interaction"}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Key"}),e.jsx(t.th,{children:"Action"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"Tab"})}),e.jsx(t.td,{children:"Moves focus to the next focusable element inside the modal"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"Shift + Tab"})}),e.jsx(t.td,{children:"Moves focus to the previous focusable element inside the modal"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"Escape"})}),e.jsx(t.td,{children:"Closes the modal (when dismissable)"})]})]})]}),`
`,e.jsx(t.h3,{id:"aria",children:"ARIA"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:'role="dialog"'})," is applied automatically by the underlying React Aria ",e.jsx(t.code,{children:"Dialog"})]}),`
`,e.jsxs(t.li,{children:["The ",e.jsx(t.code,{children:"title"})," is rendered as an ",e.jsx(t.code,{children:"<h2>"})," and linked to the dialog via ",e.jsx(t.code,{children:"aria-labelledby"})]}),`
`,e.jsxs(t.li,{children:["The close button is rendered with ",e.jsx(t.code,{children:'aria-label="Close"'})]}),`
`,e.jsx(t.li,{children:"Focus is trapped within the modal while open and returned to the trigger on close"}),`
`]}),`
`,e.jsx(t.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Always provide a ",e.jsx(t.code,{children:"title"})," so the dialog has an accessible name"]}),`
`,e.jsxs(t.li,{children:["Pair every footer action with ",e.jsx(t.code,{children:'slot="close"'})," when it should dismiss the modal"]}),`
`,e.jsxs(t.li,{children:["Set ",e.jsx(t.code,{children:"isDismissable={false}"})," for required confirmations the user must explicitly answer"]}),`
`,e.jsxs(t.li,{children:["Provide meaningful ",e.jsx(t.code,{children:"alt"})," text for image media, or ",e.jsx(t.code,{children:'alt=""'})," if it's purely decorative"]}),`
`,e.jsxs(t.li,{children:["Prefer the ",e.jsx(t.code,{children:"actions"})," prop over manually adding footer buttons in ",e.jsx(t.code,{children:"children"})," so they get consistent spacing and alignment"]}),`
`]})]})}function Oe(i={}){const{wrapper:t}={...r(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(a,{...i})}):a(i)}export{Oe as default};
