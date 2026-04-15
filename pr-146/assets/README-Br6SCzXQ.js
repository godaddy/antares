import{j as t}from"./iframe-6GaXOUaT.js";import{useMDXComponents as r}from"./index-Cf9r2Gk8.js";import{M as l,A as a,a as i,S as e}from"./blocks-6xSex4GH.js";import{S as s,P as m,L as c,D as u,a as p,b as x,C as g,I as h,M as b,c as B,d as y,e as f}from"./button.stories-DtIEUl-f.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Bj9gKbGQ.js";import"./index-CMgpeNKa.js";import"./index-D8j4FsKY.js";import"./index-DrFu-skq.js";import"./index-BZHpy5ln.js";import"./index-C_3Vx422.js";import"./clsx-CgyFOmLt.js";import"./index-D-r1tqzZ.js";import"./mergeProps-DIoepj2e.js";import"./useObjectRef-GZJVnHfU.js";import"./DOMFunctions-DY9RYDsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useFocusRing-CEGxrnOL.js";import"./useFocusWithin-Qx4aKUdm.js";import"./platform-BULRNHlZ.js";import"./useFocusable-DZQjtpTF.js";import"./Collection-D4gn1lMD.js";import"./keyboard-BlyT3oQC.js";import"./FocusScope-VoVYMqej.js";import"./context-45Edcitn.js";import"./useControlledState-B9NBlRKo.js";import"./useOverlayTriggerState-C348ZOJT.js";import"./PortalProvider-lDXbK3q3.js";import"./usePreventScroll-DuxZLyfb.js";import"./useLabel-_TylngYe.js";import"./VisuallyHidden-C2Ucj3xH.js";import"./useField-CjNNHvIE.js";import"./useButton-CudY5WVT.js";import"./index-F36OoBR6.js";import"./index-DEOF3SdA.js";import"./slots-BRJ0SIrG.js";import"./index-U4fMboO0.js";import"./index-CLj43KZG.js";import"./index-BPiTBM6K.js";import"./index-C1FmEf8O.js";import"./create-external-store-TtP3UJpK.js";import"./index-N-5CbV7O.js";import"./client-BKBN4TYK.js";import"./index-cr67a0mC.js";import"./index-RfYcw_2-.js";const j=`import { Button } from '@godaddy/antares';

export function DefaultExample() {
  return <Button>Click me!</Button>;
}
`,F=`import { Button, type ButtonProps } from '@godaddy/antares';

export function PrimaryExample(props: ButtonProps) {
  return (
    <Button {...props} variant="primary">
      Primary Button
    </Button>
  );
}
`,P=`import { Button } from '@godaddy/antares';

export function SecondaryExample() {
  return <Button variant="secondary">Secondary Button</Button>;
}
`,v=`import { Button } from '@godaddy/antares';

export function CriticalExample() {
  return <Button variant="critical">Critical Button</Button>;
}
`,k=`import { Button, Text } from '@godaddy/antares';

export function InlineExample() {
  return (
    <Text>
      I am an <Button variant="inline">inline button</Button> surrounded by text!
    </Text>
  );
}
`,I=`import { Button, Flex, Icon, LinkButton, Text } from '@godaddy/antares';

export function IconExample() {
  return (
    <Flex direction="column" gap="md">
      <div>
        <Button variant="primary">
          <Icon icon="star" />
          <Text>With an icon!</Text>
        </Button>
      </div>

      <div>
        <LinkButton variant="secondary" href="#" isExternal>
          <Text>An external link!</Text>
        </LinkButton>
      </div>

      <Flex alignItems="center" gap="sm">
        <Text>Icon only button:</Text>
        <Button variant="primary" aria-label="Star">
          <Icon icon="star" />
        </Button>
      </Flex>

      <div>
        <Text>
          Hey look at me!{' '}
          <LinkButton href="#" variant="inline" isExternal>
            link button
          </LinkButton>{' '}
          I have an icon!
        </Text>
      </div>
    </Flex>
  );
}
`,S=`import { Button, Flex, LinkButton } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <Flex alignItems="center" gap="md" wrap="wrap">
      <Button variant="primary" isDisabled>
        Primary Disabled
      </Button>
      <Button variant="secondary" isDisabled>
        Secondary Disabled
      </Button>
      <Button variant="tertiary" isDisabled>
        Tertiary Disabled
      </Button>
      <Button variant="critical" isDisabled>
        Critical Disabled
      </Button>
      <Button variant="inline" isDisabled>
        Inline Disabled
      </Button>
      <LinkButton variant="secondary" href="#" isDisabled>
        Link Disabled
      </LinkButton>
    </Flex>
  );
}
`,T=`import { Button, Flex, Icon, LinkButton, Text } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex alignItems="center" gap="sm" wrap="wrap">
      <Button variant="primary" size="sm" aria-label="Star">
        <Icon icon="star" />
      </Button>

      <Button variant="primary" size="sm">
        Small
      </Button>

      <LinkButton href="#" variant="primary" size="sm" aria-label="Star">
        <Icon icon="star" />
        <Text>Link Small</Text>
      </LinkButton>

      <Button variant="primary" aria-label="Star">
        <Icon icon="star" />
      </Button>

      <Button variant="primary">Medium</Button>

      <LinkButton href="#" variant="primary">
        <Icon icon="star" />
        <Text>Link Medium</Text>
      </LinkButton>
    </Flex>
  );
}
`,D=`import { Button, Flex, Icon } from '@godaddy/antares';

export function MinimalExample() {
  return (
    <table className="button-story-table">
      <thead>
        <tr>
          <th scope="col">
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              Button Size
            </Flex>
          </th>
          <th scope="col">
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              Gap Size
            </Flex>
          </th>
          <th scope="col">
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              Example
            </Flex>
          </th>
          <th scope="col">
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              Usage
            </Flex>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              <code>md</code>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              <code>md</code>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              <Button variant="minimal" size="md" aria-label="Star">
                <Icon icon="star" />
              </Button>
              <Button variant="minimal" size="md" aria-label="Edit">
                <Icon icon="edit" />
              </Button>
              <Button variant="minimal" size="md" aria-label="More options" isDisabled>
                <Icon icon="ellipsis" />
              </Button>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              Recommended
            </Flex>
          </td>
        </tr>
        <tr>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              <code>md</code>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              <code>sm</code>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="sm">
              <Button variant="minimal" size="md" aria-label="Star">
                <Icon icon="star" />
              </Button>
              <Button variant="minimal" size="md" aria-label="Edit">
                <Icon icon="edit" />
              </Button>
              <Button variant="minimal" size="md" aria-label="More options" isDisabled>
                <Icon icon="ellipsis" />
              </Button>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              Can be used, but not recommended.
            </Flex>
          </td>
        </tr>
        <tr>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              <code>sm</code>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              <code>md</code>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              <Button variant="minimal" size="sm" aria-label="Star">
                <Icon icon="star" />
              </Button>
              <Button variant="minimal" size="sm" aria-label="Edit">
                <Icon icon="edit" />
              </Button>
              <Button variant="minimal" size="sm" aria-label="More options" isDisabled>
                <Icon icon="ellipsis" />
              </Button>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              Not recommended. The button may not be accessible at this size.
            </Flex>
          </td>
        </tr>
        <tr>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              <code>sm</code>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              <code>sm</code>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="sm">
              <Button variant="minimal" size="sm" aria-label="Star">
                <Icon icon="star" />
              </Button>
              <Button variant="minimal" size="sm" aria-label="Edit">
                <Icon icon="edit" />
              </Button>
              <Button variant="minimal" size="sm" aria-label="More options" isDisabled>
                <Icon icon="ellipsis" />
              </Button>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              Not recommended. The button may not be accessible at this size.
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
`;function d(o){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...r(),...o.components};return t.jsxs(t.Fragment,{children:[t.jsx(l,{of:s,name:"Overview"}),`
`,t.jsx(n.h1,{id:"button",children:"Button"}),`
`,t.jsx(n.p,{children:"The Button component allows users to initiate actions or submit forms with a single click"}),`
`,t.jsxs(n.p,{children:["Use the ",t.jsx(n.code,{children:"LinkButton"})," component instead when you need navigation functionality with a button-like appearance."]}),`
`,t.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,t.jsx(n.pre,{children:t.jsx(n.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,t.jsx(n.h2,{id:"props",children:"Props"}),`
`,t.jsxs(n.p,{children:["The ",t.jsx(n.code,{children:"Button"})," component accepts the following props:"]}),`
`,t.jsx(a,{of:m}),`
`,t.jsxs(n.p,{children:["The ",t.jsx(n.code,{children:"LinkButton"})," component accepts the following props:"]}),`
`,t.jsx(a,{of:c}),`
`,t.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,t.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,t.jsx(n.p,{children:"The default/tertiary button is the base for all other buttons in the system. It provides no significant visual treatment other than to provide indication for the user to take a common action."}),`
`,t.jsx(i,{of:u,inline:!0}),`
`,t.jsx(e,{language:"tsx",code:j}),`
`,t.jsx(n.h3,{id:"primary",children:"Primary"}),`
`,t.jsx(n.p,{children:"The primary button should be used to indicate the most important action for the user to take in their current experience."}),`
`,t.jsx(i,{of:p,inline:!0}),`
`,t.jsx(e,{language:"tsx",code:F}),`
`,t.jsx(n.h3,{id:"secondary",children:"Secondary"}),`
`,t.jsx(n.p,{children:"The secondary button indicates an action of secondary importance."}),`
`,t.jsx(i,{of:x,inline:!0}),`
`,t.jsx(e,{language:"tsx",code:P}),`
`,t.jsx(n.h3,{id:"critical",children:"Critical"}),`
`,t.jsx(n.p,{children:"The critical button signifies to the user a destructive action will take place."}),`
`,t.jsx(i,{of:g,inline:!0}),`
`,t.jsx(e,{language:"tsx",code:v}),`
`,t.jsx(n.h3,{id:"inline",children:"Inline"}),`
`,t.jsx(i,{of:h,inline:!0}),`
`,t.jsx(e,{language:"tsx",code:k}),`
`,t.jsx(n.h3,{id:"minimal",children:"Minimal"}),`
`,t.jsx(n.p,{children:"The minimal button is an icon-only button that's used when space is limited and/or when the action is universally understood."}),`
`,t.jsx(i,{of:b,inline:!0}),`
`,t.jsx(e,{language:"tsx",code:D}),`
`,t.jsx(n.h3,{id:"icon",children:"Icon"}),`
`,t.jsxs(n.p,{children:["You may provide an optional ",t.jsx(n.a,{href:"../icon",children:t.jsx(n.code,{children:"Icon"})})," element to the button. If you do not include text, you must provide an aria-label attribute to identify the purpose of the button. This will produce a square button."]}),`
`,t.jsx(i,{of:B,inline:!0}),`
`,t.jsx(e,{language:"tsx",code:I}),`
`,t.jsx(n.h3,{id:"sizes",children:"Sizes"}),`
`,t.jsx(i,{of:y,inline:!0}),`
`,t.jsx(e,{language:"tsx",code:T}),`
`,t.jsx(n.h3,{id:"disabled",children:"Disabled"}),`
`,t.jsx(i,{of:f,inline:!0}),`
`,t.jsx(e,{language:"tsx",code:S})]})}function jt(o={}){const{wrapper:n}={...r(),...o.components};return n?t.jsx(n,{...o,children:t.jsx(d,{...o})}):d(o)}export{jt as default};
