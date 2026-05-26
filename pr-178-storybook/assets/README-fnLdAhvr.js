import{j as e}from"./iframe-LOWFan2Y.js";import{u as r,M as s,A as d,a as o,S as n}from"./blocks-6w_qDm-T.js";import{S as l,P as c,D as h,C as m,W as p,A as u,a as x}from"./modal.stories-Ctjf0MQ8.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DU3I91oq.js";import"./index-KhT1gtm9.js";import"./index-CVcC0X-m.js";import"./index-CGB7g4PQ.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-GQfcPHwY.js";import"./Text-JWwkkN1B.js";import"./mergeProps-DVlUucGM.js";import"./SSRProvider-BvbLlUY4.js";import"./useObjectRef-DKSajwmg.js";import"./useButton-BbOVtDS8.js";import"./filterDOMProps-SeKkUh_q.js";import"./useFocusable-BE8dAWyo.js";import"./useSyncRef-Ci64w3RW.js";import"./useGlobalListeners-C5ggiYow.js";import"./DOMFunctions-1-yhhTt0.js";import"./useHover-BvJCL5nc.js";import"./platform-DTNzKOdA.js";import"./usePress-B_ANiboC.js";import"./Hidden-HS0i9hRS.js";import"./useFocusRing-D2Ni-k3x.js";import"./useFocusWithin-BL7r36Qu.js";import"./index-BWgBptW-.js";import"./index-Df_dhi3j.js";import"./index-DPEV78TM.js";import"./slots-BIFIL6na.js";import"./index-D2wzKwyg.js";import"./index-CLj43KZG.js";import"./index-C1PfJKZK.js";import"./index-B-b3BhZD.js";import"./create-external-store-TtP3UJpK.js";import"./index-ibVWq5Km.js";import"./client-fvBFWmJF.js";import"./index-DGm30phA.js";import"./index-mNVB522g.js";import"./index-DTvH6OAg.js";import"./Dialog-EcY_WjZ_.js";import"./Heading-CIrRuC_8.js";import"./animation-DUDHXx5P.js";import"./number-P4c4HRxZ.js";import"./I18nProvider-xiRjartw.js";import"./useControlledState-BV2pEkAY.js";import"./useCollection-DByzWhV4.js";import"./FocusScope-DHCtv43J.js";import"./isScrollable-BoZfJepV.js";import"./useEvent-xMNV2GUO.js";import"./Autocomplete-CQvffpiw.js";import"./SelectionIndicator-BpCoj0NS.js";import"./useLocalizedStringFormatter-Mla6jK-v.js";import"./getScrollParent-CjtJP_Hi.js";import"./useLabels-DJFwLOAm.js";import"./VisuallyHidden-DIjkggN0.js";import"./Modal-Bns59ueX.js";import"./index-Dj7fEMJi.js";import"./index-KYA2jeJY.js";import"./FieldError-B_qfZ8cZ.js";import"./Form-D4zTRf2u.js";import"./useRadioGroupState-BdZbdUXo.js";import"./useFormValidation-38t5xSJh.js";import"./useLabel-CwowIMOQ.js";const g=`import { ModalTrigger, Modal, Button, Flex } from '@godaddy/antares';

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
`]})]})}function Fe(i={}){const{wrapper:t}={...r(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(a,{...i})}):a(i)}export{Fe as default};
