import{j as n}from"./iframe-BB45uQw9.js";import{u as r,M as l,A as o,a as i,S as e}from"./blocks-UXsbcjKo.js";import{S as s,P as c,L as m,D as u,a as p,b as x,C as g,I as h,M as b,c as B,d as y,e as f}from"./button.stories-BL10wP9y.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CR40qPoM.js";import"./index-DOdcITIN.js";import"./index-DeSYg_wK.js";import"./index-DdMMKOFe.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-CiCkcGr-.js";import"./Text-ZJBEvf3Z.js";import"./SSRProvider-BOxRGIuL.js";import"./ProgressBar-CksUgyRi.js";import"./useLabel-Ce6K44CG.js";import"./filterDOMProps-SeKkUh_q.js";import"./I18nProvider-D3qKFq3v.js";import"./number-P4c4HRxZ.js";import"./useHover-Bl0j5gjk.js";import"./useFocusRing-YLaLPNA4.js";import"./index-wbPc2JB2.js";import"./index-PdJvjei7.js";import"./index-B60S3ST-.js";import"./slots-DItSrxYQ.js";import"./index-DUeUyk1J.js";import"./index-CLj43KZG.js";import"./index--02ypIH8.js";import"./index-DwYknOof.js";import"./create-external-store-TtP3UJpK.js";import"./index-CtfwK49U.js";import"./client-M8dWfCpX.js";import"./index-DCbJJuRD.js";import"./index-0Umr2O2Q.js";import"./index-Cs9YjUtQ.js";import"./index-BPPc5JgW.js";const j=`import { Button } from '@godaddy/antares';

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
`;function d(a){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...r(),...a.components};return n.jsxs(n.Fragment,{children:[n.jsx(l,{of:s,name:"Overview"}),`
`,n.jsx(t.h1,{id:"button",children:"Button"}),`
`,n.jsx(t.p,{children:"The Button component allows users to initiate actions or submit forms with a single click"}),`
`,n.jsxs(t.p,{children:["Use the ",n.jsx(t.code,{children:"LinkButton"})," component instead when you need navigation functionality with a button-like appearance."]}),`
`,n.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,n.jsx(t.pre,{children:n.jsx(t.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,n.jsx(t.h2,{id:"props",children:"Props"}),`
`,n.jsxs(t.p,{children:["The ",n.jsx(t.code,{children:"Button"})," component accepts the following props:"]}),`
`,n.jsx(o,{of:c}),`
`,n.jsxs(t.p,{children:["The ",n.jsx(t.code,{children:"LinkButton"})," component accepts the following props:"]}),`
`,n.jsx(o,{of:m}),`
`,n.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,n.jsx(t.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,n.jsx(t.p,{children:"The default/tertiary button is the base for all other buttons in the system. It provides no significant visual treatment other than to provide indication for the user to take a common action."}),`
`,n.jsx(i,{of:u,inline:!0}),`
`,n.jsx(e,{language:"tsx",code:j}),`
`,n.jsx(t.h3,{id:"primary",children:"Primary"}),`
`,n.jsx(t.p,{children:"The primary button should be used to indicate the most important action for the user to take in their current experience."}),`
`,n.jsx(i,{of:p,inline:!0}),`
`,n.jsx(e,{language:"tsx",code:F}),`
`,n.jsx(t.h3,{id:"secondary",children:"Secondary"}),`
`,n.jsx(t.p,{children:"The secondary button indicates an action of secondary importance."}),`
`,n.jsx(i,{of:x,inline:!0}),`
`,n.jsx(e,{language:"tsx",code:P}),`
`,n.jsx(t.h3,{id:"critical",children:"Critical"}),`
`,n.jsx(t.p,{children:"The critical button signifies to the user a destructive action will take place."}),`
`,n.jsx(i,{of:g,inline:!0}),`
`,n.jsx(e,{language:"tsx",code:v}),`
`,n.jsx(t.h3,{id:"inline",children:"Inline"}),`
`,n.jsx(i,{of:h,inline:!0}),`
`,n.jsx(e,{language:"tsx",code:k}),`
`,n.jsx(t.h3,{id:"minimal",children:"Minimal"}),`
`,n.jsx(t.p,{children:"The minimal button is an icon-only button that's used when space is limited and/or when the action is universally understood."}),`
`,n.jsx(i,{of:b,inline:!0}),`
`,n.jsx(e,{language:"tsx",code:D}),`
`,n.jsx(t.h3,{id:"icon",children:"Icon"}),`
`,n.jsxs(t.p,{children:["You may provide an optional ",n.jsx(t.a,{href:"../icon",children:n.jsx(t.code,{children:"Icon"})})," element to the button. If you do not include text, you must provide an aria-label attribute to identify the purpose of the button. This will produce a square button."]}),`
`,n.jsx(i,{of:B,inline:!0}),`
`,n.jsx(e,{language:"tsx",code:I}),`
`,n.jsx(t.h3,{id:"sizes",children:"Sizes"}),`
`,n.jsx(i,{of:y,inline:!0}),`
`,n.jsx(e,{language:"tsx",code:T}),`
`,n.jsx(t.h3,{id:"disabled",children:"Disabled"}),`
`,n.jsx(i,{of:f,inline:!0}),`
`,n.jsx(e,{language:"tsx",code:S})]})}function un(a={}){const{wrapper:t}={...r(),...a.components};return t?n.jsx(t,{...a,children:n.jsx(d,{...a})}):d(a)}export{un as default};
