import{j as e}from"./iframe-B7T5JP5V.js";import{useMDXComponents as r}from"./index-DePaf8Jy.js";import{M as s,A as d,a as o,S as n}from"./blocks-Bk7QREwH.js";import{S as l,P as c,D as h,C as m,W as p,A as u,a as x}from"./modal.stories-DHsL4-mA.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BYgYdQsS.js";import"./index-CAEJ_Xno.js";import"./index-BdAGSb15.js";import"./index-DnWbClJO.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-DkFl7FGU.js";import"./Text-B-v_oaRK.js";import"./mergeProps-0UgpPvdG.js";import"./SSRProvider-CjHoC05b.js";import"./useObjectRef-CP9GRT_p.js";import"./Hidden-Do3CxAsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-44EDFkgt.js";import"./usePress-CzFgKW8R.js";import"./utils-COFQEywW.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-XsSus9dj.js";import"./useHover-CbUkXchC.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-CXUOxw97.js";import"./useFocusWithin-COrQIuyK.js";import"./index-DJiIj1IV.js";import"./index-Df5-bfyk.js";import"./index-Bwgt-6b6.js";import"./slots-B9LmtyAi.js";import"./index-WqDfzGyf.js";import"./index-CLj43KZG.js";import"./index-D2F0R-3K.js";import"./index-CdSrwnD_.js";import"./create-external-store-TtP3UJpK.js";import"./index-B8f6_Ihb.js";import"./client-CtN9lC1q.js";import"./index-CgnGW5p0.js";import"./index-PfxJDWHb.js";import"./index-BwLpfIVw.js";import"./Dialog-B1mAZQX1.js";import"./RSPContexts-8TQmi5zG.js";import"./OverlayArrow-CAGr9Pjb.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-DuuRmdg-.js";import"./useControlledState-8Bu98mcU.js";import"./context-CHX0tjp3.js";import"./Collection-DXGlN8qq.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-UtHv4G8i.js";import"./FocusScope-pSREPLKl.js";import"./SelectionIndicator-BGabFa32.js";import"./Overlay-DwfHVRAN.js";import"./PortalProvider-CT6SEt3j.js";import"./useLocalizedStringFormatter-D1FYCPWc.js";import"./usePreventScroll-CfwgXmgm.js";import"./useLabels-_3TUIeAh.js";import"./VisuallyHidden-C2a3ku47.js";import"./useModalOverlay-BB1tXjtL.js";import"./index-Cj1b3wPa.js";import"./index-BL-SbBdy.js";import"./FieldError-JmjTwbLL.js";import"./Form-C4keMYoE.js";import"./useRadioGroupState-CEur3Wuh.js";import"./useField-BgIDfc39.js";import"./useLabel-BtcbzUDN.js";const g=`import { ModalTrigger, Modal, Button, Flex } from '@godaddy/antares';

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
`]})]})}function Ge(i={}){const{wrapper:t}={...r(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(a,{...i})}):a(i)}export{Ge as default};
